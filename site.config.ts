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

/**
 * Public build variables must be read as literal `process.env.NEXT_PUBLIC_*` expressions:
 * Next.js only inlines those into browser code. A lookup like process.env[name] stays
 * undefined in the browser, so client components (forms, cookie banner) would never see the value.
 */
const clean = (value: string | undefined) => (value && value.trim() ? value.trim() : undefined);

/** Accepts an ID only if it matches the expected format, so a typo cannot inject script. */
const id = (value: string | undefined, format: RegExp) => {
  const v = clean(value);
  return v && format.test(v) ? v : undefined;
};

export const siteConfig = {
  name: "Techieficial",
  url: "https://techieficial.com",
  tagline: "AI teams for service businesses",
  mission: "AI teams for service businesses.",
  locale: "en",

  /** Primary and secondary calls to action, used everywhere on the site. */
  cta: {
    primary: { label: "Book a strategy call", href: "/contact" },
    primaryShort: { label: "Book a call", href: "/contact" },
    demo: { label: "Interview the AI team", href: "/demo" },
    callAi: { label: "Call the AI" },
    partner: { label: "Book a partner call", href: "/agencies#partner" },
    waitlist: { label: "Join the waitlist", href: "/academy#waitlist" },
  },

  contact: {
    /** General business email (footer, contact page, Organization schema). */
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "hello@techieficial.com",
    /** Existing-client support email. */
    supportEmail: "support@techieficial.com",
    /** Phone number of the live AI receptionist demo, in international format, e.g. +14155550100. */
    demoPhone: clean(process.env.NEXT_PUBLIC_DEMO_PHONE) as string | undefined,
    /** CRM booking calendars (public widget links, docs/CRM_SETUP.md). An env var overrides each. */
    calendarUrl: clean(process.env.NEXT_PUBLIC_CALENDAR_URL) ?? "https://api.leadconnectorhq.com/widget/booking/vanlKYhT08mnXvYIySry",
    testBuildCalendarUrl: clean(process.env.NEXT_PUBLIC_TESTBUILD_CALENDAR_URL) ?? "https://api.leadconnectorhq.com/widget/booking/lLQv2kiaIh5gGxwypAky",
  },

  /** Only accounts that exist. Leave out anything that does not. */
  socials: [
    { label: "YouTube", href: "https://www.youtube.com/@techieficial" },
    { label: "Facebook", href: "https://www.facebook.com/techieficial/" },
    { label: "TikTok", href: "https://www.tiktok.com/@techieficial" },
    { label: "Instagram", href: "https://www.instagram.com/techieficial" },
    // LinkedIn and X: add here once the accounts' final URLs exist.
  ] as { label: string; href: string }[],

  /**
   * Direct checkout through CRM payment links (products under $3,000). Stays false until the
   * owner connects the payment provider and confirms a test payment; buttons show "Checkout opens soon".
   */
  checkoutLive: false,

  /** Branch Cloudflare deploys to techieficial.com. Every other branch build is a preview. */
  productionBranch: "claude/techieficial-marketing-site-exbrsa",

  /** Countries served, from real delivery history. */
  countries: ["United States", "United Kingdom", "Canada", "Australia", "New Zealand"],

  announcement: {
    /** Shown only when a demo phone number exists. */
    enabled: true,
    text: "New: call our AI receptionist live, no signup.",
  },

  /**
   * Shades of the single brand accent (violet), one per service. Used for the wheel
   * slices and chips. Light and dark shades alternate so neighbouring slices stand apart.
   */
  serviceColors: {
    "marketing-automation": "#6D4AFF",
    "paid-ads": "#B9A9FF",
    "ai-video": "#3A20B0",
    "ai-agents": "#9C86FF",
    training: "#4A2BD6",
  } satisfies Record<ServiceSlug, string>,

  analytics: {
    // Every tag stays switched off until its ID is set in Cloudflare build variables.
    gtm: id(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]{4,12}$/),
    ga4: id(process.env.NEXT_PUBLIC_GA_ID, /^G-[A-Z0-9]{4,15}$/),
    metaPixel: id(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d{6,20}$/),
    clarity: id(process.env.NEXT_PUBLIC_CLARITY_ID, /^[a-z0-9]{6,20}$/),
  },

  turnstileSiteKey: clean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  chatWidgetSrc: clean(process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC),
} as const;

/**
 * True on preview builds (Cloudflare branch builds other than production) and in local development.
 * Used for preview-only notes such as "Draft pricing". Cloudflare sets WORKERS_CI_BRANCH during builds.
 */
export const isPreviewBuild =
  process.env.NODE_ENV === "development" ||
  Boolean(process.env.WORKERS_CI_BRANCH && process.env.WORKERS_CI_BRANCH !== siteConfig.productionBranch);

export const hasAnalytics = Boolean(
  siteConfig.analytics.gtm || siteConfig.analytics.ga4 || siteConfig.analytics.metaPixel || siteConfig.analytics.clarity,
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

/** Accent text colour that stays readable in both light and dark themes. */
export const accentText = "var(--accent-text)";

/** Label colour on top of a service shade: dark on light shades, white on dark ones (all 5:1 or better). */
export function onServiceColor(color: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.2 ? "#0A0B14" : "#FFFFFF";
}
