import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();
  return publicRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.lastModified ? new Date(r.lastModified) : built,
  }));
}
