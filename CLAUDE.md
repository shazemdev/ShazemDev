# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

Personal profile site for **Shazem**, an indie iPhone app developer. Live at
https://www.shazem.dev. Currently a single page; it will grow one app page at
a time as apps ship.

- **Next.js 16 (App Router) + React 19 + TypeScript.** Hand-written JSX styled
  with **Tailwind CSS v4** — no UI library, no CSS-in-JS, no component
  framework, no headless-component package.
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
app/globals.css         # the entire design system: @theme, base, utilities
postcss.config.mjs      # @tailwindcss/postcss — the only PostCSS plugin
public/                 # favicon.ico icon.png icon.svg site.webmanifest robots.txt
next.config.mjs         # output: 'export'
wrangler.toml           # Cloudflare Pages project name + output dir (out)
tsconfig.json
package.json
DESIGN.md               # the captured visual language this site implements
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

`app/globals.css` is the only stylesheet and every route shares it. Do not add
CSS Modules, styled-jsx, or a second Tailwind entrypoint — the design tokens
must have exactly one home.

## Tailwind v4 — how it is set up here

This is a **CSS-first** Tailwind v4 project. There is no `tailwind.config.js`
and there must never be one; every token lives in the `@theme` block in
`app/globals.css`.

- Entry is `@import "tailwindcss" source(none);` followed by `@source "../app";`.
  **Leave that scoping alone.** Automatic source detection scans the whole
  project root, which includes `.claude/skills/` — the synced Tailwind docs
  snapshot there is full of class names that are not this site's, and letting
  Tailwind see them inflates the CSS bundle from ~25 KB to ~300 KB.
- The default palette, radius scale, shadow scale and breakpoints are all
  cleared with `--<namespace>-*: initial` and replaced. `bg-red-500` does not
  exist here, and that is deliberate — see "Design system" below.
- v4 syntax reminders: `@utility` (not `@layer utilities`) for custom
  utilities; the important modifier goes last (`bg-canvas!`); arbitrary CSS
  variables are `bg-(--x)` not `bg-[--x]`; stacked variants apply
  left-to-right.

**Abstraction ladder — follow it in order.** Compose in markup with utilities
first. Repeating markup becomes a React component, not a CSS class. Repeating
*values* become `@theme` tokens. A repeated low-level behaviour becomes an
`@utility`. Only a stable, named visual primitive earns a class in
`@layer components`, and the current set — `.btn` / `.btn-primary` /
`.btn-secondary` / `.btn-nav` / `.badge` / `.eyebrow` — is meant to stay
roughly this small. Use `@apply` only as a narrow adapter, never as the
architecture. Delete dead CSS as soon as its last use goes; a `.card` primitive
belongs here the day an app page needs one, not before.

There are two skills installed for this work: `tailwind-4-docs` (a local
snapshot of the official v4 docs — refresh it if it is more than a week old)
and `web-design-guidelines` (Vercel's Web Interface Guidelines). Consult both
before non-trivial UI work.

## Design system — do not drift from this

The visual language is captured in `DESIGN.md` and implemented **only** through
the `@theme` block in `app/globals.css`. Always use the token-backed utilities;
never hardcode a colour, radius, shadow or type size.

### Colour

A stark ink-and-gray system on a near-white canvas, with exactly one link blue
and one decorative gradient. **Do not introduce a sixth accent colour** — the
cleared default palette exists to make that hard.

- Surfaces: `canvas` (#ffffff, cards) · `canvas-soft` (#fafafa, page) ·
  `canvas-soft-2` (#f5f5f5, inset) · `primary` (#171717, the polarity-flipped
  dark band).
- Text: `ink` · `body` (secondary) · `mute` (fine print) · `on-primary`.
- Lines: `hairline` (#ebebeb, all 1px dividers) · `hairline-strong` (#a1a1a1,
  also the body text tone *on the dark band*).
- Link: `link` (#0070f3) · `link-deep` (pressed).
- Gradient stops: `develop-start/end`, `preview-start/end`, `ship-start/end`.

**`text-mute` fails WCAG AA against light surfaces at body and caption sizes.**
It is kept because it is part of the captured system, but do not use it for
text on `canvas` or `canvas-soft` — reach for `text-body` instead. Every colour
pair that ships must clear 4.5:1.

### The brand gradient

`@utility mesh` collapses the three gradient pairs into one atmospheric
backdrop. It is the *entire* decorative system, and it is **hero scale only**:
never miniaturise it to an icon, never crop it to a single stop, never put it
on a card. It currently backs the hero band and the 404.

### Type

- `--font-sans` = **Geist**, `--font-mono` = **Geist Mono**, both self-hosted
  at build time by `next/font/google` in `app/layout.tsx`. Never add a `<link>`
  to Google Fonts.
- Scale: `text-display-xl/lg/md/sm` (headlines), `text-body-lg/md/sm`,
  `text-caption`, `text-code`. The display tokens carry their own font-weight
  and letter-spacing.
- **Weight 600 is the display ceiling.** Never `font-bold` on a headline.
- **Negative tracking is part of the voice** and is baked into the display
  tokens. Do not override it back to normal.
- Mono is the technical layer only — eyebrows, code, tiny labels. Never set a
  body paragraph in mono.

### Shape, elevation, breakpoints

- Radii: `rounded-sm` (6px, nav-scale buttons and inputs) · `rounded-md` (8px,
  cards) · `rounded-lg`/`xl` · `rounded-pill` (100px, marketing CTAs).
  Pick one CTA scale per screen — never mix the 100px pill with the 6px nav
  radius in the same view.
- Shadows are **stacked**: `shadow-hairline` / `shadow-subtle` / `shadow-soft`
  / `shadow-float`, each an inset 1px ring plus small offsets. Never a single
  heavy drop shadow.
- Breakpoints are renamed for this design and are **not** Tailwind's defaults:
  `sm` = 600px, `md` = 960px, `lg` = 1200px. Content bands cap at
  `--container-page` (1200px) via the `page` utility.

**Signature element:** the "app shelf" in the hero. A dashed squircle slot
(`rounded-squircle`, 27%) represents an unshipped app. This is the identity of
the site and the one thing carried over from every previous design — never
remove it.

## Conventions

- Semantic HTML. Sentence-case headlines, often period-terminated ("I build
  iPhone apps."). Plain confident voice, first person, no marketing filler, no
  emoji in site copy.
- Two deliberate departures from the Web Interface Guidelines: headings and
  buttons are **sentence case, not Title Case** (the design language requires
  it), and copy is **first person, not second** (it is one person's site).
  Everything else in those guidelines applies.
- Typography details are enforced: `…` not `...`, curly quotes, `&nbsp;` in
  "App&nbsp;Store", `text-balance` / `text-pretty` on headings.
- Server Components by default. The site ships no interactivity today — do not
  add `'use client'` unless something genuinely needs state or effects. The
  header intentionally has no JS mobile menu; nav links hide below `sm` because
  a one-page site is reachable by scrolling.
- Accessibility is a hard requirement: the global `:focus-visible` ring in
  `@layer base` is never removed, decorative SVG gets `aria-hidden`, icon-only
  controls get `aria-label`, contrast clears 4.5:1, and the skip link in
  `app/layout.tsx` stays.
- Responsive down to ~360px. The page is light-only (`color-scheme: light`);
  there is no dark theme, and the `primary` band is a design device, not one.
- Motion budget: `animate-rise` on page load is the only orchestrated motion,
  always behind `motion-safe:`. Hover and `:active` micro-interactions only.
  Animate transform and opacity, list transition properties explicitly, never
  `transition: all`. No scroll-jacking, no animation libraries.

## Common tasks

**Develop:**

```bash
npm install   # first time only
npm run dev   # http://localhost:3000, hot reload
```

The `next-devtools` MCP server (see `.mcp.json`) talks to the running dev
server: use it for routes, build state and runtime errors, and read the
version-matched Next.js docs from `node_modules/next/dist/docs/` rather than
from memory.

**Build and check:**

```bash
npm run build      # static export to out/
npm run typecheck  # tsc --noEmit
npm run preview    # build, then serve out/ on the Cloudflare Pages runtime
```

After a build, sanity-check the CSS size: `ls -la out/_next/static/chunks/*.css`
should be ~25 KB. If it is hundreds of KB, source scoping has regressed.

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
   replace the dashed border with the app icon image (same `rounded-squircle`),
   link it to the new route, update the label.
3. Add a fresh dashed slot for the next app ("App 02 · in development").
4. Screenshots go in `public/`. `next/image` optimization is off under static
   export, so size and compress them before committing.

Never commit secrets — there are none in this project and it should stay that
way. Cloudflare credentials live in Wrangler's own store, never in the repo.

## Git

- Branch: work directly on `main` for small tweaks; use short-lived branches
  for larger changes.
- Commit messages: imperative, specific ("Add app page for X", not "updates").
