import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // 處理 SVG → 作為 React Component
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // 處理圖片檔案
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      type: "asset/resource",
    });

    // 設定 @ alias
    config.resolve.alias["@"] = __dirname;

    return config;
  },
};

export default nextConfig;
