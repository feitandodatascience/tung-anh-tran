// The TA monogram in its ring, coloured from the tokens rather than hardcoded values.
import { color, fontStack } from '../lib/tokens';

export function GET() {
  const font = fontStack('heading').replaceAll('"', "'");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="TA">
<circle cx="32" cy="32" r="32" fill="${color('deep')}"/>
<circle cx="32" cy="32" r="28" fill="none" stroke="${color('glint')}" stroke-width="1.2"/>
<text x="32" y="42" font-family="${font}" font-size="28" fill="${color('on-deep')}" text-anchor="middle">TA</text>
</svg>
`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
