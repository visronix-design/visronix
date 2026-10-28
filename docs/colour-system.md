# VISRONIX colour system — "Engineering daylight"

Website-wide colour redesign, October 2026. Colour-only change: layout, spacing,
typography, structure and behaviour are unchanged from the previous design.

## 1. Research summary

| Reference | Source inspected | Colours (verified unless noted) | Lesson for VISRONIX |
|---|---|---|---|
| Arduino | arduino.cc/en/trademark/community-logo (official) | Teal `#00878F`, Light Teal `#62AEB2`, Orange `#E47128`, Yellow `#E5AD24`, Brown `#8C7965` | Teal is the established electronics-education colour; warm secondary used sparingly |
| IBM Carbon | carbondesignsystem.com color tokens (official) | Blue 60 `#0f62fe` as `$interactive`/`$border-interactive`, explicitly rated 3:1 AA | Role-based tokens; interaction colour carries the 3:1 duty; light gray surfaces |
| Siemens Element | element.siemens.io/fundamentals/colors/ui-colors (official) | Petrol `#009999` (`si.ref.color.main.brand.petrol`) | Industrial teal-on-light reads as serious engineering |
| NVIDIA | nvidia.com Trademark & Logo Usage Guidelines (official PDF) | NVIDIA Green `#76B900` on black/dark gray | Dark surfaces are brand moments, not the whole canvas |
| Raspberry Pi | commonly cited values — **not verified against official guidelines** | green ≈ `#75A81B`, red ≈ `#C51A4A` (approximations) | Hardware brands pair one saturated accent with strict neutrals |
| Category measurement | Inspo MCP, 24 technical sites | 79% light paper band; accent hue: greens/teals 46% > cool blues 42% | Light document surfaces are the category norm, not the exception |

Tooling actually used: Inspo MCP (`recommend`, measured evidence), Firecrawl search
(official brand pages; SearXNG was unavailable — 403), local WCAG contrast script
(`scripts/contrast-check.mjs`, 43 checks). Context7 not needed (Tailwind 4 `@theme`
already in use in this codebase).

## 2. Direction and rationale

**"Engineering daylight"** — light technical-paper document surfaces with dark
instrument **faceplates**, deep petrol-teal primary, copper secondary.

- **Light base** (`#f2f5f7` paper, white panels): product photography stays accurate,
  forms and catalogue content read easily, education content feels approachable.
  Matches the category norm (79% light) and the IBM/Siemens documentation model.
- **Dark faceplates** (`#0c151f`) retained for header, heroes, close panels and
  footer — the "instrument panel" DNA of the original design survives in the
  highest-brand moments (NVIDIA model: dark = stage, not workspace).
- **Deep petrol-teal** `#0c7068` primary: hardware-credible (Arduino/Siemens
  family), education-friendly, and clearly distinct from the old glowing cyan
  `#37d6f5` in both darkness and saturation — not a hue swap.
- **Copper** `#a1550b` as the single warm secondary: in-progress states and
  secondary highlights only (solder/workshop association, Arduino's warm support
  colours).
- Original palette: values are tuned for VISRONIX's contrast requirements, not
  copied from any reference.

## 3. Semantic tokens (`src/index.css` `@theme`)

All values verified with `node scripts/contrast-check.mjs` — **43/43 pass**
(WCAG 2.2: ≥4.5:1 normal text, ≥3:1 large text / UI boundaries / LED dots).

| Role | Token | Value | Key contrast |
|---|---|---|---|
| Page background | `base` | `#f2f5f7` | — |
| Tinted section | `base-2` | `#e8edf1` | — |
| Card / elevated | `panel` | `#ffffff` | — |
| Empty-state cell | `ghost` | `#e4eaef` | hatched, decorative |
| Hairline border (decorative) | `line` | `#d4dbe2` | — |
| Strong border / inputs / buttons | `line-strong` | `#76838e` | 3.29–3.88:1 vs surfaces |
| Primary text | `hi` | `#0f1b28` | 15.9:1 on base |
| Secondary text | `mid` | `#42525f` | 7.4:1 on base |
| Muted text | `low` | `#5a6b78` | 5.0:1 on base |
| Faceplate bg | `face` | `#0c151f` | — |
| Faceplate elevated | `face-2` | `#13202c` | — |
| Faceplate border | `face-line` | `#273544` | — |
| Text on faceplate | `face-hi` | `#eef3f8` | 16.5:1 on face |
| Secondary on faceplate | `face-mid` | `#a2b1bf` | 8.4:1 on face |
| Muted on faceplate | `face-low` | `#7d8ea1` | 5.1:1 on face |
| Primary accent | `accent` | `#0c7068` | 5.9:1 on panel; white on it 5.9:1 |
| Accent hover | `accent-strong` | `#085b54` | white on it 8.0:1 |
| Accent on faceplates | `accent-bright` | `#3ad4c2` | 10.0:1 on face |
| Text on accent fills | `on-accent` | `#ffffff` | — |
| Secondary / in-progress | `copper` / `copper-bright` | `#a1550b` / `#f2a54e` | 5.5:1 on panel / 9.0:1 on face |
| Success | `ok` / `ok-bright` | `#1a6e3c` / `#4cd087` | 6.3:1 / 9.4:1 |
| Error | `bad` / `bad-bright` | `#b3261e` / `#f4827a` | 6.5:1 / 7.3:1 |
| Informational | `info` / `info-bright` | `#0d6a9e` / `#5cb8ef` | 5.9:1 / 8.4:1 |

State is never colour-alone: LEDs keep their labels, form errors keep `role="alert"`
text, ghost cells keep wording.

## 4. Context rule

- **Light document context** (default): page body, content sections, cards,
  forms, catalogue, tables.
- **Faceplate context** (`.on-face` scope + `face-*` tokens): header, page heroes,
  home hero, close-panel sections, footer, 404 screen, founder feature panel,
  select dark tiles.

## 5. Old → new mapping

| Old token | New (light context) | New (faceplate context) |
|---|---|---|
| `ink` | `base` | `face` |
| `ink-2` | `base-2` | `face` |
| `ink-3` | `panel` / hover tints | `face-2` |
| `paper` | `hi` | `face-hi` |
| `mist` | `mid` | `face-mid` |
| `dim` | `low` | `face-low` |
| `line` | `line` | `face-line` |
| `line-2` | `line-strong` | `face-line` |
| `cyan` / `cyan-deep` | `accent` / `accent-strong` | `accent-bright` |
| `verified` | `ok` | `ok-bright` |
| `progress` | `copper` | `copper-bright` |
| `ghost` | `ghost` | `face-2` |
| `shadow-lit` (cyan glow) | `shadow-raise` (neutral) | LED glow kept on faceplates only |

Hardcoded remnants replaced: `#062028`/`#5ce0f9` (FloatingWhatsApp), `#f07a6a`
(field error), scrollbar/selection/placeholder/segment greys in `index.css`.
