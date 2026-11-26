import { expect, test } from "@playwright/test";

// The test build has no analytics IDs, so tracking must be fully off: no banner, no tag requests.
test("no tracking loads and no cookie banner shows while analytics IDs are unset", async ({ page }) => {
  const tagRequests: string[] = [];
  page.on("request", (r) => {
    if (/googletagmanager|google-analytics|clarity\.ms|facebook\.net|facebook\.com\/tr/.test(r.url())) tagRequests.push(r.url());
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(tagRequests).toEqual([]);
  await expect(page.getByRole("dialog", { name: /cookie/i })).toHaveCount(0);
  expect(await page.evaluate(() => "dataLayer" in window)).toBe(false);
});
