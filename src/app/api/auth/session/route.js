import { getSession } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return Response.json({ authenticated: false }, { status: 401 });

    return Response.json({
        authenticated: true,
        user: {
            email: session.email,
            name: session.name,
            picture: session.picture,
        },
        expiresAt: session.exp,
    });
}
