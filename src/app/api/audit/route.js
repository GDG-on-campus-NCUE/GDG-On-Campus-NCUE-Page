import { requireAdmin } from '@/lib/auth';
import { listAudit } from '@/lib/certificates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { response } = await requireAdmin();
    if (response) return response;

    const limit = Math.min(Number(new URL(request.url).searchParams.get('limit')) || 50, 200);
    return Response.json({ entries: listAudit(limit) });
}
