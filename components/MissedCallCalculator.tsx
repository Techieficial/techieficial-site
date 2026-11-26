"use client";

import { useId, useState } from "react";
import { calculatorPage as t } from "@/content/tools";
import { formatUsd } from "@/content/pricing";
import { siteConfig, telHref } from "@/site.config";
import { Button } from "@/components/ui";
import { LeadForm } from "@/components/forms/LeadForm";
import { monthlyLostRevenue } from "@/lib/calculator";

const fields = [
  { key: "calls", label: t.inputs.calls, max: 10000 },
  { key: "missed", label: t.inputs.missed, max: 100 },
  { key: "booking", label: t.inputs.booking, max: 100 },
  { key: "jobValue", label: t.inputs.jobValue, max: 10000000 },
] as const;

type Key = (typeof fields)[number]["key"];

/** Missed-call calculator (formula in lib/calculator.ts). Runs entirely in the browser; the result is announced to screen readers. */
export function MissedCallCalculator() {
  const uid = useId();
  const [values, setValues] = useState<Record<Key, string>>({ calls: "", missed: "", booking: "", jobValue: "" });
  const nums = Object.fromEntries(fields.map((f) => [f.key, Number(values[f.key])])) as Record<Key, number>;
  const complete = fields.every((f) => values[f.key] !== "" && Number.isFinite(nums[f.key]) && nums[f.key] >= 0);
  const monthly = complete ? monthlyLostRevenue(nums) : 0;
  const month = formatUsd(Math.round(monthly));
  const year = formatUsd(Math.round(monthly * 12));
  const phone = siteConfig.contact.demoPhone;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form className="grid gap-5 rounded-[20px] border border-rule bg-surface p-7" onSubmit={(e) => e.preventDefault()}>
        {fields.map((f) => (
          <div key={f.key} className="grid gap-2">
            <label htmlFor={`${uid}-${f.key}`} className="text-sm font-medium">
              {f.label}
            </label>
            <input
              id={`${uid}-${f.key}`}
              type="number"
              inputMode="decimal"
              min={0}
              max={f.max}
              step="any"
              value={values[f.key]}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              className="w-full rounded-xl border border-rule bg-bg px-4 py-3 text-[15px] text-ink focus:border-accent-hover focus:outline-none"
            />
          </div>
        ))}
        <p className="text-xs text-muted">{t.formula}</p>
      </form>

      <div className="rounded-[20px] border border-rule bg-surface-2 p-7">
        <h2 className="text-2xl font-bold">{t.resultTitle}</h2>
        <div aria-live="polite" aria-atomic="true" className="mt-4">
          {complete ? (
            <>
              <p className="font-display text-5xl font-bold text-electric">{month}</p>
              <p className="text-sm text-muted">{t.perMonth}</p>
              <p className="mt-4 font-display text-2xl font-semibold">
                {year} <span className="text-sm font-normal text-muted">{t.perYear}</span>
              </p>
              <p className="mt-5 leading-relaxed">{t.result.replace("{amount}", month)}</p>
            </>
          ) : (
            <p className="text-muted">{t.empty}</p>
          )}
        </div>
        <p className="mt-4 text-sm text-muted">{t.note}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {phone && (
            <Button href={telHref(phone)} data-event="demo_call_started">
              {siteConfig.cta.callAi.label}
            </Button>
          )}{" "}
          <Button href="/offers/ai-receptionist-starter" variant="secondary" arrow={false}>
            {t.starter}
          </Button>
        </div>
        {complete && (
          <div className="mt-8 border-t border-rule pt-6">
            <p className="mb-3 font-semibold">{t.emailTitle}</p>
            <LeadForm
              source="calculator"
              fields={["email"]}
              compact
              submitLabel={t.emailButton}
              successMessage={t.emailSent}
              extraAnswers={{ "Missed-call estimate (monthly)": month, "Calls per week": values.calls, "Missed %": values.missed, "Booking %": values.booking, "Average job value": values.jobValue }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
