import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Next.js inlines NEXT_PUBLIC_* values into browser code only when written as process.env.NEXT_PUBLIC_X.
 * A dynamic lookup leaves them empty in client components (analytics, Turnstile, demo phone), so forbid it.
 */
describe("public env vars", () => {
  const src = readFileSync(new URL("../../site.config.ts", import.meta.url), "utf8");
  it("site.config.ts never reads process.env dynamically", () => {
    expect(src).not.toMatch(/process\.env\[/);
  });
  it("every NEXT_PUBLIC_ variable in .env.example is read literally in site.config.ts", () => {
    const example = readFileSync(new URL("../../.env.example", import.meta.url), "utf8");
    const names = [...example.matchAll(/^(NEXT_PUBLIC_[A-Z_]+)=/gm)].map((m) => m[1]);
    expect(names.length).toBeGreaterThan(5);
    for (const n of names) expect(src, n).toContain(`process.env.${n}`);
  });
});
