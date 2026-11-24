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

test("text does not run together where elements meet", async ({ request }) => {
  const joined = ["actionTest", "$2,500plus", "SeenCapture", "LeadsGrow", "demoTest", "demoSee"];
  for (const path of ["/", "/pricing", "/services/ai-agents"]) {
    const text = htmlText(await (await request.get(path)).text());
    for (const j of joined) expect(text.includes(j), `${path}: ${j}`).toBe(false);
  }
});
