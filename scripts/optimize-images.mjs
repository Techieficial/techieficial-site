#!/usr/bin/env node
/**
 * Image pipeline: media-src/* -> public/media/<name>-<width>.{avif,webp} + content/images.json.
 *   node scripts/optimize-images.mjs          build the variants (needs sharp, a dev dependency)
 *   node scripts/optimize-images.mjs --check  fail if a source changed since the last build (no sharp needed)
 * Outputs are committed, so production builds on Cloudflare never need sharp.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { pathToFileURL } from "node:url";

export const WIDTHS = [480, 768, 1080, 1600, 2400];
const SOURCE_EXT = [".jpg", ".jpeg", ".png", ".webp"];

const hash = (file) => createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 16);
const sources = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => SOURCE_EXT.includes(extname(f).toLowerCase())).sort() : []);
const slug = (file) => basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Returns problems (empty when the manifest matches the sources). */
export function checkImages({ src = "media-src", manifest = "content/images.json" } = {}) {
  const current = existsSync(manifest) ? JSON.parse(readFileSync(manifest, "utf8")) : {};
  const problems = [];
  const names = new Set();
  for (const f of sources(src)) {
    const name = slug(f);
    names.add(name);
    if (!current[name]) problems.push(`${f}: not built`);
    else if (current[name].hash !== hash(join(src, f))) problems.push(`${f}: changed since last build`);
  }
  for (const name of Object.keys(current)) if (!names.has(name)) problems.push(`${name}: in manifest but source removed`);
  return problems;
}

export async function buildImages({ src = "media-src", out = "public/media", manifest = "content/images.json" } = {}) {
  const { default: sharp } = await import("sharp");
  mkdirSync(out, { recursive: true });
  const result = {};
  for (const f of sources(src)) {
    const file = join(src, f);
    const name = slug(f);
    const img = sharp(file).rotate(); // respect EXIF orientation, then strip metadata
    const { width, height } = await img.metadata();
    const widths = WIDTHS.filter((w) => w < width).concat(width).filter((w, i, a) => a.indexOf(w) === i);
    for (const old of readdirSync(out).filter((o) => o.startsWith(`${name}-`))) rmSync(join(out, old));
    for (const w of widths) {
      const resized = img.clone().resize({ width: w, withoutEnlargement: true });
      await resized.clone().avif({ quality: 50, effort: 6 }).toFile(join(out, `${name}-${w}.avif`));
      await resized.clone().webp({ quality: 72 }).toFile(join(out, `${name}-${w}.webp`));
    }
    const { dominant } = await img.stats();
    result[name] = { width, height, widths, hash: hash(file), color: `rgb(${dominant.r},${dominant.g},${dominant.b})` };
  }
  writeFileSync(manifest, JSON.stringify(result, null, 2) + "\n");
  return result;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--check")) {
    const problems = checkImages();
    if (problems.length) {
      console.error(`Images out of date. Run npm run images.\n  ${problems.join("\n  ")}`);
      process.exit(1);
    }
    console.log("Image check passed.");
  } else {
    const r = await buildImages();
    console.log(`Built ${Object.keys(r).length} image(s) into public/media.`);
  }
}
