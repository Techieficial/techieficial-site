"use client";

import { useState } from "react";
import { SERVICES, type ServiceId } from "@/lib/content";

const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);
const DEFAULT_NOTE =
  "Example 12-week launch plan. Hover or tab through a row to see what happens when.";

export function FlightPlan() {
  const [active, setActive] = useState<ServiceId | null>(null);
  const note = SERVICES.find((s) => s.id === active)?.planNote ?? DEFAULT_NOTE;
  let barIndex = 0;

  return (
    <figure
      className="rounded-[20px] border border-rule bg-surface p-4 sm:p-6 md:p-8"
      onMouseLeave={() => setActive(null)}
    >
      <p className="mb-4 text-sm text-muted md:hidden">Example 12-week launch plan</p>

      {/* Week header */}
      <div className="grid grid-cols-12 gap-x-1 md:grid-cols-[200px_repeat(12,1fr)] md:gap-x-1.5">
        <div className="hidden md:block" />
        {WEEKS.map((w) => (
          <div
            key={w}
            className="pb-3 text-center font-mono text-[11px] text-muted tabular sm:text-xs"
          >
            <span className="hidden sm:inline">W</span>
            {w}
          </div>
        ))}
      </div>

      <ul className="flex flex-col">
        {SERVICES.map((s) => {
          const isActive = active === s.id;
          const dim = active !== null && !isActive;
          return (
            <li key={s.id} className="border-t border-rule">
              <a
                href={`#service-${s.id}`}
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
                className="grid grid-cols-12 items-center gap-x-1 gap-y-2 py-3 md:grid-cols-[200px_repeat(12,1fr)] md:gap-x-1.5 md:py-3.5"
              >
                <span
                  className={`col-span-12 text-sm font-medium transition-colors duration-300 md:col-span-1 md:text-[15px] ${dim ? "text-muted" : "text-ink"}`}
                >
                  {s.name}
                </span>
                <span className="col-span-12 grid h-7 grid-cols-12 gap-x-1 md:h-8 md:gap-x-1.5">
                  {WEEKS.map((w) => (
                    <span
                      key={w}
                      style={{ gridColumn: w, gridRow: 1 }}
                      className="rounded-[4px] bg-track"
                    />
                  ))}
                  {s.plan.map(([start, end]) => {
                    const i = barIndex++;
                    return (
                      <span
                        key={start}
                        style={{
                          gridColumn: `${start} / ${end + 1}`,
                          gridRow: 1,
                          ["--i" as string]: i,
                        }}
                        className={`flight-bar rounded-[6px] transition-opacity duration-300 ${s.id === "academy" ? "bg-ink" : "bg-accent"} ${dim ? "opacity-30" : "opacity-100"}`}
                      />
                    );
                  })}
                </span>
                {/* Touch screens get the note inline, no hover needed */}
                <span className="col-span-12 text-[13px] leading-snug text-muted md:hidden">
                  {s.planNote}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <figcaption
        aria-live="polite"
        className="mt-2 hidden max-w-[72ch] border-t border-rule pt-4 text-sm leading-relaxed text-muted md:block"
      >
        {note}
      </figcaption>
    </figure>
  );
}
