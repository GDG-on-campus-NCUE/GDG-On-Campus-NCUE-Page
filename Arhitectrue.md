# GDG NCUE 網站設計規劃書 (V3 - 完整版)

這份文件將根據您提供的視覺規範與內容目錄，詳細拆解網站的每一個構成元素，並注入具體的內容文案與設計細節，提供一份最完整的開發規格。  

---

## 1. 全域設定 (Global Styles)

### 1.1 色彩規範 (Color Palette)

| 用途           | 顏色名稱              | HEX 色碼   |
|----------------|----------------------|------------|
| 主要背景       | White               | `#FFFFFF`  |
| 次要背景       | Light Gray          | `#F5F5F5`  |
| 次要背景(深)   | Light Gray 2        | `#D4D4D4`  |
| 邊框/分隔線    | Cancel Gray         | `#F0F0F0`  |
| 內文顏色       | Dark Gray           | `#888888`  |
| 標題/強調文字  | Almost Black        | `#161616`  |
| 主要品牌色     | Main Color Blue     | `#3053D9`  |
| 強調/點綴色    | Main Color Red      | `#D23C3C`  |
| 警告/特殊狀態  | Adorn Color Yellow  | `#F5D400`  |

### 1.2 字體系統 (Typography)

| 元素 | Class | 字體家族 | 粗細 | 字體大小 (PC) | 行高 | 字距 | 備註 |
|------|-------|----------|------|---------------|------|------|------|
| pc-h0 | Source Sans Pro | 600 Semibold | 96px | Auto | 0px | Hero 主標題 |
| pc-h1 | Source Sans Pro | 600 Semibold | 64px | Auto | 0px | 區塊大標題 |
| pc-h2 | Source Sans Pro | 600 Semibold | 36px | Auto | 0px | 次級標題/卡片標題 |
| pc-h3 | Source Sans Pro | 400 Regular | 24px | Auto | 0px | 小節標題 |
| pc-liner-bold | Source Sans Pro | 600 Semibold | 16px | Auto | 0px | 強調內文 |
| pc-liner | Source Sans Pro | 300 Light | 16px | Auto | 0px | 一般內文 |
| phone-h1 | Source Sans Pro | 700 Bold | 36px | Auto | 0px | 手機版 H1 |
| phone-h2 | Source Sans Pro | 600 Semibold | 20px | Auto | 0px | 手機版 H2 |
| phone-h3 | Source Sans Pro | 600 Semibold | 14px | Auto | 0px | 手機版 H3 |
| phone-liner-bold | Source Sans Pro | 600 Semibold | 14px | Auto | 0px | 手機版強調內文 |
| phone-liner | Source Sans Pro | 300 Light | 14px | Auto | 0px | 手機版一般內文 |

---

## 2. 組件細節規劃 (Component Breakdown)

### 2.1 導覽列 (Navbar)

- **PC**  
  - 高度 `80px`，左側為 Logo，右側導覽連結，`margin: 32px`，整體 `padding: 40px`
- **RWD**  
  - Logo 左置，右側漢堡選單，點擊後右側滑出 100% 高度選單
- **內容**  
  - Logo：Google Developer Groups 標誌 + `on Campus NCUE`  
  - 導覽連結：核心使命、過往活動、校園專案、加入我們（平滑滾動）
- **樣式**  
  - 背景 `#FFFFFF`，box-shadow `0 2px 4px rgba(0,0,0,0.05)`  
  - 字體 `pc-liner-bold`，顏色 `#161616`  
  - Hover：下方展開藍色底線 `#3053D9`
- **動畫**  
  - 滾動 100px 後透明 → 白色背景，Logo/字體顏色由白 → 黑，0.3s 漸變

---

### 2.2 Hero 區塊 (Banner)

- **佈局**  
  - 高度 `100vh`，背景影片 (15–30 秒，無聲自動播放，loop)，50% 黑色遮罩  
  - Flex 置中
- **內容**  
  - 主標題 (pc-h0)：`CODE THE FUTURE.`  
  - 副標題 (pc-h0)：`TOGETHER.`  
  - CTA 按鈕：「探索我們的旅程」+ 向下箭頭
- **樣式**  
  - 標題：白色  
  - 按鈕：藍底 `#3053D9` → Hover 紅底 `#D23C3C`，字體 `pc-liner-bold`
- **動畫**  
  - 背景影片載入時縮放 (scale 1.05 → 1)  
  - 主標題、副標題、按鈕依序 fade-in-up
- **RWD**  
  - 標題字體切換為 `phone-h1`  
  - 按鈕寬度 80%，max-width 300px

---

### 2.3 核心使命區塊 (Our Vision)

- **佈局**  
  - Padding 100px，上方標題與引言，下方三欄 Grid
- **內容**  
  - 標題 (pc-h1)：連結開發者，共創校園新未來  
  - 引言 (pc-h3)：我們是連結開發者、啟發創意、共創未來的技術社群...  
  - 三張卡片：  
    1. **校園技術賦能**：協助開發與維護校園系統，引入 AI  
    2. **技術社群驅動**：舉辦分享會/工作坊，營造學習氛圍  
    3. **資源整合平台**：串連 Google 與他校資源，提供合作機會
- **樣式**  
  - 卡片：白底、圓角 16px、padding 24px、box-shadow  
  - Hover：浮起 5px、陰影加深、頂部邊框變藍
- **RWD**  
  - 卡片由橫向改直向堆疊，間距 24px

---

### 2.4 過往活動亮點 (Previous Events)

- **佈局**  
  - 左右圖文交錯，圖片 50%，文字 50% (padding 32px)
- **內容**  
  - 輪播照片 (3–5 張 Build with AI #2)  
  - 小標題：回顧我們的「Build with AI 2025」  
  - 主標題：不只是一場活動，而是一場技術革命的開端  
  - 亮點列表：  
    - ✨ 無程式碼實作：n8n 工作坊  
    - 💬 社群深度交流：跨領域連結  
    - 💻 從零到一實戰：打造 Line Bot
- **RWD**  
  - 上圖下文，padding 20px

---

### 2.5 校園專案 (Scholarship Platform)

- **佈局**  
  - 背景 `#F5F5F5`，padding 100px  
  - 中心大卡片 (max-width 1200px)，左右分欄
- **內容**  
  - 左側：  
    - 主標題：你的 Code，運行在校園日常  
    - 專案名稱：彰師大獎學金資訊平台  
    - 專案簡介：整合繁雜資訊，優化申請流程  
    - 技術棧：Next.js, TypeScript, Tailwind CSS, Firebase, Vercel  
    - 狀態列表：  
      - ✅ 已上線：[scholarship.ncuesa.org.tw](https://scholarship.ncuesa.org.tw)  
      - 💡 規劃中：宿舍退宿、餐券、投票系統  
    - 按鈕：查看 GitHub 原始碼
  - 右側：平台 Mockup 圖
- **RWD**  
  - 改為上下堆疊

---

### 2.6 加入我們 (Join Us / Footer)

- **上部 CTA 區**  
  - 背景藍 `#3053D9`，padding 80px  
  - 標題：準備好成為下一個改變者了嗎？  
  - 副標題：無論新手或老手，只要對技術有熱情  
  - 按鈕：立即加入 Line 社群（紅底 → Hover 白底紅字）
- **下部 Footer 區**  
  - 背景黑 `#161616`，padding 40px  
  - 社群圖示：Line, IG, GDG，白色 → Hover 紅色  
  - 版權資訊：© 2025 GDG on Campus NCUE. All Rights Reserved.
- **RWD**  
  - CTA 標題切換為 `phone-h1`，副標題為 `phone-liner`

---

## 文件結構總覽
- 1. 全域設定 (Global Styles)  
  - 1.1 色彩規範  
  - 1.2 字體系統  
- 2. 組件細節規劃 (Component Breakdown)  
  - 2.1 導覽列 (Navbar)  
  - 2.2 Hero 區塊 (Banner)  
  - 2.3 核心使命區塊 (Our Vision)  
  - 2.4 過往活動亮點 (Previous Events)  
  - 2.5 校園專案 (Scholarship Platform)  
  - 2.6 加入我們 (Join Us / Footer)  
