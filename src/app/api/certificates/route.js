import { getBaseUrl, requireAdmin } from '@/lib/auth';
import {
    certNumberExists,
    computeSignature,
    insertCertificate,
    listCertificates,
    updateEmailStatus,
    writeAudit,
} from '@/lib/certificates';
import { sendCertificateEmail } from '@/lib/mailer';
import { saveCertificateImage } from '@/lib/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CERT_NUMBER_RE = /^[A-Za-z0-9-]{4,40}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function withImageUrl(cert) {
    return { ...cert, image_url: cert.image_file ? `/api/certificates/${cert.id}/image` : null };
}

/** 後台清單：回傳完整欄位（含收件人 Email 與寄送狀態）。 */
export async function GET() {
    const { response } = await requireAdmin();
    if (response) return response;

    return Response.json({ certificates: listCertificates().map(withImageUrl) });
}

function validate(body) {
    const errors = [];
    if (!UUID_RE.test(body.id || '')) errors.push('id 必須是 UUID');
    if (!CERT_NUMBER_RE.test(body.cert_number || '')) errors.push('證號格式不正確');
    if (!body.recipient_name?.trim()) errors.push('請填寫受證人姓名');
    if (!body.event_name?.trim()) errors.push('請填寫活動或專案名稱');
    if (!DATE_RE.test(body.issue_date || '')) errors.push('發放日期格式必須是 YYYY-MM-DD');
    if (body.recipient_email && !EMAIL_RE.test(body.recipient_email)) errors.push('Email 格式不正確');
    if (!body.image?.startsWith('data:image/png;base64,')) errors.push('缺少證書圖片');
    return errors;
}

/** 核發新證書：存圖 → 寫入資料庫 → （可選）寄送通知信。 */
export async function POST(request) {
    const { session, response } = await requireAdmin();
    if (response) return response;

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: '請求內容不是合法的 JSON' }, { status: 400 });
    }

    const errors = validate(body);
    if (errors.length) return Response.json({ error: errors.join('；') }, { status: 400 });

    if (certNumberExists(body.cert_number)) {
        return Response.json({ error: '此證號已存在，請重新產生' }, { status: 409 });
    }

    const record = {
        id: body.id,
        cert_number: body.cert_number,
        recipient_name: body.recipient_name.trim(),
        recipient_email: body.recipient_email?.trim() || null,
        event_name: body.event_name.trim(),
        issue_date: body.issue_date,
    };

    let imageFile;
    try {
        imageFile = await saveCertificateImage(body.image, `${record.id}.png`);
    } catch (err) {
        return Response.json({ error: `證書圖片儲存失敗：${err.message}` }, { status: 400 });
    }

    let created;
    try {
        created = insertCertificate({
            ...record,
            signature: computeSignature(record),
            image_file: imageFile,
            issued_by: session.email,
            email_status: record.recipient_email ? 'pending' : 'skipped',
        });
    } catch (err) {
        return Response.json({ error: `寫入資料庫失敗：${err.message}` }, { status: 500 });
    }

    writeAudit(session.email, 'certificate.issue', created.id, created.cert_number);

    // 寄信失敗不應該讓證書核發整批失敗，記錄狀態後由後台重寄。
    if (record.recipient_email && body.send_email !== false) {
        const result = await sendCertificateEmail({
            to: record.recipient_email,
            name: record.recipient_name,
            eventName: record.event_name,
            certId: created.id,
            certNumber: created.cert_number,
            issueDate: created.issue_date,
            baseUrl: getBaseUrl(request),
        });
        updateEmailStatus(created.id, result.ok ? 'sent' : 'failed', result.ok ? null : result.error);
        created.email_status = result.ok ? 'sent' : 'failed';
        created.email_error = result.ok ? null : result.error;
    }

    return Response.json({ certificate: withImageUrl(created) }, { status: 201 });
}
