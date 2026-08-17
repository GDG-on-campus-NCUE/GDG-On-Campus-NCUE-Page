import { NextResponse } from 'next/server';
import {
    OAUTH_STATE_COOKIE,
    SESSION_COOKIE,
    exchangeCodeForTokens,
    getAuthConfig,
    getBaseUrl,
    getRedirectUri,
    isAllowedAdmin,
    parseIdToken,
    sessionCookieOptions,
    signSession,
} from '@/lib/auth';
import { writeAudit } from '@/lib/certificates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function failure(baseUrl, message) {
    const url = new URL('/admin/login', baseUrl);
    url.searchParams.set('error', message);
    const response = NextResponse.redirect(url);
    response.cookies.delete(OAUTH_STATE_COOKIE);
    return response;
}

export async function GET(request) {
    const baseUrl = getBaseUrl(request);
    const params = new URL(request.url).searchParams;

    if (params.get('error')) {
        return failure(baseUrl, `Google 拒絕了授權請求：${params.get('error')}`);
    }

    const code = params.get('code');
    if (!code) return failure(baseUrl, '缺少授權碼，請重新登入');

    // CSRF：比對回傳的 state 與登入時寫進 httpOnly cookie 的值
    let stored;
    try {
        stored = JSON.parse(request.cookies.get(OAUTH_STATE_COOKIE)?.value || 'null');
    } catch {
        stored = null;
    }
    if (!stored?.state || stored.state !== params.get('state')) {
        return failure(baseUrl, '登入狀態驗證失敗，請重新登入');
    }

    const { clientId, clientSecret } = getAuthConfig();

    try {
        const tokens = await exchangeCodeForTokens({
            code,
            clientId,
            clientSecret,
            redirectUri: getRedirectUri(request),
        });

        const claims = parseIdToken(tokens.id_token, { clientId, nonce: stored.nonce });

        if (!isAllowedAdmin(claims.email)) {
            writeAudit(claims.email, 'login.denied', null, '不在管理員白名單內');
            return failure(baseUrl, `${claims.email} 不在管理員名單中，請聯絡核心成員開通。`);
        }

        const response = NextResponse.redirect(new URL('/admin/dashboard', baseUrl));
        response.cookies.set(
            SESSION_COOKIE,
            signSession({
                sub: claims.sub,
                email: claims.email,
                name: claims.name || claims.email,
                picture: claims.picture || null,
            }),
            sessionCookieOptions(),
        );
        response.cookies.delete(OAUTH_STATE_COOKIE);

        writeAudit(claims.email, 'login.success', null, null);
        return response;
    } catch (err) {
        return failure(baseUrl, err.message || '登入失敗');
    }
}
