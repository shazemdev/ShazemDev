import type { Viewport } from 'next';
import { Archivo_Black, Space_Grotesk } from 'next/font/google';
import { notifyHref } from './ui';

// Volt's own faces (VoltTypography.swift), self-hosted at build time like the
// site's Geist pair. Scoped to the Volt routes via the .volt wrapper below.
const displayFont = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-volt-display',
  display: 'swap',
});

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-volt-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0e' },
  ],
};

export default function VoltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`volt ${displayFont.variable} ${bodyFont.variable} flex flex-1 flex-col`}
    >
      <header className="sticky top-0 z-40 border-b border-(--volt-border-faint) bg-(--volt-bg)/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[760px] items-center justify-between gap-4 px-6">
          <a
            href="/apps/volt"
            className="volt-display rounded-sm text-xl italic"
            translate="no"
          >
            VOLT<span className="text-(--volt-accent-text)">.</span>
          </a>
          <nav aria-label="Site" className="flex items-center gap-4">
            <a
              href="/"
              translate="no"
              className="rounded-sm text-body-sm text-(--volt-text-secondary) transition-colors duration-150 hover:text-(--volt-text)"
            >
              shazem.dev
            </a>
            <a
              href={notifyHref}
              className="inline-flex min-h-9 items-center rounded-pill bg-(--volt-accent) px-4 text-body-sm font-medium text-(--volt-on-accent) transition-[background-color,transform] duration-150 hover:bg-(--volt-accent-text) motion-safe:active:translate-y-px"
            >
              Get notified
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-[760px] px-6 pb-24">
        {children}
      </main>

      <footer className="border-t border-(--volt-border-faint)">
        <div className="mx-auto flex w-full max-w-[760px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-10 text-caption text-(--volt-text-secondary)">
          <span>© 2026 Shazem</span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href="/apps/volt/support"
              className="rounded-sm transition-colors duration-150 hover:text-(--volt-text)"
            >
              Support
            </a>
            <a
              href="/apps/volt/privacy"
              className="rounded-sm transition-colors duration-150 hover:text-(--volt-text)"
            >
              Privacy policy
            </a>
            <a
              href="/apps/volt/terms"
              className="rounded-sm transition-colors duration-150 hover:text-(--volt-text)"
            >
              Terms of service
            </a>
            <a
              href="/"
              translate="no"
              className="rounded-sm transition-colors duration-150 hover:text-(--volt-text)"
            >
              shazem.dev
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
