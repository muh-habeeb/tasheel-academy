import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Compression ─────────────────────────────────────────────────────
  compress: true,

  // ── Image optimisation ───────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ── HTTP caching headers ─────────────────────────────────────────────
  // Static assets (JS/CSS chunks, images, fonts) get long-lived cache.
  // HTML pages are revalidated every request (good for SEO freshness).
  async headers() {
    return [
      // Note: /_next/static cache headers are handled automatically by Next.js in production.
      {
        // Public folder assets — root level
        source: "/:file(.*\\.(?:webp|png|jpg|jpeg|svg|ico|woff2|woff|ttf|otf|gif))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // HTML pages — always revalidate for crawlers and fresh content
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
          },
          // Tell crawlers this is a real server-rendered page
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },

  // ── PoweredByHeader off (minor security/perf) ────────────────────────
  poweredByHeader: false,
};

export default nextConfig;
