// next.config.mjs
const repo = 'gdg_web';
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  basePath: 'gdg_web',   // ⭐ 子路徑只在 production
  images: { unoptimized: true },
  // 不要再設 assetPrefix，避免前綴被加兩次
//   env: {
//     NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : ''
//   }
};