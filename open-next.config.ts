import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The site is statically rendered apart from /api/contact, so no incremental cache is needed.
export default defineCloudflareConfig({});
