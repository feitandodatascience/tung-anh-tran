// The TA monogram, coloured from the tokens rather than hardcoded hex values.
import { color } from '../lib/tokens';

export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="TA">
<rect width="64" height="64" rx="14" fill="${color('primary')}"/>
<text x="32" y="44" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="30" font-weight="700" letter-spacing="-1" fill="${color('background')}" text-anchor="middle">TA</text>
</svg>
`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
