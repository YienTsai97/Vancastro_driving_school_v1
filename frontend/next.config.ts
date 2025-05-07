import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // SVG → React Component
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // other image formats
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      type: "asset/resource",
    });

    // set @ alias (public/assets unavailable for webpack)
    config.resolve.alias["@/public/assets"] = path.resolve(__dirname, "src/assets");
    return config;
  },
};

export default nextConfig;
