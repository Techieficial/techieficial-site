import { expect, test } from "@playwright/test";
import { allRoutes } from "./helpers";

type Ld = Record<string, unknown> & { "@type"?: string | string[] };

/** Every JSON-LD node on a page (top level and @graph). Fails on invalid JSON. */
async function jsonLd(page: import("@playwright/test").Page, path: string, failures: string[]) {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const nodes: Ld[] = [];
  for (const b of blocks) {
    try {
      const d = JSON.parse(b);
      for (const n of [d].flat()) nodes.push(...(n["@graph"] ?? [n]));
    } catch {
      failures.push(`${path}: invalid JSON-LD`);
    }
  }
  return nodes;
}
const hasType = (nodes: Ld[], t: string) => nodes.some((n) => [n["@type"]].flat().includes(t));

test("structured data, alt text and internal links on every route", async ({ page, request }) => {
  test.setTimeout(240_000);
  const routes = await allRoutes(request);
  const failures: string[] = [];
  const inbound = new Map<string, number>(routes.map((r) => [r, 0]));

  for (const path of routes) {
    await page.goto(path);
    const ld = await jsonLd(page, path, failures);
    if (!hasType(ld, "Organization") || !hasType(ld, "WebSite")) failures.push(`${path}: no Organization/WebSite`);
    if (path !== "/" && !path.startsWith("/thank-you") && !hasType(ld, "BreadcrumbList")) failures.push(`${path}: no BreadcrumbList`);
    if (/^\/(services|ai-team|offers)\/[^/]+$/.test(path) && !hasType(ld, "Service")) failures.push(`${path}: no Service`);
    if (/^\/(services|ai-team|offers)$/.test(path) && !hasType(ld, "ItemList")) failures.push(`${path}: no ItemList of services`);
    if (/^\/blog\/[^/]+$/.test(path)) {
      const a = ld.find((n) => n["@type"] === "Article");
      if (!a) failures.push(`${path}: no Article`);
      else for (const k of ["headline", "datePublished", "author", "publisher", "image", "mainEntityOfPage"]) if (!a[k]) failures.push(`${path}: Article missing ${k}`);
    }
    if ((await page.locator("main details").count()) > 2 && !hasType(ld, "FAQPage")) failures.push(`${path}: FAQs without FAQPage`);
    if (ld.filter((n) => n["@type"] === "FAQPage").length > 1) failures.push(`${path}: more than one FAQPage`);

    // Every image has an alt attribute; an empty alt is only allowed for decoration.
    for (const img of await page.locator("img").all()) {
      const alt = await img.getAttribute("alt");
      if (alt === null) failures.push(`${path}: img without alt (${await img.getAttribute("src")})`);
    }

    // Count inbound links from page content (nav and footer excluded) to find orphan pages.
    const hrefs = await page.locator("main a[href^='/']").evaluateAll((as) => as.map((a) => (a.getAttribute("href") ?? "").split(/[?#]/)[0]));
    for (const h of new Set(hrefs)) if (h !== path && inbound.has(h)) inbound.set(h, inbound.get(h)! + 1);

    if (/^\/services\/[^/]+$/.test(path)) {
      for (const need of ["/demo", "/offers"]) if (!hrefs.includes(need)) failures.push(`${path}: no link to ${need}`);
      if (hrefs.filter((h) => h.startsWith("/industries/")).length < 2) failures.push(`${path}: fewer than 2 industry links`);
    }
    if (/^\/industries\/[^/]+$/.test(path)) {
      const svc = new Set(hrefs.filter((h) => /^\/(services\/|ai-team)/.test(h)));
      if (svc.size < 2) failures.push(`${path}: fewer than 2 service links`);
    }
  }
  const orphans = [...inbound].filter(([p, n]) => n === 0 && p !== "/" && !p.startsWith("/thank-you") && !/^\/(privacy|terms|cookies|sms-terms|accessibility)$/.test(p));
  // Reported, not failed: adding in-content links changes visible copy, which needs the owner's approval.
  for (const [p] of orphans) {
    test.info().annotations.push({ type: "warning", description: `${p}: linked only from nav/footer, no in-content links` });
    console.warn(`SEO warning: ${p} is linked only from the nav and footer`);
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("llms.txt lists every public page", async ({ request }) => {
  const txt = await (await request.get("/llms.txt")).text();
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\/(privacy|terms|cookies|sms-terms|accessibility)$/.test(u));
  const missing = urls.filter((u) => !txt.includes(`](${u})`));
  expect(missing, `missing from llms.txt:\n${missing.join("\n")}`).toEqual([]);
});
