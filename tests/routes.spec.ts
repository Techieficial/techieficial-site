import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { allRoutes } from "./helpers";

test("every route: 200, one H1, title, description, canonical, no serious a11y issues", async ({ page, request }) => {
  test.setTimeout(240_000);
  const routes = await allRoutes(request);
  expect(routes.length).toBeGreaterThan(20);
  // Fade-in animations would make axe measure half-faded text; reduced motion shows the final state at once.
  await page.emulateMedia({ reducedMotion: "reduce" });
  const failures: string[] = [];

  for (const path of routes) {
    const res = await page.goto(path, { waitUntil: "load" });
    if (res?.status() !== 200) failures.push(`${path}: status ${res?.status()}`);
    const h1 = await page.locator("h1").count();
    if (h1 !== 1) failures.push(`${path}: ${h1} h1 elements`);
    const title = await page.title();
    if (!title || title.length > 60) failures.push(`${path}: bad title "${title}"`);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    if (!desc || desc.length > 160) failures.push(`${path}: bad description`);
    if (path !== "/thank-you") {
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      if (!canonical) failures.push(`${path}: no canonical`);
    }
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    for (const v of axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical")) {
      failures.push(`${path}: axe ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0]?.target.join(" ")}`);
    }
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("unknown URL shows the custom 404", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Pricing" }).last()).toBeVisible();
});

test("robots, sitemap, llms.txt and manifest are served", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /api/");
  expect(robots).toContain("sitemap.xml");
  expect((await request.get("/llms.txt")).status()).toBe(200);
  expect((await request.get("/manifest.webmanifest")).status()).toBe(200);
});

test("the old AI Agents service page permanently redirects to the AI Team", async ({ request }) => {
  const res = await request.get("/services/ai-agents", { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  expect(res.headers()["location"]).toMatch(/\/ai-team$/);
});

test("AI Team page lists 4 AI employees that each have a profile", async ({ page }) => {
  await page.goto("/ai-team");
  const links = page.getByRole("link", { name: /View profile/ });
  await expect(links).toHaveCount(4);
  for (const slug of ["receptionist", "lead-responder", "follow-up-agent", "reviews-agent"]) {
    const res = await page.request.get(`/ai-team/${slug}`);
    expect(res.status(), slug).toBe(200);
  }
});
