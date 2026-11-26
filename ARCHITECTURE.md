# ARCHITECTURE.md

## Overview

Oveliqt is a standalone marketing and portfolio site built with **Vite, React 19 and TypeScript**. It began as a ditto.site capture of Spector composition patterns and has since gained Oveliqt content, independent inner pages and a custom motion layer. There is no application server or submission backend.

## Structure

- `index.html`: document shell, metadata, Open Graph, and JSON-LD.
- `src/main.tsx` / `src/App.tsx`: Vite entry and pathname-based page selection.
- `src/app/router.ts`: route matching, active navigation and title/description updates. Anchor navigation reloads the document.
- `src/app/page.tsx`: homepage composition: hero, selected work, services, process, business, about and FAQ.
- `src/app/pages/`: independent Work, project, Services, About, Contact and fallback pages.
- `src/app/components/site-layout.tsx`: shared navigation, skip link, main region, native hash positioning and footer.
- `src/app/globals.css`: reset, font faces, design tokens, and global page base.
- `src/app/ditto.css`: route or page fidelity CSS.
- `src/app/ui-refinement.css`: shared UI refinements, loaded after the captured CSS. Component and page styles remain next to their modules.
- `src/app/content.ts`: editable data layer when repeated regions were promoted.
- `src/app/components/`, `src/app/sections/`, `src/app/svgs/`: generated JSX modules.
- `src/app/ditto/`: runtime helpers for interaction and motion recipes.
- `public/assets/cloned/`: materialized source assets.
- `public/assets/work/`: local project captures and explicitly labelled vector interface/workflow studies where product screenshots are unavailable.
- `public/llms.txt`: static AI-crawler summary. `sitemap.xml`, `robots.txt` and per-route `index.html` files are generated at build from `src/app/seo.ts` (see AGENTS.md → SEO build output).

## Styling

The generator uses Tailwind classes for declarations that can be represented as stable utilities. Some styles remain in `ditto.css` because they are route-scoped, pseudo-element based, keyframe based, interaction-state based, or too specific to translate safely without changing the rendered result.

## Anchors

`data-ditto-id` exists in delivered apps where runtime utilities or generated CSS still need a stable DOM anchor. Validation-only capture ids are stripped from production output and should not be reintroduced.

## Recipes And Runtime

Recipes identify higher-level patterns such as repeated cards, logo clouds, navigation, disclosures, accordions, tabs, carousels, and motion. Sections and components provide editable structure, SVG modules preserve source artwork, and `src/app/ditto` applies the small runtime behaviors that were captured safely. Runtime utilities emitted for this clone: DittoMotion.

## Portfolio and content

`content.ts` supplies service descriptions, industry possibilities, process stages and page copy. Public case studies live in `src/app/portfolio.ts`, typed with `OveliqProjectDetail` and re-exposed through `oveliqProjectDetails`. Each record has a category, project status and optional `featured` flag. Only verified dates or durations should be added.

The homepage shows six `featured` projects: ECOBE, Soliaris, Energex, Crosswalk Intelligence, Axeora and Everis. `/work` adds two more: CIRA (independent prototype) and EcoSort AI (ML engineering project). Homepage selection supports click and keyboard input with no autoplay. The Work grid shows a category filter only for categories that have projects (Websites, Platforms, AI & Research). CIRA and Crosswalk were withdrawn on 18 November 2026 and restored on 26 November 2026; EcoSort was restored from `references/oveliq/portfolio-audit/portfolio-before-six-projects.ts`. Education Operations Platform stays withdrawn: its record is in git history (commit b67ea10) and `public/_redirects` sends its route to `/work` with a temporary 302. AIFA and Investment Intelligence are unfinished and excluded; other previous entries are archived rather than presented in the public catalogue.

Omitted projects, including Education Operations, CVMP, AIFA and Investment Intelligence, resolve to the not-found page and are absent from discovery. The old `/work/early-childhood-platform` path redirects to `/work`. About and Services reference only published projects; service pages without a matching project skip their case-study section.

Case-study text and screenshots occupy separate document-flow sections. `components/project-media.tsx` owns a framed treatment with natural image height and no covering text, cropping or scroll transforms. Card captions and status labels are outside image bounds. `node scripts/create-selected-project-visuals.mjs` regenerates the SVG covers for the withdrawn Education and Crosswalk case studies if they are restored.

Energex media was recaptured from current Next.js source in an isolated preview after finding its old `dist/` stale. The temporary preview was stopped and removed without modifying the original checkout. Metadata is in `references/oveliq/portfolio-audit/energex-current-source.json`. Other website images are captures of existing local builds, not claimed as verified production captures.

Archived sample pricing/testimonial sections remain unmounted. Sample people, team and statistics blocks remain suppressed.

The contact page is a two-question guided enquiry with service cards, a goal prompt and a message review. Each service has three editable goal starters in `oveliqEnquiry.services`; choosing one appends its sentence without replacing existing text. Duplicate starters and additions that exceed the character limit are disabled. Answers survive back navigation within the flow. On the review step the visitor chooses how to send the prepared message: WhatsApp (`oveliqContact.whatsappNumber`, international format) or email (`oveliqContact.email`, opened as a `mailto:` with subject and body filled in, plus a copy-to-clipboard fallback). A channel appears only when its destination is configured; the choice is remembered in `localStorage` (`oveliq.enquiryChannel`) for the next visit. Visitors always press Send themselves. If neither destination is configured, the final action downloads the brief locally and clearly states that nothing is sent. Enquiry answers are held in page memory only. Footer CTAs resolve to `/contact#project-brief` when no direct contact destination exists.

## Motion

`src/app/motion/` provides reveals, text entrances, parallax and passive native scroll hooks. Wheel/touch scrolling is native; Lenis is no longer imported or mounted. Reduced motion bypasses animation. Outer parallax nodes and inner reveal nodes own separate transforms. The hero has no scroll-linked progress handler, filtered photo layer or animated grain overlay; mouse parallax stops updating when settled. The homepage process is a responsive static grid. Generated Ditto runtime and anchor metadata are preserved.

## Routes

- `/` — Oveliqt homepage
- `/work` — portfolio index
- `/work/<slug>` — project case study
- `/services` — service overview (one teaser row per service)
- `/services/<id>` — service detail page (`service-page.tsx`, copy in `oveliqServicesPage.details`)
- `/about` — studio, origin, principles and approach (`oveliqAboutPage`; project counts derived from `portfolio.ts`)
- `/contact` — project brief
- Other paths — fallback page

Production hosting serves the prerendered `dist/<route>/index.html` files and `dist/404.html` for unknown paths; no SPA rewrite is required.

## Validation

- `npm run typecheck`
- `node scripts/media-layout-review.mjs` ? checks text/media separation, uncropped images, image transforms and website case studies at four widths.
- `node scripts/portfolio-check.mjs` ? validates catalogue/media/SEO consistency, retired routes and the About example.
- `npm run build`
- `node scripts/enquiry-review.mjs` ? checks all four service paths at desktop, tablet and phone widths, goal starters, text preservation, limits, focus, review and downloads. Saves screenshots and a report under `references/oveliq/enquiry-refinement/`.
- `node scripts/ui-review.mjs after` — starts a temporary local Vite server and uses installed Microsoft Edge through Playwright. Checks current and retired routes, images, layout overflow, headings, six-project category filters, six-project homepage selection, contact handoff, FAQ, services, mobile menu keyboard behavior and a normal-motion reveal. Saves screenshots and a JSON report under `references/oveliq/ui-refresh/after/`.
- `node scripts/create-project-studies.mjs` — regenerates the six authored vector studies. These are illustrations, not captured product screens.
- `node scripts/scroll-review.mjs after` — normal-motion wheel-response measurements and all six project selections at desktop/mobile widths. Writes evidence to `references/oveliq/work-scroll/after/`.

`references/` contains historical captures and backups; it is not imported into the application. Older screenshots may depict retired layouts.

## Tradeoffs

The clone prioritizes deterministic static fidelity, accessible markup, local asset materialization, and source metadata preservation. It may keep measured CSS where inferred layout intent is uncertain. It intentionally defers arbitrary JavaScript replay, video-like animation replay, and full third-party application behavior. External services, live personalization, analytics, payments, auth, and complex client app state are not reconstructed unless a specific safe recipe exists.
