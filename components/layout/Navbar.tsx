"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRightIcon, CaretDownIcon, PhoneCallIcon } from "@phosphor-icons/react";
import { siteConfig, telHref } from "@/site.config";
import { nav } from "@/content/pages";
import { Logo } from "./Logo";
import { ServiceGlyph, type NavService } from "./ServiceGlyph";
import { AnnouncementBar } from "./Bars";

type NavIndustry = { name: string; url: string };

export function Navbar({
  services,
  industries,
  showWork,
}: {
  services: NavService[];
  industries: NavIndustry[];
  showWork: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaId = useId();
  const sheetId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const phone = siteConfig.contact.demoPhone;
  const links = nav.links.filter((l) => l.href !== "/work" || showWork);

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

  const solid = scrolled || megaOpen || sheetOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <AnnouncementBar />
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 ${solid ? "border-b border-rule bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-[1240px] items-center gap-6 px-4 sm:px-6">
          <Logo />

          <ul className="ml-4 hidden items-center gap-1 lg:flex">
            <li onMouseEnter={openWithDelay} onMouseLeave={closeWithDelay} className="relative">
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onClick={() => setMegaOpen((v) => !v)}
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-[15px] text-ink/85 hover:text-ink"
              >
                {nav.servicesLabel}
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

          <div className="ml-auto hidden items-center gap-5 lg:flex">
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

          <button
            type="button"
            className="relative ml-auto grid size-11 place-items-center rounded-full lg:hidden"
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
          hidden={!megaOpen}
          onClick={(e) => (e.target as HTMLElement).closest("a") && closeAll()}
          onMouseEnter={openWithDelay}
          onMouseLeave={closeWithDelay}
          className="hidden border-t border-rule bg-bg/95 backdrop-blur-xl lg:block"
        >
          <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-8 px-6 py-8">
            <ul className="grid grid-cols-2 gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.url} className="flex gap-4 rounded-2xl p-4 transition-colors hover:bg-surface-2">
                    <ServiceGlyph service={s} />
                    <span>
                      <span className="block font-medium">{s.name}</span>
                      <span className="mt-1 block text-sm leading-snug text-muted">{s.outcome}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="px-4 text-sm font-medium text-muted">{nav.byIndustry}</p>
              <ul className="mt-3 space-y-1">
                {industries.map((i) => (
                  <li key={i.url}>
                    <Link href={i.url} className="block rounded-xl px-4 py-2.5 hover:bg-surface-2">
                      {i.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/agencies" className="block rounded-xl px-4 py-2.5 hover:bg-surface-2">
                    {nav.agencies}
                  </Link>
                </li>
              </ul>
            </div>
            <Link href={nav.featured.href} className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-rule bg-surface p-6">
              <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.45),transparent)]" />
              <span className="relative font-display text-lg font-semibold">{nav.featured.title}</span>
              <span className="relative mt-2 text-sm text-muted">{nav.featured.body}</span>
              <ArrowRightIcon aria-hidden className="relative mt-4 size-5 text-accent-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id={sheetId}
        hidden={!sheetOpen}
        className="fixed inset-x-0 bottom-0 top-[72px] flex flex-col overflow-y-auto bg-bg px-4 pb-28 pt-4 lg:hidden"
      >
        <ul className="divide-y divide-rule border-b border-rule">
          <li>
            <button
              type="button"
              aria-expanded={servicesExpanded}
              onClick={() => setServicesExpanded((v) => !v)}
              className="flex w-full items-center justify-between py-4 text-left text-xl font-medium"
            >
              {nav.servicesLabel}
              <CaretDownIcon aria-hidden className={`size-5 transition-transform ${servicesExpanded ? "rotate-180" : ""}`} />
            </button>
            {servicesExpanded && (
              <ul className="space-y-1 pb-4">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.url} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-surface">
                      <ServiceGlyph service={s} small />
                      {s.name}
                    </Link>
                  </li>
                ))}
                <li className="px-2.5 pt-3 text-sm text-muted">{nav.byIndustry}</li>
                {industries.map((i) => (
                  <li key={i.url}>
                    <Link href={i.url} className="block rounded-xl px-2.5 py-2.5 hover:bg-surface">
                      {i.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/agencies" className="block rounded-xl px-2.5 py-2.5 hover:bg-surface">
                    {nav.agencies}
                  </Link>
                </li>
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
