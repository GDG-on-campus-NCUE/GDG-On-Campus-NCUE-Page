import { getBaseUrl, requireAdmin } from '@/lib/auth';
import { getCertificate, updateEmailStatus, writeAudit } from '@/lib/certificates';
import { sendCertificateEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 重寄通知信（給寄送失敗、或收件人說沒收到的情況）。 */
export async function POST(request, { params }) {
    const { session, response } = await requireAdmin();
    if (response) return response;

    const { id } = await params;
    const cert = getCertificate(id);
    if (!cert) return Response.json({ error: '查無此證書' }, { status: 404 });
    if (!cert.recipient_email) return Response.json({ error: '此證書沒有登記收件人 Email' }, { status: 400 });

    const result = await sendCertificateEmail({
        to: cert.recipient_email,
        name: cert.recipient_name,
        eventName: cert.event_name,
        certId: cert.id,
        certNumber: cert.cert_number,
        issueDate: cert.issue_date,
        baseUrl: getBaseUrl(request),
    });

    updateEmailStatus(cert.id, result.ok ? 'sent' : 'failed', result.ok ? null : result.error);
    writeAudit(session.email, 'certificate.resend', cert.id, result.ok ? 'sent' : result.error);

    if (!result.ok) return Response.json({ error: result.error }, { status: 502 });
    return Response.json({ ok: true });
}
