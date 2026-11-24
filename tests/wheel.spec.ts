import { test, expect } from "@playwright/test";

const wheel = (page: import("@playwright/test").Page) => page.getByRole("group", { name: "Your AI team" });

test("wheel highlights on hover and selects on click", async ({ page }) => {
  await page.goto("/");
  const seg = wheel(page).getByRole("button", { name: /^Growth add-ons/ });
  // The wheel rotates slowly, so skip the "element is stable" wait.
  await seg.hover({ force: true });
  const card = page.locator("[aria-live]").filter({ has: page.getByRole("link", { name: /See more services/ }) }).first();
  await expect(card).toContainText(/Paid ads/);
  await seg.click({ force: true });
  await expect(seg).toHaveAttribute("aria-pressed", "true");
  await card.getByRole("link", { name: /See more services/ }).click();
  await expect(page).toHaveURL(/\/services$/);
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

test("homepage keeps the old one-page anchors", async ({ page }) => {
  await page.goto("/");
  for (const id of ["top", "services", "process", "problem", "academy", "faq", "start"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("homepage has the 12 v3 sections in order", async ({ page }) => {
  await page.goto("/");
  const headings = await page.locator("main h1, main h2").allInnerTexts();
  const order = [
    "Hire an AI team that answers every lead.",
    "Follow one lead through your AI team.",
    "Most service businesses",
    "Meet your AI team.",
    "We run Techieficial on the same AI team we sell.",
    "Start where you are.",
    "Live in weeks, not months.",
    "Hear it with your own business.",
    "AI team vs the usual options.",
    "Want your people to work with AI too?",
    "Questions, answered.",
    "Your next lead is calling.",
  ];
  let last = -1;
  for (const h of order) {
    const at = headings.findIndex((x) => x.replace(/\s+/g, " ").startsWith(h));
    expect(at, h).toBeGreaterThan(last);
    last = at;
  }
});
