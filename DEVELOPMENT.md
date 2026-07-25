# shazem.dev — development guide

One-page profile site for shazem.dev. Next.js 16 (App Router) with React 19 and
TypeScript, statically exported and hosted on Cloudflare Workers.

> `README.md` in this repo is the public GitHub profile page for
> [@shazemdev](https://github.com/shazemdev) — the repo name matches the
> username, so GitHub renders it there. Keep setup and deployment notes here
> rather than moving them back into `README.md`.

## 1. Install and run locally

Requires Node.js (developed on v22).

```bash
cd ~/Shazem/ShazemDev
npm install     # first time only
npm run dev     # http://localhost:3000, hot reload
```

To produce the deployable build:

```bash
npm run build      # static export to out/
npm run typecheck  # tsc --noEmit
npm run preview    # build, then serve out/ on the Cloudflare Workers runtime
```

`out/` and `.next/` are generated — both are gitignored and never committed.

> **TypeScript must stay on 5.x.** `typescript@7` is the new Go-based compiler
> and Next.js 16 cannot drive it; installing it makes `next build` fail with
> `The "id" argument must be of type string`. The dependency is pinned to `^5`
> deliberately — don't let a `typescript@latest` install undo that.

### Where things live

- `app/layout.tsx` — the `<html>` shell, all `<head>` metadata (title,
  description, canonical, Open Graph, icons, manifest, theme colour), the
  `next/font` setup, and the header and footer shared by every route.
- `app/page.tsx` — the home page: hero, app shelf, Now, Craft and Elsewhere
  sections.
- `app/not-found.tsx` — the 404, exported to `out/404.html`, which the Worker
  serves for unmatched paths via `not_found_handling = "404-page"`.
- `app/globals.css` — the entire design system, in one file: the `@theme` block
  of design tokens, a base layer, two custom utilities and a handful of
  component classes. Change a token in one place and the whole site follows.
- `postcss.config.mjs` — `@tailwindcss/postcss`, the only PostCSS plugin.
- `public/` — favicon, icons, `site.webmanifest`, `robots.txt`. Copied to the
  root of `out/` verbatim.

Styling is **Tailwind CSS v4**, CSS-first — there is no `tailwind.config.js`
and there must never be one. Note the `@import "tailwindcss" source(none);` plus
`@source "../app";` at the top of `app/globals.css`: it stops Tailwind scanning
sibling folders such as `.claude/skills`, whose docs snapshot would otherwise
inflate the CSS bundle from ~25 KB to ~300 KB. After a build, sanity-check with
`ls -la out/_next/static/chunks/*.css`.

Fonts are **self-hosted**: `next/font/google` downloads Geist and Geist Mono at
build time and emits `.woff2` files into `out/`. The browser never contacts
Google. Don't re-add a Google Fonts `<link>`.

### Static export constraints

`next.config.mjs` sets `output: 'export'`, so there is no Node server in
production. These Next.js features will not work and must not be used:

| Not available | Use instead |
| --- | --- |
| Route handlers / API routes | nothing — the site is static |
| `middleware.ts` | Cloudflare Workers routing / redirect rules |
| ISR, `revalidate`, server actions | build-time data only |
| `next/image` optimization | already disabled; pre-size images yourself |

## 2. GitHub

The repository lives at https://github.com/shazemdev/ShazemDev and `main` is
already connected to it:

```bash
git remote -v          # origin -> https://github.com/shazemdev/ShazemDev.git
git push               # main is tracking origin/main
```

Commits are authored as **shazemdev**, configured locally in this repo so it
doesn't matter which GitHub account is globally active:

```bash
git config user.name    # shazemdev
git config user.email   # shazem.dev@gmail.com
```

**Pushing to GitHub does not deploy the site.** The repo and the host are
independent; deploys happen when you run `npm run deploy` (below).

## 3. Deploy to Cloudflare Workers

The site is deployed as an **assets-only Worker**: `wrangler.toml` has no `main`
entry point, so Cloudflare serves `out/` as static files and runs no code. This
replaced an earlier Cloudflare Pages setup — Workers is Cloudflare's recommended
path for new static sites, and Pages is in maintenance.

Prerequisite: your domain `shazem.dev` is already on Cloudflare (nameservers
pointing at Cloudflare).

### 3a. One-time setup

```bash
npm run cf:login                  # opens a browser, authorizes Wrangler
npm run cf:whoami                 # confirms which account you're on
```

The account also needs a `workers.dev` subdomain registered — the first
`npm run deploy` prompts for one, or register it at
dashboard → **Workers & Pages** → **Onboarding**. This is account-wide and
you only do it once. Without it, `wrangler deploy` refuses to publish.

There is no "create the project" step; the first deploy creates the Worker.

### 3b. Deploy

```bash
npm run deploy                    # builds, then uploads out/ to production
```

That is the whole loop. `deploy` runs `npm run build` first, so you can never
ship a stale `out/`. Production URL:

```
https://shazem-dev.shazem-dev.workers.dev
```

```bash
npm run deploy:preview            # uploads a preview version, prints its URL
npm run cf:deployments            # list recent deployments
```

`deploy:preview` runs `wrangler versions upload`, which only works **after** the
Worker exists — the very first deploy has to be `npm run deploy`. Use it
afterwards to look at a change on real Cloudflare infrastructure without
touching what visitors see.

A brand-new `workers.dev` hostname takes about a minute before TLS is ready. If
curl fails with exit 35 right after the first deploy, wait and retry.

### 3c. Attach the custom domain (not done yet)

`shazem.dev` currently 302-redirects to `dns.google` from a leftover rule, and
`www.shazem.dev` does not resolve at all. **Clear that redirect first**, or it
will shadow the site.

1. https://dash.cloudflare.com → **Workers & Pages** → **shazem-dev** →
   **Settings** → **Domains & Routes** → **Add** → **Custom domain**.
2. Enter `www.shazem.dev`. Cloudflare creates the DNS record for you.
3. Add `shazem.dev` (the bare domain) as a second custom domain so both work.
4. HTTPS is automatic — Cloudflare issues the certificate.

Until this is done, the site lives only at the `workers.dev` URL above.

## 4. Growing the site later

The dashed "App 01" slot in the hero is the plan: when your first app ships,
replace the dashed square with the real app icon, link it to a new route
(`app/apps/<appname>/page.tsx`) with screenshots and an App Store badge, and add
a new dashed slot for the next app. The design is built to grow one icon at a
time.

New routes inherit the header, footer and stylesheet from `app/layout.tsx` — no
per-page setup, and no redefining design tokens. Screenshots go in `public/`;
compress them first, since image optimization is off under static export.

## Still to do

- `favicon.ico`, `icon.png` and `icon.svg` in `public/` are still HTML5
  Boilerplate's generic placeholder graphics. Replace them with real Shazem
  icons.
- No social share image (`og:image`) yet, so links unfurl without a picture.
- The `.icon-slot` div in `app/page.tsx` carries an `aria-label` with no `role`,
  which screen readers ignore. Give it a role or restructure it.
