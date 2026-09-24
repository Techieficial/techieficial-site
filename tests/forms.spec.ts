import { test, expect, type Page } from "@playwright/test";

type Lead = Record<string, unknown> & { email: string; tags: string[] };

/** The lead the mock CRM webhook received for this email (tests run in parallel). */
async function leadFor(page: Page, email: string) {
  let lead: Lead | undefined;
  await expect
    .poll(async () => {
      const all = (await (await page.request.get("http://127.0.0.1:3999/received")).json()) as Lead[];
      lead = all.find((l) => l.email === email);
      return Boolean(lead);
    })
    .toBe(true);
  return lead!;
}

test("contact form validates, submits to the CRM webhook and redirects", async ({ page }) => {
  await page.goto("/contact?package=convert&services=ai-agents&size=2%20to%2010&goal=Stop%20missing%20leads");
  const form = page.locator("form").filter({ has: page.getByLabel("Your name") }).first();
  await form.getByRole("button", { name: "Book my demo" }).click();
  await expect(form.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");

  const email = `test+${Date.now()}@techieficial.com`;
  await form.getByLabel("Your name").fill("Test Lead");
  await form.getByLabel("Work email").fill(email);
  await form.getByLabel("Mobile number").fill("+1 555 010 0199");
  await form.getByRole("button", { name: "Book my demo" }).click();
  await expect(page).toHaveURL(/\/thank-you$/);

  const lead = await leadFor(page, email);
  expect(lead.tags).toContain("booked-call");
  expect(lead.tags).toContain("engine-builder");
  expect(JSON.stringify(lead)).not.toContain("turnstile");
});

test("footer newsletter signup is tagged newsletter", async ({ page }) => {
  await page.goto("/about");
  const email = `news+${Date.now()}@techieficial.com`;
  const footer = page.locator("footer");
  await footer.getByRole("textbox").first().fill(email);
  await footer.getByRole("button").filter({ hasText: /./ }).first().click();
  await expect(footer.getByRole("status")).toBeVisible();
  const lead = await leadFor(page, email);
  expect(lead.tags).toContain("newsletter");
});

test("academy waitlist is tagged academy-waitlist", async ({ page }) => {
  await page.goto("/academy#waitlist");
  const form = page.locator("#waitlist form");
  const email = `academy+${Date.now()}@techieficial.com`;
  await form.getByLabel("Your name").fill("Test Learner");
  await form.getByLabel("Work email").fill(email);
  await form.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.locator("#waitlist").getByRole("status")).toBeVisible();
  const lead = await leadFor(page, email);
  expect(lead.tags).toContain("academy-waitlist");
});

test("demo lab test-build tab is reachable by hash and submits", async ({ page }) => {
  await page.goto("/demo#build");
  const tab = page.getByRole("tab", { name: "Book a test build" });
  await expect(tab).toHaveAttribute("aria-selected", "true");
  const panel = page.getByRole("tabpanel");
  await panel.getByLabel("AI agent").check();
  await panel.getByLabel("Your name").fill("Test Build");
  const email = `build+${Date.now()}@techieficial.com`;
  await panel.getByLabel("Work email").fill(email);
  await panel.getByRole("button", { name: "Send" }).click();
  await expect(page).toHaveURL(/\/thank-you$/);
  const lead = await leadFor(page, email);
  expect(lead.tags).toContain("test-build");
});

test("honeypot submissions are dropped silently", async ({ request }) => {
  const email = `bot+${Date.now()}@techieficial.com`;
  const res = await request.post("/api/lead", { data: { source: "newsletter", email, website: "spam" } });
  expect(res.status()).toBe(200);
  const all = (await (await request.get("http://127.0.0.1:3999/received")).json()) as Lead[];
  expect(all.some((l) => l.email === email)).toBe(false);
});

test("engine builder recommends a package and passes it to booking", async ({ page }) => {
  await page.goto("/pricing");
  const builder = page.locator("section").filter({ has: page.getByRole("heading", { name: "Engine Builder" }) });
  await builder.getByRole("checkbox", { name: /AI Agents/ }).click();
  await builder.getByRole("button", { name: "Next" }).click();
  await builder.getByRole("radio", { name: "2 to 10" }).click();
  await builder.getByRole("button", { name: "Next" }).click();
  await builder.getByRole("radio", { name: "Stop missing leads" }).click();
  await builder.getByRole("button", { name: "Next" }).click();
  await expect(builder.getByRole("heading", { name: /Recommended for you: Convert/ })).toBeVisible();
  await builder.getByRole("link", { name: "Book a demo" }).click();
  await expect(page).toHaveURL(/\/contact\?package=convert/);
  await expect(page.getByText("Your Engine Builder choices")).toBeVisible();
});
