"use client";

import { useState, type FormEvent } from "react";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { SERVICES } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[12px] border border-rule bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-accent-3";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [services, setServices] = useState<string[]>([]);

  const toggle = (name: string) =>
    setServices((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      company: String(form.get("company") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      services,
    };
    const next: Record<string, string> = {};
    if (!data.name) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Enter a valid email address, like you@company.com.";
    if (!data.message) next.message = "Tell us a little about the project.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start justify-center rounded-[20px] border border-rule bg-bg p-8 md:p-10" role="status">
        <CheckCircleIcon weight="duotone" className="size-12 text-accent-2" aria-hidden />
        <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em]">Project received.</h3>
        <p className="mt-3 max-w-[40ch] leading-relaxed text-muted">
          Thanks. The team will reply by email. [PLACEHOLDER: typical reply time]
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 rounded-[20px] border border-rule bg-bg p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={errors.name} autoComplete="name" />
        <Field label="Work email" name="email" type="email" error={errors.email} autoComplete="email" />
      </div>
      <Field label="Company" name="company" optional autoComplete="organization" />

      <fieldset>
        <legend className="text-sm font-medium">What do you need help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const on = services.includes(s.name);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.name)}
                className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${on ? "border-transparent bg-electric font-medium text-on-accent" : "border-rule text-muted hover:border-accent hover:text-ink"}`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          About the project
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${field} resize-y`}
          placeholder="Goals, current channels, timeline"
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-accent-3">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="rounded-[12px] border border-accent-3/40 px-4 py-3 text-sm text-accent-3" role="alert">
          Your project was not sent. Check your connection and try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex h-14 items-center justify-center rounded-full bg-electric px-7 font-semibold text-on-accent transition-[transform,opacity] duration-300 ease-out-expo active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending..." : "Start your project"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  optional,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={field}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-accent-3">
          {error}
        </p>
      )}
    </div>
  );
}
