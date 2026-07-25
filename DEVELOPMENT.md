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

1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**.
2. Authorize Cloudflare to access your GitHub account and select the
   `shazemdev/ShazemDev` repo.
3. Build settings — **this project has a build step, so these must be set:**

   | Setting | Value |
   | --- | --- |
   | Framework preset | None |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

   If the build command is left empty and the output directory is `/`,
   Cloudflare will publish the repo root instead of the build, and the site
   will render **unstyled** — `index.html` links `css/style.css` rather than
   carrying its own `<style>` block.
4. Click **Save and Deploy**. You'll get a temporary `*.pages.dev` URL — check
   the site looks right there.
5. In the project, open **Custom domains** → **Set up a custom domain** → enter
   `www.shazem.dev`. Cloudflare creates the DNS record for you. Add
   `shazem.dev` (the bare domain) as a second custom domain too, so both work.
6. HTTPS is automatic — Cloudflare issues the certificate. Always share the site
   as `https://www.shazem.dev` (the `http://` version will simply redirect).

From now on, every `git push` to `main` rebuilds and redeploys the site
automatically within a minute or so.

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
