"use client";

import { useSearchParams } from "next/navigation";
import { contactPage } from "@/content/pages";
import { LeadForm } from "./LeadForm";

const keys = ["package", "services", "size", "goal"] as const;

/** Contact form that carries Engine Builder choices (from the URL) as hidden fields. */
export function ContactForm() {
  const params = useSearchParams();
  const selection: Record<string, string> = {};
  for (const k of keys) {
    const v = params.get(k)?.slice(0, 300);
    if (v) selection[k] = v;
  }
  const has = Object.keys(selection).length > 0;
  return (
    <>
      {has && (
        <div className="mb-6 rounded-2xl border border-rule bg-bg p-4 text-sm">
          <p className="font-semibold">{contactPage.selectionTitle}</p>
          <p className="mt-1 text-muted">{Object.values(selection).join(" · ")}</p>
        </div>
      )}
      <LeadForm
        source="contact"
        fields={["name", "email", "phone", "businessType", "goal", "budget", "message"]}
        submitLabel={contactPage.submit}
        event="form_submit"
        redirectTo="/thank-you"
        selection={has ? selection : undefined}
      />
    </>
  );
}
