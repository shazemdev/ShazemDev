import type { Metadata } from 'next';
import { SiteHeader } from './components/site-header';
import { SiteFooter } from './components/site-footer';

export const metadata: Metadata = { title: 'Page not found — Shazem' };

// Static export writes this to out/404.html, which Cloudflare Pages serves
// automatically for unmatched paths. It sits outside the (site) route group,
// so it brings the shared chrome along itself.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="relative isolate overflow-hidden bg-canvas">
          <div
            aria-hidden="true"
            className="mesh pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%]"
          />

          <div className="page flex flex-col items-center py-28 text-center sm:py-36">
            <p className="eyebrow text-body" translate="no">
              404
            </p>
            <h1 className="mt-4 max-w-[20ch] text-display-lg text-balance text-ink sm:text-display-xl">
              That page doesn&rsquo;t exist.
            </h1>
            <p className="mt-5 max-w-[46ch] text-body-lg text-pretty text-body">
              It may have moved, or it may never have been here at all. The
              shelf is the best place to start.
            </p>
            <a href="/" className="btn btn-primary mt-9">
              Back to the shelf
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
