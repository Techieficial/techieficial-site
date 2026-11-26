#!/usr/bin/env node
/**
 * Performance budget for every prebuilt page: gzip size of the JS, CSS and HTML each page loads.
 * Runs after `next build`. Limits live in perf-budget.json.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { gzipSync } from "node:zlib";

const budget = JSON.parse(readFileSync("perf-budget.json", "utf8"));
const appDir = ".next/server/app";
const kb = (buf) => gzipSync(buf).length / 1024;
const cache = new Map();
const assetKb = (url) => {
  if (!cache.has(url)) {
    const file = join(".next", url.replace(/^\/_next\//, ""));
    cache.set(url, existsSync(file) ? kb(readFileSync(file)) : 0);
  }
  return cache.get(url);
};

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html") && !name.startsWith("_")) pages.push(p);
  }
})(appDir);

const rows = [];
const problems = [];
for (const file of pages) {
  const html = readFileSync(file);
  const text = html.toString();
  const route = "/" + relative(appDir, file).replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  const sum = (re) => [...new Set([...text.matchAll(re)].map((m) => m[1]))].reduce((t, u) => t + assetKb(u), 0);
  const js = sum(/(\/_next\/static\/[^"'\s]+\.js)/g);
  const css = sum(/(\/_next\/static\/[^"'\s]+\.css)/g);
  const doc = kb(html);
  const jsLimit = route === "/" ? budget.jsKbHome : budget.jsKbPerPage;
  if (js > jsLimit) problems.push(`${route}: JS ${js.toFixed(0)} KB > ${jsLimit} KB`);
  if (css > budget.cssKbPerPage) problems.push(`${route}: CSS ${css.toFixed(0)} KB > ${budget.cssKbPerPage} KB`);
  if (doc > budget.htmlKbPerPage) problems.push(`${route}: HTML ${doc.toFixed(0)} KB > ${budget.htmlKbPerPage} KB`);
  rows.push({ route, js, css, doc });
}

if (!pages.length) {
  console.error("Budget check found no built pages. Run next build first.");
  process.exit(1);
}
const worst = rows.sort((a, b) => b.js - a.js).slice(0, 3);
console.log(`Budget: ${pages.length} pages. Heaviest JS: ${worst.map((r) => `${r.route} ${r.js.toFixed(0)} KB`).join(", ")}.`);
if (problems.length) {
  console.error(`Performance budget exceeded:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("Performance budget passed.");
