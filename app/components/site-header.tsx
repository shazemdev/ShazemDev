const navLinks = [
  { href: '/#now', label: 'Now' },
  { href: '/#craft', label: 'Craft' },
  { href: '/#elsewhere', label: 'Elsewhere' },
];

export function SiteHeader() {
  return (
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
  );
}
