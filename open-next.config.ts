import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every marketing page is prerendered at build time. Pages built from templates
// (services, industries, legal, blog) are read from the build output in static
// assets; without this cache they return 404 on Cloudflare. Read-only: no revalidation.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
