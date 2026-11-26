# Image sources

Put original images here (JPG, PNG or WebP, at least 2x the largest display size), then run:

    npm run images

That writes AVIF and WebP copies at several widths to `public/media/` and updates
`content/images.json`. Commit both. Show an image with `<Img name="file-name" alt="..." sizes="..." />`
from `components/Img.tsx`. `npm run check` fails if a source changed without re-running `npm run images`.

Only real Techieficial screenshots, recordings and photos (no stock images).
