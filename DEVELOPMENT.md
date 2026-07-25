# shazem.dev — development guide

One-page profile site for shazem.dev. Next.js 16 (App Router) with React 19 and
TypeScript, statically exported and hosted on Cloudflare Pages.

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
npm run preview    # build, then serve out/ on the Cloudflare Pages runtime
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
- `app/page.tsx` — the home page: hero, app shelf, Now and Elsewhere sections.
- `app/not-found.tsx` — the 404, exported to `out/404.html`, which Cloudflare
  Pages serves automatically for unmatched paths.
- `app/globals.css` — HTML5 Boilerplate's base and helper styles, followed by
  all of the site's own styles. The design tokens (colors, fonts, the squircle
  radius) are the `:root` block at the top of the "Author's custom styles"
  section — change them in one place and the whole site follows.
- `public/` — favicon, icons, `site.webmanifest`, `robots.txt`. Copied to the
  root of `out/` verbatim.

Fonts are **self-hosted**: `next/font/google` downloads Bricolage Grotesque and
JetBrains Mono at build time and emits `.woff2` files into `out/`. The browser
never contacts Google. Don't re-add a Google Fonts `<link>`.

### Static export constraints

`next.config.mjs` sets `output: 'export'`, so there is no Node server in
production. These Next.js features will not work and must not be used:

| Not available | Use instead |
| --- | --- |
| Route handlers / API routes | nothing — the site is static |
| `middleware.ts` | Cloudflare Pages redirects (`public/_redirects`) |
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

## 3. Deploy to shazem.dev with Cloudflare Pages

Prerequisite: your domain `shazem.dev` should already be added to your Cloudflare
account (its nameservers pointing at Cloudflare).

### Pick one deployment mode — you cannot have both

A Cloudflare Pages project is created as **either** Direct Upload **or**
Git-connected, and the choice is fixed for the life of the project. A
Git-connected project rejects `wrangler pages deploy`; a Direct Upload project
has no GitHub hook and never builds on push. To switch later you delete the
project and recreate it, then re-attach the custom domains.

Direct Upload is set up below because it is what the npm scripts drive. If you
would rather have pushes deploy themselves, skip to
[Git integration instead](#git-integration-instead).

### 3a. One-time setup (Direct Upload)

```bash
npm run cf:login                  # opens a browser, authorizes Wrangler
npm run cf:whoami                 # confirms which account you're on

# create the Pages project once — the name must match wrangler.toml
npx wrangler pages project create shazem-dev --production-branch=main
```

### 3b. Deploy

```bash
npm run deploy                    # builds, then uploads out/ to production
```

That is the whole loop. `deploy` runs `npm run build` first, so you can never
ship a stale `out/`. Wrangler prints a `https://<hash>.shazem-dev.pages.dev`
URL for the individual deployment, plus the production URL.

```bash
npm run deploy:preview            # uploads to a "preview" branch URL instead
npm run cf:deployments            # list recent deployments
```

Use `deploy:preview` to look at a change on a real Cloudflare URL without
touching what visitors see.

### 3c. Attach the custom domain (once)

1. https://dash.cloudflare.com → **Workers & Pages** → **shazem-dev** →
   **Custom domains** → **Set up a custom domain**.
2. Enter `www.shazem.dev`. Cloudflare creates the DNS record for you.
3. Add `shazem.dev` (the bare domain) as a second custom domain so both work.
4. HTTPS is automatic — Cloudflare issues the certificate. Share the site as
   `https://www.shazem.dev`; the `http://` version redirects.

### Git integration instead

If you prefer pushes to deploy themselves, **do not** run the
`pages project create` command above. Instead: dashboard → **Workers & Pages** →
**Create** → **Pages** → **Connect to Git**, authorize GitHub, pick
`shazemdev/ShazemDev`, and set:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |

With this mode the `deploy` scripts in `package.json` will not work — Cloudflare
rebuilds on every push to `main` instead.

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
