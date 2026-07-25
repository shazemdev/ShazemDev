import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Self-hosted at build time, so the page makes no request to Google.
const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const title = 'Shazem — Indie iPhone App Developer';
const description =
  'Shazem is an independent developer designing and shipping iPhone apps. The first app is on its way.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shazem.dev'),
  title,
  description,
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.png',
  },
  openGraph: { type: 'website', url: '/', title, description },
  twitter: { card: 'summary' },
};

// Matches --color-canvas-soft, the page background.
export const viewport: Viewport = { themeColor: '#fafafa' };

const navLinks = [
  { href: '/#now', label: 'Now' },
  { href: '/#craft', label: 'Craft' },
  { href: '/#elsewhere', label: 'Elsewhere' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>

        <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/80 backdrop-blur-md">
          <div className="page flex h-16 items-center justify-between gap-4">
            <a
              href="/"
              translate="no"
              className="rounded-sm text-body-sm font-semibold tracking-[-0.02em] text-ink"
            >
              shazem<span className="text-body">.dev</span>
            </a>

            <nav aria-label="Sections" className="flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="btn-nav hidden sm:inline-flex">
                  {label}
                </a>
              ))}
              <a
                href="https://github.com/shazemdev"
                className="btn-nav ml-1 bg-primary text-on-primary hover:bg-body hover:text-on-primary"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="border-t border-hairline bg-canvas">
          <div className="page flex flex-wrap items-center justify-between gap-2 py-10 text-body-sm text-body">
            <span>© 2026 Shazem</span>
            <span className="font-mono text-caption text-body" translate="no">
              shazem.dev — made by hand
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
