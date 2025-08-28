# GDG NCUE 網站組件總結

本專案已根據 Architecture.md 規劃完成一頁式宣傳網頁的組件建立，包含以下功能：

## 📁 組件結構

### 1. **Navbar** (`/src/components/Navbar.jsx`)
- **功能**: 頂部導覽列，支援滾動透明度變化
- **特色**: 
  - PC 版：水平導覽選單，hover 底線效果
  - 手機版：漢堡選單，右側滑出式選單
  - 滾動 100px 後背景色變化動畫
  - 平滑滾動至各區塊

### 2. **Hero** (`/src/components/Hero.jsx`)
- **功能**: 首屏 Hero 區塊
- **特色**:
  - 全螢幕高度 (100vh)
  - 背景影片播放（帶 fallback 漸層背景）
  - 50% 黑色遮罩
  - 動態載入動畫 (fade-in-up)
  - CTA 按鈕，點擊滾動到下個區塊
  - 響應式字體切換

### 3. **Vision** (`/src/components/Vision.jsx`)
- **功能**: 核心使命區塊
- **特色**:
  - 三欄卡片設計（校園技術賦能、技術社群驅動、資源整合平台）
  - Intersection Observer 觸發動畫
  - 卡片 hover 效果（浮起 + 邊框變色）
  - 響應式佈局（PC 橫向，手機直向堆疊）

### 4. **Events** (`/src/components/Events.jsx`)
- **功能**: 過往活動亮點
- **特色**:
  - 左右圖文交錯佈局
  - 自動輪播圖片展示
  - Build with AI 活動亮點列表
  - 交互式圖片指示器
  - 響應式：手機版改為上圖下文

### 5. **Projects** (`/src/components/Projects.jsx`)
- **功能**: 校園專案展示
- **特色**:
  - 大卡片設計，左文右圖
  - 獎學金平台項目介紹
  - 技術棧標籤展示
  - 項目狀態列表（已上線/規劃中）
  - Mockup 設計預覽

### 6. **JoinUs** (`/src/components/JoinUs.jsx`)
- **功能**: 加入我們 + Footer
- **特色**:
  - 雙區段設計（藍色 CTA + 黑色 Footer）
  - 社群連結圖示（Line, IG, GDG）
  - 聯絡資訊與版權聲明
  - hover 效果與動畫

## 🎨 設計系統

### 色彩規範
- 主要背景: `#FFFFFF` (White)
- 次要背景: `#F5F5F5` (Light Gray)
- 邊框色: `#F0F0F0` (Cancel Gray) 
- 內文色: `#888888` (Dark Gray)
- 標題色: `#161616` (Almost Black)
- 品牌藍: `#3053D9` (Main Blue)
- 強調紅: `#D23C3C` (Main Red)
- 警告黃: `#F5D400` (Adorn Yellow)

### 字體系統
- **字體**: Source Sans 3 (Google Fonts)
- **PC 版本**: h0(96px), h1(64px), h2(36px), h3(24px), liner(16px)
- **手機版本**: h1(36px), h2(20px), h3(14px), liner(14px)
- **粗細**: Light(300), Regular(400), Semibold(600), Bold(700)

## ⚡ 互動功能

### 動畫效果
- **載入動畫**: fade-in-up, scale-in
- **滾動觸發**: Intersection Observer API
- **Hover 效果**: 按鈕顏色變化、卡片浮起、圖示縮放
- **過場效果**: 0.3s 平滑過渡

### 響應式設計
- **斷點**: `md:` (768px 以上)
- **佈局**: Grid/Flexbox 響應式切換
- **字體**: PC/手機版本自動切換
- **導覽**: PC 水平選單 ↔ 手機漢堡選單

## 🚀 技術棧

- **框架**: Next.js 15.5.2
- **樣式**: Tailwind CSS v4 + PostCSS
- **字體**: Google Fonts (Source Sans 3)
- **互動**: React Hooks (useState, useEffect, useRef)
- **動畫**: CSS Transitions + Custom Keyframes

## 📱 功能特色

1. **平滑滾動導覽**: 點擊選單自動滾動到對應區塊
2. **視覺回饋**: 豐富的 hover 和 focus 狀態
3. **載入優化**: 字體預載，圖片懶載入
4. **無障礙友善**: 語義化 HTML，鍵盤導覽支援
5. **性能優化**: Component 分割，按需載入

## 🎯 部署準備

網站已準備好部署到 Vercel 或其他靜態主機平台。唯一需要補充的是：

1. **背景影片**: 替換 `/public/hero-video.mp4`
2. **實際圖片**: 替換 Events 和 Projects 區塊的佔位符圖片
3. **連結更新**: 更新社群連結和 GitHub 連結
4. **SEO 優化**: 更新 meta 標籤和結構化資料

---

**專案狀態**: ✅ 組件建立完成，可正常運行在 `http://localhost:3001`
