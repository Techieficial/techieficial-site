import type { NextConfig } from "next";

/** Origin of an optional URL env var, so the CSP only allows what is configured. */
const origin = (url?: string) => {
  try {
    return url ? new URL(url).origin : "";
  } catch {
    return "";
  }
};

const calendar = origin(process.env.NEXT_PUBLIC_CALENDAR_URL);
const chat = origin(process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC);

const csp = [
  "default-src 'self'",
  // Next.js inlines small bootstrap and JSON-LD scripts, so 'unsafe-inline' is needed on a static site.
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://connect.facebook.net ${chat}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com https://www.facebook.com https://i.ytimg.com https://i.vimeocdn.com",
  "font-src 'self' data:",
  `connect-src 'self' https://challenges.cloudflare.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com https://www.facebook.com ${chat}`,
  `frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com https://player.vimeo.com ${calendar} ${chat}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
]
  .map((d) => d.replace(/\s+/g, " ").trim())
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // One canonical host: www goes to the bare domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.techieficial.com" }],
        destination: "https://techieficial.com/:path*",
        permanent: true,
      },
      { source: "/home", destination: "/", permanent: true },
      { source: "/services/automation", destination: "/services/marketing-automation", permanent: true },
      { source: "/services/ads", destination: "/services/paid-ads", permanent: true },
      { source: "/services/video", destination: "/services/ai-video", permanent: true },
      { source: "/services/agents", destination: "/services/ai-agents", permanent: true },
      { source: "/book", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings locally (OpenNext adapter).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
