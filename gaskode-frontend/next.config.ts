import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8006" },
      { protocol: "https", hostname: "gaskodeaja.com" },
      { protocol: "https", hostname: "www.gaskodeaja.com" },
    ],
  },
};

export default nextConfig;
