import QRCode from 'qrcode';
import { getBaseUrl } from '@/lib/auth';
import { getCertificate } from '@/lib/certificates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * 通知信裡的驗證 QR Code。
 * 由本站自行產生，不再依賴第三方 QR 服務，收件人的驗證連結也就不會外流給別人。
 */
export async function GET(request, { params }) {
    const { id } = await params;
    if (!getCertificate(id)) return new Response('Not found', { status: 404 });

    const png = await QRCode.toBuffer(`${getBaseUrl(request)}/verify/${id}`, {
        type: 'png',
        width: 320,
        margin: 1,
        errorCorrectionLevel: 'H',
        color: { dark: '#0f172a', light: '#ffffff' },
    });

    return new Response(png, {
        headers: {
            'Content-Type': 'image/png',
            'Content-Length': String(png.length),
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
