import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        // This single wildcard covers all your S3 and other patterns
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      }
    ],
  },
  compress: false,
  output: "standalone",
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "31mb",
    },
  },
  serverExternalPackages: ["sharp"],
};

export default nextConfig;