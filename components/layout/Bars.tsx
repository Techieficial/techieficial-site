"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PhoneCallIcon, XIcon } from "@phosphor-icons/react";
import { siteConfig, telHref } from "@/site.config";

/** Sticky bottom bar on mobile: Book a demo + Call the AI. */
export function MobileBar() {
  const phone = siteConfig.contact.demoPhone;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-rule bg-bg/90 p-3 backdrop-blur-xl lg:hidden">
      <Link href={siteConfig.cta.primaryShort.href} className="flex h-12 flex-1 items-center justify-center rounded-full bg-electric font-semibold text-on-accent">
        {siteConfig.cta.primaryShort.label}
      </Link>
      {phone && (
        <a href={telHref(phone)} data-event="demo_call_started" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-rule font-semibold">
          <PhoneCallIcon aria-hidden className="size-5" />
          {siteConfig.cta.callAi.label}
        </a>
      )}
    </div>
  );
}

/** Closable announcement shown only when the live demo number exists. */
export function AnnouncementBar() {
  const phone = siteConfig.contact.demoPhone;
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    try {
      // Browser storage is only readable after hydration, so this sync is intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHidden(sessionStorage.getItem("tf_announce") === "closed");
    } catch {
      setHidden(false);
    }
  }, []);
  if (!phone || !siteConfig.announcement.enabled || hidden) return null;
  return (
    <div className="relative z-50 flex items-center justify-center gap-3 bg-electric px-10 py-2 text-center text-sm font-medium text-on-accent">
      <a href={telHref(phone)} data-event="demo_call_started" className="underline-offset-2 hover:underline">
        {siteConfig.announcement.text}
      </a>
      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => {
          setHidden(true);
          try {
            sessionStorage.setItem("tf_announce", "closed");
          } catch {}
        }}
        className="absolute right-2 grid size-8 place-items-center rounded-full hover:bg-black/10"
      >
        <XIcon aria-hidden className="size-4" />
      </button>
    </div>
  );
}
