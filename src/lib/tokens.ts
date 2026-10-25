// Brand values come only from design/tokens.json: this file turns them into CSS
// custom properties. Nothing else in the site hardcodes a colour, font or spacing.
import tokens from '../../design/tokens.json';

type Mode = 'light' | 'dark';
type Font = { family: string; fallback: string[]; weights?: number[] };

const fonts = tokens.font as Record<string, Font>;

export function color(role: string, mode: Mode = 'light'): string {
  const palette = tokens.color[mode] as Record<string, { value: string }>;
  return palette[role].value;
}

export function fontStack(role: string): string {
  const font = fonts[role];
  return [font.family, ...font.fallback]
    .map((name) => (name.includes(' ') ? `"${name}"` : name))
    .join(', ');
}

function palette(mode: Mode): string {
  const roles = tokens.color[mode] as Record<string, { value: string }>;
  const lines = Object.entries(roles).map(([role, t]) => `--${role}: ${t.value};`);
  // Reference series in charts: muted on light, faint on dark (as in the preview).
  lines.push(`--series-reference: var(--${mode === 'dark' ? 'faint' : 'muted'});`);
  return lines.join('\n');
}

function scale(): string {
  const { scale, layout, unit } = tokens.spacing;
  return [
    ...Object.entries(scale).map(([name, v]) => `--space-${name}: ${v}${unit};`),
    ...Object.entries(layout).map(([name, v]) => `--${name}: ${v}${unit};`),
  ].join('\n');
}

/** Self-hosted files per font role (public/fonts/). Variable fonts cover every weight. */
const FONT_FILES: Record<string, { file: string; style: 'normal' | 'italic' }[]> = {
  heading: [
    { file: '/fonts/LibreBodoni-Variable.woff2', style: 'normal' },
    { file: '/fonts/LibreBodoni-Variable-Italic.woff2', style: 'italic' },
  ],
  body: [
    { file: '/fonts/Jost-Variable.woff2', style: 'normal' },
    { file: '/fonts/Jost-Variable-Italic.woff2', style: 'italic' },
  ],
  mono: [{ file: '/fonts/JetBrainsMono-Regular.woff2', style: 'normal' }],
  script: [{ file: '/fonts/Allura-Regular.woff2', style: 'normal' }],
};

/** Files worth preloading: the faces seen above the fold, the header's script name included. */
export const preloadFonts = [FONT_FILES.heading[0].file, FONT_FILES.body[0].file, FONT_FILES.script[0].file];

function fontFaces(): string {
  return Object.entries(FONT_FILES)
    .filter(([role]) => role in fonts)
    .flatMap(([role, files]) => {
      const { family } = fonts[role];
      const range = { heading: '400 700', body: '100 900' }[role] ?? '400';
      return files.map(
        ({ file, style }) =>
          `@font-face{font-family:'${family}';font-style:${style};font-weight:${range};` +
          `font-display:swap;src:url('${file}') format('woff2');}`,
      );
    })
    .join('\n');
}

/** Every token as CSS: always light, dark only when the visitor picks it (data-theme). */
export const tokenCss = `${fontFaces()}
:root {
${palette('light')}
${scale()}
--sans: ${fontStack('body')};
--heading: ${fontStack('heading')};
--mono: ${'mono' in fonts ? fontStack('mono') : 'monospace'};
--script: ${fontStack('script')};
color-scheme: light;
}
:root[data-theme="dark"] {
${palette('dark')}
color-scheme: dark;
}`;
