import { NextResponse } from 'next/server';
import { SESSION_COOKIE, getSession } from '@/lib/auth';
import { writeAudit } from '@/lib/certificates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
    const session = await getSession();
    if (session) writeAudit(session.email, 'logout', null, null);

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });
    return response;
}
