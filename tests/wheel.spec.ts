import { test, expect } from "@playwright/test";

const wheel = (page: import("@playwright/test").Page) => page.getByRole("group", { name: "Techieficial services" });

test("wheel highlights on hover and selects on click", async ({ page }) => {
  await page.goto("/");
  const seg = wheel(page).getByRole("button", { name: /^Paid Social Ads|^Paid Ads/ });
  // The wheel rotates slowly, so skip the "element is stable" wait.
  await seg.hover({ force: true });
  const card = page.locator("[aria-live]").filter({ has: page.getByRole("link", { name: /Explore/ }) }).first();
  await expect(card).toContainText(/Paid/);
  await seg.click({ force: true });
  await expect(seg).toHaveAttribute("aria-pressed", "true");
  await card.getByRole("link", { name: /Explore/ }).click();
  await expect(page).toHaveURL(/\/services\/paid-ads$/);
});

test("wheel works with the keyboard", async ({ page }) => {
  await page.goto("/");
  const buttons = wheel(page).getByRole("button");
  await expect(buttons).toHaveCount(5);
  await buttons.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(buttons.nth(1)).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(buttons.nth(4)).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(buttons.nth(4)).toHaveAttribute("aria-pressed", "true");
});

test("old homepage anchors still exist", async ({ page }) => {
  await page.goto("/");
  for (const id of ["top", "services", "process", "academy", "faq", "start"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});
