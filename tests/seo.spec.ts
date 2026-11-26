import { expect, test } from "@playwright/test";
import { allRoutes } from "./helpers";

/**
 * SEO rules from CLAUDE.md section 9 and BUILD_PLAN_V3 Phase 10, checked on the built site:
 * structured data parses and has the right types, titles and descriptions fit and are unique, images have alt text.
 */

type Ld = { "@type"?: string | string[] };
const types = (blocks: Ld[]) => blocks.flatMap((b) => (Array.isArray(b["@type"]) ? b["@type"] : [b["@type"]]));

// Pages that share a description today and are waiting on the owner's copy decision (docs/v3/SEO_PASS.md).
// /work is noindex until the first case study exists.
const knownDuplicateDescriptions = new Set(["/work"]);

test("structured data, titles, descriptions and alt text on every route", async ({ page, request }) => {
  const failures: string[] = [];
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();

  for (const path of await allRoutes(request)) {
    const res = await request.get(path);
    const html = await res.text();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const blocks: Ld[] = [];
    for (const raw of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      try {
        const j = JSON.parse(raw);
        blocks.push(...(Array.isArray(j) ? j : [j]));
      } catch {
        failures.push(`${path}: JSON-LD does not parse`);
      }
    }
    const t = types(blocks);
    const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
    if (!t.includes("Organization") || !t.includes("WebSite")) failures.push(`${path}: missing Organization/WebSite`);
    if (path !== "/" && !noindex && !t.includes("BreadcrumbList")) failures.push(`${path}: missing BreadcrumbList`);
    if (/^\/(services|offers|ai-team)\/[^/]+$/.test(path) && !t.includes("Service")) failures.push(`${path}: missing Service`);
    if (/^\/blog\/[^/]+$/.test(path) && !t.includes("Article")) failures.push(`${path}: missing Article`);
    if (t.includes("Review") || t.includes("AggregateRating")) failures.push(`${path}: Review schema is allowed only with real reviews`);

    const title = await page.title();
    const description = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
    if (title.length > 60) failures.push(`${path}: title ${title.length} chars (max 60)`);
    if (description.length > 155) failures.push(`${path}: description ${description.length} chars (max 155)`);
    if (!noindex) {
      if (titles.has(title)) failures.push(`${path}: same title as ${titles.get(title)}`);
      titles.set(title, path);
    }
    if (!knownDuplicateDescriptions.has(path)) {
      if (descriptions.has(description)) failures.push(`${path}: same description as ${descriptions.get(description)}`);
      descriptions.set(description, path);
    }

    const noAlt = await page.locator("img:not([alt])").count();
    if (noAlt) failures.push(`${path}: ${noAlt} image(s) without alt`);
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("llms.txt lists the key pages", async ({ request }) => {
  const txt = await (await request.get("/llms.txt")).text();
  for (const path of ["/ai-team", "/offers", "/demo", "/contact", "/faq", "/about"]) {
    expect(txt, path).toContain(`https://techieficial.com${path}`);
  }
  expect(txt).not.toMatch(/—/);
});

test("hub pages list their services as ItemList structured data", async ({ page }) => {
  for (const path of ["/services", "/ai-team", "/offers"]) {
    await page.goto(path);
    const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)["@type"]);
    expect(types, path).toContain("ItemList");
  }
});

test("internal links: service pages reach demo, offers and 2 industries; industry pages reach 2 services", async ({ page, request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const failures: string[] = [];
  for (const path of paths.filter((p) => /^\/(services|industries)\/[^/]+$/.test(p))) {
    await page.goto(path);
    const hrefs = await page.locator("main a[href^='/']").evaluateAll((as) => as.map((a) => (a.getAttribute("href") ?? "").split(/[?#]/)[0]));
    if (path.startsWith("/services/")) {
      for (const need of ["/demo", "/offers"]) if (!hrefs.includes(need)) failures.push(`${path}: no link to ${need}`);
      if (new Set(hrefs.filter((h) => h.startsWith("/industries/"))).size < 2) failures.push(`${path}: fewer than 2 industry links`);
    } else if (new Set(hrefs.filter((h) => /^\/(services\/|ai-team)/.test(h))).size < 2) failures.push(`${path}: fewer than 2 service links`);
  }
  expect(failures, failures.join("\n")).toEqual([]);
});
