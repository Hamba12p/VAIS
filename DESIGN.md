# VAIS / The intelligence beneath

Design record updated 11 November 2026.

## Signal atlas / final revision, 11 November 2026

This revision supersedes the pastel-panel treatment below. The shared palette uses deep ink, mineral green and citron, with copper and spectral-blue accents tied to selected content. Thin rules, original contour geometry and a stronger type hierarchy replace the repeated filled cards.

The featured collection now has an illustrated vertical index, wrapping previous/next controls, a large image-led story and an annotated research footer. The systems lab presents one inspectable architectural object at a time. Its stage controls, layer inspection, scenario conditions and reset all work together. The company compass uses the same contour signature and numbered selection points. Reading areas across the practice, contact and project pages follow the same editorial treatment.

Reference study: [Instrument](https://www.instrument.com/) for image-led presentation and editorial pacing, [Linear](https://linear.app/) for interface hierarchy, and [Lusion](https://lusion.co/) for its approach to spatial storytelling. The implementation uses VAIS assets and original geometry; reference-site assets were not copied.

Em dashes were removed from the site copy sources. Both project-name parsers were updated for colon-separated descriptors. Source scanning and rendered checks found no em dashes in the examined pages.

Verification: the production build generates 25 pages. `.tmp/atlas-qa.cjs` passes project selection and wrapping navigation, all three scenario conditions, stage synchronisation, layer inspection and reset, keyboard compass selection, research rendering on all 15 project routes, and 28 route/viewport checks at 320, 390, 768 and 1440 pixels. No page errors, failed assets, overflowing headings or page-width overflow were recorded. Normal and reduced-motion modes were checked. The report is `.tmp/atlas-qa.json`; desktop and mobile captures use `.tmp/atlas-*.png`. These checks establish local behaviour only; live deployment was not verified.

## Field journal / first revision, 11 November 2026

The shared palette now combines forest ink with ochre, clay, lagoon, lilac and leaf-green reading surfaces. `styles/field-journal.css` applies these to the home, practice, contact, portfolio and project-detail pages while retaining the existing typography, imagery and navigation. Reading content starts visible, including with reduced motion or before hydration.

The home selection is a browsable editorial dossier with a large contextual image, project maturity, design rationale and a dated external reference. Three explicit buttons select APEX NEXUS, UGEMS or SENTECT; the selected dossier links to its project page.

The architectural objects now sit within a scenario workbench. School, briefing and security examples each expose source, relationship and human-review stages. Visitors can disconnect the illustrative school network, flag missing briefing evidence or isolate security signals. These controls change the stage explanations and outcome; they do not call product backends or demonstrate measured product behaviour. Stage selection stays synchronised with the adjacent questions. Reset clears the condition and returns to the source stage.

The work-page orbit is now a company compass. Keyboard-accessible points explain place, people, practice and progress. The portfolio mix is calculated from the existing catalogue maturity labels; it is not an independently verified deployment inventory.

`data/research.ts` records external context checked on 11 November 2026: ITU Facts and Figures 2024 (Africa internet use), UNESCO's 2023 GEM Report (global primary-school connectivity), NIST CSF 2.0 (2024), NIST AI RMF 1.0 (2023), and WHO's 2023 road-safety report. Direct links and dates accompany the figures. All 15 project pages have an individual explanation of the architectural choice and its limits. Framework function counts are labelled as framework structure; regional or global statistics are not presented as Ugandan measurements or product outcomes. The existing project records were not independently re-audited in this design pass.

Original marketing copy was reviewed using the supplied Natural Prose Check skill, focusing on concrete operating situations, varied rhythm and a warmer invitation to work with VAIS.

Local verification: production build generates 25 pages; Chromium checks cover dossier switching, three scenario conditions, reset and stage synchronisation, keyboard compass controls, research sections on all 15 projects and seven routes at 320, 390, 768 and 1440 pixels. QA scripts, screenshots and the viewport report are in `.tmp/journal-*`. This is local verification, not publication to the existing Vercel site.

## Direction

Deep ink, mineral green, warm paper and expressive serif typography remain the foundation. The new motion language treats the portfolio as a field of connected possibilities: elliptical paths, moving image apertures and fine signal traces. The work itself supplies the names, imagery and context. Decorative numbering and generic tab rows are omitted.

The home page establishes the practice and introduces selected systems. The work page gives every project an equal entry point through a spatial collection. Project detail pages retain reading navigation, architecture and a next-project route. Practice and contact continue the same visual language at a quieter scale. The APEX sandbox remains explicitly illustrative.

## The project instrument

`components/work/ProjectInstrument.tsx` replaces the three-project showcase and separate catalogue on the work page. All 15 supplied project records appear as named image controls around an elliptical field. Selection brings a large image, project description, maturity label and detail link into focus. A brief horizontal shutter treatment marks the change without continuously cycling projects.

- Select a project directly, use the previous/next controls, drag the open field, or scrub the labelled range control.
- Left/Right and Home/End keys navigate the field and its project controls. The range announces the selected project name.
- On smaller screens, the image controls become a horizontal rail while the selected project remains readable.
- A native modal `<dialog>` offers project/name/technology search and sector filtering, result counts, a resettable empty state and direct selection back into the field. Escape closes it and focus returns to its opener.
- A concise live announcement identifies a changed selection. Image provenance and project maturity remain visible beside the presentation.

These behaviours were verified in Chromium, as recorded below.

## Motion and shared refinements

`components/ui/SignalField.tsx` draws a decorative line field on the home and work pages. It represents no real data or network relationships. Ambient motion can be paused, stops when the canvas is offscreen or the document is hidden, and renders statically with a reduced-motion preference. The work-page pause also suppresses its transition effects. There is no project autoplay or scroll interception.

`styles/signal-accents.css` carries the same vocabulary across the remaining pages: a single scan across home project imagery on hover or keyboard focus, stationary orbital accents over practice artwork, and a contact-frame trace that responds to input focus. Diagram labels now remain at least 10 px and the output reflows on small screens.

`PageTransition` uses a short CSS opacity settle only when motion is permitted. Content starts visible; there is no page-wide tilt, exit delay or wipe. The 404 page uses an original broken-orbit SVG composition, explicit light text on the dark field, and routes to the collection and home page.

The project field is styled in `styles/instrument.css`. Shared structure remains in `styles/studio.css`, `styles/gallery.css`, `Navbar`, `Footer` and `ScrollProgress`. `IntelligenceExplorer` uses question controls and an accompanying diagram. Existing VAIS marks supply the navigation mark and favicon.

## Imagery and content

The original generated `intelligence-strata.webp` hero remains from the first pass. Seven edited WebP assets support project presentation: school, tower, clinic, agricultural field, bank, office and the Parliament adaptation. Their source mapping and treatment are recorded in `public/images/design/README.md`; original repository files are retained.

The six architectural scenes are conceptual imagery derived from repository SVG illustrations. The Parliament image is an AI adaptation of `public/parliament.jpg` inside `apexnexus.zip`. Neither conceptual scenes nor the adapted photograph establish a deployed system, an institutional relationship or a measured outcome. Asset provenance documentation makes no ownership or licensing claim.

Project records and maturity states are preserved as supplied. No customers, testimonials or deployment figures were invented. The existing contact API is retained, with browser minimum lengths aligned to its required name/message lengths.

## Current verification / 8 November 2026

- `npx tsc --noEmit --incremental false` passed during this refinement pass.
- Final production build passed with all 25 pages generated using locally served fonts.
- Final production-browser smoke check passed with loaded local fonts and no console/page errors. Clean desktop and mobile captures are saved as `.tmp/work-signal-final.png` and `.tmp/work-signal-mobile-final.png`.
- Integrated Chromium checks passed: all 15 orbit controls, previous/next wrapping, roving keyboard controls, range scrubbing, field dragging, index search/filter/reset/selection, Escape, focus return and body scroll restoration.
- Canvas pause/resume was verified by comparing rendered frames. Reduced motion produces static artwork without shutter effects.
- Home, work, practice, contact, a project detail and the 404 page passed heading-fit and horizontal-overflow checks at 320, 390 and 768 px. No unexpected console/page errors or failed assets were recorded.
- Fonts now load locally from the existing cached Latin WOFF2 assets, with accompanying font licences, removing the external Google Fonts build dependency.

These are local source and browser checks. They do not establish deployment or real enquiry delivery.

## Historical verification / 7 November 2026

The previous design record reports a passing TypeScript check and production build, 25 generated pages, inspected Chromium desktop/mobile screenshots, and HTTP 200 responses for all 15 project routes from a local production server. It also records catalogue, navigation, diagram and reduced-motion checks, no runtime/asset errors in that browser run, and responsive checks at 320, 390 and 768 px.

Contact feedback was checked with mocked API responses; no real enquiry was sent. These results apply to the earlier revision and do not verify the new project instrument or current refinements.

Screenshots and executable local browser checks are retained in the ignored `.tmp` directory. They are local QA artefacts, not production monitoring.

## Dimensional architecture and concept studio / 8 November 2026

The flat architecture SVGs have been replaced in the active project pages by `ArchitectureScene` and six reusable `DimensionalAsset` sculptures: capture, vault, compute, network, cloud and review. The objects use native SVG geometry with emerald, porcelain, glass and copper materials. Labels remain HTML text. Pointer movement changes the viewing angle, selection exposes an explanation, and the layer-separation control reveals the floating surfaces. Reduced motion retains a static presentation and instant layer changes.

`data/architectures.ts` contains explicit, source-grounded profiles for all 15 projects. The original technical note remains available. The home-page explanation shares the same scene and keeps object selection synchronised with its question controls. Existing project maturity and approval/read-only boundaries remain intact.

The contact page now includes a concept studio built from local React components. Visitors describe their needs, optionally name their organisation and receive a suggested starting workflow through deterministic keyword matching. Four working templates cover team tasks, appointments, inventory and client pipelines. A manual workflow override is available. These are illustrative examples, not AI-generated applications or connected business systems.

The Workspace/Overview tabs expose working sample actions and counts. A reset restores the sample; rebuilding starts fresh. No preview action sends a request. "Use this brief" transfers the submitted description and selected workflow into the existing enquiry form, preserving manual notes and replacing the previous imported brief where intact. Only explicit enquiry submission calls the existing contact API. No new backend, storage provider or environment variable was added.

Buttons now have defined hover, pressed, selected, disabled, loading and keyboard-focus treatments. The contact preview's tablist supports arrow keys and Home/End. Preview data stays in component state and is discarded on page departure.

Verification: every project node, layer toggle, source note and SVG identifier was checked in Chromium. Home scene selection works in both directions. All four demo workflows, live counts, resets, keyboard tabs, draft preservation/replacement, mocked enquiry error/retry/success and post-success draft reuse passed. Mobile checks at 320, 390 and 768 px found no horizontal overflow. The 320 px dimensional-label regression was corrected and rechecked at 10 px. No unexpected console or asset errors were recorded. Real email delivery was not exercised.

TypeScript and the final production build passed, with all 25 pages generated. QA scripts and results are in `.tmp/dimensional-qa.cjs`, `.tmp/dimensional-qa.json`, `.tmp/concept-qa.cjs` and `.tmp/concept-qa.json`. The dimensional report retains the initial 9 px failure; the concept report includes the successful focused recheck after correction.

## Preview and release boundary

Run `npm run dev` for the local preview. `npm run build` produces the Next.js deployment output.

This redesign has not been deployed. Real contact delivery still depends on the existing `FORMSPREE_ENDPOINT` or `NEXT_PUBLIC_FORM_ENDPOINT` configuration and was not exercised. Portfolio records were retained as supplied, not independently validated by this design work.
