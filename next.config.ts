import type { NextConfig } from "next";

const nextConfig: NextConfig = {
/*config options here*/
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com",
        pathname: "/thumbnails/**",
      },
      {
        protocol: "https",
        hostname: "web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com",
        pathname: "/carousel/**",
      },
      {
        protocol: "https",
        hostname: "web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.ap-southeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bgtkntt.kemendikdasmen.go.id",
        pathname: "/**",
      },
      {
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
  compress:false,
  productionBrowserSourceMaps: false,
  output: "standalone",
  experimental: {
    optimizePackageImports: ["@radix-ui/react-*"],
    serverActions: {
      bodySizeLimit: "31mb",
    },
  },
  serverExternalPackages: ["sharp"],
};

export default nextConfig;
