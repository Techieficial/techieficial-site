import { test, expect } from "@playwright/test";
import { countOf, htmlText } from "./helpers";

test("homepage hero names each client country once", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const hero = htmlText(html.slice(html.indexOf('id="top"'), html.indexOf("</section>", html.indexOf('id="top"'))));
  for (const country of ["UK", "Canada", "Australia", "New Zealand"]) expect(countOf(hero, country), country).toBe(1);
});

test("homepage HTML has one wheel details card", async ({ request }) => {
  const html = await (await request.get("/")).text();
  // The card's link appears once in the hero, not once per screen size.
  const hero = html.slice(html.indexOf('id="top"'), html.indexOf('id="story"'));
  expect(countOf(htmlText(hero), "View profile")).toBe(1);
  expect(countOf(hero, 'role="tablist"')).toBe(0);
});

test("text does not run together where elements meet", async ({ request }) => {
  const joined = ["actionTest", "$2,500plus", "SeenCapture", "LeadsGrow", "demoTest", "demoSee"];
  for (const path of ["/", "/offers", "/ai-team/receptionist"]) {
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

test("offers HTML shows all three Team Builder steps", async ({ request }) => {
  const text = htmlText(await (await request.get("/offers")).text());
  for (const step of ["Problems", "Business size", "Your CRM"]) expect(text, step).toContain(step);
});

test("Team Builder step bar tracks the current step", async ({ page }) => {
  await page.goto("/offers");
  const steps = page.getByRole("list", { name: "Team Builder steps" }).getByRole("listitem");
  await expect(steps).toHaveCount(3);
  await expect(steps.nth(0)).toHaveAttribute("aria-current", "step");
  await page.getByRole("checkbox", { name: "Missed calls" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByRole("heading", { name: "What size is your business?" })).toBeVisible();
  await expect(steps.nth(1)).toHaveAttribute("aria-current", "step");
  await expect(steps.nth(0)).toContainText("done");
});
