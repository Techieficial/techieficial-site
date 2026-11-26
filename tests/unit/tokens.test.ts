import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { colorTokens, contrastPairs, contrastRatio } from "@/lib/tokens";

const css = readFileSync("app/globals.css", "utf8");
const block = (selector: string) => {
  const start = css.indexOf(`${selector} {`);
  return css.slice(start, css.indexOf("}", start));
};
const varValue = (body: string, name: string) => body.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1]?.toLowerCase();

describe("design tokens", () => {
  const light = block(":root");
  const dark = block(':root[data-theme="dark"]');
  for (const [name, t] of Object.entries(colorTokens)) {
    it(`${name} matches globals.css in light and dark`, () => {
      expect(varValue(light, name)).toBe(t.light);
      expect(varValue(dark, name)).toBe(t.dark);
    });
  }

  for (const theme of ["light", "dark"] as const) {
    for (const p of contrastPairs) {
      it(`${p.fg} on ${p.bg} passes ${p.min}:1 (${theme})`, () => {
        expect(contrastRatio(colorTokens[p.fg][theme], colorTokens[p.bg][theme])).toBeGreaterThanOrEqual(p.min);
      });
    }
  }

  it("computes known ratios", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
  });
});
