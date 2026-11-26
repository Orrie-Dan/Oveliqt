# AGENTS.md

Oveliqt marketing site — standalone project at `d:\Ideas\Oveliq` (originally adapted from a ditto.site capture of Spector composition patterns; content and branding are Oveliqt). Vite + React SPA.

## Run

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview` (or `npm run start`)

## Safe Edit Areas

- `src/app/portfolio.ts`: public portfolio records; project category, status and featured flags drive case studies and discovery.
- `src/app/content.ts` or `src/app/content.tsx`: editable structured content extracted from repeated components and sections when present.
- `src/app/components/`: generated component modules. Edit copy, links, and simple JSX structure with care.
- `src/app/sections/`: generated section modules for single-page section splits when present.
- `src/app/svgs/`: hoisted inline SVG modules. Edit only when intentionally changing artwork.
- `src/app/ditto.css`: fidelity CSS for captured layout, pseudos, keyframes, and interaction states. Small visual tweaks are reasonable; broad rewrites can break clone fidelity.
- Root SEO/docs files such as `AGENTS.md`, `ARCHITECTURE.md`, `public/llms.txt`, and `src/app/seo.ts` (sitemap/robots are generated at build).
- Framework entry: `index.html`, `src/main.tsx`, `src/App.tsx`, `vite.config.ts`.

## Generated Runtime

`src/app/ditto` contains generated runtime utilities for captured interactions and motion. Current runtime utilities: DittoMotion. Do not casually rewrite these files; they are plumbing that maps captured recipes to stable `data-ditto-id` anchors in delivered apps.

## File Meanings

- `src/app/page.tsx`: homepage body (mounted by `src/App.tsx`). Its hero is `sections/system-hero-section.tsx` + `system-hero.css` (light "live system" direction: O* core node wired to stylised web / systems / AI cards, copy and mockup text in `oveliqSystemHero`) with `SiteLayout navVariant="light"`. Mockup card content is illustrative UI, not client data or metrics. Earlier heroes are kept but unused: the white editorial hero (`sections/editorial-hero-section.tsx`, `oveliqEditorialHero`) and the dark hero (`sections/hero-section.tsx` + `hero.css`).
- `src/app/pages/`: inner pages; `src/app/components/site-layout.tsx` is the shared nav + main + footer shell.
- `src/app/content.ts`: structured data extracted from repeated clone regions.
- `src/app/components/`: reusable JSX components promoted from repeated captured subtrees.
- `src/app/sections/`: page sections split from the captured body.
- `src/app/svgs/`: inline SVGs hoisted out of page/section files.
- `src/app/ditto.css`: generated CSS that preserves source layout and visual details not represented by Tailwind utilities.
- `src/app/ditto-meta.ts`: delivered-app metadata for anchors that still need runtime or stylesheet targeting after validation-only ids are stripped.

## Routes

- / — Oveliqt — Software, AI & Digital Products (`src/app/page.tsx`)
- /work, /work/<slug>, /services, /services/<id>, /about, /contact — inner pages in `src/app/pages/`, laid out after Spector's inner pages with their own Oveliqt copy (they do not reuse homepage sections). Copy lives in `content.ts` under `oveliqProjectDetails` (records in `portfolio.ts`), `oveliqServicesPage` (one `details` entry per service page: overview, capabilities, approach, stack, FAQs, case studies, pairings, starting scope), `oveliqAboutPage`, `oveliqWaysToWork` (/pricing models, process, FAQ), `oveliqEnquiry` + `oveliqContact` (contact flow and WhatsApp/email destinations); shared styles in `src/app/pages/pages.css`
- /privacy, /terms — `pages/legal-page.tsx`, copy in `content.ts` (`oveliqPrivacyPage`, `oveliqTermsPage`). Published (`draft: false`, 2026-11-26), so they are indexed and in the sitemap. Setting `draft: true` serves them noindex and drops them from the sitemap while they stay linked (footer, contact page). Registered company details for the footer legal line live in `oveliqCompany`.
- Unknown paths render `not-found-page.tsx`

Routing is a minimal pathname switch (`src/app/router.ts` + `src/App.tsx`); links are plain anchors (full page loads).

## SEO build output

- Per-route title/description/canonical/OG tags come from `src/app/seo.ts` (origin in `src/lib/site.ts`, default `https://oveliqt.com`, override with `VITE_SITE_ORIGIN`).
- `npm run build` runs the `oveliq-seo` plugin (`vite.config.ts`), which writes `dist/<route>/index.html` for every route plus `dist/404.html` (noindex), `sitemap.xml` and `robots.txt`. Do not add static `public/sitemap.xml` or `public/robots.txt`; new routes must be added to `allRouteMeta()`.
- Hosting: serve `dist/` as static files with `404.html` for unknown paths (no SPA rewrite needed). Legacy redirects live in `public/_redirects` (Netlify/Cloudflare Pages format).
- Share image: `public/og-image.jpg`, regenerate with `node scripts/create-og-image.mjs`.
- Brand: the name is **Oveliqt** (CSS classes and identifiers keep the older `oveliq` prefix). Logo SVGs live in `public/brand/` and the inline nav logo in `src/app/svgs/oveliqt-logo.tsx`; both come from `python scripts/create-brand-logo.py`. Favicon and Apple icon PNGs: `node scripts/create-brand-icons.mjs`.
- Colour: the brand red is Signal Red `#EF3E35` (`--accent`). Small red text on light backgrounds uses `--accent-text` (`#CC2A21`) to meet WCAG AA contrast; on dark backgrounds use `--accent` or the lighter `#ff7970`.
- Content blocks flagged `sample: true` (FAQ, CTA bands) do not render; set the flag to false once the copy is confirmed.

## Do Not Edit Casually

- `src/app/ditto/` runtime utilities.
- Generated anchor metadata such as `ditto-meta.ts`.
- Validation-only files in working captures, including `_cids.ts` and `_styles.ts` before export stripping.
- Framework shell plumbing unless you are intentionally changing global metadata or page mounting behavior.
