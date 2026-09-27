import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 生产环境优化
  reactStrictMode: true,
  compress: true,

  // 图片优化配置（后续接入真实图片时使用）
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // 实验性优化
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;