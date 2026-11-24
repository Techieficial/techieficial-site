import { ArrowUpRightIcon, CheckIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr";
import { home } from "@/content/home";
import { pricingPage, ui } from "@/content/pages";
import { serviceGroups } from "@/content/pricing";
import { siteConfig } from "@/site.config";
import { DemoTabs } from "@/components/DemoTabs";
import { Reveal } from "@/components/Reveal";
import { Button, Section, SectionHeader } from "@/components/ui";

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

/** Individual services with prices, in tabs (Care plan, System build, Quick fix, Integration, More). Shown on /pricing. */
export function ServicePriceList() {
  const t = pricingPage.servicesList;
  const tabs = serviceGroups.map((g) => ({
    id: g.id,
    label: g.label,
    content: (
      <>
        <p className="text-muted">{g.intro}</p>
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {g.options.map((o) => (
            <li key={o.key} className="flex flex-col rounded-[20px] border border-rule bg-surface p-7">
              <h3 className="text-xl font-semibold tracking-[-0.02em]">{o.name}</h3>
              <p className="mt-3 font-display text-3xl font-bold">{o.price}</p>
              <p className="mt-1 text-sm text-muted">{o.note}</p>
              <ul className="mt-5 space-y-2 border-t border-rule pt-5 text-[15px]">
                {o.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckIcon weight="bold" aria-hidden className="mt-1 size-4 shrink-0 text-accent-text" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <Button href={`${siteConfig.cta.primary.href}?service=${encodeURIComponent(`${g.label}: ${o.name}`)}`} variant="secondary" arrow={false} className="w-full">
                  {t[o.cta]}
                  <span className="sr-only">: {o.name}</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </>
    ),
  }));
  return (
    <Section id="services-prices" labelledBy="services-prices-title">
      <SectionHeader id="services-prices-title" title={t.title} intro={t.intro} />
      <DemoTabs tabs={tabs} label={t.tabsLabel} />
      <p className="mt-8 text-sm text-muted">{t.note}</p>
    </Section>
  );
}
