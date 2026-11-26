# Design system

- **Live values:** CSS variables in `app/globals.css` (`:root` light, `[data-theme="dark"]` dark).
- **Same values as data:** `lib/tokens.ts` (colours, type scale, fonts, contrast pairs). A unit test fails if it drifts from `globals.css`.
- **Component catalogue:** Storybook. Run `npm run storybook` and open http://localhost:6006. The toolbar switches light and dark; the Accessibility panel runs axe on each story.
- Stories live in `stories/` and use real copy from `content/` and `site.config.ts` only (no sample text).

| Story | Components |
|---|---|
| Foundations/Tokens | Colour swatches, contrast ratios, type scale |
| Components/Button | Primary, Secondary, Ghost, Large |
| Components/Cards | ServiceCard, PricingCard, FAQAccordion, CTABand |
| Components/Layout | SectionHeader, Tag, Breadcrumbs, TrustLine |

Not in Storybook yet (need page context or browser APIs): Navbar/MegaMenu, Footer, GrowthWheel, DemoTabs, TeamBuilder, forms, cookie banner. They stay covered by the Playwright tests.
