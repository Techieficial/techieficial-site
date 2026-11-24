import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { allRoutes } from "./helpers";

test("theme follows the device setting on first visit", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("theme switch flips the theme and remembers it across pages", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: /light and dark/i });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.goto("/pricing");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: /light and dark/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("no serious accessibility issues in dark mode", async ({ page, request }) => {
  test.setTimeout(240_000);
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  const failures: string[] = [];
  for (const path of await allRoutes(request)) {
    await page.goto(path, { waitUntil: "load" });
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    for (const v of axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical")) {
      failures.push(`${path}: axe ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0]?.target.join(" ")}`);
    }
  }
  expect(failures, failures.join("\n")).toEqual([]);
});
