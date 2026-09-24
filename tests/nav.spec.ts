import { test, expect } from "@playwright/test";

test("mega-menu opens on hover and closes when the mouse leaves", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: /Services/ });
  await trigger.hover();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.mouse.move(5, 800);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("mega-menu works by keyboard and closes on Escape", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: /Services/ });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const menu = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  await expect(menu.getByRole("link", { name: /Marketing Automation/ }).first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("mega-menu link navigates to a service page", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: /Services/ });
  await trigger.click();
  const menu = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  await menu.getByRole("link", { name: /AI Agents/ }).first().click();
  await expect(page).toHaveURL(/\/services\/ai-agents$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /Skip to/ });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
