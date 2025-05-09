import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // This will skip ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // This will skip TypeScript errors during builds
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://oigatech-api.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
