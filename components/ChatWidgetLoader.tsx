"use client";

import { useState } from "react";
import { ChatCircleDotsIcon } from "@phosphor-icons/react";
import { siteConfig } from "@/site.config";
import { buttonClass } from "@/components/ui";

/** Loads the chat agent script only when the visitor asks for it. Hidden until a widget URL is configured. */
export function ChatWidgetLoader({ label, loadedLabel }: { label: string; loadedLabel: string }) {
  const src = siteConfig.chatWidgetSrc;
  const [loaded, setLoaded] = useState(false);
  if (!src) return null;
  return (
    <button
      type="button"
      disabled={loaded}
      className={buttonClass("secondary", "md", "mt-6")}
      onClick={() => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        document.body.appendChild(s);
        setLoaded(true);
      }}
    >
      <ChatCircleDotsIcon aria-hidden weight="duotone" className="size-5" />
      {loaded ? loadedLabel : label}
    </button>
  );
}
