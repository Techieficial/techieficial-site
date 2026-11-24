"use client";

import { useEffect } from "react";

/**
 * The old one-page site linked to homepage sections (e.g. /#faq). Sections that
 * now have their own page forward there, so old links and bookmarks still land well.
 */
export function HashRedirect({ map }: { map: Record<string, string> }) {
  useEffect(() => {
    const target = map[window.location.hash.slice(1)];
    if (target) window.location.replace(target);
  }, [map]);
  return null;
}
