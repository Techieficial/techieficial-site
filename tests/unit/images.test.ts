import { mkdtempSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { buildImages, checkImages } from "../../scripts/optimize-images.mjs";

describe("image pipeline", () => {
  it("builds AVIF and WebP variants, records size, and detects stale sources", async () => {
    const dir = mkdtempSync(join(tmpdir(), "img-"));
    const src = join(dir, "src");
    const out = join(dir, "out");
    const manifest = join(dir, "images.json");
    await import("node:fs").then((fs) => fs.mkdirSync(src));
    await sharp({ create: { width: 1200, height: 800, channels: 3, background: { r: 109, g: 74, b: 255 } } }).png().toFile(join(src, "Team Photo.png"));

    const r = (await buildImages({ src, out, manifest })) as Record<string, unknown>;
    expect(r["team-photo"]).toMatchObject({ width: 1200, height: 800, widths: [480, 768, 1080, 1200] });
    const files = readdirSync(out);
    expect(files).toContain("team-photo-480.avif");
    expect(files).toContain("team-photo-1200.webp");
    expect(files).toHaveLength(8);
    expect(checkImages({ src, manifest })).toEqual([]);

    writeFileSync(join(src, "new.png"), await sharp({ create: { width: 10, height: 10, channels: 3, background: "#000" } }).png().toBuffer());
    expect(checkImages({ src, manifest })).toEqual(["new.png: not built"]);
  });
});
