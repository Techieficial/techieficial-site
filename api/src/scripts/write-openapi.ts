import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildOpenApi, createApp } from "../app.js";
import { loadConfig } from "../config/env.js";

/** Writes api/openapi.json from the running code, without listening on a port or touching a database. */
const app = await createApp(loadConfig({ NODE_ENV: "development", LOG_LEVEL: "silent" }));
await app.init();
const doc = buildOpenApi(app);
const out = fileURLToPath(new URL("../../openapi.json", import.meta.url));
writeFileSync(out, JSON.stringify(doc, null, 2) + "\n");
await app.close();
process.stdout.write(`Wrote ${out} (${Object.keys(doc.paths).length} paths)\n`);
