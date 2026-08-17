import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'gdg_admin_session';
export const OAUTH_STATE_COOKIE = 'gdg_oauth_state';

/** Session 有效期（秒）。過期後需要重新用 Google 登入。 */
const SESSION_TTL = 60 * 60 * 8;

const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GOOGLE_ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com']);

/* -------------------------------------------------------------------------- */
/* 設定                                                                        */
/* -------------------------------------------------------------------------- */

function splitList(value) {
    return (value || '')
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);
}

export function getAuthConfig() {
    return {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        secret: process.env.AUTH_SECRET || '',
        appUrl: (process.env.APP_URL || '').replace(/\/+$/, ''),
        adminEmails: splitList(process.env.ADMIN_EMAILS),
        adminDomains: splitList(process.env.ADMIN_EMAIL_DOMAINS).map((d) => d.replace(/^@/, '')),
    };
}

export function getAuthConfigErrors() {
    const config = getAuthConfig();
    const missing = [];
    if (!config.clientId) missing.push('GOOGLE_CLIENT_ID');
    if (!config.clientSecret) missing.push('GOOGLE_CLIENT_SECRET');
    if (!config.secret) missing.push('AUTH_SECRET');
    if (!config.adminEmails.length && !config.adminDomains.length) {
        missing.push('ADMIN_EMAILS 或 ADMIN_EMAIL_DOMAINS');
    }
    return missing;
}

/**
 * OAuth redirect_uri 必須與 Google Cloud Console 上登記的字串「逐字相同」。
 * 正式環境固定用 APP_URL 推導，本機開發才退回請求本身的 origin。
 */
export function getRedirectUri(request) {
    const { appUrl } = getAuthConfig();
    const base = appUrl || new URL(request.url).origin;
    return `${base}/api/auth/callback/google`;
}

export function getBaseUrl(request) {
    const { appUrl } = getAuthConfig();
    return appUrl || new URL(request.url).origin;
}

export function isAllowedAdmin(email) {
    if (!email) return false;
    const normalized = email.toLowerCase();
    const { adminEmails, adminDomains } = getAuthConfig();
    if (adminEmails.includes(normalized)) return true;
    const domain = normalized.split('@')[1];
    return !!domain && adminDomains.includes(domain);
}

/* -------------------------------------------------------------------------- */
/* Session token（HMAC-SHA256 簽章的 JSON）                                     */
/* -------------------------------------------------------------------------- */

function b64url(buffer) {
    return Buffer.from(buffer).toString('base64url');
}

function hmac(payloadB64, secret) {
    return crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
}

export function signSession(payload) {
    const { secret } = getAuthConfig();
    if (!secret) throw new Error('AUTH_SECRET 未設定');
    const body = { ...payload, iat: Math.floor(Date.now() / 1000) };
    body.exp = body.iat + SESSION_TTL;
    const payloadB64 = b64url(JSON.stringify(body));
    return `${payloadB64}.${hmac(payloadB64, secret)}`;
}

export function verifySession(token) {
    const { secret } = getAuthConfig();
    if (!token || !secret) return null;

    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    const expected = hmac(payloadB64, secret);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    let payload;
    try {
        payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    } catch {
        return null;
    }

    if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    // 白名單可能在 session 發出後才被移除，每次都重新檢查一次。
    if (!isAllowedAdmin(payload.email)) return null;

    return payload;
}

/* -------------------------------------------------------------------------- */
/* Cookie                                                                      */
/* -------------------------------------------------------------------------- */

const isProduction = process.env.NODE_ENV === 'production';

export function sessionCookieOptions(maxAge = SESSION_TTL) {
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge,
    };
}

/** 讀取目前登入者；未登入或 session 失效回傳 null。 */
export async function getSession() {
    const store = await cookies();
    return verifySession(store.get(SESSION_COOKIE)?.value);
}

/**
 * API route 專用守門員。
 * 通過回傳 { session }，否則回傳 { response } 讓呼叫端直接 return。
 */
export async function requireAdmin() {
    const session = await getSession();
    if (!session) {
        return {
            session: null,
            response: Response.json({ error: '未授權，請重新登入' }, { status: 401 }),
        };
    }
    return { session, response: null };
}

/* -------------------------------------------------------------------------- */
/* Google OAuth                                                                */
/* -------------------------------------------------------------------------- */

export function buildGoogleAuthUrl({ clientId, redirectUri, state, nonce }) {
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid email profile',
        state,
        nonce,
        access_type: 'online',
        prompt: 'select_account',
        include_granted_scopes: 'true',
    });
    return `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}`;
}

export async function exchangeCodeForTokens({ code, clientId, clientSecret, redirectUri }) {
    const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error_description || data.error || 'Google 權杖交換失敗');
    }
    return data;
}

/**
 * 解析 Google 回傳的 id_token。
 *
 * 這裡不驗簽章：id_token 是我們用 client_secret 直接向 Google token endpoint（HTTPS）
 * 換來的，傳輸過程本身即為信任來源，Google 官方文件對 authorization code flow
 * 也明示此情境可略過本地驗簽。其餘宣告仍逐項檢查。
 */
export function parseIdToken(idToken, { clientId, nonce }) {
    const parts = (idToken || '').split('.');
    if (parts.length !== 3) throw new Error('id_token 格式不正確');

    let claims;
    try {
        claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    } catch {
        throw new Error('id_token 無法解析');
    }

    if (!GOOGLE_ISSUERS.has(claims.iss)) throw new Error('id_token 簽發者不正確');
    if (claims.aud !== clientId) throw new Error('id_token 的 aud 與 GOOGLE_CLIENT_ID 不符');
    if (!claims.exp || claims.exp < Math.floor(Date.now() / 1000)) throw new Error('id_token 已過期');
    if (nonce && claims.nonce !== nonce) throw new Error('nonce 不符，請重新登入');
    if (claims.email_verified === false) throw new Error('此 Google 帳號的電子郵件尚未驗證');
    if (!claims.email) throw new Error('Google 未回傳電子郵件');

    return claims;
}

export function randomToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString('base64url');
}
