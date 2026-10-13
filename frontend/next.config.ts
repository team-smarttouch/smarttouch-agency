import type { NextConfig } from "next";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`,
      },
      {
        source: "/:slug.html",
        destination: "/en/:slug.html",
      },
      {
        source: "/portfolio/:slug.html",
        destination: "/en/portfolio/:slug.html",
      },
      {
        source: "/blog/:slug.html",
        destination: "/en/blog/:slug.html",
      },
    ];
  },
};

export default nextConfig;
