"use client";

import { useRef, useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { pricingPage } from "@/content/pages";
import { builderGoals, builderSizes, formatUsd, recommendPackage, type BuilderGoal, type BuilderSize } from "@/content/pricing";
import { siteConfig, type ServiceSlug } from "@/site.config";
import { track } from "@/lib/analytics";
import { buttonClass } from "@/components/ui";

const t = pricingPage.builder;

function Chip({ on, onClick, children, role = "checkbox" }: { on: boolean; onClick: () => void; children: React.ReactNode; role?: "checkbox" | "radio" }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={on}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-colors ${on ? "border-accent-hover bg-surface-2 text-ink" : "border-rule text-muted hover:border-accent-hover hover:text-ink"}`}
    >
      {on && <CheckIcon aria-hidden weight="bold" className="size-4 text-accent-2" />}
      {children}
    </button>
  );
}

export function EngineBuilder({ services }: { services: { slug: ServiceSlug; name: string }[] }) {
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<ServiceSlug[]>([]);
  const [size, setSize] = useState<BuilderSize>();
  const [goal, setGoal] = useState<BuilderGoal>();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const go = (n: number) => {
    setStep(n);
    if (n === 4 && size && goal) {
      const pkg = recommendPackage(picked, size, goal);
      track("engine_builder_complete", { package: pkg.key });
    }
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const toggle = (s: ServiceSlug) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const canNext = step === 1 ? picked.length > 0 : step === 2 ? !!size : !!goal;
  const pkg = size && goal ? recommendPackage(picked, size, goal) : undefined;

  const bookHref = () => {
    const q = new URLSearchParams({
      package: pkg?.key ?? "",
      services: picked.join(","),
      size: builderSizes.find((s) => s.key === size)?.label ?? "",
      goal: builderGoals.find((g) => g.key === goal)?.label ?? "",
    });
    return `${siteConfig.cta.primary.href}?${q}`;
  };

  const titles = [t.step1, t.step2, t.step3];

  return (
    <div className="rounded-[24px] border border-rule bg-surface p-6 md:p-10">
      <div aria-live="polite">
        {step <= 3 ? (
          <>
            <p className="text-sm font-medium text-accent-text">{t.stepOf.replace("{n}", String(step))}</p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-bold outline-none">
              {titles[step - 1]}
            </h3>
            {step === 1 && <p className="mt-1 text-muted">{t.pickHint}</p>}
          </>
        ) : (
          <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
            {t.resultTitle}: <span className="text-electric">{pkg?.name}</span>
          </h3>
        )}
      </div>

      {step === 1 && (
        <div role="group" aria-label={t.step1} className="mt-6 flex flex-wrap gap-3">
          {services.map((s) => (
            <Chip key={s.slug} on={picked.includes(s.slug)} onClick={() => toggle(s.slug)}>
              <span aria-hidden className="size-2.5 rounded-full" style={{ background: siteConfig.serviceColors[s.slug] }} />
              {s.name}
            </Chip>
          ))}
        </div>
      )}
      {step === 2 && (
        <div role="radiogroup" aria-label={t.step2} className="mt-6 flex flex-wrap gap-3">
          {builderSizes.map((s) => (
            <Chip key={s.key} role="radio" on={size === s.key} onClick={() => setSize(s.key)}>
              {s.label}
            </Chip>
          ))}
        </div>
      )}
      {step === 3 && (
        <div role="radiogroup" aria-label={t.step3} className="mt-6 flex flex-wrap gap-3">
          {builderGoals.map((g) => (
            <Chip key={g.key} role="radio" on={goal === g.key} onClick={() => setGoal(g.key)}>
              {g.label}
            </Chip>
          ))}
        </div>
      )}

      {step === 4 && pkg && (
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-muted">{pkg.tagline}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted">{t.setup}</dt>
                <dd className="font-display text-3xl font-bold">{formatUsd(pkg.setupFrom)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">{t.monthly}</dt>
                <dd className="font-display text-3xl font-bold">
                  {formatUsd(pkg.monthlyFrom)}
                  {pkg.monthlyNote && <span className="block text-sm font-normal text-muted">{pkg.monthlyNote}</span>}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h4 className="font-semibold">{t.includes}</h4>
            <ul className="mt-3 space-y-2">
              {pkg.includes.map((i) => (
                <li key={i} className="flex gap-2">
                  <CheckIcon aria-hidden weight="bold" className="mt-1 size-4 shrink-0 text-accent-2" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {step > 1 && step <= 3 && (
          <button type="button" className={buttonClass("ghost")} onClick={() => go(step - 1)}>
            {t.back}
          </button>
        )}
        {step <= 3 && (
          <button type="button" className={buttonClass("primary")} disabled={!canNext} aria-disabled={!canNext} onClick={() => canNext && go(step + 1)}>
            {t.next}
          </button>
        )}
        {step === 4 && (
          <>
            <a href={bookHref()} className={buttonClass("primary", "lg")}>
              {siteConfig.cta.primary.label}
            </a>
            <button
              type="button"
              className={buttonClass("ghost")}
              onClick={() => {
                setPicked([]);
                setSize(undefined);
                setGoal(undefined);
                go(1);
              }}
            >
              {t.restart}
            </button>
            <p className="w-full text-sm text-muted">{t.selectionNote}</p>
          </>
        )}
      </div>
    </div>
  );
}
