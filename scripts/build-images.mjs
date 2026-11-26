#!/usr/bin/env node
/**
 * Image pipeline (BUILD_PLAN_V3 Phase 8). Put originals in assets/images/ (jpg, png, webp, avif).
 * `npm run images` writes AVIF + WebP at up to 4 widths into public/images/ and records each image's size in
 * content/images.json, which components/Picture.tsx reads. Done at build time, so the site needs no image server.
 * `--check` (run by npm run check) fails if an original changed or was added without running the pipeline.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const WIDTHS = [480, 960, 1440, 1920];
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : EXT.has(extname(p).toLowerCase()) ? [p] : [];
  });
}

/** Widths to generate: the standard ones up to the original width, or just the original if it is smaller. */
export function widthsFor(original) {
  const w = WIDTHS.filter((x) => x <= original);
  return w.length ? w : [original];
}

const keyOf = (srcDir, file) => relative(srcDir, file).replace(/\\/g, "/").replace(/\.[^.]+$/, "");
const hashOf = (file) => createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 16);

/** Returns the list of problems (empty when public/images and the manifest match the originals). */
export function checkImages({ srcDir, outDir, manifestPath }) {
  const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
  const problems = [];
  const keys = new Set();
  for (const file of walk(srcDir)) {
    const key = keyOf(srcDir, file);
    keys.add(key);
    const entry = manifest[key];
    if (!entry || entry.hash !== hashOf(file)) problems.push(`${key}: original is new or changed`);
    else for (const w of entry.widths) for (const f of ["avif", "webp"]) if (!existsSync(join(outDir, `${key}-${w}.${f}`))) problems.push(`${key}: missing ${w}px ${f}`);
  }
  for (const key of Object.keys(manifest)) if (!keys.has(key)) problems.push(`${key}: in content/images.json but the original is gone`);
  return problems;
}

export async function buildImages({ srcDir, outDir, manifestPath }) {
  const sharp = (await import("sharp")).default;
  const old = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
  const manifest = {};
  for (const file of walk(srcDir).sort()) {
    const key = keyOf(srcDir, file);
    const hash = hashOf(file);
    const meta = await sharp(file).rotate().metadata();
    const width = meta.autoOrient?.width ?? meta.width;
    const height = meta.autoOrient?.height ?? meta.height;
    const widths = widthsFor(width);
    const fresh = old[key]?.hash === hash && widths.every((w) => ["avif", "webp"].every((f) => existsSync(join(outDir, `${key}-${w}.${f}`))));
    if (!fresh) {
      mkdirSync(dirname(join(outDir, key)), { recursive: true });
      for (const w of widths) {
        const base = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
        await base.clone().avif({ quality: 55, effort: 4 }).toFile(join(outDir, `${key}-${w}.avif`));
        await base.clone().webp({ quality: 75 }).toFile(join(outDir, `${key}-${w}.webp`));
      }
    }
    manifest[key] = { width, height, widths, hash };
  }
  // Remove outputs for originals that were deleted.
  for (const key of Object.keys(old)) if (!manifest[key]) for (const w of old[key].widths) for (const f of ["avif", "webp"]) rmSync(join(outDir, `${key}-${w}.${f}`), { force: true });
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  return manifest;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const opts = { srcDir: join(root, "assets/images"), outDir: join(root, "public/images"), manifestPath: join(root, "content/images.json") };
  if (process.argv.includes("--check")) {
    const problems = checkImages(opts);
    if (problems.length) {
      console.error(`Images out of date. Run: npm run images\n  ${problems.join("\n  ")}`);
      process.exit(1);
    }
    console.log("Images in sync.");
  } else {
    const m = await buildImages(opts);
    console.log(`Images built: ${Object.keys(m).length}`);
  }
}
