"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "motion/react";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";
import { ContentIcon } from "./icons";
import { LogoMark } from "./layout/Logo";
import { readableOnDark } from "@/site.config";

export type WheelService = {
  slug: string;
  name: string;
  navName: string;
  outcome: string;
  highlights: string[];
  url: string;
  icon: string;
  color: string;
};

const C = 320;
const R_IN = 150;
const R_OUT = 252;
const R_FLOW = 270;
const SPIN_SECONDS = 60;
const CYCLE_MS = 4000;

/** Point at radius r and angle a (degrees clockwise from 12 o'clock). */
function pt(r: number, a: number): [number, number] {
  const rad = (a * Math.PI) / 180;
  return [C + r * Math.sin(rad), C - r * Math.cos(rad)];
}

function sector(r0: number, r1: number, a0: number, a1: number) {
  const [x0, y0] = pt(r1, a0);
  const [x1, y1] = pt(r1, a1);
  const [x2, y2] = pt(r0, a1);
  const [x3, y3] = pt(r0, a0);
  return `M${x0} ${y0}A${r1} ${r1} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 0 0 ${x3} ${y3}Z`;
}

function arc(r: number, a0: number, a1: number) {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  return `M${x0} ${y0}A${r} ${r} 0 0 ${a1 > a0 ? 1 : 0} ${x1} ${y1}`;
}

const STAGES = [
  { id: "seen", text: "Get Seen", a0: -32, a1: 32, r: 290 },
  { id: "capture", text: "Capture Leads", a0: 152, a1: 88, r: 306 },
  { id: "revenue", text: "Grow Revenue", a0: 272, a1: 208, r: 306 },
];

export function GrowthWheel({ services }: { services: WheelService[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<SVGGElement>(null);
  const labelRefs = useRef<(SVGGElement | null)[]>([]);
  const segRefs = useRef<(SVGGElement | null)[]>([]);
  const angle = useRef(0);
  const n = services.length;
  const step = 360 / n;
  const current = services[selected ?? active];

  // Pause all motion when the wheel is off screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Slow rotation. Labels counter-rotate so text stays upright.
  useAnimationFrame((_, delta) => {
    if (reduce || hovering || !visible) return;
    angle.current = (angle.current + (delta / 1000) * (360 / SPIN_SECONDS)) % 360;
    spinRef.current?.setAttribute("transform", `rotate(${angle.current} ${C} ${C})`);
    for (const el of labelRefs.current) el?.setAttribute("transform", `rotate(${-angle.current})`);
  });

  // Auto-highlight cycle until the visitor interacts.
  useEffect(() => {
    if (reduce || interacted || hovering || !visible) return;
    const t = setInterval(() => setActive((i) => (i + 1) % n), CYCLE_MS);
    return () => clearInterval(t);
  }, [reduce, interacted, hovering, visible, n]);

  const focusSeg = useCallback((i: number) => segRefs.current[i]?.focus(), []);

  const onKey = (e: KeyboardEvent<SVGGElement>, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setInteracted(true);
      setSelected(i);
      setActive(i);
      return;
    }
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + n) % n;
    setInteracted(true);
    setActive(next);
    focusSeg(next);
  };

  return (
    <div ref={rootRef} className="w-full">
      {/* Desktop and tablet: the wheel */}
      <div className="hidden md:block">
        <div className="relative mx-auto aspect-square w-full max-w-[600px]">
          <svg viewBox="0 0 640 640" className="size-full overflow-visible" aria-hidden={false}>
            <defs>
              <linearGradient id="gw-ring" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#7C5CFF" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
              <radialGradient id="gw-glow">
                <stop offset="0" stopColor="#7C5CFF" stopOpacity="0.5" />
                <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={C} cy={C} r={250} fill="url(#gw-glow)" aria-hidden />

            {/* Stage labels */}
            <g aria-hidden>
              {STAGES.map((s) => (
                <g key={s.id}>
                  <path d={arc(296, s.a0, s.a1)} stroke="#191B2B" strokeWidth={34} strokeLinecap="round" fill="none" />
                  <path id={`gw-${s.id}`} d={arc(s.r, s.a0, s.a1)} fill="none" />
                  <text className="fill-[#F4F5FA] font-display text-[18px] font-semibold tracking-[0.02em]">
                    <textPath href={`#gw-${s.id}`} startOffset="50%" textAnchor="middle">
                      {s.text}
                    </textPath>
                  </text>
                </g>
              ))}
            </g>

            {/* Flow ring with a travelling pulse: ads to leads to revenue */}
            <g aria-hidden>
              <circle cx={C} cy={C} r={R_FLOW} fill="none" stroke="url(#gw-ring)" strokeOpacity={0.45} strokeWidth={2} strokeDasharray="1 10" strokeLinecap="round" />
              {!reduce && (
                <motion.circle
                  cx={C}
                  cy={C}
                  r={R_FLOW}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeDasharray={`70 ${2 * Math.PI * R_FLOW}`}
                  transform={`rotate(-90 ${C} ${C})`}
                  initial={{ strokeDashoffset: 0, opacity: 0 }}
                  animate={visible ? { strokeDashoffset: [0, -2 * Math.PI * R_FLOW], opacity: [0, 1, 1, 0] } : undefined}
                  transition={{ duration: 3.2, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatDelay: 2.8 }}
                  style={{ filter: "drop-shadow(0 0 6px #22D3EE)" }}
                />
              )}
            </g>

            {/* Rotating service segments */}
            <g ref={spinRef} role="group" aria-label="Techieficial services" onMouseLeave={() => setHovering(false)}>
              {services.map((s, i) => {
                const a0 = i * step - step / 2;
                const a1 = a0 + step;
                const mid = i * step;
                const isOn = (selected ?? active) === i;
                const [ox, oy] = pt(12, mid).map((v) => v - C);
                const [lx, ly] = pt((R_IN + R_OUT) / 2, mid);
                return (
                  <motion.g
                    key={s.slug}
                    ref={(el: SVGGElement | null) => {
                      segRefs.current[i] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${s.name}: ${s.outcome}`}
                    aria-pressed={selected === i}
                    className="cursor-pointer outline-none focus-visible:[&>path]:stroke-white"
                    animate={{ x: isOn ? ox : 0, y: isOn ? oy : 0, opacity: isOn ? 1 : 0.62 }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    onMouseEnter={() => {
                      setHovering(true);
                      setInteracted(true);
                      setActive(i);
                    }}
                    onFocus={() => setActive(i)}
                    onClick={() => {
                      setInteracted(true);
                      setSelected(i);
                      setActive(i);
                    }}
                    onKeyDown={(e: KeyboardEvent<SVGGElement>) => onKey(e, i)}
                  >
                    <path d={sector(R_IN, R_OUT, a0, a1)} fill={s.color} stroke="#0A0B14" strokeWidth={6} strokeLinejoin="round" />
                    <g transform={`translate(${lx} ${ly})`}>
                      <g
                        ref={(el) => {
                          labelRefs.current[i] = el;
                        }}
                      >
                        <foreignObject x={-70} y={-40} width={140} height={80} className="pointer-events-none">
                          <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-[#0A0B14]">
                            <ContentIcon name={s.icon} weight="duotone" className="size-7" aria-hidden />
                            <span className="font-display text-[17px] font-bold leading-tight">{s.navName}</span>
                          </div>
                        </foreignObject>
                      </g>
                    </g>
                  </motion.g>
                );
              })}
            </g>

            {/* Hub */}
            <circle cx={C} cy={C} r={R_IN - 12} fill="#12131F" stroke="url(#gw-ring)" strokeWidth={2} aria-hidden />
            <foreignObject x={C - 120} y={C - 110} width={240} height={220} aria-hidden>
              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <LogoMark className="h-[22px] w-[27px]" />
                <p className="mt-3 font-display text-lg font-bold leading-tight" style={{ color: readableOnDark(current.color) }}>
                  {current.name}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-[#C9CEDB]">{current.outcome}</p>
              </div>
            </foreignObject>
          </svg>
        </div>

        {/* Side card: details for the selected or highlighted service */}
        <div
          aria-live={interacted ? "polite" : "off"}
          className="mx-auto mt-4 max-w-[520px] rounded-2xl border border-rule bg-surface/90 p-5 backdrop-blur"
        >
          <ServiceSummary service={current} />
        </div>
      </div>

      {/* Mobile: swipeable chips + summary card */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Techieficial services" className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2">
          {services.map((s, i) => {
            const on = (selected ?? active) === i;
            return (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setInteracted(true);
                  setSelected(i);
                }}
                className="flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors"
                style={on ? { background: s.color, borderColor: s.color, color: "#0A0B14" } : { borderColor: "#24263A" }}
              >
                <ContentIcon name={s.icon} weight="duotone" className="size-4" aria-hidden />
                {s.navName}
              </button>
            );
          })}
        </div>
        <div role="tabpanel" className="mt-3 rounded-2xl border border-rule bg-surface p-5" style={{ boxShadow: `inset 0 3px 0 ${current.color}` }}>
          <p className="font-display text-lg font-bold" style={{ color: readableOnDark(current.color) }}>
            {current.name}
          </p>
          <p className="mt-1 text-sm text-muted">{current.outcome}</p>
          <ServiceSummary service={current} hideTitle />
        </div>
      </div>

      {/* Screen reader list */}
      <ul className="sr-only">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={s.url}>{s.name}</Link>: {s.outcome}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceSummary({ service, hideTitle = false }: { service: WheelService; hideTitle?: boolean }) {
  return (
    <div className={hideTitle ? "mt-4" : ""}>
      {!hideTitle && <p className="sr-only">{service.name}</p>}
      <ul className="grid gap-2 text-[15px] sm:grid-cols-1">
        {service.highlights.map((h) => (
          <li key={h} className="flex gap-2.5">
            <CheckIcon weight="bold" aria-hidden className="mt-1 size-4 shrink-0" style={{ color: service.color }} />
            {h}
          </li>
        ))}
      </ul>
      <Link href={service.url} className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-medium" style={{ color: readableOnDark(service.color) }}>
        Explore {service.navName}
        <ArrowRightIcon aria-hidden className="size-4" />
      </Link>
    </div>
  );
}
