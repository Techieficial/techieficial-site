import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { Inter, Space_Grotesk } from "next/font/google";
import "../app/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["600", "700"] });

// Same font variables as app/layout.tsx, set on <html> so every story renders with the site fonts.
if (typeof document !== "undefined") document.documentElement.classList.add(inter.variable, spaceGrotesk.variable);

const preview: Preview = {
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    controls: { matchers: { color: /(background|color)$/i } },
    // Fail the a11y panel (and npm run storybook:test) on any axe violation.
    a11y: { test: "error" },
    backgrounds: { disable: true },
  },
  decorators: [
    withThemeByDataAttribute({ themes: { light: "light", dark: "dark" }, defaultTheme: "light", attributeName: "data-theme" }),
    (Story) => (
      <div className="bg-bg text-ink">
        <Story />
      </div>
    ),
  ],
};

export default preview;
