/**
 * Demo Lab media. Add real Techieficial videos here.
 * Sections with no items are hidden automatically.
 */

export type GalleryCategory = "Ad creative" | "Product launch" | "Review" | "Training" | "Infographic";

export type VideoItem = {
  title: string;
  /** YouTube or Vimeo URL. */
  url: string;
  /** Poster image in /public, e.g. /media/ad-1.jpg */
  poster: string;
  category?: GalleryCategory;
};

export const galleryCategories: GalleryCategory[] = [
  "Ad creative",
  "Product launch",
  "Review",
  "Training",
  "Infographic",
];

/** AI content gallery (Demo Lab tab 3). */
export const gallery: VideoItem[] = [];

/** Walkthrough videos (Demo Lab tab 2). */
export const walkthroughs: VideoItem[] = [];

/** Recorded AI receptionist call (home page demo block). Path to an audio file in /public. */
export const recordedCallAudio: string | undefined = undefined;
