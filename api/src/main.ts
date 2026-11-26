import { createApp } from "./app.js";
import { loadConfig } from "./config/env.js";

const config = loadConfig();
const app = await createApp(config);
await app.listen(config.PORT);
process.stdout.write(
  JSON.stringify({
    level: "info",
    time: new Date().toISOString(),
    msg: "api started",
    port: config.PORT,
    dataStore: config.SUPABASE_URL ? "supabase" : "memory",
    crmForwarding: Boolean(config.CRM_WEBHOOK_URL),
  }) + "\n",
);
