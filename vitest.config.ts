import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/** Unit tests (Phase 14): utilities, calculator, form validator, API handler. Run: npm test */
export default defineConfig({
  resolve: {
    alias: {
      "#site/content": fileURLToPath(new URL("./.velite", import.meta.url)),
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
    restoreMocks: true,
  },
});
