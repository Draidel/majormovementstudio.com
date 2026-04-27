# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing landing page for **Major Movement Studio** — a Pilates studio in Zephyrhills, FL. Single page, content-managed via Keystatic, deployed on Vercel. The design lives in Figma:

- File: `yFx28rr5XVt5DdvSHUCZ2X` (Major Movement Studio - Copy)
- Primary frame: node `85:2` ("Landing v2")

The Figma MCP server is configured in `.mcp.json`. Use it (`get_design_context`, `get_screenshot`, `get_metadata`) to pull design tokens, layout, and assets — do not eyeball the screenshot.

## Stack

- **Next.js 16** with the App Router and Turbopack (`next dev --turbopack`)
- **React 19**
- **TypeScript 5** in strict mode (`@/*` path alias → `src/*`)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — design tokens declared in `src/app/globals.css` under `@theme {}`, no `tailwind.config.ts`
- **Biome** for lint + format (replaces ESLint/Prettier)
- **next/font/google** — `Figtree` (closest free match to Aeonik) for body, `Praise` for the script display face. Exposed as `--font-sans` and `--font-display` design tokens.
- **Keystatic** (`@keystatic/core`, `@keystatic/next`) — git-backed CMS. Schema in `keystatic.config.tsx`, content as YAML in `/content`. See [Content & CMS](#content--cms-keystatic) below.

## Common commands

| Task | Command |
|------|---------|
| Dev server (localhost:3000) | `npm run dev` |
| Production build | `npm run build` |
| Start built server | `npm start` |
| Type check | `npm run typecheck` |
| Lint | `npm run lint` |
| Format + safe fixes | `npm run check` |

There are no tests yet. If you add Vitest or Playwright, document the runner here.

## Architecture

```
keystatic.config.tsx         # CMS schema — single source of truth for content shape
content/                     # editable YAML content (committed to git)
├── hero.yaml
├── studio.yaml
├── unlimited-cta.yaml
├── classes/*.yaml
├── founder-plans/*.yaml
├── class-packs/*.yaml
├── try-it-packs/*.yaml
└── faqs/*.yaml

src/
├── app/
│   ├── layout.tsx                      # fonts, metadata, html shell
│   ├── page.tsx                        # async server component — loads content, passes to sections
│   ├── globals.css                     # Tailwind v4 import + @theme tokens
│   ├── icon.svg
│   ├── keystatic/
│   │   ├── keystatic.tsx               # 'use client' wrapper
│   │   └── [[...params]]/page.tsx      # admin route (catch-all)
│   └── api/
│       └── keystatic/[...params]/route.ts  # admin API handler
├── content/                            # domain layer — the only consumer of @keystatic/core/reader
│   ├── reader.ts                       # singleton reader instance
│   ├── queries.ts                      # getHero(), getFaqs(), getHomeContent(), …
│   ├── types.ts                        # Hero, FaqItem, … (auto-derived from queries)
│   ├── helpers.ts                      # byOrder, flatten, readRequiredSingleton
│   └── index.ts                        # public barrel — components import from `@/content`
├── components/
│   ├── icons.tsx                       # inline SVG icon set (currentColor-based)
│   ├── ui/                             # reusable atoms — props-only, no data layer access
│   │   ├── announcement-banner.tsx
│   │   ├── pill.tsx
│   │   ├── price-row.tsx
│   │   ├── section-heading.tsx
│   │   ├── studio-info-card.tsx
│   │   └── index.ts
│   └── sections/                       # page sections — receive typed content, render markup
│       ├── hero.tsx
│       ├── about-classes.tsx
│       ├── memberships.tsx
│       ├── faq.tsx                     # 'use client' (accordion state)
│       ├── unlimited-cta.tsx
│       └── index.ts
└── (no lib/ — content layer replaces it)
```

### Layering rules

| Layer | Imports from | Imported by |
|---|---|---|
| `keystatic.config.tsx` | `@keystatic/core` | content layer, admin route |
| `content/*.yaml` | — | reader (filesystem) |
| `src/content/reader.ts` | `@keystatic/core/reader`, `keystatic.config` | `queries.ts` only |
| `src/content/queries.ts` | `reader`, `helpers` | `app/page.tsx`, `types.ts` |
| `src/content/types.ts` | `queries.ts` (type-only) | components, page |
| `src/content/index.ts` | `queries`, `types` | components, page |
| `src/components/ui/*` | `@/content` types only | sections |
| `src/components/sections/*` | `@/content` types, `../ui`, `../icons` | `app/page.tsx` |
| `src/app/page.tsx` | `@/content`, `@/components/sections` | runtime entry |

**Dependency direction is strictly downwards.** Components never import from `@keystatic/core/reader`; the CMS is swappable behind `@/content`.

### Editing rules

- **Content lives in `/content` YAML files.** Never inline copy into JSX. Re-add the schema in `keystatic.config.tsx` if you need a new field.
- **Components are pure presentation.** Sections receive typed props from `app/page.tsx`. They don't fetch content themselves; that keeps them testable and reusable.
- **Server components by default.** Mark `"use client"` only when state/browser APIs are needed (`sections/faq.tsx` is the only one today).
- **Brand tokens** are CSS variables on `@theme` in `globals.css` — `--color-brand-coral`, `--font-display`, `--radius-{card,panel,hero}`, `--shadow-{soft,card,cta,lift,photo}`. Tailwind v4 auto-generates `bg-brand-coral`, `font-display`, etc. from these. Never hardcode hex values inside components.
- **Images** go in `public/images/`. Pre-flight Figma assets at design time; `next/image` handles AVIF/WebP conversion at runtime.
- **Icons** are inline React SVG in `src/components/icons.tsx`, all using `currentColor`. Don't render SVGs through `next/image` — `currentColor` doesn't propagate through `<img>`.
- **Order field on collections** drives display order. The reader sorts ascending; missing values land at the end (so adding a new item without `order` doesn't accidentally bump it to the top).

## Content & CMS (Keystatic)

The studio owner edits content through Keystatic's admin UI without touching code. Schema in `keystatic.config.tsx` is the single source of truth — every field, label, default, and validation rule is declared there once.

### Storage modes

| Environment | Mode | When | Behavior |
|---|---|---|---|
| Local dev | `local` | always | Writes straight to filesystem; no auth |
| Production (default) | `local` | when env vars not set | Admin UI loads but saving fails — safe default for first deploy |
| Production (configured) | `github` | `KEYSTATIC_STORAGE=github` and `NEXT_PUBLIC_KEYSTATIC_PROJECT` set | Each save → GitHub commit → Vercel auto-deploys |

### Going live with the editor (one-time setup)

1. Sign up at https://keystatic.cloud (free tier is fine for one repo).
2. Create a team and a project linked to `Draidel/majormovementstudio.com`. You'll get a slug like `team-name/project-name`.
3. In Vercel project settings → Environment Variables, add for **Production** (and **Preview** if you want the editor on preview deploys):
   - `NEXT_PUBLIC_KEYSTATIC_PROJECT=team-name/project-name`
   - `KEYSTATIC_STORAGE=github`
4. Redeploy. The studio owner visits `https://majormovementstudio.com/keystatic`, signs in with GitHub via Keystatic Cloud, and edits.

### Editing flows

**Developer, locally:**
- Either edit the `content/*.yaml` files directly in your editor and save, OR
- Run `npm run dev` and visit `http://localhost:3000/keystatic` for the admin UI. Saves write straight to your local files.

**Studio owner, in production (after the one-time setup above):**
1. Visit `https://majormovementstudio.com/keystatic`.
2. Sign in with GitHub.
3. Click into Hero / Studio info / Pricing / FAQ etc., make changes, hit Save.
4. Vercel auto-deploys the change within ~30 seconds.

### Adding a new content field

1. Add the field to the relevant entry in `keystatic.config.tsx`.
2. (Optional) Set a `defaultValue` so existing files don't need backfilling.
3. The TypeScript types in `src/content/types.ts` are derived from the schema — they update automatically on the next build.
4. Use the field in the section component.

### Adding a new content type

1. Add a `singleton()` or `collection()` to `keystatic.config.tsx`.
2. Add a `getXxx()` query in `src/content/queries.ts` (use `byOrder(flatten(...))` for collections, `readRequiredSingleton(...)` for singletons).
3. Add the call to `getHomeContent()` if it should load on the homepage.
4. Components consume it via `import type { Xxx } from '@/content'`.

### Why Keystatic and not Payload / Sanity / Strapi

This is a single-page marketing site edited by one non-technical owner. Database-backed CMSes (Payload, Strapi, Sanity) bring user/role management, an always-on admin server, and a hosting line item we don't need. Keystatic stores content as YAML in the same git repo as code, runs entirely inside the existing Next.js app, costs $0 in infrastructure, and gives every edit a free version history (git log). It also keeps the homepage statically prerenderable — admin routes are dynamic but the marketing site is plain HTML at the edge.

## Design system notes

- Two type families. `--font-sans` (Figtree) for everything; `--font-display` (Praise script) only for the cursive accent words ("classes", "Major", "Questions", "Unlimited").
- Use `<SectionHeading>` for the recurring "lead + script" headline shape — don't recreate it inline.
- Pink radial blobs in the background are CSS-only (`body::before` / `body::after` in `globals.css`). Don't rasterize them.
- Card radii follow Figma exactly: 16px (interactive cards), 24px (panels), 36px (hero / CTA shells). Use `--radius-{card,panel,hero}` rather than ad-hoc values.

## Deployment (Vercel)

- Repo: `https://github.com/Draidel/majormovementstudio.com`
- Framework preset: **Next.js** (auto-detected). No special build settings required.
- `NEXT_PUBLIC_SITE_URL` should be set per environment (Production, Preview) — `metadata.metadataBase` reads it.
- For CMS: see [Going live with the editor](#going-live-with-the-editor-one-time-setup).
- Use the Vercel CLI (`vercel link`, `vercel env pull .env.local`) for first-time setup; the `.vercel` folder is gitignored.

## Working with the Figma MCP

When implementing a design change:

1. Get the node ID from the URL (`?node-id=85-2` → `85:2`).
2. Run `get_design_context(fileKey, nodeId)` for the smallest enclosing frame.
3. Run `get_screenshot(fileKey, nodeId)` for visual reference.
4. **Translate** the reference to this project's idioms — replace hex values with brand tokens, drop Figma's `data-node-id` attributes, lift copy into a Keystatic field (not into JSX), prefer `next/image` over raw `<img>`.
5. Download required assets to `public/images/` — Figma asset URLs expire in 7 days.
