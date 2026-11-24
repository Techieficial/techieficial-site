import { ArrowUpRightIcon, CheckIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr";
import { home } from "@/content/home";
import { ui } from "@/content/pages";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/ui";

/** "Stop managing three vendors" pain cards with sourced stats. Shown on the services hub. */
export function ProblemSection() {
  return (
    <Section id="problem" labelledBy="problem-title">
      <SectionHeader id="problem-title" title={home.problem.title} intro={home.problem.intro} />
      <div className="grid gap-5 md:grid-cols-3">
        {home.problem.cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-[20px] border border-rule bg-surface p-7">
              <p className="font-display text-5xl font-bold tracking-[-0.03em] text-electric">{c.stat}</p>
              <p className="mt-2 text-sm text-muted">{c.statLabel}</p>
              <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
              <a href={c.href} className="mt-auto inline-flex items-center gap-1 pt-6 text-sm text-accent-text hover:text-ink" rel="noopener" target="_blank">
                Source: {c.source}
                <ArrowUpRightIcon aria-hidden className="size-3.5" />{" "}
                <span className="sr-only">{ui.newTab}</span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Techieficial vs. separate vendors vs. in-house. Shown on the pricing page. */
export function ComparisonSection() {
  return (
    <Section labelledBy="compare-title">
      <SectionHeader id="compare-title" title={home.comparison.title} />
      <div className="overflow-x-auto rounded-[20px] border border-rule">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">{home.comparison.caption}</caption>
          <thead>
            <tr className="border-b border-rule">
              <td className="p-5" />
              {home.comparison.columns.map((c, i) => (
                <th key={c} scope="col" className={`p-5 font-display text-lg font-semibold ${i === 0 ? "bg-surface-2 text-accent-text" : "text-muted"}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {home.comparison.rows.map((r) => (
              <tr key={r.label} className="border-b border-rule last:border-b-0">
                <th scope="row" className="p-5 font-medium">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={v} className={`p-5 align-top leading-relaxed ${i === 0 ? "bg-surface-2" : "text-muted"}`}>
                    <span className="flex gap-2.5">
                      {i === 0 ? (
                        <CheckIcon weight="bold" aria-hidden className="mt-1 size-4 shrink-0 text-accent-2" />
                      ) : (
                        <MinusIcon aria-hidden className="mt-1 size-4 shrink-0" />
                      )}
                      {v}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
