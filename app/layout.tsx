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

// The shared header and footer live in app/(site)/layout.tsx, not here, so
// that /apps/volt can carry Volt's own sub-branded chrome instead.
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
        {children}
      </body>
    </html>
  );
}
