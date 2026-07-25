# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

Personal profile site for **Shazem**, an indie iPhone app developer. Live at
https://www.shazem.dev. Currently a single page; it will grow one app page at
a time as apps ship.

- Built on **HTML5 Boilerplate v9.0.1** with a small **webpack** build. Hand-
  written HTML and CSS — no UI framework, no CSS preprocessor, no runtime JS
  libraries. The site itself ships zero JavaScript today.
- `npm run build` compiles the site into `dist/`. That folder is what gets
  deployed; it is gitignored and never committed.
- Deployed via **Cloudflare Pages**, connected to this GitHub repo
  (https://github.com/shazemdev). Every push to `main` auto-deploys.
- Edited in WebStorm; `.idea/` is gitignored and must never be committed.

## Project structure

```
index.html              # the page: markup only, no embedded styles
css/style.css           # H5BP base + helpers, then all site styles
js/app.js               # webpack entry point — currently empty, site uses no JS
js/vendor/              # third-party scripts, copied to dist as-is
img/                    # image assets, copied to dist as-is
404.html                # Cloudflare Pages not-found page
favicon.ico icon.png icon.svg site.webmanifest robots.txt
webpack.common.js       # entry, output, HtmlWebpackPlugin (shared)
webpack.config.dev.js   # dev server
webpack.config.prod.js  # production build + CopyPlugin for static assets
package.json
README.md               # setup + deployment guide (keep in sync with reality)
CLAUDE.md               # this file
apps/                   # (future) one HTML page per shipped app
```

All CSS lives in `css/style.css` and every page shares it. Do not reintroduce
embedded `<style>` blocks — the design tokens must have exactly one home.

## Design system — do not drift from this

All design tokens live in `:root` at the top of the "Author's custom styles"
section of `css/style.css`. **Always use the CSS variables; never hardcode
colors or fonts.**

- Colors: `--cloud` (bg), `--ink` (text), `--slate` (secondary), `--indigo`
  (accent/links), `--line` (borders), `--card` (surfaces).
- Type: `--display` = Bricolage Grotesque (headlines only, used sparingly);
  `--body` = system font stack (intentional — renders as San Francisco on
  Apple devices, a deliberate nod to iOS; do not replace with a webfont);
  `--mono` = JetBrains Mono (eyebrows, tags, tiny labels only).
- `--squircle: 27%` border-radius = the iOS app-icon shape. Use it for
  anything icon-like.

`css/style.css` keeps H5BP's helper classes and print styles *after* the site
styles — leave that ordering alone, the helpers rely on `!important`.

**Signature element:** the "app shelf" in the hero. Dashed squircle slots
represent unshipped apps. This is the identity of the site — never remove it.

## Conventions

- Semantic HTML, sentence-case copy, plain confident voice ("I build iPhone
  apps"), no marketing filler, no emoji in site copy.
- Accessibility is a hard requirement: visible `:focus-visible` styles,
  `aria-label`s on icon-only elements, sufficient color contrast,
  `prefers-reduced-motion` respected for all animation.
- Responsive down to ~360px. The hero collapses to one column at 720px.
- Motion budget: the page-load rise animation is the only orchestrated
  motion; hover micro-interactions only. No scroll-jacking, no libraries.

## Common tasks

**Preview:**

```bash
npm install    # first time only
npm start      # webpack dev server, opens a browser, live-reloads
```

`HtmlWebpackPlugin` lives in `webpack.common.js`, so the dev server serves the
same generated document that ships. Opening `index.html` straight from disk
still mostly works, but it is not what gets deployed — prefer `npm start`.

**Build:**

```bash
npm run build  # writes dist/
```

**Ship a new app to the shelf:**
1. Create `apps/<appname>.html` (screenshots, short story, App Store badge).
   Link `css/style.css` and reuse the same header/footer — do not copy tokens
   into the new page.
2. Register the page as another `HtmlWebpackPlugin` instance in
   `webpack.common.js`, with a `filename` so it lands at `dist/apps/<appname>.html`.
3. In `index.html`, convert the dashed "App 01" slot into a real icon:
   replace the dashed border with the app icon image (same `--squircle`
   radius), link it to the new page, update the label.
4. Add a fresh dashed slot for the next app ("App 02 · in development").

**Deploy:** commit and push to `main`; Cloudflare Pages runs `npm run build`
and publishes `dist/`. Never commit secrets — there are none in this project
and it should stay that way.

## Git

- Branch: work directly on `main` for small tweaks; use short-lived branches
  for larger changes.
- Commit messages: imperative, specific ("Add app page for X", not "updates").
