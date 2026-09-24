"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useId, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { forms } from "@/content/pages";
import { track, type ConversionEvent } from "@/lib/analytics";
import { leadSchema, type LeadSource } from "@/lib/lead";
import { Turnstile } from "./Turnstile";

export type FieldKey = "name" | "email" | "phone" | "businessType" | "goal" | "budget" | "message" | "testBuild";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-rule bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-muted transition-colors focus:border-accent-hover focus:outline-none aria-[invalid=true]:border-accent-3";

export function LeadForm({
  source,
  fields,
  submitLabel,
  event = "form_submit",
  redirectTo,
  successMessage = forms.success,
  selection,
  compact = false,
}: {
  source: LeadSource;
  fields: FieldKey[];
  submitLabel: string;
  event?: ConversionEvent;
  redirectTo?: string;
  successMessage?: string;
  selection?: Record<string, string>;
  compact?: boolean;
}) {
  const router = useRouter();
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);
  const has = (k: FieldKey) => fields.includes(k);
  const id = (k: string) => `${uid}-${k}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" && v.trim() ? v.trim() : undefined;
    };
    const answers: Record<string, string> = {};
    if (has("testBuild")) {
      const type = get("buildType");
      if (type) answers[forms.testBuild.type] = type;
      for (const q of forms.testBuild.questions) {
        const v = get(`q-${q.name}`);
        if (v) answers[q.label] = v;
      }
    }
    const payload = {
      source,
      name: get("name"),
      email: get("email") ?? "",
      phone: get("phone") ?? "",
      businessType: get("businessType"),
      goal: get("goal"),
      budget: get("budget"),
      message: get("message"),
      smsConsent: fd.get("smsConsent") === "on",
      answers: Object.keys(answers).length ? answers : undefined,
      selection,
      page: window.location.pathname,
      website: (fd.get("website") as string) || undefined,
      turnstileToken: token || undefined,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        next[key] =
          issue.message === "email" ? forms.errorEmail : issue.message === "phone" ? forms.errorPhone : forms.errorRequired;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(id(first))?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      track(event, { source });
      if (redirectTo) {
        router.push(redirectTo);
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-2xl border border-rule bg-surface p-5">
        <CheckCircleIcon aria-hidden weight="duotone" className="size-7 shrink-0 text-accent-2" />
        <p className="pt-0.5">{successMessage}</p>
      </div>
    );
  }

  const field = (k: string, label: string, input: ReactNode, optional = false) => (
    <div className="grid gap-2">
      <label htmlFor={id(k)} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">({forms.optional})</span>}
      </label>
      {input}
      {errors[k] && (
        <p id={`${id(k)}-err`} className="text-sm text-accent-3">
          {errors[k]}
        </p>
      )}
    </div>
  );
  const aria = (k: string) => ({
    id: id(k),
    name: k,
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `${id(k)}-err` : undefined,
  });

  if (compact) {
    return (
      <form noValidate onSubmit={onSubmit} className="w-full max-w-md">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor={id("email")} className="sr-only">
            {forms.email}
          </label>
          <input {...aria("email")} type="email" autoComplete="email" placeholder={forms.email} className={inputClass} />
          <button type="submit" disabled={status === "sending"} className="h-12 shrink-0 rounded-full bg-electric px-6 font-semibold text-on-accent disabled:opacity-70">
            {status === "sending" ? forms.sending : submitLabel}
          </button>
        </div>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <div aria-live="polite" className="mt-2 text-sm">
          {errors.email && <p className="text-accent-3">{errors.email}</p>}
          {status === "error" && <p className="text-accent-3">{forms.errorGeneric}</p>}
        </div>
        <Turnstile onToken={onToken} />
      </form>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {has("name") && field("name", forms.name, <input {...aria("name")} autoComplete="name" className={inputClass} />)}
        {has("email") && field("email", forms.email, <input {...aria("email")} type="email" autoComplete="email" className={inputClass} />)}
      </div>
      {has("phone") &&
        field(
          "phone",
          forms.phone,
          <input {...aria("phone")} type="tel" autoComplete="tel" placeholder="+1 415 000 0000" className={inputClass} />,
          source !== "contact" && source !== "demo-callme",
        )}
      <div className="grid gap-5 sm:grid-cols-2">
        {has("businessType") &&
          field(
            "businessType",
            forms.businessType,
            <select {...aria("businessType")} className={inputClass} defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              {forms.businessTypes.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>,
            true,
          )}
        {has("goal") &&
          field(
            "goal",
            forms.goal,
            <select {...aria("goal")} className={inputClass} defaultValue={selection?.goal ?? ""}>
              <option value="" disabled>
                Choose one
              </option>
              {forms.goals.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>,
            true,
          )}
      </div>
      {has("budget") &&
        field(
          "budget",
          forms.budget,
          <select {...aria("budget")} className={inputClass} defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {forms.budgets.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>,
          true,
        )}
      {has("testBuild") && (
        <>
          <fieldset className="grid gap-3">
            <legend className="text-sm font-medium">{forms.testBuild.type}</legend>
            <div className="flex flex-wrap gap-3">
              {forms.testBuild.types.map((t, i) => (
                <label key={t} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-rule px-4 has-[:checked]:border-accent-hover has-[:checked]:bg-surface-2">
                  <input type="radio" name="buildType" value={t} defaultChecked={i === 0} className="accent-[#7c5cff]" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          {forms.testBuild.questions.map((q) =>
            field(`q-${q.name}`, q.label, <input id={id(`q-${q.name}`)} name={`q-${q.name}`} className={inputClass} />, true),
          )}
        </>
      )}
      {has("message") &&
        field("message", forms.message, <textarea {...aria("message")} rows={4} className={`${inputClass} resize-y`} />, true)}
      {has("phone") && (
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input type="checkbox" name="smsConsent" className="mt-1 size-4 shrink-0 accent-[#7c5cff]" />
          <span>
            {forms.smsConsent}{" "}
            <Link href="/sms-terms" className="text-accent-text underline underline-offset-2">
              {forms.smsLink}
            </Link>
            .
          </span>
        </label>
      )}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <Turnstile onToken={onToken} />
      <div aria-live="polite">
        {status === "error" && (
          <p role="alert" className="rounded-xl border border-accent-3/40 px-4 py-3 text-sm text-accent-3">
            {forms.errorGeneric}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-14 items-center justify-center rounded-full bg-electric px-7 font-semibold text-on-accent transition-transform active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? forms.sending : submitLabel}
      </button>
    </form>
  );
}
