import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

/** axe check of every Storybook story, light and dark. Run: npm run storybook:test (builds Storybook first). */
const PORT = 6007;
const localChromium = "/opt/pw-browsers/chromium";

export default defineConfig({
  testDir: "tests-storybook",
  reporter: process.env.CI ? "github" : "list",
  timeout: 180_000,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    launchOptions: existsSync(localChromium) ? { executablePath: localChromium } : {},
    ...devices["Desktop Chrome"],
    // The fade-up reveal is mid-transition when axe runs, which reads as low contrast; reduced motion shows the final state.
    reducedMotion: "reduce",
  },
  webServer: {
    command: `npx http-server storybook-static -p ${PORT} -a 127.0.0.1 -s`,
    url: `http://127.0.0.1:${PORT}/index.json`,
    reuseExistingServer: !process.env.CI,
  },
});
