// Reads the public export (feitan-agents' export_public.py output). The site never
// reads the vault: content/ holds only what the export let through. Set
// FEITAN_CONTENT_DIR to try another export folder locally without committing it.
import fs from 'node:fs';
import path from 'node:path';

// Format 3 adds publications to format 2, so a format-2 export still reads correctly.
const FORMATS = ['public-export/2', 'public-export/3'];
const ROOT = path.resolve(process.env.FEITAN_CONTENT_DIR || 'content');

export interface Citation {
  authors: string[];
  venue: string;
  issue?: string | null;
  publisher?: string | null;
  language?: string;
  title_en?: string | null;
}

export interface Entry {
  id: string;
  type: 'project' | 'competition' | 'learning' | 'publication';
  title: string;
  date: string;
  path: string;
  writeup?: string;
  page?: string;
  publication?: Citation;
  url?: string | null;
}

export interface Stat {
  value: string;
  label: string;
  note: string;
}

export interface Page {
  id: string;
  approved: string | null;
  title: string;
  eyebrow: string;
  summary_html: string;
  tags: string[];
  stats: Stat[];
  body_html: string;
  sources: string[];
}

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

export function entries(): Entry[] {
  if (!fs.existsSync(path.join(ROOT, 'index.json'))) return [];
  const index = JSON.parse(read('index.json'));
  if (!FORMATS.includes(index.format)) {
    throw new Error(
      `${ROOT}/index.json is "${index.format}", expected one of ${FORMATS.join(', ')}`,
    );
  }
  return index.notes as Entry[];
}

/** Every write-up page, newest note first. */
export function pages(): { entry: Entry; page: Page }[] {
  return entries()
    .filter((entry) => entry.page)
    .map((entry) => ({ entry, page: JSON.parse(read(entry.page!)) as Page }))
    .sort((a, b) => b.entry.date.localeCompare(a.entry.date));
}

/** Every publication with its citation, newest first. */
export function publications(): (Entry & { publication: Citation })[] {
  return entries()
    .filter((entry): entry is Entry & { publication: Citation } => !!entry.publication)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Shared figure CSS or JS from the export (empty if there is no export yet). */
export function asset(name: 'figures.css' | 'figures.js'): string {
  const file = path.join(ROOT, 'assets', name);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

export function titleOf(id: string): string {
  return entries().find((entry) => entry.id === id)?.title ?? id;
}

/** Summary HTML without its citation markers, for cards that have no Sources list. */
export function plainSummary(html: string): string {
  return html.replace(/<sup class="cite">.*?<\/sup>/g, '');
}
