import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Self-hosted at build time, so the page makes no request to Google.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-mono',
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

export const viewport: Viewport = { themeColor: '#F6F7F9' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <div className="wrap">
          <header>
            <a className="mark" href="/">
              shazem<span>.dev</span>
            </a>
            <nav>
              <a href="/#now">Now</a>
              <a href="https://github.com/shazemdev">GitHub</a>
            </nav>
          </header>

          {children}

          <footer>
            <span>© 2026 Shazem</span>
            <span>
              <code>shazem.dev</code> · made by hand
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
