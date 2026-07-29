import type { Metadata } from 'next';
import { Eyebrow, notifyHref } from './ui';

const description =
  'Volt auto-captions your videos with word-by-word animated text — transcribed 100% on-device. No uploads, no accounts, no processing queue. Just pick a clip and export.';

export const metadata: Metadata = {
  title: 'Volt — On-Device Auto-Captions for iPhone | Shazem',
  description,
  alternates: { canonical: '/apps/volt' },
  openGraph: {
    type: 'website',
    url: '/apps/volt',
    title: 'Volt: Captions that never leave your phone',
    description,
  },
};

const screenshots = [
  {
    src: '/volt/home-upload.png',
    alt: 'Volt home screen showing the prompt to pick a video from your library',
    caption: 'Pick a video. That’s the whole first step.',
  },
  {
    src: '/volt/editor-karaoke-captions.jpg',
    alt: 'Volt editor showing word-by-word Karaoke caption animation with the Style panel open',
    caption: 'Word-by-word captions that animate exactly on beat.',
  },
  {
    src: '/volt/paywall.png',
    alt: 'Volt Pro paywall showing one flat monthly or yearly price',
    caption: 'One flat price. No credits to track.',
  },
];

type Feature = { text: string; pro?: boolean };

const featureGroups: { title: string; features: Feature[] }[] = [
  {
    title: 'Transcription',
    features: [
      {
        text: 'On-device speech-to-text — WhisperKit on the Neural Engine, no internet needed after the one-time model download',
      },
      { text: 'Word-level timestamps, so captions animate in sync with speech' },
      {
        text: '28 languages, from Spanish and Japanese to Arabic and Ukrainian, with auto-detect',
      },
      { text: 'Translate any spoken language to English captions' },
    ],
  },
  {
    title: 'Caption styles',
    features: [
      { text: 'Karaoke animation — word-by-word highlight' },
      { text: 'Pop, Fade and Type animations', pro: true },
      { text: 'BOLD font free; Clean and Serif fonts on Pro' },
      { text: 'White captions free; Lime, Pink and Blue on Pro' },
      {
        text: 'Bottom placement free; Top and Center on Pro, kept clear of platform UI safe zones',
      },
    ],
  },
  {
    title: 'AI editing tools',
    features: [
      {
        text: 'Clean Cut — detects filler words and dead air, one tap removes them before export',
        pro: true,
      },
      {
        text: 'Keyword emphasis — highlights the standout word in each caption line',
        pro: true,
      },
      { text: 'Auto emoji — a relevant emoji based on what’s being said', pro: true },
    ],
  },
  {
    title: 'Export',
    features: [
      { text: '720p and 1080p HD free; 4K Ultra on Pro' },
      {
        text: 'Saves straight to Photos, with a native share sheet to TikTok, Instagram, Messages and more',
      },
      { text: 'Watermark on free exports; Pro removes it' },
      { text: 'Clips up to 30 minutes on Pro (3 minutes free)', pro: true },
    ],
  },
];

const differentiators = [
  {
    lead: 'Genuinely on-device, not marketing copy.',
    text: 'WhisperKit runs locally on the Neural Engine. This is a real architectural difference, not a privacy claim layered on top of a cloud backend.',
  },
  {
    lead: 'No “stuck processing” failure mode.',
    text: 'There is no upload → queue → download round-trip, so a video that hangs on someone else’s server structurally can’t happen.',
  },
  {
    lead: 'Flat pricing instead of credit anxiety.',
    text: 'No credits, no metered minutes, no overage fees. Volt Pro is one flat price for everything.',
  },
  {
    lead: 'A focused tool, not a bloated editor.',
    text: 'Volt does one job — caption a clip and export — instead of being a full editor with captions bolted on.',
  },
];

const faqs = [
  {
    q: 'Does my video get uploaded anywhere?',
    a: 'No. Volt has no server. Transcription runs entirely on your iPhone’s Neural Engine. The only network request Volt ever makes is a one-time download of its own speech model (not your content) and talking to Apple’s App Store for subscriptions.',
  },
  {
    q: 'How accurate is the transcription?',
    a: 'Volt uses WhisperKit, the same class of model powering most AI transcription products — the difference is it runs locally instead of in the cloud. Like any AI transcription, it’s not perfect; you can review and edit any line before exporting.',
  },
  {
    q: 'What if I don’t subscribe?',
    a: 'Volt’s free tier is a complete captioning tool on its own: Karaoke-style animated captions, 720p and 1080p export, 3-minute clips. Pro adds more styles, 4K, watermark removal and longer clips — it’s not a crippled trial.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Open the app, pick a video, caption it. Subscriptions are handled entirely through your Apple ID.',
  },
];

function ProBadge() {
  return (
    <span className="mt-1 inline-flex h-5 shrink-0 items-center rounded-full border border-(--volt-border) px-2 text-[10px] font-bold tracking-[0.12em] text-(--volt-accent-text) uppercase">
      Pro
    </span>
  );
}

function Check() {
  return (
    <span
      aria-hidden="true"
      className="mt-1 inline-flex h-5 w-6 shrink-0 items-center font-bold text-(--volt-accent-text)"
    >
      ✓
    </span>
  );
}

export default function VoltPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-start gap-5 pt-16 sm:pt-24">
        <p className="motion-safe:animate-rise">
          <Eyebrow>iOS app · in development</Eyebrow>
        </p>
        <h1 className="volt-display max-w-[14ch] text-[2.375rem] leading-[1.08] text-balance sm:text-[3.25rem] motion-safe:animate-rise motion-safe:[animation-delay:80ms]">
          Captions that never leave your phone.
        </h1>
        <p className="max-w-[54ch] text-body-lg text-pretty text-(--volt-text-secondary) motion-safe:animate-rise motion-safe:[animation-delay:160ms]">
          Pick a video. Volt transcribes it on-device, drops in word-by-word
          animated captions, and hands you back a finished export — no upload,
          no account, no waiting on someone else&rsquo;s server.
        </p>
        <div className="mt-2 flex flex-col gap-3 motion-safe:animate-rise motion-safe:[animation-delay:240ms]">
          <a
            href={notifyHref}
            className="inline-flex min-h-12 items-center justify-center rounded-pill bg-(--volt-accent) px-6 font-medium text-(--volt-on-accent) transition-[background-color,transform] duration-150 hover:bg-(--volt-accent-text) motion-safe:active:translate-y-px"
          >
            Get notified when Volt launches
          </a>
          <p className="text-caption text-(--volt-text-secondary)">
            Free to start · 7-day free trial on Pro · no sign-up required to
            use the app
          </p>
        </div>
      </section>

      {/* ── Screenshots ──────────────────────────────────────────────────── */}
      <section aria-labelledby="volt-shots" className="mt-20 sm:mt-24">
        <Eyebrow>Straight from the app</Eyebrow>
        <h2 id="volt-shots" className="mt-3 text-xl font-bold">
          Speech in, captions out. Nothing in between.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {screenshots.map(({ src, alt, caption }) => (
            <figure
              key={src}
              className="overflow-hidden rounded-[10px] border border-(--volt-border) bg-(--volt-card)"
            >
              <img
                src={src}
                alt={alt}
                width={720}
                height={1565}
                loading="lazy"
                className="w-full"
              />
              <figcaption className="px-4 py-3 text-caption text-(--volt-text-secondary)">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="volt-features" className="mt-20 sm:mt-24">
        <Eyebrow>What it does</Eyebrow>
        <h2 id="volt-features" className="mt-3 text-xl font-bold">
          The complete feature set — nothing imaginary.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {featureGroups.map(({ title, features }) => (
            <div
              key={title}
              className="rounded-[10px] border border-(--volt-border) bg-(--volt-card) p-6"
            >
              <h3 className="font-bold">{title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {features.map(({ text, pro }) => (
                  <li key={text} className="flex items-start gap-2">
                    {pro ? <ProBadge /> : <Check />}
                    <span className="text-body-sm leading-relaxed text-(--volt-text-secondary)">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why on-device ────────────────────────────────────────────────── */}
      <section aria-labelledby="volt-why" className="mt-20 sm:mt-24">
        <Eyebrow>Why on-device matters</Eyebrow>
        <h2 id="volt-why" className="mt-3 text-xl font-bold">
          Your video doesn&rsquo;t need the cloud to talk.
        </h2>
        <p className="mt-4 max-w-[66ch] text-(--volt-text-secondary)">
          Every major captioning app works the same way: upload the video to a
          server, wait in a processing queue, spend credits, download the
          result. Volt is built the other way around.
        </p>
        <div className="mt-8 rounded-[10px] border border-(--volt-border) border-l-[3px] border-l-(--volt-accent) bg-(--volt-card) p-6">
          <dl className="flex flex-col gap-5">
            {differentiators.map(({ lead, text }) => (
              <div key={lead} className="max-w-[66ch]">
                <dt className="font-bold">{lead}</dt>
                <dd className="mt-1 text-body-sm leading-relaxed text-(--volt-text-secondary)">
                  {text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="volt-pricing" className="mt-20 sm:mt-24">
        <Eyebrow>Pricing</Eyebrow>
        <h2 id="volt-pricing" className="mt-3 text-xl font-bold">
          No credits. No queue. One flat price.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[10px] border border-(--volt-border) bg-(--volt-card) p-6">
            <h3 className="font-bold">Free</h3>
            <p className="volt-display mt-3 text-[2rem]">$0</p>
            <p className="mt-3 text-body-sm leading-relaxed text-(--volt-text-secondary)">
              A complete captioning tool on its own: Karaoke animated captions,
              BOLD font, white text, 720p and 1080p export, clips up to
              3&nbsp;minutes, small watermark.
            </p>
          </div>
          <div className="rounded-[10px] border border-(--volt-border) border-l-[3px] border-l-(--volt-accent) bg-(--volt-card) p-6">
            <h3 className="font-bold">Volt Pro</h3>
            <p className="volt-display mt-3 text-[2rem]">
              $6.99
              <span className="font-(family-name:--font-volt-body) text-body-sm font-normal text-(--volt-text-secondary)">
                /month
              </span>
            </p>
            <p className="mt-1 text-caption text-(--volt-text-secondary)">
              or $39.99/year — $3.33/month, save 55%
            </p>
            <p className="mt-3 text-body-sm leading-relaxed text-(--volt-text-secondary)">
              Every style, font, colour and placement, the AI editing tools, 4K
              export, no watermark, clips up to 30&nbsp;minutes. 7-day free
              trial on either plan.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start gap-3">
          <a
            href={notifyHref}
            className="inline-flex min-h-12 items-center justify-center rounded-pill bg-(--volt-accent) px-6 font-medium text-(--volt-on-accent) transition-[background-color,transform] duration-150 hover:bg-(--volt-accent-text) motion-safe:active:translate-y-px"
          >
            Get notified when Volt launches
          </a>
          <p className="text-caption text-(--volt-text-secondary)">
            No account. No upload. No catch.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section aria-labelledby="volt-faq" className="mt-20 sm:mt-24">
        <Eyebrow>Questions</Eyebrow>
        <h2 id="volt-faq" className="mt-3 text-xl font-bold">
          Asked and answered.
        </h2>
        <dl className="mt-8 flex flex-col gap-6">
          {faqs.map(({ q, a }) => (
            <div key={q} className="max-w-[66ch]">
              <dt className="font-bold">{q}</dt>
              <dd className="mt-1 text-body-sm leading-relaxed text-(--volt-text-secondary)">
                {a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
