# code.dzenyu.com

Personal site and blog built with [Astro](https://astro.build).

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Serve locally:
   ```bash
   npm run dev
   ```
3. Open http://localhost:4321

## Build

```bash
npm run build
```

Runs `astro build` and then indexes the output with [Pagefind](https://pagefind.app) for
static search. The production site is deployed from `dist/` via GitHub Actions
(`.github/workflows/deploy.yml`) to GitHub Pages.

## Structure

- `src/content/blog/` — blog posts (MDX)
- `src/content.config.ts` — blog collection schema
- `src/pages/[...slug].astro` — post routing (`/<categories>/<yyyy>/<mm>/<dd>/<slug>/`)
- `src/data/legacy-redirects.ts` — redirect stubs for the old Jekyll post URLs
- `src/pages/` — site pages (home, blog, about, tags, categories, search, 404)
- `src/components/`, `src/layouts/` — shared UI
- `public/assets/` — images, favicons, and `CNAME`

## References

- [Astro documentation](https://docs.astro.build)
