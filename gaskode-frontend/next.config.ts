import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8006" },
      { protocol: "https", hostname: "gaskodeaja.com" },
      { protocol: "https", hostname: "www.gaskodeaja.com" },
    ],
  },
};

export default nextConfig;
