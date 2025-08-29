This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy to GitHub Pages（使用 GitHub Actions 自動部署）

如果你的專案可以被靜態匯出（沒有使用 getServerSideProps / API Routes / 需要 server 的功能），可以使用 GitHub Pages 搭配 Actions 自動部署。此專案已包含一個範例 workflow：`.github/workflows/deploy-gh-pages.yml`，當你 push 到 `main` 時會執行 build + `next export`，並把 `out/` 發佈到 `gh-pages` 分支。

步驟（本機測試）：

```bash
# 安裝套件
npm ci

# 建置並靜態匯出（會產生 out/）
npx next build
npx next export

# 簡單在本機預覽 out/ 內容（可選）
npx http-server ./out -p 3000
# 或
npx serve out -p 3000
```

在 GitHub 上啟用 Pages：

1. 到你的 repository 頁面，點 Settings → Pages。
2. 在 "Build and deployment"（或 "Source"）設定，選擇 Branch 為 `gh-pages`、Folder 選擇 `/ (root)`，然後儲存。
3. 等候幾分鐘，GitHub 會發佈你的靜態站點（頁面網址會顯示在同一頁面）。

注意事項與限制：
- `next export` 只能處理完全靜態的頁面。若你的專案使用 SSR、API routes、或其他需要 server 的功能，請改用 Vercel / Render / 或部署到有 Node.js 的伺服器。
- next/image 的最佳化在靜態匯出時可能失效，必要時請改用普通 `<img>` 或其他圖像處理策略。
- 若需要環境變數或私有套件，請在 workflow 或部署平台設定相對應的 Secrets。

若你要我幫你：
- 驗證一次 `npm ci && npx next build && npx next export` 是否在 CI 中成功運行，我可以在工作環境執行並回報錯誤。
- 或是幫你改成使用 Vercel（若需要 SSR / 更完整的 Next 支援）。
