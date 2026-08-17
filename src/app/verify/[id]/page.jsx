import { getCertificate, toPublicCertificate, verifySignature } from '@/lib/certificates';
import VerifyClient from './VerifyClient';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const cert = getCertificate(id);

    if (!cert) {
        return { title: '查無此證書 | GDG on Campus NCUE', robots: { index: false, follow: false } };
    }

    return {
        title: `${cert.recipient_name} · ${cert.event_name} | 證書驗證`,
        description: `${cert.recipient_name} 於 ${cert.issue_date} 取得 GDG on Campus NCUE 核發的「${cert.event_name}」參與證書，證號 ${cert.cert_number}。`,
        robots: { index: false, follow: false },
    };
}

export default async function VerifyCertificatePage({ params }) {
    const { id } = await params;
    const cert = getCertificate(id);

    return (
        <VerifyClient
            certificate={toPublicCertificate(cert)}
            signatureValid={cert ? verifySignature(cert) : false}
        />
    );
}
