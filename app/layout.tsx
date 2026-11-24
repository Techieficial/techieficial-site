import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/site.config";
import { nav } from "@/content/pages";
import { home } from "@/content/home";
import { organizationLd, websiteLd } from "@/lib/seo";
import { Navbar, type NavMenu } from "@/components/layout/Navbar";
import { liveHref, liveLinks } from "@/lib/nav";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/Bars";
import { ConsentManager, UtmCapture } from "@/components/consent/Consent";
import { JsonLd } from "@/components/JsonLd";
import { themeInitScript } from "@/lib/theme";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B14" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const menu: NavMenu = {
    teamHref: liveHref(nav.team) ?? "/services",
    cards: nav.team.cards.flatMap((c) => {
      const href = liveHref(c);
      return href ? [{ name: c.name, line: c.line, icon: c.icon, href }] : [];
    }),
    wholeTeam: (() => {
      const href = liveHref(nav.team.wholeTeam);
      return href ? { title: nav.team.wholeTeam.title, body: nav.team.wholeTeam.body, href } : null;
    })(),
    industries: liveLinks(nav.industries),
    services: liveLinks(nav.services),
    links: liveLinks(nav.links),
  };

  return (
    // data-theme is set by the head script before React loads, so the attribute differs from the server markup on purpose.
    <html lang={siteConfig.locale} className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-full bg-ink px-4 py-2 font-medium text-bg">
          {nav.skipLink}
        </a>
        <div id="scroll-sentinel" aria-hidden className="pointer-events-none absolute left-0 top-0 h-20 w-px" />
        <Navbar menu={menu} />
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
