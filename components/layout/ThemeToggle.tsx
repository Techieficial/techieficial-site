"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { nav } from "@/content/pages";
import { THEME_KEY } from "@/lib/theme";

/** Light/dark switch. The icon is chosen in CSS from data-theme, so server and client markup match. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={nav.themeToggle}
      title={nav.themeToggle}
      className={`grid size-11 place-items-center rounded-full border border-rule text-ink transition-colors hover:border-accent-hover ${className}`}
    >
      <MoonIcon aria-hidden className="theme-moon size-[18px]" />
      <SunIcon aria-hidden className="theme-sun size-[18px]" />
    </button>
  );
}
