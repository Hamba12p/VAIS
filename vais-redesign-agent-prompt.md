# VAIS Website Redesign — Implementation Brief

Hand this whole document to the coding agent working in the VAIS repo. It covers what's wrong with the current build, the new design direction, exact tokens, section-by-section changes, and a QA pass. Where content is marked `[REPLACE: ...]`, that's real information only VAIS can supply — don't invent specifics (deployment names, ministries, figures) to fill the gap.

---

## 0. Before touching anything

1. Open the repo and confirm the stack (site is on Vercel with Next.js `_next/image` paths — confirm framework, styling approach — Tailwind, CSS modules, styled-components — and whether content is hardcoded in JSX or pulled from a CMS/MDX before writing new code).
2. Fix this bug regardless of the redesign: the hero headline currently renders as `Appliedintelligenceforinstitutionsthatmustoperatewithcertainty` — all words run together with no spaces. Find whatever is stripping whitespace (likely a `white-space: nowrap` + manual line-break combo, or text passed through a slug/camelCase transform meant for something else) and fix at the source, not by re-adding spaces in the markup.
3. Note every place `logo.png` is currently reused as a decorative/filler image (hero background, about section, footer). All of these get replaced per Section 3 below — the logo should appear once, in the nav, at a sane size.

## 1. What's wrong with the current site (diagnosis)

- **No real visual identity.** The only visual asset is the logo, repeated as filler. There's no icon system, no photography, no distinct type.
- **Templated structure.** Home uses a 3-card icon grid (Design principle / Institutional fit / National reach); About uses a near-identical 2-card version (Operational thesis / Program focus). Same pattern, twice, regardless of the fact that the underlying content is different. This is the single most recognizable "AI-generated site" tell — a repeated stat-block card format applied whether or not the content is actually a matched set.
- **Generic hero formula.** Big headline + two buttons + no image is fine as a skeleton, but nothing about the execution is specific to VAIS — it would sit unchanged on a generic SaaS or consulting site.
- **Copy is directionally right but abstract.** Lines like "built to hold under real operating conditions" and "national-scale coordination" gesture at credibility without stating anything a reader can verify or picture. Real specifics (actual sectors, actual constraints — load-shedding, connectivity gaps, specific ministries or systems VAIS integrates with) will do more work than any adjective.
- **No sense of place.** Nothing on the page reads as Kampala- or Uganda-specific beyond the address in the footer. Given that VAIS's whole pitch is operating under real local constraints, the design should carry some of that specificity too — without leaning on generic "African pattern" decoration, which would just trade one cliché for another.

## 2. Design direction: "Civic Register"

The organizing idea: **the homepage reads like an operations ledger, not a landing page.** Government-facing infrastructure companies earn trust through legibility and record-keeping, not through gradients and glow. Precedent worth knowing (don't copy — the point is the underlying logic): Koto's 2026 rebrand of Faculty AI moved away from AI's default gradient-orb-and-glow vocabulary toward editorial/gazette-inspired typography and grid systems specifically because "applied AI for institutions" needed to look earned rather than futuristic. VAIS is in the same category and should make the same move, grounded in Uganda-specific material rather than a generic newspaper look.

### Color

| Token | Hex | Use |
|---|---|---|
| `ink` | `#14170F` | Primary text, dark backgrounds — near-black with a slight olive cast, like wet murram at dusk or registry ink |
| `paper` | `#EDEAE0` | Primary background — cool, slightly grey off-white (registry paper, not cafe-cream) |
| `murram` | `#9C4A24` | Primary accent — deep laterite red-brown, the color of Uganda's unpaved roads. Used for links, active states, the signature ledger's header row |
| `signal` | `#D99A2B` | Functional accent only — status indicators ("ACTIVE," "PILOT"), never decorative. Desaturated amber, like a utility meter dial, not neon |
| `gazette` | `#37493A` | Secondary accent — muted deep green, for "verified/deployed" states, referencing an official stamp or seal |
| `hairline` | `#B9B4A6` | Rules, table borders, dividers — warm grey keyed to `paper`, not pure grey |

Explicitly avoid: purple-to-blue gradients, uniform 16px border-radius on every card, warm-cream-plus-terracotta-plus-italic-serif (the current top AI-design cliché), and neon-on-black.

### Type

- **Display / masthead** — a slab serif, e.g. **Zilla Slab** (Google Fonts, free). Used only for the hero headline and section mastheads, set large and tight. A slab reads as stamped or engraved — closer to signage and official documents than to a startup wordmark.
- **Body / UI** — **IBM Plex Sans** (Google Fonts, free). Chosen because it was originally built for technical/institutional documentation and has real character without being one of the currently-overused AI defaults (Inter, Space Grotesk, Geist — all worth avoiding here).
- **Data / mono** — **IBM Plex Mono** for anything that reads as a record: reference numbers, coordinates, dates, status labels, the ledger table. This is what gives the site its "instrument readout" texture.

### Layout concept

One sentence: **a fixed coordinate masthead up top, a single stamped headline as the hero, and a real operations ledger in place of any icon-card grid.**

```
┌───────────────────────────────────────────────────┐
│ VAIS      0.3476°N 32.5825°E · KAMPALA      [MENU] │  <- fixed nav, mono coords
├───────────────────────────────────────────────────┤
│                                                     │
│   APPLIED INTELLIGENCE                             │
│   FOR INSTITUTIONS THAT MUST                       │
│   OPERATE WITH CERTAINTY.                          │  <- Zilla Slab, huge, tight leading
│                                                     │
│   REG. 001 · EST. KAMPALA                          │  <- small mono line under headline
│                                                     │
├───────────────────────────────────────────────────┤
│ REGISTER OF OPERATIONS                             │  <- signature element, see 3.2
│ REF   SECTOR            STATUS      COVERAGE       │
│ 01    Civic Delivery     ACTIVE     [REPLACE]       │
│ 02    Security Ops       ACTIVE     [REPLACE]       │
│ 03    Health Infra       DEPLOYED   [REPLACE]       │
│ 04    Agriculture        PILOT      [REPLACE]       │
├───────────────────────────────────────────────────┤
│ MARGINALIA — design principle, institutional fit,  │
│ national reach, set as annotated side-notes next   │
│ to the ledger, not as separate icon cards          │
├───────────────────────────────────────────────────┤
│ FOOTER — contact, coordinates repeat, small seal    │
└───────────────────────────────────────────────────┘
```

### Signature element: the Register

Replace both the home page's 3-card grid and the about page's 2-card grid with **one** real table: sector, status, coverage, reference number. This is the one place the design gets to be distinctive — treat it like an actual government or survey register, not a styled feature list. On load, reveal rows one at a time (150–200ms stagger, ease-out, no bounce) like a record being populated — this is the only motion flourish the page needs. Respect `prefers-reduced-motion`: fall back to an instant, fully-visible table.

## 3. Section-by-section changes

### 3.1 Nav / masthead
Logo (small, left) + wordmark. Right side: a live-updating or static coordinate readout in IBM Plex Mono (`0.3476°N 32.5825°E · KAMPALA`) — this is decorative but earns its place as a recurring motif, reused in the footer. Standard nav links stay as-is (Home / About / Work / Contact).

### 3.2 Home hero
- Headline in Zilla Slab, three lines, tight leading, `ink` on `paper`. Fix the whitespace bug here specifically.
- Small mono reference line beneath: `REG. 001 · EST. KAMPALA` — establishes the "registry" motif immediately.
- Two CTAs stay (Review the portfolio / Contact VAIS) — restyle as underlined text links or bracket-style buttons (`[ Review the portfolio ]`) rather than filled gradient buttons.
- No hero image. No repeated logo. If the section feels empty, that's fine — let the Register section below carry the visual weight.

### 3.3 Register of Operations (replaces the 3-card grid)
Build the ledger table described above. Columns: `REF`, `SECTOR`, `STATUS`, `COVERAGE`. Populate with real VAIS program data — `[REPLACE: actual sector names, status, and coverage figures]`. Status values should use a small color-coded mono tag (`ACTIVE` in gazette green, `PILOT` in signal amber, `DEPLOYED` in murram) — functional color, not decorative.

### 3.4 Marginalia (replaces the "Design principle / Institutional fit / National reach" cards)
Keep the three existing points but present them as annotated marginal notes running alongside the register — small mono labels ("NOTE 01," "NOTE 02" — fine here because these genuinely are sequential annotations, not decoration) with a sentence or two of prose each, not icon-topped cards. Same content, no icons needed.

### 3.5 About page
Retire the "Operational thesis / Program focus" 2-card block entirely — it's the same templated pattern as the homepage cards, just fewer of them. Fold that content into prose under the masthead-style heading, and/or extend the Register with an additional column or footnote row specific to About (e.g., years active, HQ). Replace every instance of the reused logo image with either: nothing (let type and the register carry the section), a single custom line-drawn coordinate/pin mark for Kampala/Makerere (one small custom SVG, not stock photography, not an icon-font glyph), or real photography if/when VAIS has it — `[REPLACE: confirm whether real photography exists before deciding]`.

### 3.6 Work page
If case studies exist or are planned, format them as register entries too — same REF/SECTOR/STATUS/COVERAGE columns, each row expanding (or linking out) to a full case study. This keeps the ledger motif consistent site-wide instead of introducing a third layout pattern.

### 3.7 Contact page
Keep it plain: phone, email, address, set in Plex Sans with the phone/coordinates in Plex Mono. No card, no icon row — a contact page for an institutional buyer should look like a business card, not a marketing block.

### 3.8 Footer
Repeat the coordinate readout from the nav. Small seal mark (the custom SVG pin, reused) instead of the full logo. Copyright line stays.

## 4. Copy direction

Don't fix the vagueness by adding more adjectives — fix it by adding specifics. Wherever the current copy says something like "national-scale coordination" or "measurable operational impact," it should instead name the actual constraint or system: which ministries, which bandwidth conditions, which specific workflow gets replaced. `[REPLACE: pull these specifics from VAIS's actual project history — do not let the agent invent government partnerships, deployment numbers, or outcomes that aren't confirmed]`. Keep sentences active and plain: say what the system does, not what it "empowers" or "enables."

## 5. Accessibility / engineering floor (non-negotiable regardless of aesthetic)

- Responsive down to a small phone screen — the register table needs a legible mobile layout (stacked rows, not horizontal scroll-and-hope).
- Visible keyboard focus states on every link and interactive element, styled to match the palette (a `murram` outline, not the browser default blue).
- `prefers-reduced-motion` respected — the row-reveal stagger becomes instant.
- WCAG AA contrast minimum for all text/background pairs above, especially `signal` amber on `paper` (check this one specifically — amber-on-light-background is the pairing most likely to fail contrast; darken if needed).
- Semantic HTML: the register is a real `<table>` (or ARIA-equivalent grid), not a div soup — this also matters for how AI answer engines and crawlers parse the page.

## 6. Final QA pass

Before calling this done, check:
- Does the hero headline render with correct spacing?
- Is the logo image used exactly once (nav) plus once small (footer seal) — nowhere else?
- Are the 3-card and 2-card grids fully gone, replaced by the register + marginalia?
- Is there any leftover purple/blue gradient, generic rounded-corner card, or emoji-as-icon anywhere in the codebase?
- Does every "REF" number in the register correspond to something real, not filler?
- Read the final headline and register data aloud — does it sound like a specific institution's actual operations, or like a placeholder that could belong to any applied-AI company? If the latter, push for one more real detail before shipping.
