# VAIS / The intelligence beneath

Design record updated 8 November 2026.

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

## Preview and release boundary

Run `npm run dev` for the local preview. `npm run build` produces the Next.js deployment output.

This redesign has not been deployed. Real contact delivery still depends on the existing `FORMSPREE_ENDPOINT` or `NEXT_PUBLIC_FORM_ENDPOINT` configuration and was not exercised. Portfolio records were retained as supplied, not independently validated by this design work.
