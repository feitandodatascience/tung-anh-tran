import { defineConfig } from 'astro/config';

// Static site. Set `site` to the real domain once there is one (needed for canonical
// URLs, a sitemap and RSS).
export default defineConfig({
  output: 'static',
});
