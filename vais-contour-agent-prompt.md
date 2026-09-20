# VAIS Website Rebuild — "Contour" — Agent Implementation Brief (v2, supersedes Field Intelligence)

Hand this entire document to the coding agent in the `VAIS-main` repo (Next.js 14 App Router, Tailwind, Framer Motion, React Three Fiber + drei). It replaces both the old "Civic Register" direction (Zilla Slab / IBM Plex / ledger-and-seal motif) and the "Field Intelligence" brief that preceded this one (the living node-network idea, Fraunces/Instrument Sans, green-and-ivory palette). Neither survives. This is the final direction — build it with full care. Do not fall back to defaults, do not skip a section, do not treat any instruction as optional decoration.

**Working rule for this pass:** every component, token, animation, and asset in the current codebase gets rebuilt or meaningfully improved. None are recolored and left otherwise untouched. Where a section below says "rebuild," that means new logic, not a new coat of paint on old logic.

---

## 0. The idea in one paragraph

Drop the network-of-nodes metaphor — every serious tech company's site uses glowing dots and connecting lines, so it stops reading as intelligence and starts reading as wallpaper. VAIS's actual pattern across APEX NEXUS, UGEMS, SENTECT/YERACLE, NK UZIMA, Crop Circles, Yokoshing, and the rest is that intelligence has to survive contact with real ground: load-shedding, feature phones, a school fourteen hours from Kampala by road, a health post with no fibre. The site's central image should be **terrain**, not network. **Contour** renders a low-poly landscape of Uganda's actual geography, dusk-lit, with light moving across it the way a system's reach moves across the country: from a hub, out along real distance, into a real building. Nothing abstract stands in for the work — the work is the geography it operates in. Warmth comes from the dusk palette and the physicality of land; the display of technical skill comes from a fully hand-built Three.js terrain and shader system, built in code rather than assembled from stock GLTF primitives; restraint comes from one terrain scene doing the job that five decorative sections used to do.

---

## 1. Before touching anything

1. Confirm stack: Next.js 14 App Router, Tailwind, Framer Motion, React Three Fiber + drei.
2. Delete `public/models/hub.glb` and `public/models/node.glb` and the generation script that produced them (`scripts/generate-vais-models.mjs`). Nothing in Contour is a pre-baked GLTF sphere. All geometry in Section 3 is authored as code, generated at build/runtime — see Section 3 for exactly what to write instead.
3. Delete every file under `public/images/` with a hash filename (`02dfce8e7e33dcb5c7b9c82e95fa980c.jpg` and its siblings). These are unidentified leftover stock assets from an earlier pass and none are wanted. `logo.png` stays, used once, in the nav only — verify no other file references it.
4. Fix any lingering whitespace-stripping bug in headline or label rendering wherever it appears (hero, project cards, stat labels) — check the render path, not just the visible symptom.
5. `components/ui/SealMark.tsx` and `components/ui/OperationsRegister.tsx` are retired as page-level decoration. Section 3.3 replaces the register with a new table concept built from scratch on top of the same real data.

---

## 2. Design tokens — full replacement, not an extension of any prior palette

### 2.1 Color

| Token | Hex | Role |
|---|---|---|
| `canvas` | `#F5EFDE` | Primary background — sun-bleached parchment, warmer and drier than the previous ivory |
| `basalt` | `#1C1815` | Primary text — near-black with a warm brown cast, never cool grey |
| `terrain-deep` | `#3C4A2E` | Deepest contour bands, primary structural color, dark UI surfaces |
| `terrain-mid` | `#7C8B57` | Mid-elevation contour bands, secondary accents, hover states |
| `clay` | `#B4602E` | Warm structural accent — used for section dividers, card edges, one emphasized word per section |
| `signal` | `#E8A33D` | The one moving, glowing color in the whole system — reserved exclusively for the traveling light in the terrain scene, live-status badges, and cursor glow. If it appears as a static fill anywhere, that's a misuse |
| `dusk` | `#463754` | Sky gradient, shadow depth in the terrain scene, used sparingly in UI for elevated/active surfaces only |
| `mist` | `#6E6858` | Secondary and muted text, captions, metadata |
| `hairline` | `#DDD0AE` | Borders, dividers, table rules |

Explicitly forbidden: the entire prior green/ivory "Field Intelligence" palette, any leftover murram/gazette/ledger tokens, blue-purple gradients, neon-on-black, generic "AI orb" glow, pure white or pure black anywhere.

### 2.2 Type — full replacement

- **Display** (`font-display`): **Bricolage Grotesque**, variable. It has slightly irregular, hand-set proportions that read as considered rather than templated — the opposite of Inter/Manrope/Space Grotesk default energy, and a deliberate pivot away from the soft-serif Fraunces direction proposed earlier. Use the variable optical-size axis pushed toward its larger settings for H1/H2 only.
- **Body** (`font-sans`): **Source Serif 4**, variable, at a fairly light weight. A serif body text is the actual departure here — it reads as considered, human, and unusual for a technology site, while staying completely legible at paragraph length. This replaces Instrument Sans entirely; no sans-serif body copy remains anywhere on the site.
- **Data / mono** (`font-mono`): **Space Mono**, replacing JetBrains Mono. Used for coordinates, reference numbers, elevation labels, status codes — it should feel like a field surveyor's notebook, not a terminal.

Load all three via `next/font/google`.

### 2.3 Motion language — rebuilt, not retuned

Replace the entire easing/timing system, not just the numbers. The core idea: **content behaves like terrain being surveyed, not like cards sliding in.** Sections reveal with a slight vertical rise (12–20px) combined with a very subtle perspective tilt (1–2 degrees) that settles flat, as if the camera is leveling out over a ridge. Use `cubic-bezier(0.16, 1, 0.3, 1)`, 550–650ms, staggered 100ms per element. Scroll-linked parallax: background terrain layers move at a different rate than foreground content (roughly 0.3x vs 1x scroll speed), giving real depth rather than a flat page with a video behind it. Every animated element checks `prefers-reduced-motion` and falls back to a plain fade, no exceptions — write this as a shared hook once (`useMotionPreference.ts`), not per-component checks.

---

## 3. The signature visual system: "The Relief Engine"

This is a full rebuild, not a re-theme of `ConstellationScene.tsx` / `HeroScene.tsx` / `IntegrationMapScene.tsx`. Those files are deleted. Build three new scene components from the specification below.

### 3.1 What it actually is

A low-poly, faceted 3D terrain mesh suggesting Uganda's landscape (highland ridges toward the west, flatter basin toward the north and east — stylized, not cartographically literal), rendered at dusk. A single light source travels across it from a fixed hub point outward to lit marker points, representing a system reaching an institution. This is the one idea the whole site is built around.

### 3.2 Required custom Three.js build — write this in code, do not substitute pre-made assets

**Terrain mesh:** Generate a `PlaneGeometry` (roughly 80x50 segments) and displace vertex heights in a custom GLSL vertex shader using layered simplex/Perlin noise (two octaves — one broad, low-frequency pass for the major ridgeline, one finer pass for surface roughness). Do not import a heightmap image — compute the noise in-shader so the terrain can breathe (very slow, near-imperceptible vertical drift, under 2% amplitude, on a sine loop) without re-uploading geometry every frame. Apply flat shading (`flatShading: true` on a `MeshStandardMaterial`, or a custom `ShaderMaterial` if flat faceting needs more control) so the terrain reads as deliberately low-poly and faceted, not smoothed — the faceting is the visual signature, not a limitation to fix.

**Sky and light:** A custom gradient sky using a large `SphereGeometry` with an inverted normal and a vertical-gradient `ShaderMaterial` running from `dusk` at the top through `clay` to `canvas` near the horizon. One directional light positioned low, as if just after sunset, casting long soft shadows across the terrain facets.

**Signal pulses:** Small instanced spheres (`InstancedMesh`, 20–40 instances max for performance) that travel along a precomputed spline path (`THREE.CatmullRomCurve3`) from the hub point to each marker, using `signal` color with additive blending and a soft glow (a simple custom bloom via a secondary larger, low-opacity sphere behind each pulse — do not pull in a full postprocessing bloom pipeline, it's not worth the performance cost here). Pulses should feel like they're covering real distance — 3 to 6 seconds per full traverse, easing in and out, not linear.

**Settlement markers:** Five custom low-poly marker geometries, each built from primitive combinations (no imported models):
- *School:* a simple triangular prism roof over a low rounded box.
- *Clinic:* a low rounded box with a thin vertical and horizontal bar (a cross) extruded slightly above the roofline.
- *Cell tower / connectivity point:* a thin tapered cone (`ConeGeometry`, low radial segments for the faceted look) with two small torus rings at different heights.
- *Farm plot:* a small cluster of three to five low tetrahedra of varying height, suggesting crop rows.
- *Bank/agent point:* a simple flattened cylinder with a slightly raised rim.

All five share one material treatment: flat-shaded, `terrain-mid` base color with a subtle `signal`-colored emissive rim that only brightens when a pulse arrives at that marker.

**Scene variants:**
- *Homepage hero:* full terrain, wide low camera angle, 4–5 markers active, hub-to-marker pulses running continuously but slowly, headline positioned in the upper third where terrain height is naturally lowest so text never fights the ridgeline.
- *About page:* a tighter, closer camera crop on a single ridge, mostly static, one slow pulse, used to anchor the company narrative rather than compete with it.
- *Work / project detail pages:* camera centers on the single marker type matching that project's sector, with the project's real headline metric (e.g., "42,838 schools," "17M+ subscribers") counting up via `StatCounter.tsx` beside the marker as its pulse arrives.

**Performance and fallback:** Detect reduced-motion and low-end devices (a simple heuristic: `navigator.hardwareConcurrency` and `prefers-reduced-motion` combined, following the existing `usePrefersReducedMotion.ts` pattern) and swap to a static pre-rendered still of the terrain (an actual exported PNG frame of the scene, not a generic gradient) with the pulses replaced by simple CSS-animated glow dots at fixed marker positions. This must look intentional, not like a broken 3D scene.

### 3.3 Field Log (rebuild of the old register, not a re-skin)

New table component, `FieldLog.tsx`, built fresh. Same underlying instinct — real tabular data beats icon cards — but the actual table behavior changes: rows expand in place on click to show the project's real architecture summary from `data/projects.ts` rather than linking away immediately, mono (`Space Mono`) reference numbers down the left edge formatted like survey coordinates (e.g., `N-01`, `N-02`), `signal` used only for a small live-pulsing dot next to "deployed" status rows. Reveal on scroll using the tilt-and-rise motion from 2.3, not a stamped/ledger reveal of any kind.

---

## 4. Content direction — one project, fully told, at a time

Replace every icon-card grid on the site (home's principle cards, about's thesis cards) with full narrative blocks, one flagship project per block: APEX NEXUS, UGEMS, SENTECT paired with YERACLE, and NK UZIMA on the homepage, all fifteen in the Field Log on `/work`. Each homepage block pairs three things: the real problem/solution/architecture text already written in `data/projects.ts` (do not rewrite this copy — it already names real ministries, real constraints, real numbers, and is stronger than anything invented for this brief), one sector vignette illustration (Section 6), and the Relief Engine's per-project marker variant with its counted-up metric. No project gets a literal app screenshot — the architecture diagrams in Section 6.4 replace those entirely.

Tone: plain, specific, and confident enough to name real numbers instead of adjectives — "reaches 42,838 schools across Uganda," not "national-scale coordination."

---

## 5. Component-by-component rebuild plan — nothing here is a straight recolor

| Component | What actually changes |
|---|---|
| `Hero.tsx` | Full rebuild around the Relief Engine hero variant, new headline treatment in Bricolage Grotesque, old ledger-styled mono tag removed entirely (not re-themed — removed) |
| `components/three/*` | All three existing scene files deleted; three new files written per Section 3.2 |
| `MagneticButton.tsx` | Keep the magnetic-pull interaction physics (it's genuinely good), but rebuild the visual shell: current rounded-pill shape replaced with a subtly irregular, hand-drawn-edge shape (an SVG border with a slight organic wobble, not a perfect radius) in the new palette |
| `Cursor.tsx` | Rebuild as a small glowing `signal`-colored dot with a faint trailing terrain-contour-line ring instead of a plain circle |
| `TiltCard.tsx` | Keep tilt math, rebuild card visual treatment: hairline border replaced with a subtle topographic-line pattern etched at low opacity into the card background |
| `ScrollProgress.tsx` | Rebuild as a vertical elevation profile line (a thin SVG path resembling a terrain cross-section) that fills in as the user scrolls, rather than a plain bar |
| `PageTransition.tsx` | Rebuild transition as a "terrain wipe" — a low-opacity contour-line pattern sweeps across the viewport between pages instead of a plain fade/slide |
| `StatCounter.tsx` | Keep the counting logic, rebuild the visual frame around it to match the survey/mono aesthetic |
| `OperationsRegister.tsx` | Deleted. Replaced by new `FieldLog.tsx` per 3.3 |
| `SealMark.tsx` | Deleted entirely, including as a favicon mark — replace favicon with a simple faceted terrain-triangle glyph drawn fresh |
| `StatusBadge.tsx` | Rebuilt: status badges get a small live `signal`-pulsing dot for "deployed" states instead of a static color chip |
| `TechTag.tsx` | Rebuilt with the topographic-line texture treatment from `TiltCard.tsx` for visual consistency |
| `CategoryFilter.tsx`, `ProjectCard.tsx`, `ProjectGrid.tsx` | Recolored and rebuilt to use the new sector icon set (6.2) and the irregular-edge shape language from `MagneticButton.tsx` |
| `LocationSignal.tsx` | Rebuilt around the About-page Relief Engine variant rather than its current implementation |

---

## 6. Custom asset generation — required, non-optional, all seven categories

Generate every asset below and save into `public/images/contour/` with descriptive filenames. Do not substitute a CSS gradient or placeholder for any of these, including ones that seem skippable.

### 6.1 Hero fallback still (for the reduced-motion terrain fallback in 3.2)
**Prompt:** "A low-poly, flat-shaded 3D terrain landscape at dusk, faceted ridgelines in deep olive-green and warm clay tones (#3C4A2E, #7C8B57, #B4602E), a gradient sky moving from deep plum-indigo (#463754) at the top through warm clay to sun-bleached parchment (#F5EFDE) near the horizon, a handful of small glowing warm-amber light points scattered across the terrain at different elevations suggesting settlements reached by a network, one slightly brighter glowing point near the terrain's highest ridge suggesting a source hub, no text, no photorealistic detail, deliberately faceted low-poly aesthetic like a hand-built 3D render, wide 21:9 aspect ratio.

### 6.2 Sector icon set (9 icons, unified style, distinct from any previous line-art set)
Style constraint for all nine: faceted/geometric icon style matching the terrain's low-poly aesthetic rather than smooth line art — each icon built from 3–6 flat angular shapes, single-color fill in `terrain-deep` on transparent background, no strokes, no gradients, 64x64 viewbox.

1. **Civic/government:** "A faceted geometric icon of a small official building formed from angular flat-shaded planes, like a low-poly 3D render viewed from a slight angle, warm olive-green fill."
2. **Security/intelligence:** "A faceted geometric shield shape built from 4–5 angular flat planes suggesting a gemstone-cut surface, warm olive-green fill."
3. **Health:** "A faceted geometric cross shape with angled, gem-cut facet lines running through it rather than a flat outline."
4. **Agriculture:** "A faceted geometric cluster of 3 small angular crop-row shapes of varying height, like tiny low-poly hills."
5. **Education:** "A faceted geometric open-book shape built from angular flat planes, a single small radiating triangle above it."
6. **Fintech/payments:** "A faceted geometric coin or mobile-money icon built from angular flat planes rather than a smooth circle, gem-cut surface treatment."
7. **Automotive/IoT:** "A faceted geometric vehicle silhouette built from angular flat planes, viewed from a three-quarter low-poly angle."
8. **Supply chain:** "A faceted geometric shipping-box icon built from angular flat planes with visible facet lines on each side."
9. **Platform/voice AI:** "A faceted geometric soundwave built from angular triangular bars of varying height rather than smooth rounded bars."

### 6.3 Sector field vignettes (5–6 illustrations, dusk terrain palette, replacing the earlier warm-flat-illustration set)
Style constraint: low-poly faceted illustration style matching the terrain scene exactly (not a flat, smooth illustration style as previously proposed) — dusk lighting, `terrain-deep`/`terrain-mid`/`clay`/`signal` palette on `canvas` or `dusk` background, no photorealism, no human faces, human presence suggested only through silhouette or absence.

1. **Rural school (UGEMS):** "A low-poly faceted 3D-style illustration of a single school building on a small ridge at dusk, angular flat-shaded roof and walls, a faceted solar panel on the roof catching the last warm light, deep olive and clay tones, no visible people."
2. **Government office (APEX NEXUS):** "A low-poly faceted illustration of a simple desk and laptop silhouette inside an angular-walled office space at dusk, warm interior light glowing from one window, dusk-indigo exterior."
3. **Community health post (NK UZIMA):** "A low-poly faceted illustration of a small clinic building on rising terrain at dusk, a faceted cross sign catching warm amber light, a simple angular bicycle shape leaning against the wall."
4. **Farmer's field (Crop Circles):** "A low-poly faceted illustration of a field of angular crop-row shapes at dusk with one small glowing warm-amber point suggesting a basic phone screen held at ground level, no visible figure, just the field and the light."
5. **Telecom reach (SENTECT/YERACLE):** "A low-poly faceted illustration of a tall angular signal tower on a high ridge at dusk with thin amber light lines radiating outward toward smaller distant ridgelines."
6. **Bank agent point (Yokoshing), optional:** "A low-poly faceted illustration of a small roadside kiosk shape at dusk with one warm glowing window, set low against a wide darkening sky."

### 6.4 In-brand architecture diagrams (per flagship project)
**Prompt template, fill in real architecture layers from `data/projects.ts`:** "A clean technical diagram in a faceted, angular flat-vector style using terrain-deep, clay, and signal-amber on a parchment background, showing [2–4 real architectural layers from the project's `architectureHighlight` field] as simple angular geometric shapes (faceted rectangles, small triangular connectors) rather than rounded boxes, connected by thin angled lines, labeled in Space Mono, no drop shadows, no 3D bevels, no generic cloud/gear/lock clipart." Generate for APEX NEXUS, UGEMS, SENTECT+YERACLE paired, and NK UZIMA at minimum; extend to all fifteen Field Log entries if time allows.

### 6.5 Open Graph / social share image
**Prompt:** "A 1200x630 social share card, the VAIS wordmark set in the lower-left corner in a warm off-white, set against a cropped, calmer section of the low-poly dusk terrain scene from 6.1, generous negative space around the wordmark, no other text or icons."

### 6.6 404 page illustration
**Prompt:** "A low-poly faceted illustration of a single isolated ridge with one dim, flickering amber light point on it, no visible path connecting it to anything else, a wide darkening dusk sky above, calm and quiet rather than alarming, no text."

### 6.7 Grain/texture overlay
**Prompt:** "A subtle, seamless, tileable film-grain noise texture at very low opacity, warm parchment tone, for a full-page overlay at 3 to 5 percent opacity, adding tactile paper-like warmth over flat digital color and the terrain render without appearing as a visible repeating pattern."

---

## 7. Section-by-section rebuild checklist

- [ ] Delete `hub.glb`, `node.glb`, `generate-vais-models.mjs`, all hash-named files in `public/images/`
- [ ] `app/layout.tsx` — swap to Bricolage Grotesque + Source Serif 4 + Space Mono, new favicon (faceted terrain-triangle glyph), new OG image (6.5)
- [ ] `styles/globals.css` + `tailwind.config.ts` — full token replacement per Section 2, delete every prior token from both the Civic Register and Field Intelligence passes
- [ ] `components/three/HeroScene.tsx`, `ConstellationScene.tsx`, `IntegrationMapScene.tsx` — deleted and rewritten from the Relief Engine spec (3.2) as new files; consider renaming to `TerrainScene.tsx`, `TerrainSceneCompact.tsx`, `TerrainSceneProject.tsx` for clarity
- [ ] `components/home/Hero.tsx` — full rebuild per Section 5
- [ ] `components/home/*` — replace all icon-grid sections with narrative blocks per Section 4
- [ ] New `components/ui/FieldLog.tsx` — built per 3.3, replaces `OperationsRegister.tsx` (delete the old file)
- [ ] `app/about/page.tsx` + `LocationSignal.tsx` — rebuilt per Section 5, tighter terrain variant
- [ ] `app/work/page.tsx` + `components/work/*` — rebuilt per Section 5, full Field Log listing with all fifteen projects
- [ ] `app/work/[slug]/page.tsx` + `ProjectDetail.tsx` — per-project terrain variant with `StatCounter`, architecture diagram (6.4), sector vignette (6.3)
- [ ] `app/contact/page.tsx` + `ContactForm.tsx` — recolored to new tokens, keep functionality
- [ ] `app/not-found.tsx` — integrate 404 illustration (6.6)
- [ ] `Navbar.tsx` + `Footer.tsx` — recolored, confirm `logo.png` appears only in nav
- [ ] Apply grain overlay (6.7) globally at low opacity
- [ ] Write and wire the shared `useMotionPreference.ts` hook (2.3) and the low-end-device fallback path (3.2) before considering the Relief Engine complete

---

## 8. QA pass before handoff

- No reference to any prior token name — Civic Register or Field Intelligence — remains anywhere in the codebase, including comments.
- No generic Lucide/Heroicons icon remains where a custom faceted sector icon (6.2) applies.
- No pre-baked GLTF model, no stock photography, no uncanny AI-face imagery anywhere.
- The terrain scene degrades to the static fallback (3.2) cleanly on a throttled mobile profile — test this, don't assume it.
- All motion respects `prefers-reduced-motion`, verified through the shared hook, not per-component ad hoc checks.
- Every number and claim traces back to `data/projects.ts` / `data/company.ts` verbatim — no invented statistics anywhere in the new narrative copy.
- Every component in Section 5's table has actually changed in the way described, not just recolored — spot-check at least three at random against the table before calling this done.
