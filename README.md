# VISRONIX Technologies — Website

Production website for VISRONIX Technologies (Chennai, Tamil Nadu, India). React + TypeScript + Vite + Tailwind CSS 4, with react-router and lucide-react icons.

## Quick start

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
```

## Pages

`/` · `/about` · `/founders` · `/stem-education` · `/electronic-components` · `/iot-solutions` · `/engineering-projects` · `/agrinex` · `/research` · `/projects` · `/contact` · 404 fallback.

## Central configuration

Everything business-specific lives in **`src/config/site.ts`** — name, tagline, WhatsApp number/display, email, social links, navigation model. Edit that one file to rebrand or update contact details.

### Environment variables

Copy `.env.example` to `.env` and fill in what you need:

| Variable             | Purpose                                                              | Default / if unset                                                  |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `VITE_CONTACT_EMAIL` | Business email used by every email CTA and the enquiry form handoff   | Defaults to `visronix@gmail.com` in `src/config/site.ts` (override only to change it; an empty value restores the "coming soon" honest state) |
| `VITE_SITE_URL`      | Canonical URL + `og:url` (e.g. `https://visronix.in`)                 | Canonical tags are omitted; sitemap/robots keep their placeholder    |

Never commit `.env` — it is gitignored. All `VITE_*` values are public (compiled into the bundle), so never put secrets here.

### WhatsApp integration

All enquiry paths build `wa.me/919962011415` deep links with contextual prefilled messages (product, course, project, IoT, AGRINEX, general). Number and display format are set in `src/config/site.ts`. The contact page also shows the raw deep link for transparency.

### Enquiry forms (no backend)

Forms never transmit data or fake a "sent" state. On submit they validate, then open a **handoff panel** with the composed message and buttons that open WhatsApp or email (mailto to `visronix@gmail.com`) with the message prefilled. A honeypot field filters naive bots.

## Demo data — replace before launch

Content that must be client-verified is labeled in the UI and in `src/data/`:

- `src/data/products.ts` — 14 demonstration catalogue entries (`demo: true`). The store shows a "Catalogue preview" banner and Demo badges; no prices or stock are invented. Replace with the real stock list.
- `src/data/projects.ts` — portfolio contains only AGRINEX (status: prototype). Add verified case studies as work completes.
- `src/data/agrinex.ts` — capability lists intentionally show "Details to be published" until verified on hardware.
- `src/config/site.ts` — `socialLinks` is empty; the site renders honest "coming soon" states rather than fake links.
- `src/data/founders.ts` — the four people on `/founders` are derived verbatim from client-provided portrait filenames in `data/` (name + position); biographies are deliberately absent until the client supplies verified text. Portraits are served from `public/founders/` under their exact original filenames.
- About points to `/founders` for people; achievements panels on `/about` remain pending verified content.

## SEO

Per-route title/description/OG tags via `useSeo` (`src/lib/seo.ts`), JSON-LD Organization schema in `index.html`, `public/robots.txt`, `public/sitemap.xml`.

The build regenerates `dist/sitemap.xml` and `dist/robots.txt` from `VITE_SITE_URL` (`scripts/generate-sitemap.mjs`). Set `VITE_SITE_URL` in the host's environment once the production domain is final and SEO files are correct automatically — no manual edits.

## Deployment (zero budget)

The site is a static SPA after `npm run build` — no server code.

**Vercel (recommended):**

1. Push this repo to GitHub (repo is initialised; make the first commit if not done).
2. In Vercel: **Add New → Project → Import** the repo. The Vite framework preset is auto-detected (build `npm run build`, output `dist`).
3. SPA client-side routing is handled by `vercel.json` (`rewrites: /(.*) → /index.html`). Nothing to configure.
4. Optional env var in **Settings → Environment Variables**: `VITE_SITE_URL=https://your-final-domain` — sets canonical/OG URLs and regenerates sitemap + robots. `VITE_CONTACT_EMAIL` is already baked in (`visronix@gmail.com`); set it only to change the address.
5. Deploy. Add the custom domain later in **Settings → Domains**.

**Cloudflare Pages**: connect the repo, build command `npm run build`, output directory `dist`. `public/_redirects` (`/*  /index.html  200`) handles SPA client-side routing.

**Netlify**: same build command/output; `_redirects` works there too.

## QA scripts

With the preview server running on port 4173 (`npm run preview -- --port 4173 --strictPort`):

```bash
node scripts\smoke-test.mjs   # 79 checks: overflow at 4 viewports, nav, store, forms, WhatsApp/email URLs, a11y
node scripts\shots.mjs        # full-page screenshots of all routes into shots/
```

## Design system

"Panel & Bench" instrument world on a light "engineering daylight" base with dark instrument faceplates. Tokens live in `src/index.css` (`@theme`): light document surfaces base `#F2F5F7` / base-2 `#E8EDF1` / panel `#FFFFFF` with text hi `#0F1B28` / mid `#42525F` / low `#5A6B78` and lines `#D4DBE2` / line-strong `#76838E` (3:1 interaction minimum); dark faceplate ramp face `#0C151F` / face-2 `#13202C` / face-line `#273544` with face-hi `#EEF3F8` / face-mid `#A2B1BF` / face-low `#7D8EA1`; accent petrol-teal `#0C7068` (accent-bright `#3AD4C2` on faceplates, on-accent white on fills); copper `#A1550B`; ok `#1A6E3C`; bad `#B3261E`; info `#0D6A9E`. Faceplates (`.on-face` scope): header, page heroes, home hero, close panels, footer, 404. Full rationale and verified contrast table: `docs/colour-system.md`; palette verified by `scripts/contrast-check.mjs` (43 checks). Archivo Variable (width axis, display) + Azeret Mono Variable (data) via `@fontsource-variable/*`. Honesty is a design mechanic: ghost cells mark pending assets/emails, LED colour encodes verification state (green = verified, copper = in progress, ghost = pending). One orchestrated hero moment (power-on boot sequence); scroll reveals respect `prefers-reduced-motion`. Instrument primitives live in `src/components/instrument/` (seven-segment display, LEDs, status rail).
