import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

type Entry = { id: string; type: "story" | "docs"; title: string; name: string };

/** Same bar as the site (tests/routes.spec.ts): zero serious or critical WCAG 2.2 AA issues, in both themes. */
test("every story passes axe in light and dark", async ({ page, request }) => {
  const index = (await (await request.get("/index.json")).json()) as { entries: Record<string, Entry> };
  const stories = Object.values(index.entries).filter((e) => e.type === "story");
  expect(stories.length).toBeGreaterThan(10);
  const failures: string[] = [];
  for (const theme of ["light", "dark"]) {
    for (const s of stories) {
      await page.goto(`/iframe.html?id=${s.id}&viewMode=story&globals=theme:${theme}`);
      await page.locator("#storybook-root > *").first().waitFor({ state: "attached", timeout: 15_000 });
      // The theme decorator sets data-theme after the first render; wait for it, then for colour transitions to settle.
      await page.waitForFunction((t) => document.documentElement.dataset.theme === t, theme);
      await page.waitForTimeout(400);
      const axe = await new AxeBuilder({ page })
        .include("#storybook-root")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      for (const v of axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical")) {
        failures.push(`${theme} ${s.title} / ${s.name}: ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0]?.target.join(" ")}`);
      }
    }
  }
  expect(failures, failures.join("\n")).toEqual([]);
});
