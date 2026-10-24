// Guilloché: the engraved, interlaced line work of banknotes and certificates, built
// here from sums of sines in polar form. The same bands drive the static ornaments
// (SVG, rendered at build time) and the animated hero (canvas, public/hero.js).

export interface Band {
  /** Mean radius, as a share of the ornament's outer radius. */
  radius: number;
  /** Wave amplitude, as a share of the outer radius. */
  amp: number;
  /** Waves per turn. */
  waves: number;
  /** Copies, each turned by an even share of one wave: the interlace. */
  copies: number;
  /** A slower second wave that makes the band swell and pinch. */
  swell?: number;
  swellWaves?: number;
}

/** The house rosette: an outer lace, a woven middle band and a tight inner rose. */
export const ROSETTE: Band[] = [
  { radius: 0.86, amp: 0.07, waves: 18, copies: 14, swell: 0.012, swellWaves: 6 },
  { radius: 0.62, amp: 0.13, waves: 9, copies: 18, swell: 0.03, swellWaves: 3 },
  { radius: 0.34, amp: 0.12, waves: 6, copies: 16 },
  { radius: 0.12, amp: 0.06, waves: 5, copies: 10 },
];

/** Radius of one copy of a band at angle t. */
export function bandRadius(band: Band, copy: number, t: number, phase = 0): number {
  const turn = (copy / band.copies) * ((2 * Math.PI) / band.waves);
  const swell = band.swell
    ? band.swell * Math.sin((band.swellWaves ?? 1) * t + phase * 0.5)
    : 0;
  return band.radius + band.amp * Math.sin(band.waves * (t + turn) + phase) + swell;
}

/** SVG path data for every copy of every band, centred on (cx, cy). */
export function rosettePaths(
  size: number,
  bands: Band[] = ROSETTE,
  steps = 360,
): { band: number; d: string }[] {
  const r = size / 2;
  const out: { band: number; d: string }[] = [];
  bands.forEach((band, b) => {
    for (let c = 0; c < band.copies; c++) {
      let d = '';
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * 2 * Math.PI;
        const rho = bandRadius(band, c, t) * r;
        const x = r + rho * Math.cos(t);
        const y = r + rho * Math.sin(t);
        d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      out.push({ band: b, d: d + 'Z' });
    }
  });
  return out;
}
