import { test, expect } from "@playwright/test";

test("mobile menu opens as a sheet with a services accordion", async ({ page }) => {
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open menu" });
  const sheet = page.locator(`#${await open.getAttribute("aria-controls")}`);
  await open.click();
  const acc = sheet.getByRole("button", { name: /Services/ });
  await acc.click();
  await expect(acc).toHaveAttribute("aria-expanded", "true");
  await sheet.getByRole("link", { name: /Marketing Automation/ }).click();
  await expect(page).toHaveURL(/marketing-automation$/);
});

test("mobile wheel swaps to swipeable service chips", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tablist", { name: "Techieficial services" }).getByRole("tab");
  await expect(tabs).toHaveCount(5);
  await tabs.nth(2).click();
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
});

test("no horizontal scroll on key pages", async ({ page }) => {
  for (const path of ["/", "/pricing", "/demo", "/services/ai-agents", "/contact"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
    // The body clips overflow, so also check that headings and text actually fit on screen.
    const wide = await page.evaluate(() =>
      [...document.querySelectorAll("main h1, main h2, main p")]
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1 && !el.closest("[class*='overflow-x-auto'], .marquee"))
        .map((el) => el.textContent?.slice(0, 40)),
    );
    expect(wide, path).toEqual([]);
  }
});
