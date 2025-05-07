const path = require("path");

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      type: "asset/resource",
    });

    config.resolve.alias["@assets"] = path.resolve(__dirname, "src/assets");

    return config;
  },
};

module.exports = nextConfig;
