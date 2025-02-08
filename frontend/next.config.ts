import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pwa: {
    disable: true,
    dest: "public",
  },
  images: {
    domains: ["coin-images.coingecko.com"],
  },
};

export default nextConfig;
