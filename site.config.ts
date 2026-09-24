/**
 * Site-wide settings. Every phone number, link, label and brand color lives here.
 * Leave a value as `undefined` when it is not known yet: anything that depends on it
 * is hidden automatically, so the site never shows a placeholder.
 */

export type ServiceSlug =
  | "marketing-automation"
  | "paid-ads"
  | "ai-video"
  | "ai-agents"
  | "training";

const env = (name: string) => {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
};

export const siteConfig = {
  name: "Techieficial",
  url: "https://techieficial.com",
  tagline: "AI growth agency",
  mission: "AI video, paid ads, CRM automation and AI agents, planned and run as one system.",
  locale: "en",

  /** Primary and secondary calls to action, used everywhere on the site. */
  cta: {
    primary: { label: "Book a demo", href: "/contact" },
    primaryShort: { label: "Book a demo", href: "/contact" },
    demo: { label: "Test the AI live", href: "/demo" },
    callAi: { label: "Call the AI" },
    partner: { label: "Book a partner call", href: "/agencies#partner" },
    waitlist: { label: "Join the waitlist", href: "/academy#waitlist" },
  },

  contact: {
    /** Business email shown in the footer and contact page. */
    email: env("NEXT_PUBLIC_CONTACT_EMAIL") as string | undefined,
    /** Phone number of the live AI receptionist demo, in international format, e.g. +14155550100. */
    demoPhone: env("NEXT_PUBLIC_DEMO_PHONE") as string | undefined,
    /** CRM calendar embed URL for booking demos. */
    calendarUrl: env("NEXT_PUBLIC_CALENDAR_URL") as string | undefined,
  },

  /** Only accounts that exist. Leave out anything that does not. */
  socials: [] as { label: string; href: string }[],

  /** Countries served, from real delivery history. */
  countries: ["United States", "United Kingdom", "Canada", "Australia", "New Zealand"],

  announcement: {
    /** Shown only when a demo phone number exists. */
    enabled: true,
    text: "New: call our AI receptionist live, no signup.",
  },

  /** Service colors used on cards, menus, page glows and the wheel. */
  serviceColors: {
    "marketing-automation": "#22D3EE",
    "paid-ads": "#F472B6",
    "ai-video": "#7C5CFF",
    "ai-agents": "#FB923C",
    training: "#A3E635",
  } satisfies Record<ServiceSlug, string>,

  analytics: {
    ga4: env("NEXT_PUBLIC_GA_ID"),
    metaPixel: env("NEXT_PUBLIC_META_PIXEL_ID"),
    clarity: env("NEXT_PUBLIC_CLARITY_ID"),
  },

  turnstileSiteKey: env("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
  chatWidgetSrc: env("NEXT_PUBLIC_CHAT_WIDGET_SRC"),
} as const;

export const hasAnalytics = Boolean(
  siteConfig.analytics.ga4 || siteConfig.analytics.metaPixel || siteConfig.analytics.clarity,
);

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Formats +14155550100 as +1 415 555 0100 for display. Other formats are shown as given. */
export function formatPhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  const us = digits.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  return us ? `+1 ${us[1]} ${us[2]} ${us[3]}` : phone;
}

/** Readable text version of a service color on dark backgrounds (violet is too dark for small text). */
export function readableOnDark(color: string) {
  return color.toUpperCase() === "#7C5CFF" ? "#A99BFF" : color;
}
