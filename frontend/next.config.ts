import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Required to use "use cache"
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.igdb.com",
      }
    ]
  }
};

export default nextConfig;
