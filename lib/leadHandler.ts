import { leadSchema } from "./lead";
import { toCrmPayload } from "./crm";

/**
 * Receives every form on the site, checks it, and forwards it to the CRM webhook.
 * Secrets (webhook URLs, Turnstile key) come from environment variables only.
 */

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT_PER_IP = 8;
const LIMIT_PER_PHONE = 3;
const hits = new Map<string, number[]>();

type RateLimitBinding = { limit: (o: { key: string }) => Promise<{ success: boolean }> };

/**
 * Cloudflare Workers rate-limit bindings (wrangler.jsonc "ratelimits"): shared by every Worker instance in a
 * Cloudflare location, per minute. Returns false (not limited) when the binding is not there (local dev, tests,
 * next start) or the check itself fails, so a Cloudflare hiccup never blocks a real lead.
 */
async function edgeLimited(binding: "LEAD_IP_LIMITER" | "CALLME_PHONE_LIMITER", key: string) {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const limiter = (getCloudflareContext().env as unknown as Record<string, RateLimitBinding | undefined>)[binding];
    if (!limiter) return false;
    return !(await limiter.limit({ key })).success;
  } catch {
    return false;
  }
}

/** Second layer: per Worker instance, over 10 minutes. Catches slow repeat abuse the per-minute edge limit allows. */
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

/**
 * Shared handler for /api/lead (every form) and /api/callme (Demo Lab "call me").
 * `kind` picks the webhook: callme uses CRM_CALLME_WEBHOOK_URL, falling back to CRM_WEBHOOK_URL.
 */
/** Largest form body accepted (the longest form, with a 4,000-character message, is well under this). */
export const MAX_BODY_BYTES = 16 * 1024;

export async function handleLead(request: Request, kind: "lead" | "callme") {
  // JSON only: a cross-site HTML form cannot send this content type without a CORS preflight, which is never allowed.
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({ error: "unsupported_media_type" }, 415);
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);

  let raw: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);
    raw = JSON.parse(body);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (raw && typeof raw === "object" && "website" in raw && (raw as { website?: unknown }).website) return json({ ok: true });

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return json({ error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) }, 422);
  const lead = parsed.data;

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for");
  if (ip && ((await edgeLimited("LEAD_IP_LIMITER", `ip:${ip}`)) || limited(`ip:${ip}`, LIMIT_PER_IP))) return json({ error: "rate_limited" }, 429);
  if (lead.source === "demo-callme" && lead.phone) {
    const phoneKey = `phone:${lead.phone.replace(/\D/g, "")}`;
    if ((await edgeLimited("CALLME_PHONE_LIMITER", phoneKey)) || limited(phoneKey, LIMIT_PER_PHONE)) return json({ error: "rate_limited" }, 429);
  }

  if (!(await verifyTurnstile(lead.turnstileToken, ip))) return json({ error: "spam_check_failed" }, 403);

  if ((kind === "callme") !== (lead.source === "demo-callme")) return json({ error: "wrong_endpoint" }, 400);

  const webhook = kind === "callme" ? (process.env.CRM_CALLME_WEBHOOK_URL ?? process.env.CRM_WEBHOOK_URL) : process.env.CRM_WEBHOOK_URL;
  if (!webhook) {
    console.error("CRM webhook is not configured; lead was not delivered", lead.source);
    return json({ error: "not_configured" }, 503);
  }

  const payload = toCrmPayload(lead, {
    pageUrl: request.headers.get("referer") ?? lead.page,
    utm: readUtm(request.headers.get("cookie")),
  });

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
