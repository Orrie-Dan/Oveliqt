# Oveliq portfolio review

Review date: 13 November 2026. This is an editorial and implementation-evidence review, not a production certification. The review below records the original assessment. Its recommended selection was subsequently implemented locally on 13 November 2026; see the implementation record at the end.

## Recommendation

Replace the ECD and aerial-detector headline slots. Lead with publicly creditable website deliveries and demonstrate engineering depth through independently labelled software and AI projects.

Recommended initial homepage six, in order:

1. **Soliaris Africa** — regional energy website and interactive geographic storytelling.
2. **Energex Global Solution** — multilingual energy website, solution/equipment discovery and enquiry architecture.
3. **Axeora** — corporate technology website with interactive geographic and capability presentation.
4. **CVMP / Facility Operations Prototype** — a synthetic-data operational platform, explicitly an independent prototype.
5. **Crosswalk Intelligence** — computer vision that turns tracked movement into reviewable crossing events.
6. **ECOBE** — a contrasting catalogue/business website, retained from the existing selection.

Everis belongs on the Work index as a named project, alongside the other three new websites. It can replace ECOBE in the homepage six if recency is more important than industry and visual variety. Do not fill the homepage exclusively with energy-sector websites: the two engineering examples substantiate Oveliq's software and AI offer.

The sixth slot is flexible. P2P Escrow could occupy it after verifying attribution, demonstrable scope and usable media. CIRA should compete for a headline slot after the improvements below. This ranking is a recommendation, not a claim about commercial success.

## Review scope and limits

- The user confirmed that **Energex, Soliaris, Everis and Axeora can all be credited publicly**.
- Reviewed Oveliq's current case-study content and discovered project folders under `D:/Ideas`, `D:/Side Projects`, `D:/CIRA`, the Movasafe locations, `D:/Geohub` and relevant `D:/school/ML` folders. Examined selected READMEs, implementation files, reports and status documents. This was not an exhaustive scan of every disk or a full code audit of every candidate.
- Read the public GitHub profile/repository listing and selected repository documentation. The listing was cached, so it may omit newer changes. Private GitHub access is not connected; remote-only private repositories remain unreviewed. Locally available code was reviewable regardless of remote visibility.
- Live website visits failed in this environment, both through web retrieval and the local browser's restricted network. This is an access limitation, not a finding that the websites are down.
- Inspected the four existing **local compiled builds** in a browser at desktop and mobile sizes and checked relevant current source. These builds are not proven identical to production. Their index-file modification dates are Energex 19 October 2026, Everis 17 October 2026, Soliaris 11 November 2026 and Axeora 22 October 2026; see the saved JSON for exact timestamps. Build modification dates are not project delivery dates.
- No external form submissions, client messages or production changes were made. Other projects were read only. Existing test reports were inspected; their tests were not rerun as part of this review.

Local screenshots and extracted page text: `references/oveliq/portfolio-audit/`. Repeat local-build inspection with `node scripts/portfolio-local-review.mjs`.

Public references: [GitHub repository listing](https://github.com/Orrie-Dan?tab=repositories), [Guardian backend](https://github.com/Orrie-Dan/Guardian-backend-service). Live destinations supplied by the user: [Energex](https://www.energexglobalsolution.com/en), [Soliaris](https://soliaris.vercel.app/), [Everis](https://www.everisholding.com/), [Axeora](https://www.axeora.ai/).

## The four new website projects

| Project | Portfolio angle | Evidence and distinctions | Before featuring |
| --- | --- | --- | --- |
| Soliaris Africa | Making a regional energy company's purpose, opportunities and geography easy to explore | Locally rendered cinematic homepage; multi-page React implementation; regional map and partner/news structures | Local `src/siteConfig.ts` still contains a placeholder phone/address and example.com canonical fallback. Confirm production values and enquiry delivery. Treat company project values and generation capacity as the client's claims, never the website's results. |
| Energex Global Solution | Organising a broad technical offer into an understandable, multilingual business website | Source includes English/Traditional Chinese locale architecture, solution/equipment detail pages, enquiry validation, server-side delivery/rate-limit integrations and tests | Local build has development project placeholders and incomplete-looking hero media in the restricted preview. Capture the current deployed version before choosing final media. Source architecture documentation still describes an older captured page and needs reconciliation if reused as evidence. |
| Axeora | Presenting a complex technology offer through a coherent corporate website | Local build and source show a geographic hero, capability/mission content, sector/use-case presentation and multiple pages | `src/components/ContactForm.tsx` currently prevents default and sets a success flag without delivery. Verify deployed code and fix this if present there. Credit website development; do not imply Oveliq built the sovereign AI/cloud/cyber platforms described by the client. |
| Everis | Turning an energy developer/investor's activities and project criteria into a clear corporate presence | Local build has a distinct corporate identity; five primary pages plus activity detail pages; enquiry-context and validation helpers | Confirm which delivery path is configured in production: source supports Formspree, email or a local brief download. Strong Work-index candidate; its energy/infrastructure story overlaps the other energy websites. |

Suggested case-study titles:

- Soliaris Africa — **A regional energy story, brought online.**
- Energex — **A complex energy offer, made easier to explore.**
- Axeora — **A clear digital presence for a complex technology business.**
- Everis — **From investment mandate to a clear corporate website.**

Roles should reflect actual work: website development, content organisation, responsive interfaces and implemented interactions. Do not automatically claim original brand design, original art direction, client infrastructure delivery, increased enquiries or measured business growth. Some local source documents reference captured/adapted composition patterns; describe the contribution precisely.

## Current portfolio decisions

### ECD: remove from featured work; retain only an accurate, anonymous contribution story if appropriate

The current copy explicitly claims a national programme and government context. User confirms partner-led delivery and concern about public presentation. Having source code is not evidence that all client identity, screens or business details should be published.

Do not rename it as a private-company commission unless that was the actual commission. Anonymising the client and describing the contribution is different from changing who the work was for.

Possible wording, subject to the user's actual scope:

> **Education Operations Platform**
> Contributed to an early childhood operations platform as part of a partner-led delivery. The work supported centre records, attendance and role-specific workflows.

State only the modules personally delivered. Use neutral, newly authored demo data/screens if a public version is appropriate. Remove national-scale, government-client and deployment claims that cannot be credited. Easiest immediate editorial option: replace it with Soliaris and keep the partner project off public discovery. Hiding a card alone is insufficient if the old detail route, sitemap, related projects or llms.txt still exposes it.

### Computer Vision: replace the featured case with Crosswalk Intelligence

The aerial detector has technical substance, including browser inference, but its present commercial story is weak: detecting people is the endpoint. Keep as a technical experiment if useful; do not invent a surveillance deployment or operational result.

Crosswalk Intelligence has a clearer sequence: video upload, crossing annotation, detection/tracking, event analysis and human review. Its local frontend README describes an API-backed review dashboard.

Suggested framing:

> **Crosswalk Intelligence — From traffic footage to reviewable crossing events.**
> An independent computer-vision prototype combining object tracking and event analysis to help a reviewer inspect potentially unsafe pedestrian/vehicle interactions.

The existing write-up reports 96% precision and 81% recall on **45 hand-reviewed events**, using unseen videos from a **single Bangkok intersection**. These are narrow project-evaluation results, not evidence of Rwanda deployment or broad real-world accuracy. If included, attach the sample size, footage source and evaluation definition to the numbers. Do not claim an enforcement system, calibrated vehicle speed or licence-plate recognition. Reconcile the older write-up's exclusion of live deployment with newer service/frontend work before describing current scope.

Evidence: `D:/Side Projects/Zebra crossing/README.md`, `docs/writeup.md`, `src/crosswalk_pipeline.py`, `frontend/README.md`, `tests/test_service.py`.

### CIRA: keep, but make one complete journey the case study

Actual implementation covers citizen reporting, officer/admin workflows, maps and mobile code. It is a more useful product story than a generic feature list.

Before promoting it:

1. Demonstrate one synthetic issue from submission through officer assignment, status change, resolution and citizen tracking.
2. Show the officer's work, not only the public homepage: queue, detail/evidence view and resolution history.
3. Verify mobile upload/retry, permissions, empty/error states and map clarity.
4. Fix or narrow claims around email/SMS: `api/src/utils/email.ts` and `sms.ts` currently log mock messages. PDF analytics export also contains a placeholder response. These do not invalidate the core workflow, but they should not be sold as completed integrations.
5. Label it an independent project/prototype unless actual client delivery or adoption is confirmed. Replace the two-week timeframe if it is merely inferred from commits.

Suggested lead: **One issue. A visible path to resolution.**

### EcoSort AI: retain as an ML engineering case, not the leading AI showcase

The meaningful story is the model's operational lifecycle: dataset/evaluation, prediction API, versioned model/retraining workflow, monitoring and measured deployment constraints.

The current 85.5% accuracy / macro F1 0.83 matches active-model metadata `models/metadata/v1.3.json` with a 380-image evaluation. A different phase report shows 88.2% / F1 0.87; do not mix them or silently choose the larger score.

Load reports use **10 concurrent users**, with zero prediction failures in the recorded successful runs. More local Docker replicas made latency and throughput worse on the resource-limited laptop. That engineering finding is more credible than a generic scalable/high-traffic claim.

Before promoting: give the upload/result experience a clearer useful outcome, verify handling of uncertain/non-waste/mixed images, document the model/split/version, and show evaluation and retraining alongside prediction. Avoid claiming real recycling-facility adoption or improved recycling rates.

Evidence: `D:/school/ML/Pipeline/Summative/ecosort-ai/models/metadata/active.json`, `models/metadata/v1.3.json`, `reports/metrics/e2e_phase3_summary.json`, `reports/metrics/LOCUST_RESULTS.md`.

### P2P Escrow: potentially strong; confirm attribution and separate it from Kredix

The Movasafe backend contains actual escrow controllers, models, services and approval/refund workflows. This is worth a proper feature demonstration and can provide fintech depth.

The separate Kredix README explicitly describes a loan-management product and excludes escrow/marketplace functions from its V1 offering. Retained legacy code does not make those functions part of Kredix. Do not merge the projects' narratives or claim live money movement based only on code.

Before keeping the existing case: confirm public credit, exact personal role, which mobile/admin/backend surfaces belong to this product, implemented payment-provider boundaries and real demo media. The existing case uses illustrative interface studies, not product screenshots.

## Additional local and GitHub candidates

| Candidate | Decision | Why / evidence boundary |
| --- | --- | --- |
| CVMP | Strong engineering shortlist | Independent synthetic-data prototype with visitor registration/OCR review, queue/session flow, property custody/payment recording, restrictions, role/facility separation and audited history. Visitation closure and live integration reports exist. Newer intake/housing/movement slices also have reports, but the movement report notes a broader OCR regression gate remains red. Feature a specific verified slice; do not describe the whole platform as production-ready or endorsed by a correctional service. |
| Crosswalk Intelligence | Strongest replacement for current aerial CV case | Domain-specific event analysis and reviewable evidence go beyond drawing detection boxes. Needs a clean annotated clip and current dashboard captures with dataset/evaluation limitations. |
| Investment Intelligence | Strong technical article / lab candidate | Point-in-time fundamentals, transparent metrics/scoring, backtest/report code and many test modules. README marks real LLM backend hookup and survivorship-free data work as incomplete. Present as a research engine, not an autonomous financial adviser or proven profitable product. |
| AIFA | Worth a second-stage review | Java finance backend, Python orchestration, mobile source and concrete API modules. Need a demonstrated transaction-to-insight journey and evidence of the real chat provider before presenting it as a finished AI product. |
| Expensio | Hold for now | Workflow architecture is promising, but `packages/ocr/src/document-ai-provider.ts` throws a stub error, the mock returns fixed receipt values, and `apps/worker/src/jobs/accounting-sync.ts` generates a simulated external ID instead of pushing to Xero. Complete those integrations or explicitly show only a workflow prototype. |
| Guardian / G2 Sentry | Secondary shortlist | Public README describes business bookings, guardian vetting, dispatch/tracking and operational flows. Repository documentation is promising, but this review did not run those journeys or verify public credit. Potentially stronger than a generic CRUD app once demonstrated. |
| HMS | Reserve | Documented appointment → queue → prescription → pharmacy MVP, with code and test structure. Needs a polished connected demonstration and careful scope; code alone is not evidence of hospital adoption or clinical validation. |
| Twara | Revisit after integrated milestone | Cargo marketplace architecture and backend milestones are substantial; README still calls client surfaces shells in places. Verify actual end-to-end customer/driver/operations journeys before treating it as delivered. |
| Servio | Too early for completed-work section | Contract changelog marks auth/devices live; menu/guest/order/kitchen/billing/report modules are scheduled. Do not present the full target plan as shipped functionality. |
| Athletica AI | Lab only for now | README marks player detection active and tracking/target-player work later. It currently has the same incomplete business-story problem as the aerial detector. |
| RMS / Booking App | Reserve pending real journey check | Broad README feature claims and multi-app structure; not independently demonstrated during this review. |
| AGEST / MMB / Boards / Muhazi / GeoHub | Additional inventory, not initial picks | Some have compelling visual or platform directions, but the four publicly creditable recent websites and verified engineering candidates should take priority. Check client/concept status before publication. |

CVMP evidence: `D:/Side Projects/CVMP/README.md`, `docs/13-visitation-closure-plan.md`, `docs/15-visitation-verification.md`, `docs/16-visitation-demo-guide.md`, `docs/18-inmate-intake-verification.md`, `docs/20-housing-verification.md`, `docs/22-movement-verification.md`.

## Implementation outline after selection

1. Add a `status`/project-type distinction (client website, partner contribution, independent prototype, research) to the portfolio data instead of forcing every project into a client narrative.
2. Separate explicit homepage selection from the Work index. The current homepage and index share a showcase, but more projects should not force every project into the homepage selector. Keep categories simple: Websites, Platforms, AI & Research.
3. Add all four confirmed website credits with actual screenshots and precise contribution copy. Do not invent dates, project durations, analytics or business results.
4. Retire ECD's existing public story thoroughly. Decide whether its route should become an accurate anonymous contribution page or be removed, then update discovery/SEO files accordingly.
5. Replace the aerial detection headline slot with Crosswalk Intelligence, labelled independent prototype. Add CVMP with synthetic media and prototype attribution.
6. Keep CIRA and EcoSort on the Work index with honest project status, then improve their demonstrations before promoting them.
7. Review all repeated project data, related-project links, accessibility text, static sitemap/llms text and source-generation scripts. Existing browser checks currently assume six selectors and hard-code old routes; update those with the final selection.

The review itself did not change the site. The user subsequently authorised the implementation described below.


## Implementation record ? 13 November 2026

Implemented locally after user authorisation:

- Six homepage features: Soliaris, Energex, Axeora, CVMP, Crosswalk Intelligence and ECOBE.
- Nine-project Work index, with category filters. Added four named website case studies plus CVMP and Crosswalk; retained ECOBE, CIRA and EcoSort with updated positioning.
- `src/app/portfolio.ts` is the public catalogue; `content.ts` re-exposes it and derives featured tiles from flags.
- Explicit project statuses distinguish client websites, independent prototypes and ML engineering. Unverified dates/durations are omitted.
- Website media uses existing local builds with provenance notes. Prototype artwork is authored and explicitly labelled. No government-branded CVMP screenshots were published.
- Retired ECD/aerial-detector stories and unconfirmed escrow/sample-lending entries do not resolve to case studies. Old source and assets are archived under `references/oveliq/portfolio-audit/` and excluded from the build.
- Updated About story, service references, sitemap, llms text, and illustration generator.
- CIRA copy distinguishes mocked email/SMS from implemented reporting flows; EcoSort metrics identify model version, evaluation size and the 10-user load-test scope.

Validation:

- TypeScript check and Vite production build: passed. Invoked the local compiler/build entry points directly because the npm wrapper hit a filesystem permission error outside the workspace.
- `node scripts/ui-review.mjs portfolio`: 76 route/viewport combinations, no layout overflow, missing images, page errors or heading-count failures. Filter, homepage, contact and shared interaction checks passed at 1440, 1024, 768 and 375px.
- `node scripts/portfolio-check.mjs`: current record/media/SEO consistency, four retired routes and updated About story passed.
- `node scripts/scroll-review.mjs after`: six project selections, keyboard navigation, image decoding and native scrolling passed on desktop and phone widths.

Evidence: `references/oveliq/ui-refresh/portfolio/` and `references/oveliq/work-scroll/after/`. No hosting deployment or external project fixes were performed.
