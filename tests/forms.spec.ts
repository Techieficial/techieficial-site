import { test, expect, type Page } from "@playwright/test";

type Lead = Record<string, unknown> & { email: string; tag: string; _path: string };

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
  await form.getByRole("button", { name: "Book my strategy call" }).click();
  await expect(form.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");

  const email = `test+${Date.now()}@techieficial.com`;
  await form.getByLabel("Your name").fill("Test Lead");
  await form.getByLabel("Work email").fill(email);
  await form.getByLabel("Mobile number").fill("+1 555 010 0199");
  await form.getByRole("button", { name: "Book my strategy call" }).click();
  await expect(page).toHaveURL(/\/thank-you$/);

  const lead = await leadFor(page, email);
  expect(lead.tag).toBe("engine-builder");
  expect(lead.source).toBe("contact-form");
  expect(lead.first_name).toBe("Test");
  expect(lead.last_name).toBe("Lead");
  expect(lead.product_interest).toBe("convert");
  expect(lead.business_size).toBe("2 to 10");
  expect(lead._path).toBe("/hook");
  // Exactly the keys the CRM workflow maps (docs/CRM_SETUP.md section 3), nothing else.
  const keys = Object.keys(lead).filter((k) => k !== "_path").sort();
  expect(keys).toEqual(
    [
      "first_name", "last_name", "email", "phone", "company_name", "source", "tag",
      "business_type", "business_size", "main_goal", "budget_range", "message", "product_interest", "selected_services", "sms_consent",
      "page_url", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    ].sort(),
  );
});

test("footer newsletter signup is tagged newsletter", async ({ page }) => {
  await page.goto("/about");
  const email = `news+${Date.now()}@techieficial.com`;
  const footer = page.locator("footer");
  await footer.getByRole("textbox").first().fill(email);
  await footer.getByRole("button").filter({ hasText: /./ }).first().click();
  await expect(footer.getByRole("status")).toBeVisible();
  const lead = await leadFor(page, email);
  expect(lead.tag).toBe("newsletter");
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
  expect(lead.tag).toBe("academy-waitlist");
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
  expect(lead.tag).toBe("test-build");
});

test("call-me requests go to the call-me webhook only", async ({ request }) => {
  const email = `callme+${Date.now()}@techieficial.com`;
  const lead = { source: "demo-callme", name: "Call Me", email, phone: "+1 555 010 0100", smsConsent: true };
  expect((await request.post("/api/lead", { data: lead })).status()).toBe(400);
  expect((await request.post("/api/callme", { data: lead })).status()).toBe(200);
  const all = (await (await request.get("http://127.0.0.1:3999/received")).json()) as Lead[];
  const got = all.filter((l) => l.email === email);
  expect(got).toHaveLength(1);
  expect(got[0]._path).toBe("/callme");
  expect(got[0].tag).toBe("demo-callme");
  expect(got[0].sms_consent).toBe("true");
});

test("honeypot submissions are dropped silently", async ({ request }) => {
  const email = `bot+${Date.now()}@techieficial.com`;
  const res = await request.post("/api/lead", { data: { source: "newsletter", email, website: "spam" } });
  expect(res.status()).toBe(200);
  const all = (await (await request.get("http://127.0.0.1:3999/received")).json()) as Lead[];
  expect(all.some((l) => l.email === email)).toBe(false);
});

test("Team Builder recommends an offer by the v3 rules and passes the choices to booking", async ({ page }) => {
  await page.goto("/offers");
  const builder = page.locator("section").filter({ has: page.getByRole("heading", { name: "Team Builder" }) });
  const run = async (problems: string[]) => {
    for (const p of problems) await builder.getByRole("checkbox", { name: p }).click();
    await builder.getByRole("button", { name: "Next" }).click();
    await builder.getByRole("radio", { name: "2 to 10" }).click();
    await builder.getByRole("button", { name: "Next" }).click();
    await builder.getByRole("radio", { name: "No", exact: true }).click();
    await builder.getByRole("button", { name: "Next" }).click();
  };
  // Only missed calls: AI Receptionist Starter (checkout, closed for now).
  await run(["Missed calls"]);
  await expect(builder.getByRole("heading", { name: /Recommended for you: AI Receptionist Starter/ })).toBeVisible();
  await expect(builder.getByText("Checkout opens soon")).toBeVisible();
  await builder.getByRole("button", { name: "Start again" }).click();
  // Not enough leads: AI Growth Team.
  await run(["Not enough leads"]);
  await expect(builder.getByRole("heading", { name: /Recommended for you: AI Growth Team/ })).toBeVisible();
  await builder.getByRole("button", { name: "Start again" }).click();
  // Two problems: AI Front Office, booked through a strategy call.
  await run(["Missed calls", "No follow-up"]);
  await expect(builder.getByRole("heading", { name: /Recommended for you: AI Front Office/ })).toBeVisible();
  await builder.getByRole("link", { name: "Book a strategy call" }).click();
  await expect(page).toHaveURL(/\/contact\?package=AI(\+|%20)Front(\+|%20)Office/);
  await expect(page.getByText("Your choices")).toBeVisible();
});
