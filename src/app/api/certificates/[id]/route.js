import { requireAdmin } from '@/lib/auth';
import {
    deleteCertificate,
    getCertificate,
    toPublicCertificate,
    verifySignature,
    writeAudit,
} from '@/lib/certificates';
import { deleteCertificateImage } from '@/lib/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 公開驗證端點：只回傳可對外揭露的欄位。 */
export async function GET(_request, { params }) {
    const { id } = await params;
    const cert = getCertificate(id);
    if (!cert) return Response.json({ error: '查無此證書' }, { status: 404 });

    return Response.json({
        certificate: toPublicCertificate(cert),
        signatureValid: verifySignature(cert),
    });
}

/** 撤銷證書：連同 Volume 上的圖片一起刪除。 */
export async function DELETE(_request, { params }) {
    const { session, response } = await requireAdmin();
    if (response) return response;

    const { id } = await params;
    const cert = getCertificate(id);
    if (!cert) return Response.json({ error: '查無此證書' }, { status: 404 });

    deleteCertificate(id);
    await deleteCertificateImage(cert.image_file);
    writeAudit(session.email, 'certificate.revoke', id, cert.cert_number);

    return Response.json({ ok: true });
}
