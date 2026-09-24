"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Calls back once when the element scrolls into view. */
function useInView<T extends HTMLElement>(onEnter: (el: T) => void, amount = 0.2) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        onEnter(el);
        io.disconnect();
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onEnter, amount]);
  return ref;
}

const show = (el: HTMLElement) => el.classList.add("is-in");

/**
 * Fades content up as it scrolls into view. Pure CSS plus a small observer, so inner pages
 * do not load an animation library. Static when reduced motion is on (see globals.css).
 */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useInView<HTMLDivElement>(show);
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/** Counts up to a number when it scrolls into view. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const final = `${value.toLocaleString("en-US")}${suffix}`;
  const ref = useInView<HTMLSpanElement>((el) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      el.textContent = `${Math.round(value * (1 - Math.pow(1 - p, 3))).toLocaleString("en-US")}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, 0.5);
  return <span ref={ref}>{final}</span>;
}
