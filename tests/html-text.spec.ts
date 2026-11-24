import { test, expect } from "@playwright/test";
import { countOf, htmlText } from "./helpers";
import { siteConfig } from "../site.config";

test("homepage hero names each client country once", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const hero = htmlText(html.slice(html.indexOf('id="top"'), html.indexOf("</section>", html.indexOf('id="top"'))));
  for (const country of siteConfig.countries) expect(countOf(hero, country), country).toBe(1);
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

test("comparison table caption differs from the section heading", async ({ page }) => {
  await page.goto("/");
  const heading = (await page.locator("#compare-title").innerText()).trim();
  const caption = (await page.locator("table caption").textContent())?.trim();
  expect(caption).toBeTruthy();
  expect(caption).not.toBe(heading);
});

test("pricing HTML shows all three Engine Builder steps", async ({ request }) => {
  const text = htmlText(await (await request.get("/pricing")).text());
  for (const step of ["Services", "Business size", "Main goal"]) expect(text, step).toContain(step);
});

test("Engine Builder step bar tracks the current step", async ({ page }) => {
  await page.goto("/pricing");
  const steps = page.getByRole("list", { name: "Engine Builder steps" }).getByRole("listitem");
  await expect(steps).toHaveCount(3);
  await expect(steps.nth(0)).toHaveAttribute("aria-current", "step");
  await page.getByRole("checkbox", { name: /AI Agents/ }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByRole("heading", { name: "What size is your business?" })).toBeVisible();
  await expect(steps.nth(1)).toHaveAttribute("aria-current", "step");
  await expect(steps.nth(0)).toContainText("done");
});
