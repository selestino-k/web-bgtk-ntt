import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  images: {
    formats: ['image/webp'],
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["@radix-ui/react-*"],
  },
};


export default nextConfig;
