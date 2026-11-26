# Techieficial content studio (B2)

The content studio for techieficial.com, built with Sanity. It is **local first**: there is no
Sanity project yet, so nothing here talks to Sanity's servers until the owner creates one (M3)
and B5 connects it. The live site still reads its copy from `content/`; this folder does not
change it.

## Run it

```bash
cd studio
npm ci
npm run check        # typecheck, unit tests, schema validation, production build
npm run build:local  # build only, with a dummy project id (no account needed)
npm run dev          # local Studio at http://localhost:3333 (needs a real project id to log in)
```

`npm run build` and `npm run dev` read `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`
from `studio/.env` (copy `.env.example`). `build:local` and `schema:validate` fall back to the
dummy id `localdummy` so they work offline. All scripts set `DO_NOT_TRACK=1` so the CLI sends no
usage data.

## What is in it

| File | What it does |
| --- | --- |
| `sanity.config.ts` | Studio config: schemas, desk structure, workflow badge and publish gate |
| `schemaTypes/objects/` | Shared objects: `seo`, `cta`, `workflow`, plus `card`, `qa`, `richText` |
| `schemaTypes/documents/` | Document types (below) |
| `schemaTypes/define.ts` | `defineDocument()`: adds SEO, workflow and the copy rules to every document type |
| `lib/rules.ts` | The site rules as plain functions (tested in `test/rules.test.ts`) |
| `structure.ts` | Desk grouping |
| `workflow.ts` | Review status badge, publish gate, singleton actions |

### Document types

| Type | Mirrors | Notes |
| --- | --- | --- |
| `page` | `content/pages.ts`, `content/home.ts` | Generic page made of sections (hero, text, cards, FAQ list, project stories, CTA band) |
| `service` | `content/services/*.md` | Same fields and counts as velite (3 pains, 6 to 9 deliverables, 5 FAQs) |
| `industry` | `content/industries/*.md` | velite `workflow` steps are called `steps` here, because `workflow` is the review object |
| `offer` | `Offer` in `content/pricing.ts` | Every field, including buying path, payment link, compare-at price, limited offer, draft. Checkout is rejected for offers of $3,000 or more |
| `aiTeamMember` | `TeamMember` in `content/team.ts` | Every field |
| `blogPost` | blog frontmatter | `seoTitle` and `description` live in `seo`, `date` is `publishedAt`; adds `scheduledAt` and a portable text body |
| `caseStudy` | `docs/PROOF_PACK.md` section 2 | Who, before, built, changed, Loom videos, "Founder's past work" label. `clientNamingApproved` and `clientDataChecked` must be on to publish. No quote or rating fields |
| `testimonial` | PROOF_PACK section 1 | `permissionToPublish` must be on to publish; founding clients must show the discount disclosure |
| `faq` | `content/faq.ts` | Grouped like the site |
| `mediaAsset` | | Images, files and video links with alt text and a client data check |
| `foundingOffer` | F14 | Singleton. Places in total and places left, set by hand |
| `siteSettings` | parts of `site.config.ts` | Singleton. Contact emails, socials, announcement, checkout switch |

### Rules enforced in the Studio

- **No em dash** in any text field, anywhere in a document (including rich text). Error shown on the field.
- **No CRM vendor name**: the vendor's name, its spaced spelling and its short form are rejected in any letter case (the list is in `lib/rules.ts`). Ordinary English like "a high level view" is allowed.
- **SEO limits**: title 60 characters, description 155. Service outcome line 90.
- **Proof gates**: case studies need client naming approval and a client data check; testimonials need permission. Sanity blocks publishing while any validation error remains.
- **Workflow**: every content type has Draft, In review, Approved, Published. The Publish button stays disabled until the status is Approved. "Needs review" and "Approved, not yet published" lists sit at the top of the desk.

## `/studio` on the site: decided in B5

The Studio is **not embedded** in the Next.js app. Embedding would add the whole Studio (React,
styled-components, the editor) to the Cloudflare Worker bundle. B5 picks one of:

1. **Hosted Studio (recommended):** `npx sanity deploy` publishes it at `<name>.sanity.studio`,
   and the site adds a redirect from `/studio` to that address. Nothing heavy reaches the Worker.
2. **Embed:** mount it with `next-sanity`'s `NextStudio` on a client-only route. Only if the
   bundle size check in Phase 8 still passes.

## B5 setup steps (need a Sanity project)

Owner first (M3): create the Sanity project with admin@techieficial.com, turn on two-factor login,
and send the project id. Then Claude Code:

1. Put the project id and dataset in `studio/.env` (local) and in the hosting settings. Run `npm run check`.
2. Add CORS origins in sanity.io/manage > API: `http://localhost:3333`, the hosted Studio address and `https://techieficial.com` (no credentials for the site).
3. Create the datasets: `production` (live) and `development` (testing). Keep `production` public read only if the site reads published content without a token; otherwise private, with a read token stored as a Cloudflare secret.
4. **Roles** (sanity.io/manage > Members). Invite each person with the matching role:
   - **Admin:** the owner. Built-in Administrator role.
   - **Editor:** can edit and publish everything. Built-in Editor role.
   - **Contributor (draft only):** can create and edit drafts, cannot publish. Built-in Contributor role if the plan includes it; check the plan's role list first. If it does not, use Viewer plus edits through an Editor, or upgrade; custom roles need a higher plan. Write down which plan was chosen.
5. **Publish gate by role:** once roles exist, extend `gatePublish` in `workflow.ts` so only Admin and Editor can set the status to Approved (`context.currentUser.roles`).
6. **Scheduled publishing:** use Sanity's built-in scheduling where the plan has it. The `scheduledAt` field also lets the site hide a published post until that time, so scheduling works on any plan.
7. **Version history:** built in. Retention depends on the plan; note the number of days in `docs/CMS_GUIDE.md`.
8. **Audit log of every change:** add a Sanity webhook (sanity.io/manage > API > Webhooks) on create, update and delete for all document types, posting the document id, type, action and editor to the API (an endpoint added in B5, secured with a webhook secret). The API writes it to the Supabase `audit_logs` table, which nobody can edit or delete. This works on any plan.
9. Move the copy from `content/` into Sanity with a one-off import script, then compare the site's built pages before and after: the text must not change.
10. Live preview: add the Presentation tool with the site's draft mode route.
11. Write `docs/CMS_GUIDE.md` with screenshots.
