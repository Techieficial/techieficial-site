import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import ogImages from "@/content/og-images.json";

/** Share image made by `npm run og`, or the default one for pages added since. */
function ogImage(path: string) {
  const key = path === "/" ? "home" : path.slice(1).replace(/\//g, "--");
  const file = (ogImages as string[]).includes(key) ? key : "default";
  return { url: `/og/${file}.jpg`, width: 1200, height: 630, type: "image/jpeg" };
}

type PageMeta = { title: string; description: string; path: string; type?: "website" | "article" };

/** Builds page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, type = "website" }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.name,
      title,
      description,
      locale: "en_US",
      images: [{ ...ogImage(path), alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage(path).url] },
  };
}

export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

/* ---------- JSON-LD ---------- */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.mission,
    areaServed: siteConfig.countries,
    ...(siteConfig.socials.length ? { sameAs: siteConfig.socials.map((s) => s.href) } : {}),
    ...(siteConfig.contact.email
      ? { contactPoint: { "@type": "ContactPoint", contactType: "sales", email: siteConfig.contact.email } }
      : {}),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceLd(s: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: absoluteUrl(s.url),
    serviceType: s.name,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: siteConfig.countries,
  };
}

export function articleLd(p: { title: string; description: string; url: string; date: string; updated?: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    url: absoluteUrl(p.url),
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    author: { "@type": "Organization", name: p.author },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: absoluteUrl(p.url),
  };
}
