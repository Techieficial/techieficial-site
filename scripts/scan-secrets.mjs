#!/usr/bin/env node
/**
 * Fails if a likely secret is committed. Scans every file git tracks (or would track).
 * A quick local guard; CI also runs gitleaks over the full history.
 */
import { execSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const rules = [
  { name: "private key", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: "AWS access key", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "GitHub token", re: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/ },
  { name: "Slack token", re: /\bxox[abposr]-[A-Za-z0-9-]{10,}/ },
  { name: "Stripe live key", re: /\b[sr]k_live_[A-Za-z0-9]{16,}/ },
  { name: "Google API key", re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { name: "Anthropic/OpenAI key", re: /\bsk-(ant-)?[A-Za-z0-9_-]{32,}/ },
  { name: "Cloudflare Turnstile secret", re: /\b0x4AAAAAAA[A-Za-z0-9_-]{20,}/ },
  { name: "CRM inbound webhook URL", re: /https:\/\/services\.leadconnectorhq\.com\/hooks\/[A-Za-z0-9]+\/webhook-trigger\/[A-Za-z0-9-]+/ },
  { name: "secret assignment", re: /\b[A-Z_]*(SECRET|TOKEN|API_KEY|PASSWORD|WEBHOOK_URL)[A-Z_]*\s*[:=]\s*["'](?!https?:\/\/(127\.0\.0\.1|localhost))[A-Za-z0-9_\-/:.+]{16,}["']/ },
];

const files = execSync("git ls-files -co --exclude-standard", { encoding: "utf8" }).split("\n").filter(Boolean);
const skip = /(^|\/)(package-lock\.json|scan-secrets\.mjs)$|\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|mp4|pdf)$/i;
const problems = [];

for (const f of files) {
  if (/(^|\/)\.env(\.|$)/.test(f) && !f.endsWith(".env.example")) problems.push(`${f}: env file must not be committed`);
  if (skip.test(f)) continue;
  let text;
  try {
    if (statSync(f).size > 2_000_000) continue;
    text = readFileSync(f, "utf8");
  } catch {
    continue;
  }
  text.split("\n").forEach((line, i) => {
    for (const r of rules) if (r.re.test(line)) problems.push(`${f}:${i + 1}: ${r.name}`);
  });
}

if (problems.length) {
  console.error(`Secret scan failed (${problems.length}):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`Secret scan passed (${files.length} files checked).`);
