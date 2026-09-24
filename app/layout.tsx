import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/site.config";
import { nav } from "@/content/pages";
import { home } from "@/content/home";
import { getIndustries, getServices, hasWork } from "@/lib/content";
import { organizationLd, websiteLd } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/Bars";
import { ConsentManager, UtmCapture } from "@/components/consent/Consent";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

// "optional" keeps the first paint as the final paint on slow connections (better LCP); the fonts are preloaded,
// so on normal connections they are used straight away and from cache on every later page.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600"], display: "optional" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["600", "700"], display: "optional" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: home.seo.title, template: `%s | ${siteConfig.name}` },
  description: home.seo.description,
  applicationName: siteConfig.name,
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0A0B14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const services = getServices().map((s) => ({
    slug: s.slug,
    name: s.name,
    url: s.url,
    outcome: s.outcome,
    icon: s.icon,
    color: siteConfig.serviceColors[s.slug],
  }));
  const industries = getIndustries().map((i) => ({ name: i.navName, url: i.url }));

  return (
    <html lang={siteConfig.locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-full bg-ink px-4 py-2 font-medium text-bg">
          {nav.skipLink}
        </a>
        <div id="scroll-sentinel" aria-hidden className="pointer-events-none absolute left-0 top-0 h-20 w-px" />
        <Navbar services={services} industries={industries} showWork={hasWork()} />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <ConsentManager />
        <UtmCapture />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
