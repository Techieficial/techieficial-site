"use client";

import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { SERVICES } from "@/lib/content";

export function Services() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId)!;

  return (
    <section id="services" className="px-4 py-24 md:px-6 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Five service lines. One plan connecting them.
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">
          Hire us for one, or let us run all five. Each is built to hand off cleanly to the next, so
          nothing you pay for works in isolation.
        </p>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          {/* Desktop: selectable list */}
          <div role="tablist" aria-label="Services" aria-orientation="vertical" className="hidden flex-col lg:flex">
            {SERVICES.map((s) => {
              const selected = s.id === activeId;
              return (
                <button
                  key={s.id}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  onClick={() => setActiveId(s.id)}
                  onMouseEnter={() => setActiveId(s.id)}
                  className={`group flex items-center justify-between border-t border-rule py-6 text-left transition-colors duration-300 last:border-b ${selected ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  <span className="text-[26px] font-medium tracking-[-0.03em]">{s.name}</span>
                  <span
                    aria-hidden
                    className={`h-2 rounded-full bg-accent transition-[width,opacity] duration-500 ease-out-expo ${selected ? "w-12 opacity-100" : "w-3 opacity-0 group-hover:opacity-40"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Desktop: panel */}
          <div
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            className="hidden rounded-[20px] bg-surface p-10 shadow-[0_30px_80px_-40px_rgba(14,26,43,0.28)] lg:block"
          >
            <ServiceDetail key={active.id} service={active} />
          </div>

          {/* Mobile: stacked disclosures */}
          <div className="flex flex-col gap-3 lg:hidden">
            {SERVICES.map((s, i) => (
              <details
                key={s.id}
                open={i === 0}
                className="group rounded-[16px] bg-surface p-5 open:pb-6"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-xl font-medium tracking-[-0.02em]">
                  {s.name}
                  <span
                    aria-hidden
                    className="relative size-5 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-[1.5px] before:bg-ink after:absolute after:inset-y-0 after:left-1/2 after:w-[1.5px] after:bg-ink after:transition-transform group-open:after:scale-y-0"
                  />
                </summary>
                <div className="pt-5">
                  <ServiceDetail service={s} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <div className="fade-in">
      <p className="max-w-[52ch] text-lg leading-relaxed md:text-xl md:leading-relaxed">{service.summary}</p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {service.includes.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-snug">
            <CheckIcon weight="bold" className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-rule pt-6">
        <p className="text-sm text-muted">
          {service.id === "academy" || service.id === "video" ? "Formats" : "Platforms"}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {service.platforms.map((p) => (
            <li
              key={p.name}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm ${p.soon ? "border-dashed border-rule text-muted" : "border-rule bg-bg"}`}
            >
              {p.name}
              {p.soon && <span className="text-xs">Coming soon</span>}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
