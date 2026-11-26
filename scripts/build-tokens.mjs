#!/usr/bin/env node
/**
 * Writes app/tokens.css from design/tokens.json (the single source of truth for theme colours).
 * `node scripts/build-tokens.mjs --check` exits 1 if app/tokens.css is out of date (used by npm run check).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const tokens = JSON.parse(readFileSync(`${root}design/tokens.json`, "utf8"));
const out = `${root}app/tokens.css`;

const vars = (obj, indent, skip = []) =>
  Object.entries(obj)
    .filter(([k]) => !k.startsWith("$") && !skip.includes(k))
    .map(([k, v]) => `${indent}--${k}: ${v};`)
    .join("\n");

const { light, dark } = tokens.color;
// Accent and on-accent are the same in both themes, so the no-JS dark fallback only sets what differs.
const darkDiff = Object.fromEntries(Object.entries(dark).filter(([k, v]) => light[k] !== v));

const css = `/* Generated from design/tokens.json by scripts/build-tokens.mjs. Do not edit by hand: run \`npm run tokens\`. */

/*
 * Colour system: neutrals plus ONE accent (violet). Light and dark themes.
 * The theme follows the visitor's device until they use the switch in the nav,
 * which sets data-theme on <html> (see app/layout.tsx).
 */
:root {
${vars(light, "  ")}
  color-scheme: light;
}

:root[data-theme="dark"] {
${vars(dark, "  ")}
  color-scheme: dark;
}

/* Without JavaScript, follow the device setting. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
${vars(darkDiff, "    ")}
    color-scheme: dark;
  }
}
`;

if (process.argv.includes("--check")) {
  let current = "";
  try {
    current = readFileSync(out, "utf8");
  } catch {}
  if (current !== css) {
    console.error("app/tokens.css is out of date with design/tokens.json. Run: npm run tokens");
    process.exit(1);
  }
  console.log("Design tokens in sync.");
} else {
  writeFileSync(out, css);
  console.log("Wrote app/tokens.css");
}
