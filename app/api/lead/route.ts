import { leadSchema, leadSources } from "@/lib/lead";

/**
 * Receives every form on the site, checks it, and forwards it to the CRM webhook.
 * Secrets (webhook URLs, Turnstile key) come from environment variables only.
 */

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT_PER_IP = 8;
const LIMIT_PER_PHONE = 3;
const hits = new Map<string, number[]>();

/** Best-effort limiter, per Worker instance. Pair with a Cloudflare WAF rate-limit rule for a hard limit. */
function limited(key: string, max: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured yet: honeypot and rate limit still apply.
  if (!token) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}

function readUtm(cookieHeader: string | null) {
  const match = cookieHeader?.match(/(?:^|;\s*)tf_utm=([^;]+)/);
  if (!match) return undefined;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return typeof parsed === "object" && parsed ? (parsed as Record<string, string>) : undefined;
  } catch {
    return undefined;
  }
}

const json = (body: object, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (raw && typeof raw === "object" && "website" in raw && (raw as { website?: unknown }).website) return json({ ok: true });

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return json({ error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) }, 422);
  const lead = parsed.data;

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for");
  if (ip && limited(`ip:${ip}`, LIMIT_PER_IP)) return json({ error: "rate_limited" }, 429);
  if (lead.source === "demo-callme" && lead.phone && limited(`phone:${lead.phone.replace(/\D/g, "")}`, LIMIT_PER_PHONE)) {
    return json({ error: "rate_limited" }, 429);
  }

  if (!(await verifyTurnstile(lead.turnstileToken, ip))) return json({ error: "spam_check_failed" }, 403);

  const webhook =
    lead.source === "demo-callme"
      ? (process.env.CRM_CALLME_WEBHOOK_URL ?? process.env.CRM_WEBHOOK_URL)
      : process.env.CRM_WEBHOOK_URL;
  if (!webhook) {
    console.error("CRM webhook is not configured; lead was not delivered", lead.source);
    return json({ error: "not_configured" }, 503);
  }

  const tags: string[] = [leadSources[lead.source]];
  if (lead.selection && Object.keys(lead.selection).length) tags.push("engine-builder");

  const { turnstileToken: _t, website: _w, ...fields } = lead;
  void _t;
  void _w;
  const payload = {
    ...fields,
    tags,
    utm: readUtm(request.headers.get("cookie")),
    pageUrl: request.headers.get("referer") ?? lead.page,
    submittedAt: new Date().toISOString(),
  };

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error("CRM webhook responded with", res.status);
    return json({ error: "delivery_failed" }, 502);
  }
  return json({ ok: true });
}
