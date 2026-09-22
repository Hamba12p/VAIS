# VAIS audit and implementation record

## Baseline and boundaries

- Source baseline: `2600bbd961b0f8bea494e365b14b606ee0b0d93e`, clean dedicated branch `kepler/full-spectrum-audit-improvement`; main is untouched.
- Initial build: failed because node_modules was absent (`next is not recognized`). Locked npm install succeeded. Restricted build then failed fetching all three Google Fonts; retry with network access is recorded separately below.
- Baseline TypeScript: passed. Direct ESLint invocation: passed, but `.eslintrc.cjs` has no rules and package.json masks failure with `|| true`; these are weak checks, not evidence of code quality.
- Baseline screenshots: `baseline/<route>-<width>.png`, 375/768/1024/1440, 900px viewport height, full page, reduced motion for deterministic comparison. Normal-motion checks are separate. `scripts/audit/capture.cjs` records HTTP, console, images, fonts, overflow and axe results.
- No real product screenshots are attached or present. SVG sector silhouettes are conceptual placeholders; APEX has a logo and simulated console. No invented screenshots or deployment claims will be published.
- Fifteen records exist; Finny is absent. Several statuses conflict with the brief's assertion that all products are deployed. Existing statuses stay until Ismail confirms them. Institutional affiliations, scale claims, certification/legal assurances and deployment evidence require owner review.
- Existing canonical URL is vais.co; brief names vais-six.vercel.app. Preserve canonical until clarified rather than splitting SEO signals without evidence.

## Findings before implementation

| Area | Specific evidence | Decision |
|---|---|---|
| Font/build | layout.tsx uses next/font/google and the build requires Google access | Verify actual faces/network; retain Archivo + Source Serif rather than replace working typography. Consider local licensed files to remove build-time network dependency. |
| Project detail | ProjectDetail.tsx requests vignette-*.png; only SVGs exist | Repair missing references first; do not call the illustrations screenshots. |
| Contrast | globals.css sets every heading to ink; about/detail/404 inherit dark backgrounds but omit light heading utility | Local explicit heading colors, verify axe and screenshot. |
| Navigation | Navbar lacks aria-current and menu controls relationship/Escape handling | Add current location and keyboard behavior; retain working navigation layout. |
| Landmarks | Home returns main inside layout's main | One main with skip link target. |
| Portfolio UX | FieldLog.tsx has 15 collapsed entries, hides descriptions and leaves clipped links focusable; mobile grid has too many children | Visible one-line purposes, category filtering, direct detail links, no clipped focus stops. |
| Hero | app/page.tsx draws four labelled boxes with hard-coded “15 nodes / 18 links” | Replace unsubstantiated graph with readable operating paths tied to real project descriptions. |
| Home showcase | Hard-coded four projects aren't links; ordinal numbers communicate no sequence | Data-driven selected projects with direct links and purpose; remove decorative numbering. |
| Metrics | metricNumber parses arbitrary first digits (17M becomes 17; AES-256 becomes 256; nonnumbers become 0) | Render complete metric strings; do not manufacture count-up statistics. |
| Contact | API requires >20 message characters but form only requires nonempty; outline-none suppresses focus; phones not links | Match client validation, visible focus, actionable contact details. Do not send real enquiries as tests. |
| Motion | Reveal/transition server-render opacity zero; CSS reduced motion cannot disable JS initial hiding | Keep content visible in SSR/no-JS, remove decorative page wipe/reveals rather than hide meaning. |
| Footer | canvas/40 copyright on basalt; 9px tracking-heavy labels | Raise contrast locally; check actual rendered combinations. |
| SEO | All 15 detail routes inherit same site title/description; no Twitter metadata | Per-project metadata and share cards; retain confirmed domain pending answer. |
| Assets/performance | Five PNGs total >7MB; logo alone 1.14MB; terrain engine loaded on detail pages despite generic context | Optimize delivered assets after design; use meaningful static project diagrams instead of decorative WebGL on detail pages. |
| Code | Unused alternate hero/card/reveal components, duplicated hooks, any casts; unused Radix/forms/zod/critters imports | Trace reachability before pruning; add meaningful lint rules and honest scripts. |
| About/404 | Terrain metaphor displaces practical company/location and recovery language | Keep established imagery where useful; make content and recovery actions explicit. |
| Sandbox | APEX demonstration is interactive but home calls it “live system”; headings skip levels, role state not exposed | Explicit simulation label and accessible selected role; preserve useful demo behavior. |

## Design direction, recorded before CSS changes

Six existing identity colors: **Bond #EFF1EF** (paper), **Ink #14201C** (text), **Field #0B1714** (operating diagrams), **Green #0C6B57** (actions on paper), **Signal #37D6A4** (actions/paths on charcoal), **Rule #C9D1CD** (dividers). Green is not small text on Field; Signal is not small text on Bond. Preserve legacy aliases until consumers are accounted for. No global palette replacement.

Two primary typefaces: **Archivo** for titles, controls, and diagram labels; **Source Serif 4** for explanations and long-form case studies. Existing IBM Plex Mono stays only as a restrained technical-label compatibility face; consolidating it is lower priority than avoiding another font regression. This is a deliberate exception to an exactly-two-font implementation, preserving verified type wiring.

Layout: an institutional field manual with a strong title, an operating diagram, and open project records separated by rules. Visitors see what a system does before seeing its stack. Security pairs show observation versus simulation; offline services show capture versus sync; verification products show evidence versus review. The shared record structure supports scanning, while each diagram names its own inputs, decisions, users and boundary. Category filtering is justified by 15 records across nine sectors. Avoid cosmetic card grids, ungrounded reach statistics, and ornamental numbering.

Signature homepage element: **“Where the work happens”** — three concrete operating paths for Uganda: school records that sync after connectivity returns (UGEMS), telecom fraud signals that reach a security analyst (SENTECT), and community patient encounters that reach national health reporting (NK UZIMA). These are explanatory diagrams, explicitly not live telemetry. APEX links to the existing simulation. This replaces the empty field graph with something specific to VAIS.

## Verification references

- [Next.js font reference](https://nextjs.org/docs/app/api-reference/components/font): self-hosted font loading and display behavior.
- [WCAG contrast minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum): 4.5:1 normal text, 3:1 large text.
- [WCAG 2.2](https://www.w3.org/TR/wcag/): keyboard, focus, landmarks and motion audit criteria.

## Implementation and final results

Pending. This document is not a completion claim. Each concern will have a separate commit and post-commit build/capture evidence before the next visual concern.
