"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowRightIcon, CaretDownIcon, PhoneCallIcon } from "@phosphor-icons/react";
import { siteConfig, telHref } from "@/site.config";
import { nav } from "@/content/pages";
import { Logo } from "./Logo";
import { ServiceGlyph } from "./ServiceGlyph";
import { AnnouncementBar } from "./Bars";
import { ThemeToggle } from "./ThemeToggle";

type Link_ = { label: string; href: string };

/** Menu data with every link already resolved to a page that exists (see lib/nav.ts). */
export type NavMenu = {
  teamHref: string;
  cards: { name: string; line: string; icon: string; href: string }[];
  wholeTeam: { title: string; body: string; href: string } | null;
  industries: Link_[];
  services: Link_[];
  links: Link_[];
};

export function Navbar({ menu }: { menu: NavMenu }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaId = useId();
  const sheetId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const links = menu.links;
  const phone = siteConfig.contact.demoPhone;

  // Glass background after 80px of scroll, observed with a sentinel instead of a scroll listener.
  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
    setSheetOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
  }, [sheetOpen]);

  const closeAll = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setMegaOpen(false);
    setSheetOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) triggerRef.current?.focus();
      closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen, closeAll]);

  const openWithDelay = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(true), 120);
  };
  const closeWithDelay = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(false), 200);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const servicesItemRef = useRef<HTMLLIElement>(null);

  const openAndFocusFirst = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setMegaOpen(true);
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
  };

  // Close the mega-menu when keyboard focus moves outside the Services item and the menu.
  const onFocusOut = (e: FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (!megaOpen || !next) return;
    if (servicesItemRef.current?.contains(next) || menuRef.current?.contains(next)) return;
    setMegaOpen(false);
  };

  // The menu sits after the nav in the page, so Tab order is joined up by hand:
  // Tab past the last menu link goes on to the next nav link, Shift+Tab from the first goes back to the toggle.
  const onMenuKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    if (!items.length) return;
    if (e.shiftKey && document.activeElement === items[0]) {
      e.preventDefault();
      triggerRef.current?.focus();
    } else if (!e.shiftKey && document.activeElement === items[items.length - 1]) {
      e.preventDefault();
      const after = servicesItemRef.current?.nextElementSibling?.querySelector<HTMLAnchorElement>("a");
      setMegaOpen(false);
      after?.focus();
    }
  };

  const solid = scrolled || megaOpen || sheetOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-40" onBlur={onFocusOut}>
      <AnnouncementBar />
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 ${solid ? "border-b border-rule bg-bg/90 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1240px] items-center gap-6 px-4 sm:px-6">
          <Logo />

          <ul className="ml-4 hidden items-center gap-1 lg:flex">
            <li ref={servicesItemRef} onMouseEnter={openWithDelay} onMouseLeave={closeWithDelay} className="relative flex items-center">
              <Link
                href={menu.teamHref}
                aria-current={pathname === menu.teamHref ? "page" : undefined}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    openAndFocusFirst();
                  }
                }}
                className="inline-flex h-11 items-center rounded-l-full pl-4 pr-1 text-[15px] text-ink/85 hover:text-ink aria-[current=page]:text-ink"
              >
                {nav.team.label}
              </Link>
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={megaOpen}
                aria-controls={megaId}
                aria-label={nav.team.menuToggle}
                onClick={() => setMegaOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey && megaOpen)) {
                    e.preventDefault();
                    openAndFocusFirst();
                  }
                }}
                className="inline-grid size-11 place-items-center rounded-r-full pr-2 text-ink/85 hover:text-ink"
              >
                <CaretDownIcon aria-hidden className={`size-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="inline-flex h-11 items-center rounded-full px-4 text-[15px] text-ink/85 hover:text-ink aria-[current=page]:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            {phone && (
              <a href={telHref(phone)} data-event="demo_call_started" className="inline-flex items-center gap-2 text-[15px] font-medium text-ink/90 hover:text-accent-text">
                <PhoneCallIcon aria-hidden className="size-4" />
                {siteConfig.cta.callAi.label}
              </a>
            )}
            <Link
              href={siteConfig.cta.primary.href}
              className="inline-flex h-11 items-center rounded-full bg-electric px-5 text-[15px] font-semibold text-on-accent transition-transform active:scale-[0.98]"
            >
              {siteConfig.cta.primary.label}
            </Link>
          </div>

          <ThemeToggle className="ml-auto lg:hidden" />
          <button
            type="button"
            className="relative grid size-11 place-items-center rounded-full lg:hidden"
            aria-expanded={sheetOpen}
            aria-controls={sheetId}
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            onClick={() => setSheetOpen((v) => !v)}
          >
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${sheetOpen ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${sheetOpen ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </nav>

        {/* Desktop mega-menu */}
        <div
          id={megaId}
          ref={menuRef}
          hidden={!megaOpen}
          onKeyDown={onMenuKeyDown}
          onClick={(e) => (e.target as HTMLElement).closest("a") && closeAll()}
          onMouseEnter={openWithDelay}
          onMouseLeave={closeWithDelay}
          className="hidden border-y border-rule bg-bg shadow-[0_24px_48px_-24px_var(--shadow)] lg:block"
        >
          <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-8 px-6 py-8">
            <div>
              <ul className="grid grid-cols-2 gap-2">
                {menu.cards.map((c) => (
                  <li key={c.name}>
                    <Link href={c.href} className="flex gap-4 rounded-2xl p-4 transition-colors hover:bg-surface-2">
                      <ServiceGlyph service={{ icon: c.icon }} />
                      <span>
                        <span className="block font-medium">{c.name}</span>{" "}
                        <span className="mt-1 block text-sm leading-snug text-muted">{c.line}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {menu.wholeTeam && (
                <Link href={menu.wholeTeam.href} className="group mt-2 flex items-center justify-between gap-4 rounded-2xl bg-surface p-5 transition-colors hover:bg-surface-2">
                  <span>
                    <span className="block font-display text-lg font-semibold">{menu.wholeTeam.title}</span>{" "}
                    <span className="mt-1 block text-sm text-muted">{menu.wholeTeam.body}</span>
                  </span>
                  <ArrowRightIcon aria-hidden className="size-5 shrink-0 text-accent-text transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
            {[
              { title: nav.byIndustry, links: menu.industries },
              { title: nav.moreServices, links: menu.services },
            ].map((col) => (
              <div key={col.title}>
                <p className="px-4 text-sm font-medium text-muted">{col.title}</p>
                <ul className="mt-3 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block rounded-xl px-4 py-2.5 hover:bg-surface-2">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id={sheetId}
        hidden={!sheetOpen}
        className="fixed inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto bg-bg px-4 pb-28 pt-4 lg:hidden"
      >
        <ul className="divide-y divide-rule border-b border-rule">
          <li>
            <button
              type="button"
              aria-expanded={servicesExpanded}
              onClick={() => setServicesExpanded((v) => !v)}
              className="flex w-full items-center justify-between py-4 text-left text-xl font-medium"
            >
              {nav.team.label}
              <CaretDownIcon aria-hidden className={`size-5 transition-transform ${servicesExpanded ? "rotate-180" : ""}`} />
            </button>
            {servicesExpanded && (
              <ul className="space-y-1 pb-4">
                <li>
                  <Link href={menu.teamHref} className="block rounded-xl px-2.5 py-2.5 font-medium hover:bg-surface">
                    {nav.team.allLabel}
                  </Link>
                </li>
                {menu.cards.map((c) => (
                  <li key={c.name}>
                    <Link href={c.href} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-surface">
                      <ServiceGlyph service={{ icon: c.icon }} small />
                      {c.name}
                    </Link>
                  </li>
                ))}
                {menu.wholeTeam && (
                  <li>
                    <Link href={menu.wholeTeam.href} className="block rounded-xl px-2.5 py-2.5 font-medium text-accent-text hover:bg-surface">
                      {menu.wholeTeam.title}
                    </Link>
                  </li>
                )}
                {[
                  { title: nav.byIndustry, links: menu.industries },
                  { title: nav.moreServices, links: menu.services },
                ].map((col) => (
                  <Fragment key={col.title}>
                    <li className="px-2.5 pt-3 text-sm text-muted">{col.title}</li>
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="block rounded-xl px-2.5 py-2.5 hover:bg-surface">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
            )}
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block py-4 text-xl font-medium">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="fixed inset-x-0 bottom-0 border-t border-rule bg-bg/95 p-4 backdrop-blur-xl">
          <Link
            href={siteConfig.cta.primary.href}
            className="flex h-14 w-full items-center justify-center rounded-full bg-electric font-semibold text-on-accent"
          >
            {siteConfig.cta.primary.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
