// Reads the public export (feitan-agents' export_public.py output). The site never
// reads the vault: content/ holds only what the export let through. Set
// FEITAN_CONTENT_DIR to try another export folder locally without committing it.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

// Format 3 adds publications to format 2 and format 4 adds the CV, so older exports
// still read correctly.
const FORMATS = ['public-export/2', 'public-export/3', 'public-export/4'];
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

export interface Metric {
  name: string;
  value: string;
  context: string;
}

/** A note's exported frontmatter (the export never includes the note body). */
export interface Note {
  id: string;
  type: Entry['type'];
  title: string;
  date: string;
  tags: string[];
  skills: string[];
  tools: string[];
  links: Record<string, string | null>;
  metrics: Metric[];
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

/** A bullet of the CV, with its bold lead if it has one. */
export interface CvPoint {
  label: string | null;
  text: string;
}

/** A role, degree or certificate: its line (title, organisation, dates), then the rest. */
export interface CvEntry {
  title: string;
  org: string[];
  dates: string;
  lines: string[];
  points: CvPoint[];
}

export interface CvSection {
  title: string;
  paragraphs: string[];
  items: CvPoint[];
  entries: CvEntry[];
}

/** The CV as the export reads it from the .docx (pending items already left out). */
export interface Cv {
  email: string | null;
  linkedin: string | null;
  updated: string | null;
  pdf: string;
  sections: CvSection[];
}

interface Index {
  format: string;
  notes: Entry[];
  cv?: { data: string; pdf: string };
}

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function index(): Index | null {
  if (!fs.existsSync(path.join(ROOT, 'index.json'))) return null;
  const index = JSON.parse(read('index.json'));
  if (!FORMATS.includes(index.format)) {
    throw new Error(
      `${ROOT}/index.json is "${index.format}", expected one of ${FORMATS.join(', ')}`,
    );
  }
  return index as Index;
}

export function entries(): Entry[] {
  return index()?.notes ?? [];
}

/** The CV, or null when the export has none. */
export function cv(): Cv | null {
  const file = index()?.cv?.data;
  return file ? (JSON.parse(read(file)) as Cv) : null;
}

/** The CV section whose heading contains `word` ("experience", "education", ...). */
export function cvSection(word: string): CvSection | undefined {
  return cv()?.sections.find((s) => s.title.toLowerCase().includes(word));
}

/** The CV's PDF: its file name (served at /cv/<name>) and bytes. */
export function cvPdf(): { name: string; bytes: Buffer } | null {
  const file = index()?.cv?.pdf;
  if (!file) return null;
  return { name: path.basename(file), bytes: fs.readFileSync(path.join(ROOT, file)) };
}

/** Every write-up page, newest note first. */
export function pages(): { entry: Entry; page: Page }[] {
  return entries()
    .filter((entry) => entry.page)
    .map((entry) => ({ entry, page: JSON.parse(read(entry.page!)) as Page }))
    .sort((a, b) => b.entry.date.localeCompare(a.entry.date));
}

/** Write-ups of projects and competitions (the Projects section). */
export function projectPages() {
  return pages().filter(({ entry }) => entry.type !== 'learning');
}

/** Write-ups of learning notes (the Blog section). */
export function postPages() {
  return pages().filter(({ entry }) => entry.type === 'learning');
}

/** Where a write-up lives on the site. */
export function href(entry: Entry): string {
  return `/${entry.type === 'learning' ? 'blog' : 'projects'}/${entry.id}/`;
}

/** The exported frontmatter of one note. */
export function note(entry: Entry): Note {
  const text = read(entry.path);
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`${entry.path} has no frontmatter`);
  const meta = parse(match[1]);
  return {
    ...meta,
    tags: meta.tags ?? [],
    skills: meta.skills ?? [],
    tools: meta.tools ?? [],
    links: meta.links ?? {},
    metrics: meta.metrics ?? [],
  } as Note;
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
