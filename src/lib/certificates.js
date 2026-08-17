import crypto from 'node:crypto';
import { getDb } from './db';

/**
 * 證書的防竄改簽章。
 * 用伺服器端的 AUTH_SECRET 對正規化後的欄位做 HMAC，只有持有金鑰的伺服器能重算，
 * 任何人事後改動姓名／活動／日期都會讓簽章對不上。
 */
export function computeSignature({ id, cert_number, recipient_name, event_name, issue_date }) {
    const secret = process.env.AUTH_SECRET || '';
    const canonical = [id, cert_number, recipient_name, event_name, issue_date].join('');
    const digest = crypto.createHmac('sha256', secret).update(canonical).digest('hex');
    return `v2_hs256_${digest.slice(0, 40)}`;
}

export function verifySignature(cert) {
    if (!cert?.signature) return false;
    const expected = computeSignature(cert);
    const a = Buffer.from(cert.signature);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

const COLUMNS = `
    id, cert_number, recipient_name, recipient_email, event_name, issue_date,
    signature, image_file, issued_by, email_status, email_error, email_sent_at,
    revoked_at, created_at, updated_at
`;

export function listCertificates() {
    return getDb()
        .prepare(`SELECT ${COLUMNS} FROM certificates ORDER BY created_at DESC`)
        .all();
}

export function getCertificate(id) {
    return getDb()
        .prepare(`SELECT ${COLUMNS} FROM certificates WHERE id = ?`)
        .get(id) ?? null;
}

export function certNumberExists(certNumber) {
    return !!getDb()
        .prepare('SELECT 1 FROM certificates WHERE cert_number = ?')
        .get(certNumber);
}

export function insertCertificate(cert) {
    getDb().prepare(`
        INSERT INTO certificates (
            id, cert_number, recipient_name, recipient_email, event_name,
            issue_date, signature, image_file, issued_by, email_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        cert.id,
        cert.cert_number,
        cert.recipient_name,
        cert.recipient_email || null,
        cert.event_name,
        cert.issue_date,
        cert.signature || null,
        cert.image_file || null,
        cert.issued_by || null,
        cert.email_status || 'skipped',
    );
    return getCertificate(cert.id);
}

export function updateEmailStatus(id, status, error = null) {
    getDb().prepare(`
        UPDATE certificates
           SET email_status = ?,
               email_error = ?,
               email_sent_at = CASE WHEN ? = 'sent' THEN strftime('%Y-%m-%dT%H:%M:%fZ', 'now') ELSE email_sent_at END
         WHERE id = ?
    `).run(status, error, status, id);
}

export function deleteCertificate(id) {
    const result = getDb().prepare('DELETE FROM certificates WHERE id = ?').run(id);
    return result.changes > 0;
}

export function writeAudit(actor, action, targetId, detail) {
    getDb()
        .prepare('INSERT INTO audit_log (actor, action, target_id, detail) VALUES (?, ?, ?, ?)')
        .run(actor || null, action, targetId || null, detail || null);
}

export function listAudit(limit = 30) {
    return getDb()
        .prepare('SELECT id, actor, action, target_id, detail, created_at FROM audit_log ORDER BY id DESC LIMIT ?')
        .all(limit);
}

/**
 * 驗證頁只需要公開欄位，收件人 Email 與寄送狀態不對外洩漏。
 */
export function toPublicCertificate(cert) {
    if (!cert) return null;
    return {
        id: cert.id,
        cert_number: cert.cert_number,
        recipient_name: cert.recipient_name,
        event_name: cert.event_name,
        issue_date: cert.issue_date,
        signature: cert.signature,
        revoked_at: cert.revoked_at,
        created_at: cert.created_at,
        image_url: cert.image_file ? `/api/certificates/${cert.id}/image` : null,
    };
}
