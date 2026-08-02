import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // pdfkit reads AFM font metrics from disk; keep it external to the bundler.
  serverExternalPackages: ["pdfkit", "fontkit", "linebreak", "png-js"],
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
