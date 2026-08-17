import { getCertificate } from '@/lib/certificates';
import { readCertificateImage } from '@/lib/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 由 Volume 讀出證書 PNG。證書內容一經核發即不再變動，可長期快取。 */
export async function GET(_request, { params }) {
    const { id } = await params;
    const cert = getCertificate(id);
    if (!cert?.image_file) return new Response('Not found', { status: 404 });

    const buffer = await readCertificateImage(cert.image_file);
    if (!buffer) return new Response('Not found', { status: 404 });

    return new Response(buffer, {
        headers: {
            'Content-Type': 'image/png',
            'Content-Length': String(buffer.length),
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Content-Disposition': `inline; filename="Certificate-${cert.cert_number}.png"`,
        },
    });
}
