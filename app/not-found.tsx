import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page not found — Shazem' };

// Static export writes this to out/404.html, which Cloudflare Pages serves
// automatically for unmatched paths.
export default function NotFound() {
  return (
    <main>
      <section id="not-found">
        <h2>404</h2>
        <div>
          <p>That page doesn&apos;t exist — it may have moved, or never have.</p>
          <ul className="links">
            <li>
              <a href="/">Back to the shelf</a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
