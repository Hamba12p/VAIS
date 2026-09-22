# Source inventory — 2026-09-22

Baseline commit: `2600bbd`. Audit branch: `kepler/full-spectrum-audit-improvement`.

## Routes

- `app/about/page.tsx`
- `app/api/contact/route.ts`
- `app/contact/page.tsx`
- `app/not-found.tsx`
- `app/page.tsx`
- `app/robots.ts`
- `app/sandbox/apex-nexus/page.tsx`
- `app/sitemap.ts`
- `app/work/page.tsx`
- `app/work/[slug]/page.tsx`

## Component dependency map

Every component is listed below with direct import consumers. No consumers means an orphan candidate, not proof of dead code by itself.

| Component | Direct consumers |
|---|---|
| components/about/LocationSignal.tsx | app/about/page.tsx |
| components/apex/ApexNexusSandbox.tsx | app/sandbox/apex-nexus/page.tsx, components/work/ProjectDetail.tsx |
| components/contact/ContactForm.tsx | app/contact/page.tsx |
| components/home/Hero.tsx | None |
| components/home/ProjectNarratives.tsx | None |
| components/layout/DebugInspector.tsx | None |
| components/layout/Footer.tsx | app/layout.tsx |
| components/layout/Navbar.tsx | app/layout.tsx |
| components/layout/PageTransition.tsx | app/layout.tsx |
| components/three/ReliefEngine.tsx | components/three/TerrainScene.tsx |
| components/three/SceneCanvas.tsx | components/three/ReliefEngine.tsx |
| components/three/TerrainScene.tsx | components/home/Hero.tsx, components/three/TerrainSceneCompact.tsx, components/three/TerrainSceneProject.tsx, lib/projectPresentation.ts |
| components/three/TerrainSceneCompact.tsx | app/about/page.tsx, components/about/LocationSignal.tsx |
| components/three/TerrainSceneProject.tsx | components/home/ProjectNarratives.tsx, components/work/ProjectDetail.tsx |
| components/ui/BrandPanel.tsx | None |
| components/ui/Button.tsx | None |
| components/ui/Cursor.tsx | None |
| components/ui/FadeIn.tsx | None |
| components/ui/FieldLog.tsx | app/work/page.tsx, components/work/ProjectGrid.tsx |
| components/ui/MagneticButton.tsx | components/home/Hero.tsx |
| components/ui/Reveal.tsx | None |
| components/ui/ScrollProgress.tsx | app/layout.tsx |
| components/ui/SectionHeader.tsx | None |
| components/ui/SectorIcon.tsx | components/ui/FieldLog.tsx, components/work/CategoryFilter.tsx, components/work/ProjectCard.tsx |
| components/ui/StatCounter.tsx | components/home/ProjectNarratives.tsx, components/work/ProjectDetail.tsx |
| components/ui/StatusBadge.tsx | components/ui/FieldLog.tsx, components/work/ProjectCard.tsx, components/work/ProjectDetail.tsx |
| components/ui/TechTag.tsx | components/work/ProjectDetail.tsx |
| components/ui/TerrainReveal.tsx | app/about/page.tsx, components/home/ProjectNarratives.tsx, components/ui/FieldLog.tsx, components/work/ProjectDetail.tsx |
| components/ui/TiltCard.tsx | components/work/ProjectCard.tsx |
| components/work/ArchitectureDiagram.tsx | components/work/ProjectDetail.tsx |
| components/work/CategoryFilter.tsx | None |
| components/work/ProjectCard.tsx | None |
| components/work/ProjectDetail.tsx | app/work/[slug]/page.tsx |
| components/work/ProjectGrid.tsx | None |

## CSS variable consumers

- `--bond: #eff1ef`: styles/globals.css
- `--ink: #14201c`: styles/globals.css
- `--rule: #c9d1cd`: styles/globals.css
- `--field: #0b1714`: styles/globals.css
- `--green: #0c6b57`: styles/globals.css
- `--signal: #37d6a4`: No direct var() consumer; inspect generated Tailwind aliases.
- `--defence: #37d6a4`: No direct var() consumer; inspect generated Tailwind aliases.
- `--offence: #a34a32`: No direct var() consumer; inspect generated Tailwind aliases.
- `--caution: #d8a32b`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-canvas: 239 241 239`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-basalt: 20 32 28`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-terrain-deep: 11 23 20`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-terrain-mid: 12 107 87`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-clay: 12 107 87`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-signal: 55 214 164`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-dusk: 11 23 20`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-mist: 20 32 28`: No direct var() consumer; inspect generated Tailwind aliases.
- `--color-hairline: 201 209 205`: No direct var() consumer; inspect generated Tailwind aliases.
- `--shadow-ridge: 0 0 0 1px rgba(11, 23, 20, 0.08)`: tailwind.config.ts

Tailwind semantic aliases and legacy color aliases coexist in `tailwind.config.ts`; RGB aliases are consumed through its `c()` helper. Tailwind default spacing/type/breakpoints apply, plus spacing 18 = 4.5rem. Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536px. Display sizes additionally use arbitrary clamps and 6xl/8xl/9xl, so there is no single enforced type scale. `font-sans` actually selects Source Serif.

## Font path

`app/layout.tsx` imports Archivo (display), Source Serif 4 (body), IBM Plex Mono (labels) from next/font/google; all latin subset, display swap; mono weights 400/500/600. Their variables are applied on html and consumed by globals.css and Tailwind. Next downloads at build time and self-hosts generated WOFF2; no checked-in font files, manual link, preconnect, or @font-face. Browser font identity and waterfall are captured in baseline/results.json.

## Project and asset inventory

| Slug | Recorded status | Existing treatment |
|---|---|---|
| apex-nexus | in-development | Product logo and interactive simulated console; Architecture SVG; Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| ugems | deployed | Architecture SVG; Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| ugadon | blueprint | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| ipsas | blueprint | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| gap | blueprint | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| govsef | blueprint | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| sentect | blueprint | Architecture SVG; Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| yeracle | blueprint | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| nk-uzima | in-development | Architecture SVG; Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| crop-circles | blueprint | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| mubs-ec | deployed | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| yokoshing | blueprint | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| veripath | prototype | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| kreesp | blueprint | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |
| vais-voice-ai | in-development | Generic sector SVG exists, but detail requests missing PNG; no real product screenshot |

## Asset sizes

- public/images/apex-nexus-logo.png: 2371494 bytes
- public/images/contour/terrain-404.png: 1484542 bytes
- public/images/contour/terrain-hero-fallback.png: 1245771 bytes
- public/images/logo.png: 1136087 bytes
- public/images/contour/open-graph.png: 1033944 bytes
- public/images/contour/diagram-sentect.svg: 930 bytes
- public/images/contour/diagram-nk-uzima.svg: 775 bytes
- public/images/contour/diagram-ugems.svg: 775 bytes
- public/images/contour/diagram-apex-nexus.svg: 770 bytes
- public/images/contour/vignette-field.svg: 513 bytes
- public/images/contour/vignette-clinic.svg: 479 bytes
- public/images/contour/vignette-school.svg: 462 bytes
- public/images/contour/vignette-office.svg: 450 bytes
- public/images/contour/vignette-tower.svg: 438 bytes
- public/images/contour/vignette-bank.svg: 419 bytes
- public/images/contour/grain.svg: 397 bytes
- public/images/contour/terrain-glyph.svg: 283 bytes
- public/images/contour/icon-security.svg: 220 bytes
- public/images/contour/icon-fintech.svg: 217 bytes
- public/images/contour/icon-automotive.svg: 211 bytes
- public/images/contour/icon-health.svg: 198 bytes
- public/images/contour/icon-government.svg: 195 bytes
- public/images/contour/icon-education.svg: 170 bytes
- public/images/contour/icon-platform.svg: 170 bytes
- public/images/contour/icon-supply-chain.svg: 170 bytes
- public/images/contour/icon-agriculture.svg: 153 bytes