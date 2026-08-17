import nodemailer from 'nodemailer';

/* ── 寄件設定 ─────────────────────────────────── */
const SMTP_USER = process.env.SMTP_USER || 'ideasspr@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_ADDRESS = `"Google Developer Group" <${SMTP_USER}>`;
const CONTACT_ADDRESS = process.env.MAIL_CONTACT || 'gdg-core@ncuesa.org.tw';
const ORG_NAME = 'GDG on Campus NCUE';

/* ── 建立 SMTP transporter（單例） ─────────────── */
let _transporter = null;
function getTransporter() {
    if (!_transporter) {
        _transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });
    }
    return _transporter;
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ── 色票（白底信件） ─────────────────────────────── */
const INK      = '#202124';     // 主標題文字
const BODY     = '#3c4043';     // 內文文字
const MUTED    = '#5f6368';     // 次要文字
const FAINT    = '#80868b';     // 最淡文字
const LINE     = '#e0e0e0';     // 分隔線
const ACCENT   = '#4285f4';     // Google 藍
const ACCENT_G = '#34a853';     // Google 綠
const ACCENT_Y = '#fbbc04';     // Google 黃
const ACCENT_R = '#ea4335';     // Google 紅
const MONO_FONT = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";
const FONT      = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', Helvetica, Arial, sans-serif";

function renderHtml({ name, eventName, certId, certNumber, issueDate, certUrl, qrUrl, baseUrl }) {
    const safeName = escapeHtml(name);
    const safeEvent = escapeHtml(eventName);
    const safeCertId = escapeHtml(certId);
    const safeCertNumber = escapeHtml(certNumber);
    const safeIssueDate = escapeHtml(issueDate || '');
    const year = new Date().getFullYear();

    const row = (label, value) => `
              <tr>
                <td style="padding:5px 0;font-family:${FONT};font-size:13px;line-height:1.7;color:${MUTED};white-space:nowrap;vertical-align:top;">${label}</td>
                <td style="padding:5px 0 5px 18px;font-family:${MONO_FONT};font-size:13px;line-height:1.7;color:${BODY};word-break:break-all;vertical-align:top;">${value}</td>
              </tr>`;

    return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>證書核發通知</title>
</head>
<body style="margin:0;padding:0;-webkit-text-size-adjust:none;">
  <div style="display:none;font-size:1px;max-height:0;overflow:hidden;">你參與「${safeEvent}」的數位證書已核發完成，點開即可檢視與下載。</div>

  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="width:100%;max-width:600px;margin:0 auto;">

    <!-- 標題 -->
    <tr>
      <td style="padding:40px 40px 0;">
        <h1 style="margin:0;font-family:${FONT};font-size:22px;line-height:1.5;font-weight:700;color:${INK};letter-spacing:-0.2px;">
          證書核發通知
        </h1>
        <p style="margin:8px 0 0;font-family:${FONT};font-size:14px;color:${ACCENT};font-weight:600;letter-spacing:0.3px;">
          ${safeEvent}
        </p>
      </td>
    </tr>

    <!-- Google 四色裝飾條 -->
    <tr>
      <td style="padding:20px 40px 0;font-size:0;line-height:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="height:4px;background:${ACCENT};" width="25%"></td>
          <td style="height:4px;background:${ACCENT_R};" width="25%"></td>
          <td style="height:4px;background:${ACCENT_Y};" width="25%"></td>
          <td style="height:4px;background:${ACCENT_G};" width="25%"></td>
        </tr></table>
      </td>
    </tr>

    <!-- 內文 -->
    <tr>
      <td style="padding:28px 40px 0;font-family:${FONT};font-size:15px;line-height:1.85;color:${BODY};">
        <p style="margin:0 0 16px;">親愛的 <strong style="color:${INK};">${safeName}</strong> 同學，您好：</p>
        <p style="margin:0;">
          感謝你參與「<strong style="color:${INK};">${safeEvent}</strong>」。
          你的數位參與證書已核發完成，可以透過下方按鈕隨時檢視、下載與分享，連結長期有效。
        </p>
      </td>
    </tr>

    <!-- CTA 按鈕 -->
    <tr>
      <td style="padding:32px 40px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background-color:${ACCENT};border-radius:8px;">
              <a href="${certUrl}" style="display:inline-block;padding:14px 36px;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">檢視我的證書</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- QR Code 區塊 -->
    <tr>
      <td style="padding:28px 40px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${LINE};border-radius:10px;">
          <tr>
            <td width="110" style="padding:16px;" valign="middle">
              <img src="${qrUrl}" alt="驗證 QR Code" width="92" height="92" style="width:92px;height:92px;display:block;border-radius:6px;">
            </td>
            <td style="padding:16px 16px 16px 4px;font-family:${FONT};font-size:13px;line-height:1.8;color:${MUTED};" valign="middle">
              用手機掃描左側 QR Code，<br>即可在其他裝置開啟公開驗證頁面。
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- 證書資訊 -->
    <tr>
      <td style="padding:24px 40px 0;">
        <div style="border-top:1px solid ${LINE};padding-top:20px;">
          <p style="margin:0 0 12px;font-family:${FONT};font-size:11px;font-weight:700;color:${FAINT};text-transform:uppercase;letter-spacing:1.5px;">Certificate Details</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:${FONT};">
${row('證書編號', safeCertNumber)}
${row('核發日期', safeIssueDate)}
${row('驗證 ID', safeCertId)}
          </table>
        </div>
      </td>
    </tr>

    <!-- 結尾 -->
    <tr>
      <td style="padding:28px 40px 36px;font-family:${FONT};font-size:15px;line-height:1.85;color:${BODY};">
        若有任何疑問，歡迎隨時與我們聯繫。<br>
        <strong style="color:${INK};">${ORG_NAME}</strong> 敬上
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:24px 40px 40px;border-top:1px solid ${LINE};">
        <p style="margin:0 0 12px;font-family:${FONT};font-size:13px;text-align:center;">
          <a href="${certUrl}" style="color:${ACCENT};text-decoration:none;">證書驗證頁</a>
          <span style="color:${FAINT};padding:0 10px;">·</span>
          <a href="${baseUrl}" style="color:${ACCENT};text-decoration:none;">社群首頁</a>
          <span style="color:${FAINT};padding:0 10px;">·</span>
          <a href="mailto:${CONTACT_ADDRESS}" style="color:${ACCENT};text-decoration:none;">聯絡我們</a>
        </p>
        <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;line-height:1.7;color:${FAINT};text-align:center;">
          此信件由「${ORG_NAME} 證書管理系統」自動發送，請勿直接回覆。
        </p>
        <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.7;color:${FAINT};text-align:center;">
          &copy; ${year} ${ORG_NAME}. All Rights Reserved.
        </p>
      </td>
    </tr>

  </table>
</body>
</html>`;
}

/** 純文字版本，給不讀 HTML 的收件軟體，同時也有助於通過垃圾信過濾。 */
function renderText({ name, eventName, certId, certNumber, issueDate, certUrl }) {
    return [
        `[證書核發通知] ${eventName}`,
        '',
        `親愛的 ${name} 同學，您好：`,
        '',
        `感謝你參與「${eventName}」。你的數位參與證書已核發完成，`,
        '可以透過下方連結隨時檢視、下載與分享：',
        '',
        certUrl,
        '',
        `證書編號：${certNumber}`,
        `核發日期：${issueDate || ''}`,
        `驗證 ID：${certId}`,
        '',
        '若有任何疑問，歡迎隨時與我們聯繫。',
        `${ORG_NAME} 敬上`,
        '',
        '---',
        `此信件由「${ORG_NAME} 證書管理系統」自動發送，請勿直接回覆。`,
        `聯絡信箱：${CONTACT_ADDRESS}`,
    ].join('\n');
}

/**
 * 寄出證書通知信。
 * 回傳 { ok: true } 或 { ok: false, error }，呼叫端負責把結果寫回 certificates.email_status。
 */
export async function sendCertificateEmail({ to, name, eventName, certId, certNumber, issueDate, baseUrl }) {
    if (!SMTP_PASS) return { ok: false, error: 'SMTP_PASS（應用程式密碼）未設定' };
    if (!to) return { ok: false, error: '沒有收件人 Email' };

    const payload = {
        name,
        eventName,
        certId,
        certNumber,
        issueDate,
        certUrl: `${baseUrl}/verify/${certId}`,
        qrUrl: `${baseUrl}/api/certificates/${certId}/qr`,
        baseUrl,
    };

    try {
        await getTransporter().sendMail({
            from: FROM_ADDRESS,
            to,
            subject: `[證書核發通知] ${eventName}`,
            html: renderHtml(payload),
            text: renderText(payload),
        });

        return { ok: true };
    } catch (err) {
        return { ok: false, error: err.message };
    }
}
