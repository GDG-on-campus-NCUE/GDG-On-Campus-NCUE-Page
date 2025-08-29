/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	basePath: '/gdg_web',        // ⭐ 子路徑（一定要）
  	assetPrefix: '/gdg_web/',    // ⭐ 靜態資源前綴（一定要）
  	images: { unoptimized: true } // export 模式需要
};

export default nextConfig;
