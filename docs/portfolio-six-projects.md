# Six-project selection

Supersedes the earlier portfolio selection. User clarified that AIFA and Investment Intelligence are not sufficiently complete to feature. They are removed from the public catalogue, routes, related projects, About references, sitemap, llms text and public assets. Their source projects are untouched.

## The selection

1. Education Operations Platform ? anonymous partner contribution; registration, attendance, assessments, synchronisation and management oversight.
2. CIRA ? independent civic-reporting prototype; citizen and officer workflows.
3. Crosswalk Intelligence ? independent tracking and crossing-event analysis prototype.
4. Soliaris Africa ? corporate energy website and regional map experience.
5. Energex ? current orange/navy website, captured from current source.
6. Axeora ? corporate technology website.

These six appear on both the homepage and full Work index, with category counts 3 Websites / 2 Platforms / 1 AI & Research. Previously shown work is archived, not deleted from the original project folders. CVMP remains excluded. The legacy ECD URL still opens the anonymous education story.

## Visual direction

The generic circles/cards workflow templates have been removed from public media and generation scripts. Bespoke code-native SVG covers now explain specific parts of the systems:

- Education: an attendance workspace, shared learner context and management oversight, connected by synchronisation paths; synthetic learner labels only, with no branding or real records.
- Crosswalk: a top-down crossing scene, crossing polygon, pedestrian and vehicle trajectories and a human-review panel. The scene and traces are conceptual, not footage or observed model output.

Both assets say they are product visualisations rather than screenshots. No fictional client results, metrics or model-confidence scores were introduced. Generator: `scripts/create-selected-project-visuals.mjs`. Outputs: `public/assets/work/education-operations/product-visual.svg` and `public/assets/work/crosswalk-intelligence/product-visual.svg`.

Screenshots remain separate from titles and captions, use natural height/contain sizing, and have no image parallax. Website media is retained, including the corrected current-source Energex capture.

## Checks

TypeScript and production build passed. Focused media-layout checks passed for four projects at four widths, covering image decoding, uncropped images, no image transforms, text/media separation and anonymous education copy. General browser review checks all current and omitted routes, category filters, exact homepage selection, images, headings, responsive overflow, contact and shared interactions. Catalogue checks compare route discovery and media to the six records.

Evidence: `references/oveliq/ui-refresh/six-projects/`, `references/oveliq/media-layout-revision/`, and the catalogue report. Changes remain local.
