import { defineConfig } from 'astro/config';

// Static site. `site` is the canonical domain (canonical URLs, Open Graph, later a sitemap
// and RSS); Vercel redirects the apex and the .vercel.app URL to it.
export default defineConfig({
  site: 'https://www.tunganhtran.com',
  output: 'static',
  // Write-ups used to live under /work/; Work is now the experience page.
  redirects: {
    '/work/[id]': '/projects/[id]',
  },
});
