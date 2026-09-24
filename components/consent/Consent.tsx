"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { cookieBanner } from "@/content/pages";
import { hasAnalytics, siteConfig } from "@/site.config";
import { track, type ConversionEvent } from "@/lib/analytics";

type Consent = { analytics: boolean; marketing: boolean; decided: boolean };
const KEY = "tf_consent";
const OPEN_EVENT = "tf:open-consent";

function readConsent(): Consent {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...JSON.parse(raw), decided: true };
  } catch {}
  return { analytics: false, marketing: false, decided: false };
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Cookie banner plus consent-gated analytics. Renders nothing when no analytics IDs are configured. */
export function ConsentManager() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = readConsent();
    // Browser storage is only readable after hydration, so this sync is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(c);
    setOpen(!c.decided);
    const reopen = () => {
      setOpen(true);
      setShowPrefs(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  // Track clicks on elements marked with data-event (tel links, CTAs).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-event]");
      if (el?.dataset.event) track(el.dataset.event as ConversionEvent);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const save = useCallback((next: Omit<Consent, "decided">) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setConsent({ ...next, decided: true });
    setOpen(false);
    const w = window as Window & { gtag?: (...a: unknown[]) => void };
    w.gtag?.("consent", "update", {
      analytics_storage: next.analytics ? "granted" : "denied",
      ad_storage: next.marketing ? "granted" : "denied",
      ad_user_data: next.marketing ? "granted" : "denied",
      ad_personalization: next.marketing ? "granted" : "denied",
    });
  }, []);

  if (!hasAnalytics || !consent) return null;
  const { ga4, metaPixel, clarity } = siteConfig.analytics;

  return (
    <>
      {ga4 && (
        <Script id="consent-default" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});`}
        </Script>
      )}
      {ga4 && consent.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`gtag('consent','update',{analytics_storage:'granted'});gtag('js',new Date());gtag('config','${ga4}');`}
          </Script>
        </>
      )}
      {clarity && consent.analytics && (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}
        </Script>
      )}
      {metaPixel && consent.marketing && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`}
        </Script>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="fixed inset-x-3 bottom-3 z-50 max-w-lg rounded-2xl border border-rule bg-surface-2 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:left-auto sm:right-5 sm:bottom-5"
        >
          <h2 id="consent-title" className="font-display text-lg font-semibold">
            {cookieBanner.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {cookieBanner.body}{" "}
            <Link href="/cookies" className="text-accent-text underline underline-offset-2">
              {cookieBanner.policy}
            </Link>
          </p>
          {showPrefs && <Preferences initial={consent} onSave={save} />}
          {!showPrefs && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="h-11 rounded-full bg-electric px-5 text-sm font-semibold text-on-accent">
                {cookieBanner.accept}
              </button>
              <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="h-11 rounded-full border border-rule px-5 text-sm font-medium">
                {cookieBanner.reject}
              </button>
              <button type="button" onClick={() => setShowPrefs(true)} className="h-11 rounded-full px-4 text-sm font-medium text-accent-text">
                {cookieBanner.prefs}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function Preferences({ initial, onSave }: { initial: Consent; onSave: (c: Omit<Consent, "decided">) => void }) {
  const [analytics, setAnalytics] = useState(initial.analytics);
  const [marketing, setMarketing] = useState(initial.marketing);
  const row = (label: string, body: string, checked: boolean, onChange?: (v: boolean) => void) => (
    <label className="flex items-start justify-between gap-4 py-3">
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-sm text-muted">{body}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={!onChange}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 size-5 shrink-0 accent-[#7c5cff]"
      />
    </label>
  );
  return (
    <div className="mt-3 divide-y divide-rule">
      {row(cookieBanner.necessary, cookieBanner.necessaryBody, true)}
      {row(cookieBanner.analytics, cookieBanner.analyticsBody, analytics, setAnalytics)}
      {row(cookieBanner.marketing, cookieBanner.marketingBody, marketing, setMarketing)}
      <div className="pt-4">
        <button type="button" onClick={() => onSave({ analytics, marketing })} className="h-11 rounded-full bg-electric px-5 text-sm font-semibold text-on-accent">
          {cookieBanner.save}
        </button>
      </div>
    </div>
  );
}

/** Stores campaign parameters from the first visit in a first-party cookie. */
export function UtmCapture() {
  useEffect(() => {
    if (document.cookie.includes("tf_utm=")) return;
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
    const data: Record<string, string> = {};
    for (const k of keys) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 200);
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) data.referrer = document.referrer.slice(0, 200);
    data.landing = window.location.pathname;
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `tf_utm=${encodeURIComponent(JSON.stringify(data))}; Max-Age=${60 * 60 * 24 * 90}; Path=/; SameSite=Lax${secure}`;
  }, []);
  return null;
}

export function CookiePrefsButton({ label }: { label: string }) {
  if (!hasAnalytics) return null;
  return (
    <button type="button" onClick={openConsentPreferences} className="hover:text-ink">
      {label}
    </button>
  );
}
