#!/usr/bin/env node
/**
 * Fails the build if placeholder text or em-dashes reach production.
 * Scans content/ (except _missing.md, _review.md and draft files) and the visible text of built pages.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";

const root = process.cwd();
const rules = [
  { name: "PLACEHOLDER", re: /PLACEHOLDER/ },
  { name: "lorem", re: /lorem/i },
  { name: "TODO", re: /\bTODO\b/ },
  { name: "TBD", re: /\bTBD\b/ },
  { name: "[YOUR", re: /\[YOUR/i },
  { name: "XXX", re: /XXX/ },
  { name: "example.com", re: /example\.com/i },
  { name: "em-dash", re: /—/ },
];

function walk(dir, exts, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.includes(extname(name))) out.push(p);
  }
  return out;
}

/** Visible text of an HTML page: no scripts, styles or tags. */
const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, (e) => (e === "&#x2014;" || e === "&mdash;" ? "—" : " "));

const problems = [];
const check = (file, text) => {
  text.split("\n").forEach((line, i) => {
    for (const r of rules) if (r.re.test(line)) problems.push(`${relative(root, file)}:${i + 1}  ${r.name}  ${line.trim().slice(0, 120)}`);
  });
};

// 1. Content files (drafts and the tracking lists are allowed to mention missing items).
for (const file of walk(join(root, "content"), [".md", ".mdx", ".ts", ".json"])) {
  if (["_missing.md", "_review.md"].includes(basename(file))) continue;
  const text = readFileSync(file, "utf8");
  if (/^draft:\s*true/m.test(text)) continue;
  check(file, text);
}
check(join(root, "site.config.ts"), readFileSync(join(root, "site.config.ts"), "utf8"));

// 2. Built pages (visible text only) and text routes.
const built = join(root, ".next/server/app");
const pages = walk(built, [".html"]);
for (const file of pages) check(file, visibleText(readFileSync(file, "utf8")));
for (const file of walk(built, [".body"])) check(file, readFileSync(file, "utf8"));

if (problems.length) {
  console.error(`\nPlaceholder scan failed (${problems.length}):\n` + problems.map((p) => `  ${p}`).join("\n"));
  process.exit(1);
}
console.log(`Placeholder scan passed (${pages.length} built pages checked).`);
