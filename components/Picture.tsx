import images from "@/content/images.json";

type Entry = { width: number; height: number; widths: number[] };
const manifest = images as Record<string, Entry>;

/**
 * Responsive image from the build-time pipeline (scripts/build-images.mjs): AVIF, then WebP, at several widths,
 * with the real width and height so the layout never shifts. `src` is the original's path under assets/images
 * without the extension, e.g. "media/ad-1". `alt` is required: pass "" only for a purely decorative image.
 * Lazy by default; set `priority` only for the one image that is the page's largest content.
 */
export function Picture({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  fill = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Fill the positioned parent (like next/image fill) instead of using the image's own size. */
  fill?: boolean;
}) {
  const img = manifest[src];
  if (!img) throw new Error(`Picture: "${src}" is not in content/images.json. Add the original to assets/images and run npm run images.`);
  const set = (format: string) => img.widths.map((w) => `/images/${src}-${w}.${format} ${w}w`).join(", ");
  const largest = img.widths[img.widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/images/${src}-${largest}.webp`}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={fill ? `absolute inset-0 size-full ${className}` : className}
      />
    </picture>
  );
}
