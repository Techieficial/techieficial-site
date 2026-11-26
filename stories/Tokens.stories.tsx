import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { colorTokens, contrastPairs, contrastRatio, fonts, typeScale } from "@/lib/tokens";

function Tokens() {
  return (
    <div style={{ display: "grid", gap: 40 }}>
      <section>
        <h2 className="text-2xl font-semibold">Colour</h2>
        <p className="mt-1 text-muted">Switch light/dark in the toolbar. Values live in app/globals.css.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(colorTokens).map(([name, t]) => (
            <div key={name} className="overflow-hidden rounded-2xl border border-rule">
              <div style={{ background: `var(--${name})`, height: 72 }} />
              <div className="p-3 text-sm">
                <div className="font-mono font-medium">--{name}</div>
                <div className="text-muted">{t.use}</div>
                <div className="font-mono text-muted">
                  {t.light} / {t.dark}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Contrast (WCAG AA)</h2>
        <table className="mt-4 text-sm">
          <thead>
            <tr className="text-left">
              <th className="pr-6">Text on background</th>
              <th className="pr-6">Light</th>
              <th>Dark</th>
            </tr>
          </thead>
          <tbody>
            {contrastPairs.map((p) => (
              <tr key={`${p.fg}-${p.bg}`}>
                <td className="pr-6 font-mono">
                  {p.fg} on {p.bg}
                </td>
                <td className="pr-6">{contrastRatio(colorTokens[p.fg].light, colorTokens[p.bg].light).toFixed(2)}:1</td>
                <td>{contrastRatio(colorTokens[p.fg].dark, colorTokens[p.bg].dark).toFixed(2)}:1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Type</h2>
        <p className="mt-1 text-muted">
          {fonts.display}. {fonts.body}.
        </p>
        <div className="mt-6 space-y-4">
          {Object.entries(typeScale).map(([name, size]) => (
            <div key={name}>
              <div className="font-mono text-xs text-muted">
                --text-{name}: {size}
              </div>
              <div className="font-display font-bold tracking-[-0.03em]" style={{ fontSize: `var(--text-${name})` }}>
                Hire your AI team
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = { title: "Foundations/Tokens", component: Tokens, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Tokens>;
export default meta;
export const All: StoryObj<typeof meta> = {};
