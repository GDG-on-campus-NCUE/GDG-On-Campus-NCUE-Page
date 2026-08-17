import { NextResponse } from 'next/server';
import {
    OAUTH_STATE_COOKIE,
    buildGoogleAuthUrl,
    getAuthConfig,
    getAuthConfigErrors,
    getBaseUrl,
    getRedirectUri,
    randomToken,
} from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 導向 Google 的授權頁面，開始 OAuth authorization code 流程。 */
export async function GET(request) {
    const missing = getAuthConfigErrors();
    const baseUrl = getBaseUrl(request);

    if (missing.length) {
        const url = new URL('/admin/login', baseUrl);
        url.searchParams.set('error', `伺服器尚未設定：${missing.join('、')}`);
        return NextResponse.redirect(url);
    }

    const { clientId } = getAuthConfig();
    const state = randomToken(24);
    const nonce = randomToken(24);

    const response = NextResponse.redirect(
        buildGoogleAuthUrl({
            clientId,
            redirectUri: getRedirectUri(request),
            state,
            nonce,
        }),
    );

    response.cookies.set(OAUTH_STATE_COOKIE, JSON.stringify({ state, nonce }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 600,
    });

    return response;
}
