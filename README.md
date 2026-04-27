# majormovementstudio.com

Marketing landing page for Major Movement Studio — Reformer & Mat Pilates in Zephyrhills, FL.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Keystatic (git-backed CMS) · Vercel.

## Local development

```bash
npm install
npm run dev   # http://localhost:3000
```

The admin UI is available at `http://localhost:3000/keystatic` in dev — saves write directly to `content/*.yaml`.

Other scripts:

```bash
npm run build       # production build
npm run typecheck   # tsc --noEmit
npm run check       # biome lint + format with safe fixes
```

## Editing content

The site is content-managed by Keystatic. Two ways to edit:

- **Developer** — edit `content/*.yaml` files directly, or use the admin UI in dev (`/keystatic`).
- **Studio owner** — sign in to `https://majormovementstudio.com/keystatic` (after Keystatic Cloud is set up — see `CLAUDE.md`). Each save commits to GitHub; Vercel auto-deploys.

## Project structure

- `keystatic.config.tsx` — CMS schema (single source of truth for content shape)
- `content/` — YAML content files
- `src/content/` — content domain layer (reader, queries, types)
- `src/components/sections/` — page sections
- `src/components/ui/` — reusable atoms
- `src/app/` — App Router entry, layout, admin routes

See `CLAUDE.md` for full architecture, layering rules, and the Figma → code workflow.

## Deployment

Pushed to `main` → auto-deployed via Vercel. Environment variables (Vercel → Settings):

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Base URL for SEO/OG tags |
| `KEYSTATIC_STORAGE=github` | only when going live with editor | Switches storage to GitHub mode |
| `NEXT_PUBLIC_KEYSTATIC_PROJECT` | only when going live with editor | Keystatic Cloud project slug |
