"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "@phosphor-icons/react";
import type { GalleryCategory, VideoItem } from "@/content/gallery";

/** Turns a YouTube or Vimeo URL into a privacy-friendly embed URL. */
function embedUrl(url: string) {
  const yt = url.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

/** Poster image first, the player loads only when clicked. */
export function VideoTile({ item }: { item: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="overflow-hidden rounded-2xl border border-rule bg-surface">
      <div className="relative aspect-video">
        {playing ? (
          <iframe src={embedUrl(item.url)} title={item.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 size-full" />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play video: ${item.title}`}>
            <Image src={item.poster} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-black/30">
              <span className="grid size-16 place-items-center rounded-full bg-electric text-on-accent transition-transform group-hover:scale-105">
                <PlayIcon weight="fill" aria-hidden className="size-7" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-4 text-[15px] font-medium">{item.title}</figcaption>
    </figure>
  );
}

export function Gallery({ items, categories, allLabel }: { items: VideoItem[]; categories: GalleryCategory[]; allLabel: string }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const used = categories.filter((c) => items.some((i) => i.category === c));
  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter videos">
        {(["all", ...used] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className="min-h-11 rounded-full border border-rule px-4 text-sm aria-pressed:border-accent-hover aria-pressed:bg-surface-2"
          >
            {c === "all" ? allLabel : c}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <VideoTile key={item.url} item={item} />
        ))}
      </div>
    </div>
  );
}
