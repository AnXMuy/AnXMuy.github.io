# Zixuan Jiang — Academic Homepage

Personal academic homepage built as a statically exported Next.js application.

## Stack

- Next.js 16 with static export
- React 19 and TypeScript
- Tailwind CSS 4
- Motion for page and scroll transitions
- GitHub Pages deployment through GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run lint
npm run build
```

The static site is exported to `out/`.

## Content

- Personal details and homepage links: `data/site.ts`
- Publications and research series: `data/publications.ts`
- Page content: `app/**/page.tsx`
- Static images and PDFs: `public/`

Publication data uses a recursive union. A `series` can contain `featured`, `standard`, or nested `series` entries, so related work can be grouped without flattening its presentation.

## Deployment

Pushing `main` triggers `.github/workflows/deploy-pages.yml`. The workflow builds the static export and publishes `out/` with the official GitHub Pages actions.
