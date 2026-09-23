"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { CtaButton } from "./CtaButton";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#academy", label: "Academy" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-3 z-40 px-4 md:top-4 md:px-6">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 rounded-full border border-rule bg-surface/85 pl-4 pr-2 backdrop-blur-xl md:pl-5"
      >
        <Logo />
        <ul className="hidden flex-1 items-center justify-center gap-8 text-[15px] text-muted lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="py-2 transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto hidden sm:block lg:ml-0">
          <CtaButton />
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative ml-auto grid size-12 shrink-0 place-items-center rounded-full sm:ml-0 lg:hidden"
        >
          <span
            className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-500 ease-out-expo ${open ? "rotate-45" : "-translate-y-[4px]"}`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-500 ease-out-expo ${open ? "-rotate-45" : "translate-y-[4px]"}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-4 top-[5.25rem] rounded-3xl bg-surface p-6 shadow-[0_24px_60px_-20px_rgba(14,26,43,0.35)] lg:hidden"
      >
        <ul className="flex flex-col">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-rule py-4 text-xl font-medium tracking-[-0.02em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6" onClick={() => setOpen(false)}>
          <CtaButton size="lg" className="w-full justify-between" />
        </div>
      </div>
    </header>
  );
}
