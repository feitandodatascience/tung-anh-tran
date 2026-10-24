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

/** Font faces for the self-hosted body family (files in public/fonts/). */
const FONT_FILES: Record<number, string> = {
  400: '/fonts/GlacialIndifference-Regular.woff',
  700: '/fonts/GlacialIndifference-Bold.woff',
};

function fontFaces(): string {
  const { family, weights = [] } = fonts.body;
  return weights
    .filter((w) => w in FONT_FILES)
    .map(
      (w) =>
        `@font-face{font-family:'${family}';font-weight:${w};font-display:swap;` +
        `src:url('${FONT_FILES[w]}') format('woff');}`,
    )
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
color-scheme: light;
}
:root[data-theme="dark"] {
${palette('dark')}
color-scheme: dark;
}`;
