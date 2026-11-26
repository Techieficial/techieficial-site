import { expect, test } from "@playwright/test";

const keyPages = ["/", "/contact", "/demo", "/offers", "/services/marketing-automation", "/blog"];

test("security headers are sent", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).toContain("object-src 'none'");
  expect(h["strict-transport-security"]).toContain("max-age=");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("key pages load with no Content-Security-Policy violations", async ({ page }) => {
  const violations: string[] = [];
  await page.exposeFunction("reportCsp", (v: string) => violations.push(v));
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (e) => (window as unknown as { reportCsp: (v: string) => void }).reportCsp(`${e.violatedDirective} ${e.blockedURI}`));
  });
  for (const path of keyPages) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }
  expect(violations).toEqual([]);
});

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
});

test("lead API rejects non-JSON and oversized bodies", async ({ request }) => {
  expect((await request.post("/api/lead", { form: { source: "newsletter", email: "a@test.dev" } })).status()).toBe(415);
  const big = await request.post("/api/lead", {
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ source: "newsletter", email: "a@test.dev", message: "x".repeat(20_000) }),
  });
  expect(big.status()).toBe(413);
});
