import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/dashboard", destination: "/", permanent: true },
      { source: "/orders", destination: "/shipments", permanent: true },
      { source: "/orders/:path*", destination: "/shipments/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
