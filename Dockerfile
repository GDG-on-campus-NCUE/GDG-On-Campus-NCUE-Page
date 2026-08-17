# syntax=docker/dockerfile:1

# Node 22.13+ 才有免旗標的內建 node:sqlite 模組；這裡固定 24 LTS。
ARG NODE_IMAGE=node:24-bookworm-slim

# ---------------------------------------------------------------------------
# 1. 安裝相依套件
# ---------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# --include=dev 不可省略：Zeabur 會把服務的環境變數注入建置階段，
# 一旦 NODE_ENV=production 被帶進來，npm ci 就會跳過 devDependencies，
# 而 tailwindcss / @tailwindcss/postcss 正是建置時必要的 devDependencies。
RUN npm ci --include=dev

# ---------------------------------------------------------------------------
# 2. 建置（產生 .next/standalone）
# ---------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# 3. 執行
# ---------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0 \
    DATA_DIR=/app/data

# standalone 輸出已內含 server.js 與必要的 node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Zeabur Volume 掛載點：SQLite 資料庫與證書圖片都寫在這裡。
# 這裡刻意不切換成非 root 使用者——Zeabur（Kubernetes）掛進來的 Volume 預設屬於
# root，容器若以 node 身分執行會因為沒有寫入權限而開不了資料庫。
RUN mkdir -p /app/data/certificates
VOLUME ["/app/data"]

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8080)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
