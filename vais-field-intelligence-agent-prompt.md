# VAIS Website Rebuild — "Field Intelligence" — Agent Implementation Brief

Hand this entire document to the coding agent working in the VAIS repo (`VAIS-main`, Next.js 14, Tailwind, Framer Motion, React Three Fiber). It supersedes the prior "Civic Register" direction (Zilla Slab / IBM Plex / ink-paper-murram / ledger motif) currently live in `tailwind.config.ts`, `styles/globals.css`, and the register/seal components. Follow this brief completely — do not fall back to defaults where a decision below already exists, and do not skip the asset-generation section even for assets that seem decorative. Every asset listed is intentional and required.

---

## 0. The idea in one paragraph

VAIS's real differentiator isn't "AI company," it's that every system in the portfolio (APEX NEXUS, UGEMS, SENTECT/YERACLE, NK UZIMA, Crop Circles, MUBS EC, Yokoshing) is engineered to work inside real, often difficult operating conditions: offline rural schools, low-connectivity clinics, feature-phone farmers, a 17-million-subscriber telecom network, government infrastructure with no enterprise budget. **Field Intelligence** is the direction: the site should feel like watching real, living systems reach real institutions, not like a generic SaaS landing page. Technical sophistication reads as *care and competence*, not spectacle. Warmth comes from color, type, and grounded specificity. Professionalism comes from restraint, one strong visual idea per section, real numbers instead of adjectives, no repeated icon-card grids.

---

## 1. Before touching anything

1. Confirm the stack is unchanged (Next.js 14 App Router, Tailwind, Framer Motion, React Three Fiber + drei, `hub.glb` / `node.glb` models already in `public/models/`).
2. Audit every current use of `logo.png` as decorative filler (hero, about section backgrounds) and remove all but the single nav usage — this was flagged before and should already be partially fixed; verify.
3. Confirm the hero headline renders as normal spaced text (a prior bug ran words together). If any similar whitespace-stripping bug exists anywhere else (project cards, stat labels), fix at the source.
4. Do not delete `components/three/*`, `components/ui/MagneticButton.tsx`, `components/ui/Cursor.tsx`, `components/ui/TiltCard.tsx`, `components/ui/ScrollProgress.tsx`, `components/layout/PageTransition.tsx`, or `components/ui/OperationsRegister.tsx`. These are retained and re-themed, not rebuilt from scratch — see Section 5.

---

## 2. Design tokens

### 2.1 Color — replace the entire `--color-*` block in `styles/globals.css` and the `colors` block in `tailwind.config.ts`

| Token | Hex | Role |
|---|---|---|
| `canvas` | `#FAF6EC` | Primary background — warm ivory, not stark white, not grey "paper" |
| `ink` | `#16201A` | Primary text — deep warm charcoal with a soft green cast, never pure black |
| `growth` | `#2E6B4E` | Primary brand color — deep, living green. Links, active states, primary buttons, the network visualization's core nodes |
| `growth-soft` | `#E4EEE7` | Tint of growth for hover washes, selected states, soft card backgrounds |
| `amber` | `#E2A63B` | Functional signal color only — status badges ("deployed," "in development"), progress indicators. Never decorative, never a background fill |
| `clay` | `#C1633B` | Secondary warm accent used sparingly — illustration accents, one highlighted word per section at most, never for large fills |
| `mist` | `#6B7568` | Secondary/muted text, captions, metadata |
| `hairline` | `#DDD6C7` | Borders, dividers, table rules — warm, keyed to canvas |

Explicitly avoid: purple-to-blue gradients, neon-on-black, generic cyberpunk teal, uniform 16px radius on every card, stock "AI orb" glow effects, and any leftover murram/paper/gazette/signal-amber-as-ledger-stamp tokens from the Civic Register direction.

### 2.2 Type — replace the `fontFamily` block and Google Fonts imports

- **Display** (`font-display`): **Fraunces**, variable, with the `SOFT` optical axis leaned into for headlines (use `font-variation-settings: "SOFT" 60–100, "opsz" 72` on large display text). Fraunces has warm, slightly organic terminals that give headlines character without looking like a government stamp or a generic startup wordmark. Use only for H1/H2 and pull-quote-style callouts.
- **Body / UI** (`font-sans`): **Instrument Sans**, variable. Clean, quietly distinctive, far less overused than Inter/Manrope/Space Grotesk. All body copy, nav, buttons, form fields.
- **Data / mono** (`font-mono`): keep **JetBrains Mono** — used for reference numbers, coordinates, metric labels, status codes, timestamps. This is the "instrument readout" texture and it still earns its place in the new direction.

Both Fraunces and Instrument Sans are free on Google Fonts — load via `next/font/google`, not a CDN link tag.

### 2.3 Motion language

Replace any snappy/bouncy easing with organic, "breathing" curves: `cubic-bezier(0.22, 1, 0.36, 1)` for reveals, 500–700ms durations (slower than typical corporate motion, faster than sluggish). Stagger reveals at 120–160ms per item. The existing `Reveal.tsx` / `FadeIn.tsx` / `register-reveal` keyframes should be retuned to these values, not replaced. Respect `prefers-reduced-motion` everywhere (already partially handled — verify coverage extends to every new animated element).

---

## 3. The signature visual system: "The Living Network"

This is the one big visual idea the whole site organizes around, replacing the ledger/register-as-hero-device from the prior direction (though the register's *tabular data* instinct is worth keeping — see 3.3).

### 3.1 Concept

A slow, continuously-breathing node network rendered in React Three Fiber, using the existing `hub.glb` / `node.glb` models and `ConstellationScene.tsx` / `HeroScene.tsx` / `IntegrationMapScene.tsx` as the base to re-theme (not rebuild). Nodes represent real institution types VAIS's systems reach (a school, a clinic, a police post, a farm, a bank agent) connected by gentle pulsing edges in the `growth` palette instead of cold blue. Motion should read as alive but calm, more like watching a slow nature documentary of a network than a cyberpunk data-viz. No fast strobing, no neon, no dense particle swarms.

- **Hero (homepage):** the network fills the background behind the headline, slow pan/drift, 2–3 nodes gently pulsing at any time, `growth` and `growth-soft` only, very low visual noise so the headline stays fully legible.
- **About page:** a tighter, more static version of the same scene, anchoring the company narrative.
- **Work / project detail pages:** a per-project variant where the featured system's real metric (e.g. "42,838 schools," "17M+ subscribers," "23 Presidential Directives") animates in as a number counting up near the node cluster — reuse `StatCounter.tsx`.

### 3.2 Sector iconography

Every project category (`civic-government`, `security-intelligence`, `health`, `agriculture`, `education-institutions`, `fintech-payments`, `automotive-iot`, `supply-chain`, `platform`) gets one custom line-art icon, generated per Section 6, replacing any generic Lucide icons currently used for category tags.

### 3.3 Systems Register (evolved from the old ledger)

Keep the instinct from `OperationsRegister.tsx` — a real tabular list is more credible than icon cards — but re-skin it entirely. Rename conceptually to **"Systems in the Field"**: a warm-toned table (canvas background, hairline rules, mono for reference numbers and status codes, `amber` badges for status only) listing flagship projects with sector, status, and one real metric pulled from `data/projects.ts`. Rows reveal on scroll with the staggered easing from 2.3, not the old sharp "stamped record" reveal. No seal/stamp imagery (`SealMark.tsx` should be retired or repurposed as a subtle favicon-scale mark only, not a page decoration).

---

## 4. Content direction — narrative over icon-grids

For every page currently using a 2- or 3-card icon grid (home's "Design principle / Institutional fit / National reach," about's "Operational thesis / Program focus"), replace with a **narrative walkthrough**: one flagship project at a time, told in plain, confident, specific language, using the real problem/solution/architecture text already written in `data/projects.ts` — do not invent new marketing copy to replace it, that data is already excellent and specific (it names real ministries, real constraints like load-shedding and rural connectivity, real numbers). Pull 3–4 flagship projects (APEX NEXUS, UGEMS, SENTECT + YERACLE as a paired feature, NK UZIMA) onto the homepage as full narrative sections, each paired with one sector vignette illustration (Section 6.3) and one architecture diagram styled in-brand (Section 6.4), not a literal screenshot.

Tone: plain, warm, confident, specific. Avoid tech-marketing abstractions ("national-scale coordination," "built to hold under real operating conditions") in favor of concrete claims a reader can verify or picture — the existing `data/projects.ts` copy already does this well; the site design has been the weak link, not the content.

---

## 5. Component reuse plan (do not rebuild these from scratch)

| Component | Action |
|---|---|
| `MagneticButton.tsx` | Keep behavior, retune to new color tokens and 2.3 easing |
| `Cursor.tsx` | Keep, recolor dot/ring to `growth` / `growth-soft` |
| `TiltCard.tsx` | Keep for project cards, soften tilt intensity slightly for the calmer motion language |
| `ScrollProgress.tsx` | Keep, recolor to `growth` |
| `PageTransition.tsx` | Keep transition logic, adjust to 2.3 timing |
| `StatCounter.tsx` | Keep, reuse heavily in the narrative sections (Section 4) and Living Network per-project variant |
| `OperationsRegister.tsx` | Re-skin per 3.3, keep the row-stagger-reveal mechanism |
| `SealMark.tsx` | Retire from page layouts; keep only if repurposed as a small favicon/mark |
| `components/three/*` | Re-theme colors and easing per Section 3.1, keep geometry/model loading logic |
| `StatusBadge.tsx`, `TechTag.tsx` | Keep, recolor: status badges use `amber` functionally only; tech tags use `hairline` borders on `canvas` |

---

## 6. Custom asset generation — required, non-optional

Your image generation capability should produce every asset below. Generate all of them even where a placeholder or CSS-only solution seems sufficient — the intent is a fully custom visual system with no generic stock imagery, no default icon library look, and no literal stock-photo-of-people anywhere on the site. Save all assets into `public/images/field-intelligence/` with descriptive filenames (not hash-named like the current `public/images/*.jpg` files).

### 6.1 Hero ambient texture
**Prompt:** "An abstract, softly organic background texture suggesting a living network of light, in deep growth green (#2E6B4E) and warm ivory (#FAF6EE) tones, with faint amber (#E2A63B) glimmers at a few node points. Painterly, soft-focus gradient mesh with subtle grain, no hard edges, no recognizable objects or figures, no text. Should feel calm and alive, like slow-moving bioluminescence or aerial farmland lights at dusk, not like a circuit board or cyberpunk data grid. Wide 21:9 aspect ratio, suitable as a hero section background with a headline overlaid on the left third."

### 6.2 Sector icon set (9 icons, one prompt each, unified style)
Style constraint for all nine: single-color line art (growth green `#2E6B4E` stroke on transparent background), consistent 2px stroke weight, rounded line caps, soft/organic linework rather than sharp geometric icons, no fills, no gradients, 64x64 viewbox, matching visual family to each other.

1. **Civic / government:** "A simple line-art icon of an official building with a rounded, warm silhouette — soft columns and a gentle pediment line — suggesting institutional trust without looking like a cold government seal."
2. **Security / intelligence:** "A line-art icon of a shield shape formed from interlocking network nodes rather than a solid shield, suggesting protection through connection rather than a hard barrier."
3. **Health:** "A line-art icon combining a simple cross shape with a soft pulse/heartbeat line running through it, rounded terminals, warm and calm rather than clinical."
4. **Agriculture:** "A line-art icon of a single growing plant with two leaves inside a soft rounded outline, evoking new growth."
5. **Education / institutions:** "A line-art icon of an open book with a small radiating node above it, suggesting knowledge connected to a network."
6. **Fintech / payments:** "A line-art icon of two overlapping rounded coins or a simple mobile-money phone silhouette with a small arrow suggesting transfer, kept soft and rounded rather than sharp-cornered."
7. **Automotive / IoT:** "A line-art icon of a simple rounded vehicle silhouette from a three-quarter angle with a small radiating signal arc above it."
8. **Supply chain:** "A line-art icon of a simple rounded shipping box with a small checkmark or verification node on one corner."
9. **Platform / voice AI:** "A line-art icon of a simple rounded soundwave or waveform, three to five bars of varying height with soft rounded tops."

### 6.3 Sector field vignettes (4–6 small illustrations for narrative sections)
Style constraint: warm, soft-edged, semi-abstract illustration, flat color blocks in the `growth` / `growth-soft` / `clay` / `amber` palette on `canvas` background, no photorealism, no generic stock-photo-style human figures (avoid any uncanny AI-generated faces), human presence suggested through posture/silhouette/context rather than detailed faces if people appear at all.

1. **Rural school context (for UGEMS):** "A warm, semi-abstract illustration of a simple single-story school building under a wide sky, a small solar panel on the roof, flat warm color blocks (growth green roof, ivory walls, clay-colored earth path), no visible faces, calm and dignified, editorial-illustration style rather than photorealistic."
2. **Government office context (for APEX NEXUS):** "A warm, semi-abstract illustration of a simple desk with a laptop and a stack of papers, a small national emblem suggestion in the background kept abstract and non-specific, flat warm color palette, calm and orderly composition."
3. **Community health post (for NK UZIMA):** "A warm, semi-abstract illustration of a small clinic building with a simple cross sign, a bicycle leaning against the wall, flat color blocks in the brand palette, no visible faces, dignified and calm."
4. **Farmer with a basic phone (for Crop Circles):** "A warm, semi-abstract illustration showing a silhouette figure in a field holding a simple phone, crops rendered as soft rounded shapes, flat warm color blocks, no facial detail, composition emphasizes the connection between the field and the small glowing phone screen."
5. **Telecom network context (for SENTECT/YERACLE):** "A warm, semi-abstract illustration of a simple radio/cell tower rendered in soft rounded geometric shapes with a few connection lines radiating outward in amber, set against an ivory sky, calm and orderly rather than dense or technical-looking."
6. **University/election context (for MUBS EC), optional:** "A warm, semi-abstract illustration of a simple ballot box shape with a single checkmark, flat color palette, calm and trustworthy composition."

### 6.4 In-brand architecture diagrams (per flagship project, replacing screenshots)
**Prompt template (fill in per project using the real architecture text in `data/projects.ts`):** "A clean, warm-toned technical diagram in flat vector style using the growth green, amber, and clay palette on an ivory background, showing [2–4 real architectural layers/components from the project's `architectureHighlight` field] connected by simple rounded-corner lines, labeled with small mono-style text, no drop shadows, no 3D bevels, no generic 'cloud/gear/lock' clipart icons — use simple geometric shapes (rounded rectangles, small circles) for each component instead." Generate one for APEX NEXUS, UGEMS, SENTECT/YERACLE (as a single paired diagram), and NK UZIMA at minimum.

### 6.5 Open Graph / social share image
**Prompt:** "A 1200x630 social share card with the VAIS wordmark in the lower left, set against the hero ambient texture style from 6.1 at a smaller, calmer scale, warm ivory and growth green palette, generous negative space, no additional text or icons cluttering the composition."

### 6.6 404 page illustration
**Prompt:** "A warm, semi-abstract illustration of a single network node disconnected from its cluster, a few faint dotted lines suggesting a broken connection reaching toward it, flat color blocks in the brand palette, calm and slightly wistful rather than alarming or broken-looking, no text."

### 6.7 Grain/texture overlay
**Prompt:** "A subtle, seamless, tileable film-grain noise texture at very low opacity, warm-neutral tone, suitable as a full-page overlay at 3–5% opacity to add tactile warmth to flat digital color fields without being visible as an obvious pattern."

---

## 7. Section-by-section rebuild checklist

- [ ] `app/layout.tsx` — swap font loading to Fraunces + Instrument Sans + JetBrains Mono, update metadata to use the new OG image (6.5)
- [ ] `styles/globals.css` + `tailwind.config.ts` — full token replacement per Section 2
- [ ] `components/home/Hero.tsx` — Living Network background (3.1), Fraunces headline, remove any leftover mono "REG. 001" ledger-styling unless re-themed to fit the new warmer mono treatment
- [ ] `components/home/*` — replace icon-card grids with narrative sections per Section 4, integrate sector vignettes (6.3) and architecture diagrams (6.4)
- [ ] `components/ui/OperationsRegister.tsx` — re-skin per 3.3
- [ ] `app/about/page.tsx` + `components/about/LocationSignal.tsx` — tighter Living Network variant, remove duplicate icon-card grid, replace with narrative content about VAIS's operating philosophy grounded in real constraints already described in `data/company.ts`
- [ ] `app/work/page.tsx` + `components/work/*` — recolor `CategoryFilter`, `ProjectCard`, `ProjectGrid` to new tokens, apply sector icons (6.2) to category tags
- [ ] `app/work/[slug]/page.tsx` + `ProjectDetail.tsx` — per-project Living Network variant with `StatCounter`, architecture diagram (6.4), sector vignette (6.3)
- [ ] `app/contact/page.tsx` + `ContactForm.tsx` — recolor, keep functionality
- [ ] `app/not-found.tsx` — integrate 404 illustration (6.6)
- [ ] `components/layout/Navbar.tsx` + `Footer.tsx` — recolor, confirm logo appears only in nav (per Section 1.2)
- [ ] Apply grain overlay (6.7) globally at low opacity per the concept in Section 6.7

---

## 8. QA pass before handoff

- Every color reference to the old `murram` / `gazette` / `paper` / `ink` (Civic Register) tokens is gone from the codebase, not just visually overridden.
- No generic Lucide/Heroicons icons remain where a custom sector icon (6.2) applies.
- No stock-photo-style or uncanny AI-face imagery anywhere.
- All motion respects `prefers-reduced-motion`.
- Real data from `data/projects.ts` and `data/company.ts` is used verbatim for numbers and claims — no invented statistics.
- Site is checked at mobile width for the Living Network scenes (must degrade gracefully to a lighter/static variant on low-power devices — reuse `usePrefersReducedMotion.ts` pattern and consider a simple device/perf check before mounting the full R3F scene).
