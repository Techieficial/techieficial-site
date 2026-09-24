#!/usr/bin/env node
/**
 * npm run og: renders a 1200x630 share image for every public page into public/og/,
 * plus the app icons. Run after `npm run build` whenever page titles change, then commit the PNGs.
 * Static PNGs keep the Cloudflare Worker small (no image library in the server bundle).
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync, readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const PORT = 3300;
const base = `http://127.0.0.1:${PORT}`;
const exe = "/opt/pw-browsers/chromium";

const server = spawn("npx", ["next", "start", "-p", String(PORT), "-H", "127.0.0.1"], { stdio: "ignore" });
for (let i = 0; i < 60; i++) {
  try {
    if ((await fetch(base)).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 1000));
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export const ogKey = (path) => (path === "/" ? "home" : path.slice(1).replace(/\//g, "--"));

const mark = readFileSync("app/icon.svg", "utf8");

// Reuse the site's own self-hosted fonts from the build (latin subset), forced to load before the screenshot.
const cssFiles = readdirSync(".next/static/chunks").filter((f) => f.endsWith(".css"));
const fontFaces = cssFiles
  .flatMap((f) => readFileSync(`.next/static/chunks/${f}`, "utf8").match(/@font-face\{[^}]*\}/g) ?? [])
  .filter((r) => /font-family:(Inter|Space Grotesk)/.test(r) && /unicode-range:U\+\?\?/.test(r))
  .map((r) => r.replace(/font-display:\w+/, "font-display:block").replace(/url\(\.\.\/media\//g, `url(${base}/_next/static/media/`))
  .join("\n");

function template({ title, eyebrow }) {
  return `<!doctype html><html><head>
<style>${fontFaces}

*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0A0B14;color:#F4F5FA;font-family:Inter,sans-serif;position:relative;overflow:hidden;padding:72px 80px;display:flex;flex-direction:column}
.glow{position:absolute;right:-160px;top:-200px;width:720px;height:720px;border-radius:50%;background:radial-gradient(closest-side,rgba(124,92,255,.55),rgba(34,211,238,.18),transparent)}
.bar{position:absolute;left:0;right:0;bottom:0;height:10px;background:linear-gradient(100deg,#7C5CFF 0%,#22D3EE 100%)}
.brand{display:flex;align-items:center;gap:18px;font-family:'Space Grotesk';font-size:34px;font-weight:700;letter-spacing:-.02em;position:relative}
.brand svg{width:56px;height:56px}
.eyebrow{margin-top:auto;font-size:26px;color:#A99BFF;position:relative}
h1{margin-top:18px;font-family:'Space Grotesk';font-weight:700;font-size:${title.length > 48 ? 60 : 72}px;line-height:1.05;letter-spacing:-.035em;max-width:1000px;position:relative}
.url{margin-top:36px;font-size:24px;color:#9CA3B8;position:relative}
</style></head><body><div class="glow"></div>
<div class="brand">${mark}techieficial</div>
<div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><div class="url">techieficial.com</div><div class="bar"></div>
</body></html>`;
}

const browser = await chromium.launch(existsSync(exe) ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`${base}/robots.txt`);
mkdirSync("public/og", { recursive: true });

const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const keys = [];

for (const path of paths) {
  const html = await (await fetch(base + path)).text();
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, "") ?? "";
  const crumb = path === "/" ? "AI growth agency" : decode((html.match(/<title>(.*?)<\/title>/)?.[1] ?? "").split(" | ")[0]);
  await page.setContent(template({ title: decode(h1).trim(), eyebrow: crumb }), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${ogKey(path)}.jpg`, type: "jpeg", quality: 86 });
  keys.push(ogKey(path));
  console.log("og", path);
}

// Fallback image for any page without its own.
await page.setContent(template({ title: "One team for your whole growth engine.", eyebrow: "AI growth agency" }), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og/default.jpg", type: "jpeg", quality: 86 });

// App icons from the brand mark.
const icon = async (size, file) => {
  const p = await browser.newPage({ viewport: { width: size, height: size } });
  await p.setContent(`<style>*{margin:0}svg{width:${size}px;height:${size}px;display:block}</style>${mark}`);
  const buf = await p.screenshot({ path: file, omitBackground: true });
  await p.close();
  return buf;
};
await icon(180, "app/apple-icon.png");
const png32 = await icon(32, "/tmp/favicon-32.png");
// favicon.ico: a single 32x32 PNG inside an ICO container.
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync("app/favicon.ico", Buffer.concat([header, png32]));

writeFileSync("content/og-images.json", JSON.stringify(keys.sort(), null, 2) + "\n");
await browser.close();
server.kill("SIGTERM");
console.log(`Generated ${keys.length} share images.`);
