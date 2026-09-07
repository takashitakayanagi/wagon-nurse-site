/** @type {import('next').NextConfig} */

/**
 * wagon-nurse.com/lp/manga/ のようにサブディレクトリで配信するための設定です。
 * NEXT_PUBLIC_BASE_PATH を渡さないローカル開発では basePath なし（http://localhost:3000/）
 * で従来どおり動きます。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages は静的ファイルしか配信できないため、HTMLに書き出します。
  output: "export",
  basePath,
  // 末尾スラッシュ付きのディレクトリ形式にする（/lp/manga/privacy/index.html）。
  // これがないとサブページが 404 になります。
  trailingSlash: true,
  images: {
    // 画像最適化サーバーが無いため、そのまま配信します。
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
    ],
  },
};

export default nextConfig;
