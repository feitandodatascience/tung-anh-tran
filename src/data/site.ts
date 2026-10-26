// Site copy that does not come from the export: navigation, profile links and the
// placeholder entries shown until real ones are approved. Every placeholder carries
// `placeholder: true`, and the pages mark it as such, so nothing reads as a real claim.
// Roles, education, languages, email and LinkedIn come from the CV once it is exported.

export const AUTHOR = 'Tung Anh Tran';

/** Long form of the positioning statement, the home page's "In short". */
export const POSITIONING =
  "I'm a data scientist who has built statistical and machine learning models, data " +
  'pipelines and integrated dashboards on large, complex databases. Alongside my work, I ' +
  'take part in machine learning competitions and build side projects, like the website ' +
  "you're reading now.";

/** Short form, for the footer. */
export const TAGLINE = 'Data scientist, curious about any dataset with a pattern behind it.';

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
  domains: "Have a data problem that needs solving? I'd like to hear about it, whatever the field.",
};

/** The About page's "My stack", most in demand first. */
export const STACK = [
  { group: 'Languages', items: ['Python (pandas, NumPy)', 'SQL', 'R (tidyverse)', 'PySpark'] },
  {
    group: 'Machine learning',
    items: [
      'PyTorch',
      'scikit-learn',
      'XGBoost and LightGBM',
      'Computer vision (CNNs)',
      'Time-series forecasting',
      'Feature engineering',
      'Ensembles and stacking',
      'Hyperparameter tuning (Optuna)',
    ],
  },
  {
    group: 'Statistics',
    items: [
      'Regression modelling',
      'Causal inference',
      'Probability calibration',
      'Cross-validation design',
    ],
  },
  {
    group: 'Engineering and cloud',
    items: [
      'Azure Machine Learning',
      'Microsoft Fabric',
      'ETL pipelines',
      'Docker',
      'Git and GitHub Actions',
      'pytest',
    ],
  },
  { group: 'Dashboards', items: ['Power BI (DAX)', 'Tableau', 'Streamlit'] },
];

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

/** A still of a project's live app, shown until the visitor loads the app itself. */
export interface Poster {
  src: string;
  width: number;
  height: number;
}

/** Stills of live apps (files in public/demos/), by note id. */
export const DEMO_POSTERS: Record<string, Poster> = {
  'reading-tracker': { src: '/demos/reading-tracker.webp', width: 1568, height: 726 },
};

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
];
