#!/usr/bin/env node
/**
 * npm run check: every quality gate in order, stopping at the first failure.
 * 1 types, 2 lint, 3 build (+4 placeholder scan), 5-6 Playwright e2e + axe, 7 links, 8 Lighthouse.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const PORT = 3200;
const base = `http://127.0.0.1:${PORT}`;
const localChrome = "/opt/pw-browsers/chromium";
const env = { ...process.env, ...(existsSync(localChrome) && !process.env.CHROME_PATH ? { CHROME_PATH: localChrome } : {}) };

function run(label, cmd) {
  console.log(`\n▶ ${label}\n  $ ${cmd}`);
  const r = spawnSync(cmd, { stdio: "inherit", shell: true, env });
  if (r.status !== 0) {
    console.error(`\n✖ ${label} failed. Fix this before committing.`);
    stopServer();
    process.exit(r.status ?? 1);
  }
  console.log(`✔ ${label}`);
}

let server;
function stopServer() {
  if (server && !server.killed) server.kill("SIGTERM");
}

async function startServer() {
  server = spawn("npx", ["next", "start", "-p", String(PORT), "-H", "127.0.0.1"], { stdio: "ignore", env });
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(base)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("server did not start");
}

const skipLighthouse = process.argv.includes("--no-lighthouse");

run("1. Types", "npm run typecheck");
run("2. Lint", "npx eslint .");
run("3-4. Production build + placeholder scan", "npm run build");
run("5-6. End-to-end + accessibility tests", "npx playwright test");

await startServer();
run("7. Broken links", `npx linkinator ${base} --recurse --skip "^(?!${base.replace(/\./g, "\\.")})" --verbosity error`);
if (skipLighthouse) console.log("\n(Lighthouse skipped)");
else run("8. Lighthouse", "npx lhci autorun");
stopServer();
console.log("\n✔ All checks passed.");
