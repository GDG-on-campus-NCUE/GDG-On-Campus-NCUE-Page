# GDG On Campus NCUE Page

Next.js 15 App Router 專案，含數位證書核發／驗證系統。

## 架構重點

- 資料庫是 **SQLite**，用 Node.js 內建的 `node:sqlite`（不是 better-sqlite3，沒有原生模組要編譯）。
  連線在 `src/lib/db.js`，掛在 `globalThis` 上避免開發模式重複開檔。
- 所有狀態（`gdg.db` + 證書 PNG）都在 `DATA_DIR` 底下，正式站是 Zeabur Volume `/app/data`。
- 身分驗證是**自己寫的** Google OAuth（`src/lib/auth.js`），不是 next-auth；
  session 是 HMAC 簽章的 httpOnly cookie，`AUTH_SECRET` 同時用來簽證書的防竄改簽章。
- **不要加回 `export const runtime = 'edge'`**。全站需要 Node runtime（`node:sqlite`、`node:crypto`、fs）。
- 後台 UI 元件在 `src/app/admin/_components/`（共用）與 `src/app/admin/dashboard/_components/`（頁面）。

## Zeabur 部署

- Project ID: `6a7f18c22b4272705cd1df89`
- Service ID: `6a7f18d2a21454a2cf6a0100`
- Environment ID: `6a7f18c2f8fa433a2b5dfc52`
- Server: `io-software-server-1`（`43.128.148.239`）

重新部署（**一定要帶 `--service-id`**，否則會多開服務）：

```bash
npx zeabur@latest deploy --project-id 6a7f18c22b4272705cd1df89 --service-id 6a7f18d2a21454a2cf6a0100 --json
```

細節見 `docs/DEPLOYMENT.md` 與 `docs/GOOGLE-OAUTH.md`。
