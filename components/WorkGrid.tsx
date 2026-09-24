"use client";

import { useState } from "react";
import type { ServiceSlug } from "@/site.config";
import type { CaseStudy } from "@/lib/content";
import { CaseStudyCard } from "./blocks";

export function WorkGrid({ studies, services, allLabel }: { studies: CaseStudy[]; services: { slug: ServiceSlug; name: string }[]; allLabel: string }) {
  const [filter, setFilter] = useState<ServiceSlug | "all">("all");
  const shown = filter === "all" ? studies : studies.filter((c) => c.services.includes(filter));
  return (
    <>
      <div role="group" aria-label={allLabel} className="flex flex-wrap gap-2">
        {[{ slug: "all" as const, name: allLabel }, ...services].map((s) => (
          <button
            key={s.slug}
            type="button"
            aria-pressed={filter === s.slug}
            onClick={() => setFilter(s.slug)}
            className="min-h-11 rounded-full border border-rule px-4 text-sm aria-pressed:border-accent-hover aria-pressed:bg-surface-2"
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <CaseStudyCard key={c.slug} study={c} />
        ))}
      </div>
    </>
  );
}
