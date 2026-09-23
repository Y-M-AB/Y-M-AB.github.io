/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ── 静态导出（给 GitHub Pages 用）────────────────────────
  // `next build` 会额外生成一个纯静态的 out/ 目录，
  // 里面是 HTML/CSS/JS，不需要 Node 服务器就能跑。
  output: "export",

  // 静态托管没有服务端做图片优化，必须关掉（本项目没用到 next/image，纯保险）
  images: { unoptimized: true },

  // 导出成 /xxx/index.html 形式，兼容 GitHub Pages 等静态托管
  trailingSlash: true,
};

export default nextConfig;
