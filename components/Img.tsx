import manifest from "@/content/images.json";

type Entry = { width: number; height: number; widths: number[]; color: string };
const images = manifest as Record<string, Entry>;

/**
 * Responsive image from the build-time pipeline (media-src/ -> public/media/, see scripts/optimize-images.mjs).
 * AVIF first, WebP fallback, real width/height so nothing shifts, lazy unless `priority`.
 * `alt` is required: describe the image, or pass "" only when it is pure decoration.
 */
export function Img({
  name,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const img = images[name];
  if (!img) {
    if (process.env.NODE_ENV !== "production") throw new Error(`Image "${name}" is not in content/images.json. Run npm run images.`);
    return null;
  }
  const set = (ext: string) => img.widths.map((w) => `/media/${name}-${w}.${ext} ${w}w`).join(", ");
  const largest = img.widths[img.widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/media/${name}-${largest}.webp`}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
        style={{ backgroundColor: img.color, height: "auto" }}
      />
    </picture>
  );
}
