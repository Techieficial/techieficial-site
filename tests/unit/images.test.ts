import { existsSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { afterAll, describe, expect, it } from "vitest";
import { buildImages, checkImages, widthsFor } from "../../scripts/build-images.mjs";

const dir = mkdtempSync(join(tmpdir(), "tf-images-"));
const opts = { srcDir: join(dir, "src"), outDir: join(dir, "out"), manifestPath: join(dir, "images.json") };
afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe("image pipeline", () => {
  it("picks standard widths without upscaling", () => {
    expect(widthsFor(2400)).toEqual([480, 960, 1440, 1920]);
    expect(widthsFor(1000)).toEqual([480, 960]);
    expect(widthsFor(300)).toEqual([300]);
  });

  it("writes AVIF and WebP per width and records the real size", async () => {
    mkdirSync(join(opts.srcDir, "media"), { recursive: true });
    await sharp({ create: { width: 1200, height: 675, channels: 3, background: "#6d4aff" } }).jpeg().toFile(join(opts.srcDir, "media", "poster.jpg"));
    expect(checkImages(opts)).toEqual(["media/poster: original is new or changed"]);

    const manifest = (await buildImages(opts)) as Record<string, { width: number; height: number; widths: number[] }>;
    expect(manifest["media/poster"]).toMatchObject({ width: 1200, height: 675, widths: [480, 960] });
    for (const w of [480, 960]) for (const f of ["avif", "webp"]) expect(existsSync(join(opts.outDir, `media/poster-${w}.${f}`))).toBe(true);
    const meta = await sharp(join(opts.outDir, "media/poster-480.webp")).metadata();
    expect(meta.width).toBe(480);
    expect(checkImages(opts)).toEqual([]);
  });

  it("flags a changed original and cleans up a deleted one", async () => {
    writeFileSync(join(opts.srcDir, "media", "poster.jpg"), await sharp({ create: { width: 500, height: 500, channels: 3, background: "#000" } }).jpeg().toBuffer());
    expect(checkImages(opts)).toEqual(["media/poster: original is new or changed"]);
    rmSync(join(opts.srcDir, "media", "poster.jpg"));
    await buildImages(opts);
    expect(existsSync(join(opts.outDir, "media/poster-480.webp"))).toBe(false);
    expect(checkImages(opts)).toEqual([]);
  });
});
