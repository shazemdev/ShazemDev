import type { Metadata } from 'next';
import { Eyebrow, supportHref } from '../ui';

export const metadata: Metadata = {
  title: 'Volt — Support',
  description:
    'Help with Volt for iOS: managing your subscription, transcription trouble, export limits, deleting your data, and how to reach a real person.',
  alternates: { canonical: '/apps/volt/support' },
};

// This is the URL that goes in App Store Connect's required Support field, so
// the page has to stand on its own: troubleshooting and subscription
// management first, marketing nowhere.

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How do I cancel or manage my Volt Pro subscription?',
    a: (
      <>
        Subscriptions are billed and managed entirely through your Apple ID, not
        through Volt directly. On your iPhone:{' '}
        <strong>Settings → [your name] → Subscriptions → Volt</strong>, then
        choose to cancel or change your plan. Changes take effect at the end of
        your current billing period.
      </>
    ),
  },
  {
    q: 'My video is stuck on “Preparing model” or won’t finish transcribing.',
    a: (
      <>
        The first time you caption a video, Volt downloads a one-time ~145MB
        speech model — this needs a real internet connection and can take a
        minute on a slow connection. After that first download, transcription
        runs fully offline. If it&rsquo;s stuck for several minutes, try
        force-quitting Volt and reopening it.
      </>
    ),
  },
  {
    q: 'Why can’t I export in 4K, or why is there a watermark on my export?',
    a: (
      <>
        4K export and watermark-free exports are part of Volt Pro. The free tier
        exports at 720p/1080p with a small watermark — see{' '}
        <a
          href="/apps/volt#volt-pricing"
          className="rounded-sm text-(--volt-accent-text) hover:underline"
        >
          pricing
        </a>{' '}
        for what&rsquo;s included in each tier.
      </>
    ),
  },
  {
    q: 'Why is my clip limited to a certain length?',
    a: (
      <>
        Free accounts can caption clips up to 3 minutes; Volt Pro raises that to
        30 minutes, which is the longest clip Volt currently supports.
      </>
    ),
  },
  {
    q: 'Volt picked the wrong spoken language, or the captions look garbled.',
    a: (
      <>
        You can set the language manually before transcribing instead of relying
        on auto-detect, which helps most cases. Volt&rsquo;s speech recognition
        is AI-based and — like any transcription tool — isn&rsquo;t 100%
        accurate in every language; you can edit any line before exporting.
      </>
    ),
  },
  {
    q: 'Do I need an account to use Volt?',
    a: (
      <>
        No. There&rsquo;s no sign-up and no account — just open the app and pick
        a video. Subscriptions are tied to your Apple ID, not a Volt account,
        since Volt doesn&rsquo;t have one.
      </>
    ),
  },
  {
    q: 'How do I delete my data?',
    a: (
      <>
        Everything Volt creates lives only on your device. Deleting a project
        from the &ldquo;Recent&rdquo; list on Home deletes its video and
        transcript. Deleting the app deletes everything. Full detail in the{' '}
        <a
          href="/apps/volt/privacy"
          className="rounded-sm text-(--volt-accent-text) hover:underline"
        >
          Privacy Policy
        </a>
        .
      </>
    ),
  },
  {
    q: 'I found a bug, or have a feature request.',
    a: (
      <>
        Email{' '}
        <a
          href={supportHref}
          className="rounded-sm text-(--volt-accent-text) hover:underline"
        >
          shazem.dev@gmail.com
        </a>{' '}
        — include your iPhone model and iOS version if it&rsquo;s a bug,
        that&rsquo;s usually the fastest way to help track it down.
      </>
    ),
  },
];

export default function VoltSupportPage() {
  return (
    <article>
      <div className="flex flex-col items-start gap-5 pt-16 sm:pt-20">
        <Eyebrow>Support · Volt for iOS</Eyebrow>
        <h1 className="volt-display text-[2rem] leading-[1.1] text-balance sm:text-[2.5rem]">
          Support
        </h1>
        <p className="max-w-[60ch] text-body-lg text-pretty text-(--volt-text-secondary)">
          Questions, a bug, or something not working right? Here&rsquo;s how to
          fix the common stuff — or just email us.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-[10px] border border-(--volt-border) border-l-[3px] border-l-(--volt-accent) bg-(--volt-card) p-6">
        <p className="max-w-[60ch] text-(--volt-text-secondary)">
          A real person — just the developer — reads and replies to these.
        </p>
        <a
          href={supportHref}
          className="inline-flex min-h-11 items-center rounded-pill bg-(--volt-accent) px-5 font-medium text-(--volt-on-accent) transition-[background-color,transform] duration-150 hover:bg-(--volt-accent-text) motion-safe:active:translate-y-px"
        >
          Email shazem.dev@gmail.com
        </a>
      </div>

      <section aria-labelledby="volt-support-faq" className="mt-16">
        <h2 id="volt-support-faq" className="text-xl font-bold">
          Common questions
        </h2>
        <dl className="mt-8 flex flex-col">
          {faqs.map(({ q, a }) => (
            <div
              key={q}
              className="max-w-[66ch] border-t border-(--volt-border-faint) py-6 first:border-t-0 first:pt-0"
            >
              <dt className="font-bold text-pretty">{q}</dt>
              <dd className="mt-2 text-(--volt-text-secondary) [&_strong]:font-semibold [&_strong]:text-(--volt-text)">
                {a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="volt-support-contact"
        className="mt-12 border-t border-(--volt-border-faint) pt-8"
      >
        <h2 id="volt-support-contact" className="text-xl font-bold">
          Still stuck?
        </h2>
        <p className="mt-3 max-w-[66ch] text-(--volt-text-secondary)">
          Email{' '}
          <a
            href={supportHref}
            className="rounded-sm text-(--volt-accent-text) hover:underline"
          >
            shazem.dev@gmail.com
          </a>{' '}
          — a real person (just the developer) reads and replies to these.
        </p>
      </section>
    </article>
  );
}
