import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    a11y: { test: "error" },
  },
  decorators: [
    withThemeByDataAttribute({ themes: { light: "light", dark: "dark" }, defaultTheme: "light", attributeName: "data-theme" }),
    (Story) => (
      <div style={{ background: "var(--bg)", color: "var(--ink)", padding: 24, minHeight: "100%" }}>
        <Story />
      </div>
    ),
  ],
};
export default preview;
