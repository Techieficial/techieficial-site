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
