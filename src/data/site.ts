// Site copy that does not come from the export: navigation, profile links and the
// placeholder entries shown until real ones are approved. Every placeholder carries
// `placeholder: true`, and the pages mark it as such, so nothing reads as a real claim.
// Roles, education, languages, email and LinkedIn come from the CV once it is exported.

export const AUTHOR = 'Tung Anh Tran';

/** Long form of the positioning statement (brand-voice skill). */
export const POSITIONING =
  "I'm Tung Anh Tran, a data scientist building machine learning models for " +
  'classification and computer vision on large, complex datasets. Most of my work is ' +
  "in healthcare and education, and I'm open to problems in other industries.";

/** Short form, for meta descriptions and the footer. */
export const TAGLINE =
  'Data scientist · ML classification and computer vision · healthcare and education';

export const NAV = [
  { href: '/about/', label: 'About' },
  { href: '/work/', label: 'Work' },
  { href: '/projects/', label: 'Projects' },
  { href: '/publications/', label: 'Publications' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
];

export interface Channel {
  label: string;
  value: string;
  href?: string;
  placeholder?: boolean;
}

export const CHANNELS: Channel[] = [
  { label: 'Email', value: 'hello@example.com', placeholder: true },
  {
    label: 'GitHub',
    value: 'feitandodatascience',
    href: 'https://github.com/feitandodatascience',
  },
  { label: 'LinkedIn', value: 'Profile link to come', placeholder: true },
];

/** Roles and domains from the brand-voice skill. */
export const OPEN_TO = {
  roles: ['Data Scientist', 'ML Engineer', 'Data Analyst'],
  domains: 'Healthcare and education first, other industries welcome.',
};

export interface Role {
  title: string;
  org: string;
  place: string;
  start: string;
  end: string;
  summary: string;
  points: string[];
  placeholder: true;
}

export const EXPERIENCE: Role[] = [
  {
    title: 'Role title',
    org: 'Organisation',
    place: 'City, country',
    start: '20XX',
    end: 'present',
    summary: 'One sentence on the team, the data and who used the results.',
    points: [
      'A result with its number and how it was validated.',
      'A model or pipeline, and the decision it supported.',
    ],
    placeholder: true,
  },
  {
    title: 'Role title',
    org: 'Organisation',
    place: 'City, country',
    start: '20XX',
    end: '20XX',
    summary: 'One sentence on the team, the data and who used the results.',
    points: ['A result with its number and how it was validated.'],
    placeholder: true,
  },
  {
    title: 'Role title',
    org: 'Organisation',
    place: 'City, country',
    start: '20XX',
    end: '20XX',
    summary: 'One sentence on the team, the data and who used the results.',
    points: ['A result with its number and how it was validated.'],
    placeholder: true,
  },
];

export const EDUCATION = [
  { degree: 'Degree and field', school: 'Institution', years: '20XX – 20XX', placeholder: true },
  { degree: 'Degree and field', school: 'Institution', years: '20XX – 20XX', placeholder: true },
];

export const LANGUAGES = [{ name: 'Languages to come', level: '', placeholder: true }];

/**
 * The write-up the home page leads with under "Selected work", whatever its date.
 * Falls back to the newest write-up when this id is not in the export.
 */
export const FEATURED_PROJECT = 'drivendata-dat-parkinsons-challenge';

export interface Teaser {
  title: string;
  summary: string;
  kind: string;
  tags: string[];
  placeholder: true;
}

export const PROJECT_PLACEHOLDERS: Teaser[] = [
  {
    title: 'Project title',
    summary: 'One line that leads with the model and its validated result.',
    kind: 'Project',
    tags: ['tag', 'tag'],
    placeholder: true,
  },
  {
    title: 'Project title',
    summary: 'One line that leads with the model and its validated result.',
    kind: 'Competition',
    tags: ['tag', 'tag'],
    placeholder: true,
  },
];

export interface PostTeaser {
  title: string;
  summary: string;
  month: string;
  minutes: number;
  placeholder: true;
}

export const POST_PLACEHOLDERS: PostTeaser[] = [
  {
    title: 'Choosing a calibrator out of sample',
    summary: 'Why a calibrator scored on its own training predictions looks perfect.',
    month: 'Coming soon',
    minutes: 6,
    placeholder: true,
  },
  {
    title: 'Reading a leaderboard shift',
    summary: 'What a steady gap between public and private scores does and does not say.',
    month: 'Coming soon',
    minutes: 5,
    placeholder: true,
  },
  {
    title: 'Post title',
    summary: 'One line on what the reader learns.',
    month: 'Coming soon',
    minutes: 4,
    placeholder: true,
  },
];
