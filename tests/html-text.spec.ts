import { test, expect } from "@playwright/test";
import { countOf, htmlText } from "./helpers";
import { siteConfig } from "../site.config";

test("homepage HTML lists each client country once", async ({ request }) => {
  const html = await (await request.get("/")).text();
  // Countries also appear in an FAQ answer, so count list items only.
  for (const country of siteConfig.countries) expect(countOf(html, `>${country}</li>`), country).toBe(1);
});

test("homepage HTML has one wheel details card", async ({ request }) => {
  const html = await (await request.get("/")).text();
  // The card's "Explore" link appears once in the hero, not once per screen size.
  const hero = html.slice(html.indexOf('id="top"'), html.indexOf('id="problem"'));
  expect(countOf(htmlText(hero), "Explore ")).toBe(1);
  expect(countOf(hero, 'role="tablist"')).toBe(0);
});
