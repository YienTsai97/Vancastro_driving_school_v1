const path = require("path");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    svgr: true,
  },
};

module.exports = nextConfig;
