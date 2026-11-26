/**
 * Design tokens as data. The live values are the CSS variables in app/globals.css;
 * this file mirrors them so Storybook, docs and tests can read them.
 * A unit test (tests/unit/tokens.test.ts) fails if the two drift apart.
 */
export const colorTokens = {
  bg: { light: "#ffffff", dark: "#0a0b14", use: "Page background" },
  surface: { light: "#f6f7fa", dark: "#12131f", use: "Cards" },
  "surface-2": { light: "#eef0f5", dark: "#191b2b", use: "Raised cards, menus" },
  rule: { light: "#e2e5ec", dark: "#24263a", use: "Borders" },
  ink: { light: "#0b0c14", dark: "#f4f5fa", use: "Headings and body" },
  muted: { light: "#596074", dark: "#9ca3b8", use: "Secondary text" },
  prose: { light: "#2b3040", dark: "#d5d9e5", use: "Long-form body text" },
  accent: { light: "#6d4aff", dark: "#6d4aff", use: "Primary buttons" },
  "accent-hover": { light: "#5b3be8", dark: "#5b3be8", use: "Primary hover, focus ring" },
  "accent-text": { light: "#5636e0", dark: "#a99bff", use: "Violet text and links" },
  "headline-from": { light: "#5636e0", dark: "#b3a4ff", use: "Headline blend start" },
  "headline-to": { light: "#8b6bff", dark: "#e4deff", use: "Headline blend end" },
  "on-accent": { light: "#ffffff", dark: "#ffffff", use: "Text on the accent" },
} as const;

export type ColorToken = keyof typeof colorTokens;

/** Fluid type scale (CSS clamp), defined in the @theme block of app/globals.css. */
export const typeScale = {
  display: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)",
  h1: "clamp(2.25rem, 1.6rem + 2.6vw, 3.75rem)",
  h2: "clamp(1.9rem, 1.4rem + 2vw, 3rem)",
  h3: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)",
  lead: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)",
} as const;

export const fonts = {
  display: "Space Grotesk 600/700 (headings)",
  body: "Inter 400/500 (body)",
} as const;

/** Text/background pairs that must pass WCAG AA (4.5:1, or 3:1 for large text). */
export const contrastPairs: { fg: ColorToken; bg: ColorToken; min: number }[] = [
  { fg: "ink", bg: "bg", min: 4.5 },
  { fg: "ink", bg: "surface", min: 4.5 },
  { fg: "ink", bg: "surface-2", min: 4.5 },
  { fg: "muted", bg: "bg", min: 4.5 },
  { fg: "muted", bg: "surface", min: 4.5 },
  { fg: "muted", bg: "surface-2", min: 4.5 },
  { fg: "accent-text", bg: "bg", min: 4.5 },
  { fg: "accent-text", bg: "surface", min: 4.5 },
  { fg: "on-accent", bg: "accent", min: 4.5 },
  { fg: "on-accent", bg: "accent-hover", min: 4.5 },
  { fg: "prose", bg: "bg", min: 4.5 },
];

/** WCAG relative-luminance contrast ratio of two #rrggbb colours. */
export function contrastRatio(a: string, b: string) {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
