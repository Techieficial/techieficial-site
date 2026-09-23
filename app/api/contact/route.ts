type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  services?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const lead = {
    name: str(body.name, 200),
    email: str(body.email, 320),
    company: str(body.company, 200),
    message: str(body.message, 5000),
    services: Array.isArray(body.services)
      ? body.services.filter((s): s is string => typeof s === "string").slice(0, 10)
      : [],
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email) || !lead.message) {
    return Response.json({ error: "Name, a valid email and a message are required" }, { status: 422 });
  }

  // Forward to the CRM (or n8n / Make) webhook when one is configured.
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      return Response.json({ error: "Could not deliver the enquiry" }, { status: 502 });
    }
  } else {
    console.warn("CONTACT_WEBHOOK_URL is not set; enquiry was not forwarded", lead.email);
  }

  return Response.json({ ok: true });
}
