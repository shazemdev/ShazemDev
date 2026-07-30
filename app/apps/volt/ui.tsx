// Small shared pieces for the Volt routes. Not a route file — only
// page/layout/route names are special inside app/.

// Pre-launch CTA (docs/APPSTORE_CHECKLIST.md: not yet submitted). Swap for the
// App Store badge link once Volt clears review. A static site has nowhere to
// store a waitlist, so "get notified" is an email — it lands in the same inbox
// subscriptions would.
export const notifyHref =
  'mailto:shazem.dev@gmail.com?subject=Notify%20me%20when%20Volt%20launches';

// The Support page's contact address. This is the app's App Store Connect
// support channel, so keep the subject line generic enough to cover bugs,
// billing and feature requests alike.
export const supportHref = 'mailto:shazem.dev@gmail.com?subject=Volt%20support';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-(--volt-text-secondary)">
      {children}
    </p>
  );
}

const legalDocs = [
  { key: 'privacy', href: '/apps/volt/privacy', label: 'Privacy policy' },
  { key: 'terms', href: '/apps/volt/terms', label: 'Terms of service' },
] as const;

export function LegalDocHead({
  title,
  effective,
  current,
}: {
  title: string;
  effective: string;
  current: (typeof legalDocs)[number]['key'];
}) {
  return (
    <div className="flex flex-col items-start gap-5 pt-16 sm:pt-20">
      <Eyebrow>Legal · Volt for iOS</Eyebrow>
      <h1 className="volt-display text-[2rem] leading-[1.1] text-balance sm:text-[2.5rem]">
        {title}
      </h1>
      <p className="text-caption text-(--volt-text-secondary)">
        Effective date: {effective}
      </p>
      <nav aria-label="Legal documents" className="flex flex-wrap gap-2">
        {legalDocs.map(({ key, href, label }) => (
          <a
            key={key}
            href={href}
            aria-current={key === current ? 'page' : undefined}
            className={`inline-flex min-h-9 items-center rounded-pill border px-4 text-body-sm font-medium transition-colors duration-150 ${
              key === current
                ? 'border-(--volt-border) bg-(--volt-card) text-(--volt-text)'
                : 'border-transparent text-(--volt-text-secondary) hover:text-(--volt-text)'
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function LegalContact({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-16 border-t border-(--volt-border-faint) pt-6 text-body-sm text-(--volt-text-secondary)">
      {children}{' '}
      <a
        href="mailto:shazem.dev@gmail.com"
        className="rounded-sm text-(--volt-accent-text) hover:underline"
      >
        shazem.dev@gmail.com
      </a>
    </p>
  );
}
