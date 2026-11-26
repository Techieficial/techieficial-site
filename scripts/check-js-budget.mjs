#!/usr/bin/env node
/**
 * JavaScript budget per page (BUILD_PLAN_V3 Phase 8): sums the gzip size of every script a built page loads
 * up front and fails the build if a page goes over its budget in perf-budget.json.
 * Run after `next build` (npm run build does it). Prefetched code for other pages is not counted.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join, relative } from "node:path";

const appDir = ".next/server/app";
const budget = JSON.parse(readFileSync("perf-budget.json", "utf8"));
const report = process.argv.includes("--report");

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });
}

const sizeCache = new Map();
function gz(src) {
  if (!sizeCache.has(src)) {
    const file = join(".next", src.replace(/^\/_next\//, ""));
    sizeCache.set(src, existsSync(file) ? gzipSync(readFileSync(file)).length : 0);
  }
  return sizeCache.get(src);
}

const failures = [];
const rows = [];
for (const file of htmlFiles(appDir)) {
  let route = "/" + relative(appDir, file).replace(/\.html$/, "");
  if (route === "/index") route = "/";
  if (route.startsWith("/_")) continue;
  const html = readFileSync(file, "utf8");
  const scripts = [...new Set([...html.matchAll(/<script[^>]+src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]))];
  const kb = scripts.reduce((sum, s) => sum + gz(s), 0) / 1024;
  const limit = budget.pages[route] ?? budget.defaultKb;
  rows.push([route, kb, limit]);
  if (kb > limit) failures.push(`${route}: ${kb.toFixed(1)} KB gzip JS, budget ${limit} KB`);
}

if (report) for (const [r, kb, limit] of rows.sort((a, b) => b[1] - a[1])) console.log(`${kb.toFixed(1).padStart(6)} KB / ${limit} KB  ${r}`);
if (failures.length) {
  console.error(`JavaScript budget exceeded (${failures.length}):\n  ${failures.join("\n  ")}\nShrink the page's JS, or raise its budget in perf-budget.json with a reason.`);
  process.exit(1);
}
console.log(`JavaScript budget passed (${rows.length} pages, largest ${Math.max(...rows.map((r) => r[1])).toFixed(1)} KB gzip).`);
