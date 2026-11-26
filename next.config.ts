import type { NextConfig } from "next";
import { siteConfig } from "./site.config";
import { buildCsp, origin } from "./lib/csp";
import { validIds } from "./lib/consent";
import { gallery, walkthroughs } from "./content/gallery";

// Only the third-party domains for features that are switched on (lib/csp.ts).
const csp = buildCsp({
  analytics: validIds(siteConfig.analytics),
  turnstile: Boolean(siteConfig.turnstileSiteKey),
  calendarOrigins: [origin(siteConfig.contact.calendarUrl), origin(siteConfig.contact.testBuildCalendarUrl)],
  chatOrigin: origin(siteConfig.chatWidgetSrc) || undefined,
  videos: gallery.length + walkthroughs.length > 0,
});

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
      // One canonical host: www goes to the bare domain. The home page needs its own
      // rule because the Cloudflare runtime leaves an empty ":path*" in the address.
      {
        source: "/",
        has: [{ type: "host", value: "www.techieficial.com" }],
        destination: "https://techieficial.com/",
        permanent: true,
      },
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
      { source: "/services/agents", destination: "/ai-team", statusCode: 301 },
      // v3: Offers replaces Pricing, and the AI Team page replaces the AI Agents service page.
      { source: "/pricing", destination: "/offers", statusCode: 301 },
      { source: "/services/ai-agents", destination: "/ai-team", statusCode: 301 },
      { source: "/book", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings locally (OpenNext adapter). Only in dev: under `next start`
// (e2e tests, Lighthouse) the emulated rate limiters would block the many test submissions from one address.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
if (process.env.NODE_ENV === "development") initOpenNextCloudflareForDev();
