"use client";

import { useState, type ComponentType } from "react";
import {
  ArrowCounterClockwiseIcon,
  CalendarCheckIcon,
  ChartBarIcon,
  ChatCircleTextIcon,
  ClipboardTextIcon,
  FunnelIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  RobotIcon,
  VideoCameraIcon,
  type IconProps,
} from "@phosphor-icons/react";
import type { ServiceId } from "@/lib/content";

const C = 320;
const R_IN = 118;
const R_OUT = 242;

/** Point at radius r, angle a in degrees measured clockwise from 12 o'clock. */
function pt(r: number, a: number): [number, number] {
  const rad = (a * Math.PI) / 180;
  return [C + r * Math.sin(rad), C - r * Math.cos(rad)];
}

function sector(r0: number, r1: number, a0: number, a1: number) {
  const large = a1 - a0 > 180 ? 1 : 0;
  const [x0, y0] = pt(r1, a0);
  const [x1, y1] = pt(r1, a1);
  const [x2, y2] = pt(r0, a1);
  const [x3, y3] = pt(r0, a0);
  return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
}

/** Arc used for curved labels. Clockwise for the top label, counter-clockwise below so text stays upright. */
function arc(r: number, a0: number, a1: number) {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  const sweep = a1 > a0 ? 1 : 0;
  return `M${x0} ${y0} A${r} ${r} 0 0 ${sweep} ${x1} ${y1}`;
}

type Seg = {
  id: ServiceId;
  label: string;
  a0: number;
  a1: number;
  fill: string;
  Icon: ComponentType<IconProps>;
  blurb: string;
};

const SEGMENTS: Seg[] = [
  { id: "video", label: "AI Video", a0: -90, a1: -45, fill: "#7c5cff", Icon: VideoCameraIcon, blurb: "AI video content: product reviews, ad creatives and social content." },
  { id: "ads", label: "Paid Ads", a0: -45, a1: 0, fill: "#22d3ee", Icon: MegaphoneIcon, blurb: "Paid ads on Meta, Google, TikTok, LinkedIn, DV360 and DMP audiences." },
  { id: "agents", label: "AI Agents", a0: 0, a1: 45, fill: "#f472b6", Icon: RobotIcon, blurb: "AI agent automation built on n8n and Make, connected to your tools." },
  { id: "academy", label: "Academy", a0: 45, a1: 90, fill: "#a3e635", Icon: GraduationCapIcon, blurb: "The Academy: courses, mentorship and corporate training." },
];

const CRM_FEATURES: { label: string; a: number; Icon: ComponentType<IconProps> }[] = [
  { label: "Pipelines", a: 104, Icon: FunnelIcon },
  { label: "Lead capture", a: 127, Icon: ClipboardTextIcon },
  { label: "Email & SMS follow-up", a: 150, Icon: ChatCircleTextIcon },
  { label: "Booking & reminders", a: 210, Icon: CalendarCheckIcon },
  { label: "No-show recovery", a: 233, Icon: ArrowCounterClockwiseIcon },
  { label: "Reporting", a: 256, Icon: ChartBarIcon },
];

const CRM_BLURB =
  "Marketing automation: your CRM with pipelines, follow-up, booking and reporting. HubSpot, Zoho and Salesforce coming soon.";
const DEFAULT_CAPTION = "Hover or tap a part of the wheel to see what it covers.";

const STAGES = [
  { text: "Get Seen", a0: -30, a1: 30, r: 283 },
  { text: "Capture Leads", a0: 150, a1: 96, r: 301 },
  { text: "Grow Revenue", a0: 264, a1: 210, r: 301 },
];

export function ServiceWheel() {
  const [active, setActive] = useState<ServiceId | null>(null);
  const caption =
    active === "crm"
      ? CRM_BLURB
      : (SEGMENTS.find((s) => s.id === active)?.blurb ?? DEFAULT_CAPTION);

  const hoverProps = (id: ServiceId) => ({
    onMouseEnter: () => setActive(id),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null),
  });

  return (
    <figure className="w-full">
      <div
        className="group/wheel mx-auto w-full max-w-[640px] transition-transform duration-700 ease-out-expo hover:scale-[1.04]"
        onMouseLeave={() => setActive(null)}
      >
        <svg viewBox="0 0 640 640" className="h-auto w-full overflow-visible" role="group" aria-label="Techieficial services wheel">
          <defs>
            <linearGradient id="crm-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1d1b3d" />
              <stop offset="1" stopColor="#0f2733" />
            </linearGradient>
            <linearGradient id="ring-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#9b87ff" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
            <radialGradient id="core-glow">
              <stop offset="0" stopColor="#7c5cff" stopOpacity="0.45" />
              <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Stage pills with curved labels */}
          {STAGES.map((s) => (
            <g key={s.text} aria-hidden>
              <path d={arc(292, s.a0, s.a1)} stroke="#191b2b" strokeWidth={36} strokeLinecap="round" fill="none" />
              <path id={`stage-${s.text}`} d={arc(s.r, s.a0, s.a1)} fill="none" />
              <text className="fill-ink font-[family-name:var(--font-space-grotesk)] text-[19px] font-semibold tracking-[0.01em]">
                <textPath href={`#stage-${s.text}`} startOffset="50%" textAnchor="middle">
                  {s.text}
                </textPath>
              </text>
            </g>
          ))}

          {/* Rotating dotted flow ring */}
          <g className="wheel-spin" aria-hidden>
            <circle cx={C} cy={C} r={266} fill="none" stroke="url(#ring-stroke)" strokeOpacity={0.55} strokeWidth={2.5} strokeDasharray="1 11" strokeLinecap="round" />
            {[60, 180, 300].map((a) => {
              const [x, y] = pt(266, a);
              return (
                <path
                  key={a}
                  d="M-7 -6 L1 0 L-7 6"
                  transform={`translate(${x} ${y}) rotate(${a})`}
                  stroke="#9b87ff"
                  strokeWidth={2.5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}
          </g>

          <circle cx={C} cy={C} r={170} fill="url(#core-glow)" aria-hidden />

          {/* Upper service segments */}
          {SEGMENTS.map((s, i) => {
            const mid = (s.a0 + s.a1) / 2;
            const on = active === s.id;
            const dim = active !== null && !on;
            const [dx, dy] = pt(12, mid).map((v) => v - C);
            const [lx, ly] = pt((R_IN + R_OUT) / 2 + 4, mid);
            return (
              <g key={s.id} className="wheel-seg" style={{ ["--i" as string]: i }}>
                <a
                  href={`#service-${s.id}`}
                  aria-label={s.blurb}
                  {...hoverProps(s.id)}
                  onClick={() => setActive(s.id)}
                  className="wheel-pop block cursor-pointer outline-none"
                  style={{
                    transform: on ? `translate(${dx}px, ${dy}px)` : undefined,
                    filter: dim ? "saturate(0.35) brightness(0.7)" : undefined,
                  }}
                >
                  <path d={sector(R_IN, R_OUT, s.a0, s.a1)} fill={s.fill} stroke="var(--bg)" strokeWidth={7} strokeLinejoin="round" />
                  <foreignObject x={lx - 62} y={ly - 38} width={124} height={76} className="pointer-events-none">
                    <div className="flex h-full flex-col items-center justify-center gap-1.5 text-center text-[#0a0b14]">
                      <s.Icon weight="duotone" className="size-8" />
                      <span className="font-[family-name:var(--font-space-grotesk)] text-[19px] font-bold leading-none">{s.label}</span>
                    </div>
                  </foreignObject>
                </a>
              </g>
            );
          })}

          {/* Lower half: marketing automation / CRM */}
          <g className="wheel-seg" style={{ ["--i" as string]: 4 }}>
            <a
              href="#service-crm"
              aria-label={CRM_BLURB}
              {...hoverProps("crm")}
              onClick={() => setActive("crm")}
              className="wheel-pop block cursor-pointer outline-none"
              style={{
                transform: active === "crm" ? "translate(0px, 12px)" : undefined,
                filter: active !== null && active !== "crm" ? "brightness(0.75)" : undefined,
              }}
            >
              <path d={sector(R_IN, R_OUT, 90, 270)} fill="url(#crm-fill)" stroke="var(--bg)" strokeWidth={7} strokeLinejoin="round" />
              <path d={sector(R_OUT - 3, R_OUT, 92, 268)} fill="url(#ring-stroke)" opacity={0.7} />
              {CRM_FEATURES.map((f) => {
                const [x, y] = pt(178, f.a);
                return (
                  <foreignObject key={f.label} x={x - 58} y={y - 26} width={116} height={52} className="pointer-events-none">
                    <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-ink">
                      <f.Icon weight="duotone" className="size-6 text-accent-text" />
                      <span className="hidden text-[12.5px] font-medium leading-tight sm:block">{f.label}</span>
                    </div>
                  </foreignObject>
                );
              })}
              <foreignObject x={C - 90} y={C + 180} width={180} height={52} className="pointer-events-none">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="font-[family-name:var(--font-space-grotesk)] text-[19px] font-bold leading-none text-ink">CRM Automation</span>
                  <span className="mt-1 text-[11px] text-muted">HubSpot, Zoho, Salesforce soon</span>
                </div>
              </foreignObject>
            </a>
          </g>

          {/* Core */}
          <g aria-hidden>
            <circle cx={C} cy={C} r={R_IN - 14} fill="var(--bg)" />
            <circle cx={C} cy={C} r={82} fill="#12131f" stroke="url(#ring-stroke)" strokeWidth={2} />
            <g transform={`translate(${C - 30} ${C - 34})`}>
              <rect x="0" y="0" width="38" height="11" rx="5.5" fill="#9b87ff" />
              <rect x="14" y="19" width="46" height="11" rx="5.5" fill="#22d3ee" />
              <rect x="5" y="38" width="24" height="11" rx="5.5" fill="#f472b6" />
            </g>
          </g>
        </svg>
      </div>
      <figcaption aria-live="polite" className="mx-auto mt-4 min-h-[3rem] max-w-[46ch] text-center text-sm leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
