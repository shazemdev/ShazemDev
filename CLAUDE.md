# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

Personal profile site for **Shazem**, an indie iPhone app developer. Live at
https://www.shazem.dev. Currently a single page; it will grow one app page at
a time as apps ship.

- **Next.js 16 (App Router) + React 19 + TypeScript.** Hand-written JSX and
  plain CSS — no UI library, no CSS-in-JS, no Tailwind, no component framework.
- **Statically exported.** `next.config.mjs` sets `output: 'export'`, so
  `npm run build` emits a plain HTML/CSS site to `out/`. There is no Node server
  in production — do not use route handlers, middleware, ISR, server actions,
  or `next/image` optimization. They will not work.
- Deployed to **Cloudflare Pages** by direct upload: `npm run deploy` builds and
  pushes `out/` with Wrangler. Pushing to GitHub does *not* deploy — the two are
  independent. See `DEVELOPMENT.md` §3.
- Edited in WebStorm; `.idea/` is gitignored and must never be committed.

## Project structure

```
app/layout.tsx          # <html>, metadata, fonts, shared header + footer
app/page.tsx            # the home page: hero, shelf, sections
app/not-found.tsx       # 404 — exported to out/404.html
app/globals.css         # H5BP base + helpers, then all site styles
public/                 # favicon.ico icon.png icon.svg site.webmanifest robots.txt
next.config.mjs         # output: 'export'
wrangler.toml           # Cloudflare Pages project name + output dir (out)
tsconfig.json
package.json
README.md               # GitHub profile README — see the warning below
DEVELOPMENT.md          # setup + deployment guide (keep in sync with reality)
CLAUDE.md               # this file
app/apps/               # (future) one route per shipped app
```

**`README.md` is not the project's setup guide.** This repo is
`shazemdev/ShazemDev`, and because that name matches the GitHub username
(GitHub matches case-insensitively), its `README.md` renders publicly as the
profile page at https://github.com/shazemdev. Keep it as a short personal
intro in the site's voice. Build, deploy and contribution notes belong in
`DEVELOPMENT.md`.

All CSS lives in `app/globals.css` and every route shares it. Do not add CSS
Modules, styled-jsx or a utility framework — the design tokens must have
exactly one home.

## Design system — do not drift from this

All design tokens live in `:root` at the top of the "Author's custom styles"
section of `app/globals.css`. **Always use the CSS variables; never hardcode
colors or fonts.**

- Colors: `--cloud` (bg), `--ink` (text), `--slate` (secondary), `--indigo`
  (accent/links), `--line` (borders), `--card` (surfaces).
- Type: `--display` = Bricolage Grotesque (headlines only, used sparingly);
  `--body` = system font stack (intentional — renders as San Francisco on
  Apple devices, a deliberate nod to iOS; do not replace with a webfont);
  `--mono` = JetBrains Mono (eyebrows, tags, tiny labels only).
- `--display` and `--mono` resolve through `--font-display` / `--font-mono`,
  which `next/font/google` injects in `app/layout.tsx`. The fonts are
  self-hosted at build time — never add a `<link>` to Google Fonts.
- `--squircle: 27%` border-radius = the iOS app-icon shape. Use it for
  anything icon-like.

`app/globals.css` keeps H5BP's helper classes and print styles *after* the site
styles — leave that ordering alone, the helpers rely on `!important`. The H5BP
MIT header at the top of the file must stay; `LICENSE.txt` covers it.

**Signature element:** the "app shelf" in the hero. Dashed squircle slots
represent unshipped apps. This is the identity of the site — never remove it.

## Conventions

- Semantic HTML, sentence-case copy, plain confident voice ("I build iPhone
  apps"), no marketing filler, no emoji in site copy.
- Server Components by default. The site ships no interactivity today — do not
  add `'use client'` unless something genuinely needs state or effects.
- Accessibility is a hard requirement: visible `:focus-visible` styles,
  `aria-label`s on icon-only elements, sufficient color contrast,
  `prefers-reduced-motion` respected for all animation.
- Responsive down to ~360px. The hero collapses to one column at 720px.
- Motion budget: the page-load rise animation is the only orchestrated
  motion; hover micro-interactions only. No scroll-jacking, no libraries.

## Common tasks

**Develop:**

```bash
npm install   # first time only
npm run dev   # http://localhost:3000, hot reload
```

**Build and check:**

```bash
npm run build      # static export to out/
npm run typecheck  # tsc --noEmit
npm run preview    # build, then serve out/ on the Cloudflare Pages runtime
```

**Deploy:**

```bash
npm run deploy          # build + upload out/ to production
npm run deploy:preview  # same, to a preview URL nobody links to
```

`npm run deploy` always runs the build first, so `out/` can never be stale.
Never deploy without looking at the result — `npm run deploy:preview` first is
the cheap way to check.

**Ship a new app to the shelf:**
1. Create `app/apps/<appname>/page.tsx` (screenshots, short story, App Store
   badge). It inherits the header, footer and styles from `app/layout.tsx` —
   do not redefine tokens or re-add a stylesheet.
2. In `app/page.tsx`, convert the dashed "App 01" slot into a real icon:
   replace the dashed border with the app icon image (same `--squircle`
   radius), link it to the new route, update the label.
3. Add a fresh dashed slot for the next app ("App 02 · in development").
4. Screenshots go in `public/`. `next/image` optimization is off under static
   export, so size and compress them before committing.

Never commit secrets — there are none in this project and it should stay that
way. Cloudflare credentials live in Wrangler's own store, never in the repo.

## Git

- Branch: work directly on `main` for small tweaks; use short-lived branches
  for larger changes.
- Commit messages: imperative, specific ("Add app page for X", not "updates").
