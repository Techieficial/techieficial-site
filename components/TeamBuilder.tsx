"use client";

import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { offersPage, teamBuilder as t } from "@/content/offers";
import { pricingPage } from "@/content/pages";
import { priceParts, recommendOffer, usageNote } from "@/content/pricing";
import { siteConfig } from "@/site.config";
import { track } from "@/lib/analytics";
import { buttonClass } from "@/components/ui";

function Chip({ on, onClick, children, role = "checkbox" }: { on: boolean; onClick: () => void; children: React.ReactNode; role?: "checkbox" | "radio" }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={on}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-colors ${on ? "border-accent-hover bg-surface-2 text-ink" : "border-rule text-muted hover:border-accent-hover hover:text-ink"}`}
    >
      {on && <CheckIcon aria-hidden weight="bold" className="size-4 text-accent-text" />}
      {children}
    </button>
  );
}

/** Team Builder: 3 questions, then a recommended offer (rules in content/pricing.ts recommendOffer). */
export function TeamBuilder() {
  const [step, setStep] = useState(1);
  const [problems, setProblems] = useState<string[]>([]);
  const [size, setSize] = useState<string>();
  const [crm, setCrm] = useState<string>();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const offer = problems.length ? recommendOffer(problems) : undefined;

  const go = (n: number) => {
    setStep(n);
    if (n === 4 && offer) track("engine_builder_complete", { package: offer.slug });
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const toggle = (k: string) => setProblems((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const canNext = step === 1 ? problems.length > 0 : step === 2 ? !!size : !!crm;
  const labels = problems.map((k) => t.problems.find((p) => p.key === k)?.label ?? k).join(", ");

  const bookHref = () => {
    const q = new URLSearchParams({ package: offer?.name ?? "", goal: labels, size: size ?? "", crm: crm ?? "" });
    return `${siteConfig.cta.primary.href}?${q}`;
  };

  const titles = [t.step1, t.step2, t.step3];
  const price = offer ? priceParts(offer) : undefined;
  const checkoutOpen = offer?.path === "checkout" && siteConfig.checkoutLive && offer.paymentLink;

  return (
    <div className="rounded-[24px] border border-rule bg-surface p-6 md:p-10">
      {/* All three steps are always in the page, so visitors and crawlers see the whole flow up front. */}
      <ol aria-label={t.progressLabel} className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-rule pb-6">
        {t.stepNames.map((name, i) => {
          const n = i + 1;
          const done = step > n;
          const current = step === n;
          return (
            <li key={name} aria-current={current ? "step" : undefined} className={`flex items-center gap-2.5 text-[15px] font-medium ${current ? "text-ink" : done ? "text-ink/85" : "text-muted"}`}>
              <span aria-hidden className={`grid size-7 place-items-center rounded-full border text-sm font-bold ${current ? "border-accent-hover bg-surface-2" : done ? "border-accent text-accent-text" : "border-rule"}`}>
                {done ? <CheckIcon weight="bold" className="size-3.5" /> : n}
              </span>{" "}
              <span>
                <span className="sr-only">{n}. </span>
                {name}
                {done && <span className="sr-only"> ({t.stepDone})</span>}
              </span>
            </li>
          );
        })}
      </ol>
      <noscript>
        <p className="mb-6 text-muted">
          {t.noScript}{" "}
          <a href="#offers" className="font-medium text-accent-text underline">
            {t.noScriptLink}
          </a>
        </p>
      </noscript>
      <div aria-live="polite">
        {step <= 3 ? (
          <>
            <p className="text-sm font-medium text-accent-text">{t.stepOf.replace("{n}", String(step))}</p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-bold outline-none">
              {titles[step - 1]}
            </h3>
            {step === 1 && <p className="mt-1 text-muted">{t.step1Hint}</p>}
          </>
        ) : (
          <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
            {t.resultTitle}: <span className="text-electric">{offer?.name}</span>
          </h3>
        )}
      </div>

      {step === 1 && (
        <div role="group" aria-label={t.step1} className="mt-6 flex flex-wrap gap-3">
          {t.problems.map((p, i) => (
            <Fragment key={p.key}>
              {i > 0 && " "}
              <Chip on={problems.includes(p.key)} onClick={() => toggle(p.key)}>
                {p.label}
              </Chip>
            </Fragment>
          ))}
        </div>
      )}
      {step === 2 && (
        <div role="radiogroup" aria-label={t.step2} className="mt-6 flex flex-wrap gap-3">
          {t.sizes.map((s, i) => (
            <Fragment key={s}>
              {i > 0 && " "}
              <Chip role="radio" on={size === s} onClick={() => setSize(s)}>
                {s}
              </Chip>
            </Fragment>
          ))}
        </div>
      )}
      {step === 3 && (
        <div role="radiogroup" aria-label={t.step3} className="mt-6 flex flex-wrap gap-3">
          {t.crm.map((c, i) => (
            <Fragment key={c}>
              {i > 0 && " "}
              <Chip role="radio" on={crm === c} onClick={() => setCrm(c)}>
                {c}
              </Chip>
            </Fragment>
          ))}
        </div>
      )}

      {step === 4 && offer && price && (
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-muted">{offer.tagline}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {price.setup && (
                <div>
                  <dt className="text-sm text-muted">{pricingPage.setup}</dt>
                  <dd className="font-display text-3xl font-bold">{price.setup}</dd>
                </div>
              )}
              {price.monthly && (
                <div>
                  <dt className="text-sm text-muted">{pricingPage.monthly}</dt>
                  <dd className="font-display text-3xl font-bold">
                    {price.monthly}
                    {offer.monthlyNote && " "}
                    {offer.monthlyNote && <span className="block text-sm font-normal text-muted">{offer.monthlyNote}</span>}
                  </dd>
                </div>
              )}
              {price.oneTime && (
                <div>
                  <dt className="text-sm text-muted">{pricingPage.oneTimeLabel}</dt>
                  <dd className="font-display text-3xl font-bold">{price.oneTime}</dd>
                </div>
              )}
            </dl>
            {offer.monthly !== undefined && <p className="mt-3 text-xs text-muted">{usageNote}</p>}
            {offer.minimumTerm && <p className="mt-1 text-xs text-muted">{offer.minimumTerm}</p>}
          </div>
          <div>
            <h4 className="font-semibold">{pricingPage.includes}</h4>
            <ul className="mt-3 space-y-2">
              {offer.includes.map((i) => (
                <li key={i} className="flex gap-2">
                  <CheckIcon aria-hidden weight="bold" className="mt-1 size-4 shrink-0 text-accent-text" />
                  {i}
                </li>
              ))}
            </ul>
            <Link href={`/offers/${offer.slug}`} className="mt-4 inline-flex min-h-11 items-center font-medium text-accent-text hover:text-ink">
              {offersPage.details}
              <span className="sr-only">: {offer.name}</span>
            </Link>
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
        {step === 4 && offer && (
          <>
            {offer.path === "call" ? (
              <a href={bookHref()} className={buttonClass("primary", "lg")}>
                {siteConfig.cta.primary.label}
              </a>
            ) : checkoutOpen ? (
              <a href={offer.paymentLink} className={buttonClass("primary", "lg")}>
                {offer.checkoutLabel}
              </a>
            ) : (
              <span aria-disabled="true" className={buttonClass("secondary", "lg", "cursor-not-allowed opacity-70")}>
                {pricingPage.checkoutSoon}
              </span>
            )}
            <button
              type="button"
              className={buttonClass("ghost")}
              onClick={() => {
                setProblems([]);
                setSize(undefined);
                setCrm(undefined);
                go(1);
              }}
            >
              {t.restart}
            </button>
            {offer.path === "call" && <p className="w-full text-sm text-muted">{t.selectionNote}</p>}
          </>
        )}
      </div>
    </div>
  );
}
