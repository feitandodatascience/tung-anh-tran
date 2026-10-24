# tung-anh-tran

Source of Tung Anh Tran's public portfolio site: a static [Astro](https://astro.build)
site, English only.

## Layout

| Path | What it holds |
|---|---|
| `design/tokens.json` | Brand design tokens (colour, type, spacing). The single source of truth for brand values; nothing else hardcodes them. |
| `content/` | The public export (`public-export/4`): `index.json`, note frontmatter, approved write-ups with their rendered `*.page.json`, `assets/figures.{css,js}`, and the CV (`cv/cv.json` read from the `.docx`, and its PDF). Added only through reviewed pull requests. |
| `src/lib/tokens.ts` | Turns `tokens.json` into CSS variables (light, dark, spacing, fonts) |
| `src/lib/content.ts` | Reads `content/`; checks the export format; reads note frontmatter (tools, skills, findings) and the CV |
| `src/lib/guilloche.ts` | The engraved rosette: polar sine bands shared by the hero canvas and the static seals |
| `src/data/site.ts` | Site copy that is not in the export: navigation, contact channels, the write-up the home page leads with (`FEATURED_PROJECT`), and the placeholder roles, projects and posts (each marked `placeholder: true`). The CV replaces the placeholder roles, education, languages, email and LinkedIn when the export has one |
| `src/pages/` | Home, About, Work (experience, education and certificates from the CV), Projects (`/projects/<id>/` per write-up), Publications, Blog (`/blog/<id>/` for learning write-ups), Contact, the CV PDF (`/cv/<name>.pdf`), favicon, 404. Old `/work/<id>/` links redirect to `/projects/<id>/` |
| `src/styles/site.css` | Page styles, all in token variables. Figure styles ship with the export and are tuned at the end |
| `public/fonts/` | Libre Bodoni, Jost and JetBrains Mono, variable woff2 (SIL OFL 1.1) |

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

"Regent": deep regent green on a cool pearl ground, with one thread of antique gold
(the `accent` on light grounds, `glint` on the deep bands). Display type is Libre Bodoni,
a sturdy Didone; text is Jost. The home hero is a guilloché rosette, the engraved line
work of banknotes and certificates, drawn on a canvas: it draws itself in once, then its
bands turn slowly and swell around the pointer. Reduced motion gets a still drawing.

Placeholders are visible on purpose and carry a dashed "Placeholder" badge. Replace them
in `src/data/site.ts`; real projects, posts and publications come from the export.
