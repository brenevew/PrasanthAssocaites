import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Source photos are already WebP at display resolution. Serving WebP only
    // (no AVIF) keeps first-request encoding cheap, which matters because a
    // fresh container starts with an empty optimizer cache.
    formats: ["image/webp"],
    // Optimized variants are addressed by file name, and file names change when
    // a photo changes — so they can be cached for a long time instead of being
    // re-encoded every hour.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        // Photos and other static media: cache hard on repeat visits. Not
        // `immutable`, so replacing a file under the same name still rolls out.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
