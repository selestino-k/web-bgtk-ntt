import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com",
        pathname: "/thumbnails/**",
      },
      {
        protocol : "https",
        hostname : "web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com",
        pathname : "/carousel/**",
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
        pathname: "/**",
        port : "",
      },
    ],
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["@radix-ui/react-*"],
    serverActions: {
      bodySizeLimit: "51mb",
    },
  },
};

export default nextConfig;
