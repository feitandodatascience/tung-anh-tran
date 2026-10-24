// Small display helpers shared by the pages.
import type { Note } from './content';

const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

export function monthYear(date: string): string {
  return MONTH.format(new Date(date));
}

/** A note's metrics as headline findings, with a true minus sign on negatives. */
export function findings(meta: Note) {
  return meta.metrics.map((m) => ({
    ...m,
    value: String(m.value).replace(/^-(?=\d)/, '−'),
  }));
}

/** Lowercase-hyphen id for a heading, as the export does for "sources". */
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
