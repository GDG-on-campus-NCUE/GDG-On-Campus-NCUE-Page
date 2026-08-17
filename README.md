# GDG On Campus NCUE 官方網站

彰化師範大學 Google 開發者社群官方網站，含**數位證書核發／驗證系統**。

- 正式站：<https://gdg.ncuesa.org.tw>
- 後台：`/admin/login`（Google 登入 + 管理員白名單）
- 公開驗證頁：`/verify/<證書 UUID>`

---

## 技術架構

| 層 | 用什麼 |
|---|---|
| 前端 / 後端 | Next.js 15（App Router）、React 19、Tailwind CSS 4 |
| 資料庫 | **SQLite**，透過 Node.js 內建的 `node:sqlite`，零外部依賴 |
| 檔案儲存 | 伺服器本機磁碟（Zeabur 持久化 Volume） |
| 身分驗證 | 自建 Google OAuth 2.0 + HMAC 簽章的 httpOnly session cookie |
| 郵件 | Resend |
| 部署 | Docker → Zeabur 專屬伺服器 |

> 這個專案原本使用 Supabase（Postgres + Storage + Auth）並部署在 Cloudflare Pages，
> 已全面改為單一容器 + SQLite 的架構。詳見 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
> 與 [docs/GOOGLE-OAUTH.md](docs/GOOGLE-OAUTH.md)。

### 資料放在哪

所有狀態都在 `DATA_DIR` 這一個目錄底下，備份／搬家只要複製它：

```
$DATA_DIR/
├── gdg.db            # certificates、audit_log 兩張表
└── certificates/     # 核發出去的證書 PNG
```

---

## 本機開發

```bash
npm install
cp .env.local.example .env.local   # 填入下面說明的變數
npm run dev                        # http://localhost:3000
```

需要 **Node.js 22.13 以上**（`node:sqlite` 要免旗標可用）。

### 環境變數

```bash
APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
AUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")
ADMIN_EMAILS=you@gmail.com
DATA_DIR=./data
RESEND_API_KEY=re_...
```

本機要能登入，Google Cloud Console 的重新導向網址要多加一筆
`http://localhost:3000/api/auth/callback/google`。

沒填 Google 憑證也能跑，只是 `/admin/login` 會顯示「伺服器尚未完成設定」並停用登入按鈕。

---

## 主要路由

| 路徑 | 權限 | 說明 |
|---|---|---|
| `/` | 公開 | 社群首頁 |
| `/verify/[id]` | 公開 | 證書驗證頁，伺服器端算好簽章是否有效才回傳 |
| `/admin/login` | 公開 | Google 登入 |
| `/admin/dashboard` | 管理員 | 總覽 / 證書管理 / 稽核紀錄 |
| `GET /api/health` | 公開 | 健康檢查，順便確認資料庫讀得到 |
| `GET /api/auth/google` | 公開 | 導向 Google 授權頁 |
| `GET /api/auth/callback/google` | 公開 | OAuth callback，發 session cookie |
| `POST /api/auth/logout` | 公開 | 登出 |
| `GET /api/auth/session` | 管理員 | 目前登入者 |
| `GET /api/certificates` | 管理員 | 證書清單（含 Email 與寄送狀態） |
| `POST /api/certificates` | 管理員 | 核發證書、存圖、寄信 |
| `DELETE /api/certificates/[id]` | 管理員 | 撤銷證書並刪圖 |
| `POST /api/certificates/[id]/resend` | 管理員 | 重寄通知信 |
| `GET /api/certificates/[id]` | 公開 | 證書公開欄位（不含 Email） |
| `GET /api/certificates/[id]/image` | 公開 | 證書 PNG |
| `GET /api/certificates/[id]/qr` | 公開 | 驗證 QR Code PNG |
| `GET /api/audit` | 管理員 | 稽核紀錄 |

---

## 安全性設計

- **管理員白名單**：Google 驗證通過還要在 `ADMIN_EMAILS` / `ADMIN_EMAIL_DOMAINS` 內才放行，
  被擋下的嘗試會記進 `audit_log`。白名單在**每次驗證 session 時**重新檢查，
  把人從名單移除後即時生效，不用等 session 過期。
- **Session**：HMAC-SHA256 簽章的 httpOnly / SameSite=Lax cookie，8 小時到期，JavaScript 讀不到。
- **證書簽章**：伺服器用 `AUTH_SECRET` 對「UUID + 證號 + 姓名 + 活動 + 日期」算 HMAC。
  簽章只有伺服器算得出來，資料被改過驗證頁會直接顯示「簽章無法驗證」。
- **寄信端點**：舊版的 `/api/send-certificate` 是任何人都能呼叫、可指定任意收件人的開放端點，已移除；
  現在寄信只發生在伺服器端且需要管理員身分。
- **公開端點最小揭露**：驗證頁與公開 API 不回傳收件人 Email、寄送狀態、核發者。
- **路徑穿越防護**：證書圖片檔名只允許 `[A-Za-z0-9._-]`，實體路徑一律由 `UPLOAD_DIR` 組出來。

---

## 部署

見 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)。簡述：

```bash
npx zeabur@latest deploy \
  --project-id 6a7f18c22b4272705cd1df89 \
  --service-id 6a7f18d2a21454a2cf6a0100 --json
```
