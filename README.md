# tung-anh-tran

Source of Tung Anh Tran's public portfolio site: a static [Astro](https://astro.build)
site, English only.

## Layout

| Path | What it holds |
|---|---|
| `design/tokens.json` | Brand design tokens (colour, type, spacing). The single source of truth for brand values; nothing else hardcodes them. |
| `content/` | The public export (`public-export/3`): `index.json`, note frontmatter, approved write-ups with their rendered `*.page.json`, and `assets/figures.{css,js}`. Added only through reviewed pull requests. |
| `src/lib/tokens.ts` | Turns `tokens.json` into CSS variables (light, dark, spacing, fonts) |
| `src/lib/content.ts` | Reads `content/`; checks the export format |
| `src/pages/` | Home (`/`), one page per write-up (`/work/<id>/`), publications (`/publications/`), favicon, 404 |
| `src/styles/site.css` | Page styles, all in token variables. Figure styles ship with the export |
| `public/fonts/` | Glacial Indifference, Regular and Bold (SIL OFL 1.1) |

## Develop

Node 22.23.4 or later.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

The site renders whatever export is in `content/`. With no export it builds and shows
"No write-ups are published yet." To try an export without committing it, point the
build at it:

```bash
FEITAN_CONTENT_DIR=../feitan-agents/exports/public npm run dev
```

The page text and figures come pre-rendered from the export (the same rendering as the
write-up preview in `feitan-agents`), so what was approved is what the site shows.

## Brand

"Clay & Olive": espresso ink on a sand ground, one clay-orange signal, olive for links.
Type is Glacial Indifference (SIL OFL 1.1) in Regular and Bold. General Sans is the
fallback for dense dashboards and is not bundled here.
