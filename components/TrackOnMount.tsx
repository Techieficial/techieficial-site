"use client";

import { useEffect } from "react";
import { track, type ConversionEvent } from "@/lib/analytics";

/** Fires a conversion event once when the page loads (after consent, if analytics are on). */
export function TrackOnMount({ event }: { event: ConversionEvent }) {
  useEffect(() => {
    track(event);
  }, [event]);
  return null;
}
