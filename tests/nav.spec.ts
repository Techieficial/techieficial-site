import { test, expect } from "@playwright/test";

test("mega-menu opens on hover and closes when the mouse leaves", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: /services menu/i });
  await trigger.hover();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.mouse.move(5, 800);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("mega-menu works by keyboard and closes on Escape", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: /services menu/i });
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
  const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: /services menu/i });
  await trigger.click();
  const menu = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  await menu.getByRole("link", { name: /AI Agents/ }).first().click();
  await expect(page).toHaveURL(/\/services\/ai-agents$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Services nav item is a link to the services hub", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Services", exact: true });
  await expect(link).toHaveAttribute("href", "/services");
  await link.click();
  await expect(page).toHaveURL(/\/services$/);
});

test("Arrow Down on Services opens the mega-menu and focuses its first link", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const trigger = nav.getByRole("button", { name: /services menu/i });
  await nav.getByRole("link", { name: "Services", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const menu = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  await expect(menu.getByRole("link").first()).toBeFocused();
});

test("mega-menu closes when keyboard focus leaves it", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const trigger = nav.getByRole("button", { name: /services menu/i });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await nav.getByRole("link", { name: "Pricing" }).focus();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Tab moves from the open toggle into the menu and out to the next nav link", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const trigger = nav.getByRole("button", { name: /services menu/i });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  const menu = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  const links = menu.getByRole("link");
  await expect(links.first()).toBeFocused();
  await links.last().focus();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Demo Lab" })).toBeFocused();
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
