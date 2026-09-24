"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import { contactPage } from "@/content/pages";

/** Booking calendar, loaded only when it scrolls into view. Hidden until a calendar URL is configured. */
export function CalendarEmbed() {
  const url = siteConfig.contact.calendarUrl;
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!url || !ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: "300px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [url]);

  if (!url) return null;
  return (
    <div ref={ref} className="min-h-[640px] overflow-hidden rounded-[20px] border border-rule bg-surface">
      <h2 className="sr-only">{contactPage.calendarTitle}</h2>
      {load && <iframe src={url} title={contactPage.calendarTitle} className="h-[720px] w-full" loading="lazy" />}
    </div>
  );
}
