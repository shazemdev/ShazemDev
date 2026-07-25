# shazem.dev — development guide

One-page profile site for shazem.dev. Hand-written HTML and CSS on top of
HTML5 Boilerplate, built with webpack, deployed on Cloudflare Pages.

> `README.md` in this repo is the public GitHub profile page for
> [@shazemdev](https://github.com/shazemdev) — the repo name matches the
> username, so GitHub renders it there. Keep setup and deployment notes here
> rather than moving them back into `README.md`.

## 1. Install and run locally

Requires Node.js (developed on v22).

```bash
cd ~/Shazem/ShazemDev
npm install     # first time only
npm start       # dev server, opens a browser, live-reloads on save
```

To produce the deployable build:

```bash
npm run build   # writes dist/
```

`dist/` is generated output — it is gitignored and should never be committed.

### Where things live

- `index.html` — the page markup.
- `css/style.css` — HTML5 Boilerplate's base and helper styles, followed by all
  of the site's own styles. The design tokens (colors, fonts, the squircle
  radius) are the `:root` block at the top of the "Author's custom styles"
  section — change them in one place and the whole site follows.
- `js/app.js` — webpack's entry point. Empty; the site currently uses no
  JavaScript.

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

Open the folder in WebStorm (**File → Open → ~/Shazem/ShazemDev**) and you can
commit and push from the Commit tool window (⌘K to commit, ⌘⇧K to push).

## 3. Deploy to shazem.dev with Cloudflare Pages

Prerequisite: your domain `shazem.dev` should already be added to your Cloudflare
account (its nameservers pointing at Cloudflare).

### Pick one deployment mode — you cannot have both

A Cloudflare Pages project is created as **either** Direct Upload **or**
Git-connected, and the choice is fixed for the life of the project. A
Git-connected project rejects `wrangler pages deploy`; a Direct Upload project
has no GitHub hook and never builds on push. To switch later you delete the
project and recreate it, then re-attach the custom domains.

| | Direct Upload (`npm run deploy`) | Git integration |
| --- | --- | --- |
| Who builds | your machine | Cloudflare's build container |
| Ships when | you run the command | every push to `main` |
| Needs GitHub | no | yes |
| Deploy from a laptop with uncommitted work | yes | no |

Direct Upload is set up below because it is what the npm scripts in this repo
drive. If you would rather have pushes deploy themselves, skip to
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
npm run deploy                    # builds, then uploads dist/ to production
```

That is the whole loop. `deploy` runs `npm run build` first, so you can never
ship a stale `dist/`. Wrangler prints a `https://<hash>.shazem-dev.pages.dev`
URL for the individual deployment, plus the production URL.

```bash
npm run deploy:preview            # uploads to a "preview" branch URL instead
npm run cf:deployments            # list recent deployments
npm run preview                   # serve dist/ locally on the Pages runtime
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
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |

**Those two build settings are not optional.** Left at the defaults (empty build
command, output `/`), Cloudflare publishes the repo root instead of the build.
`index.html` links `css/style.css` rather than carrying its own `<style>` block,
so the site would render **completely unstyled**.

With this mode the `deploy` scripts in `package.json` will not work — Cloudflare
rebuilds on every push to `main` instead.

## 4. Growing the site later

The dashed "App 01" slot in the hero is the plan: when your first app ships,
replace the dashed square with the real app icon, link it to a new page
(e.g. `apps/appname.html`) with screenshots and an App Store badge, and add a
new dashed slot for the next app. The design is built to grow one icon at a
time.

Each new page needs registering as another `HtmlWebpackPlugin` entry in
`webpack.common.js` so the build emits it, and should link the shared
`css/style.css` rather than redefining the design tokens.

## Still to do

- `favicon.ico`, `icon.png` and `icon.svg` are still HTML5 Boilerplate's generic
  placeholder graphics. Replace them with real Shazem icons.
- No social share image (`og:image`) yet, so links unfurl without a picture.
