import type { Metadata } from 'next';
import { LegalDocHead, LegalContact } from '../ui';

export const metadata: Metadata = {
  title: 'Volt — Terms of Service',
  description: 'The terms governing your use of Volt for iOS.',
  alternates: { canonical: '/apps/volt/terms' },
};

// Body copy inherits the .volt base (16px / 1.7); strong leads step up to the
// primary text colour.
const sectionBody =
  'mt-4 flex max-w-[66ch] flex-col gap-4 text-(--volt-text-secondary) [&_strong]:font-semibold [&_strong]:text-(--volt-text)';

function SectionHeading({ n, children }: { n: number; children: string }) {
  return (
    <h2 className="text-xl font-bold">
      <span aria-hidden="true" className="mr-3 text-(--volt-accent-text)">
        {n}
      </span>
      {children}
    </h2>
  );
}

export default function VoltTermsPage() {
  return (
    <article>
      <LegalDocHead
        title="Terms of Service"
        effective="July 30, 2026"
        current="terms"
      />

      <p className="mt-10 max-w-[66ch] text-body-lg text-pretty text-(--volt-text-secondary)">
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Volt
        (the &ldquo;App&rdquo;), made by Shazem.Dev (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; &ldquo;our&rdquo;). By downloading, installing, or
        using Volt, you agree to these Terms. If you don&rsquo;t agree,
        don&rsquo;t use the App.
      </p>

      <section className="mt-12">
        <SectionHeading n={1}>License</SectionHeading>
        <div className={sectionBody}>
          <p>
            Subject to these Terms, we grant you a limited, non-exclusive,
            non-transferable, revocable license to use Volt on any Apple device
            you own or control, as permitted by the App&nbsp;Store&rsquo;s
            Usage Rules, for your personal, non-commercial or commercial
            content-creation purposes. This license doesn&rsquo;t give you any
            ownership interest in the App itself.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={2}>Your content</SectionHeading>
        <div className={sectionBody}>
          <p>
            Videos, transcripts, and captions you create in Volt are yours.
            Volt processes them entirely on your device and does not upload,
            store, or claim any ownership over your content. You&rsquo;re
            solely responsible for the content you caption and export —
            including making sure you have the rights to any video you use, and
            that your captioned content doesn&rsquo;t violate any law or
            infringe anyone else&rsquo;s rights.
          </p>
          <p>
            You agree not to use Volt to create captions for content that is
            illegal, infringing, harassing, or that you don&rsquo;t have the
            right to use.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={3}>Subscriptions (Volt Pro)</SectionHeading>
        <div className={sectionBody}>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>
              Volt Pro is offered as an auto-renewing subscription (monthly or
              yearly), billed through your Apple&nbsp;ID via the
              App&nbsp;Store.
            </li>
            <li>
              A free trial may be offered; if you don&rsquo;t cancel before the
              trial ends, your subscription begins and you&rsquo;ll be charged.
            </li>
            <li>
              Subscriptions renew automatically unless auto-renewal is turned
              off at least 24 hours before the end of the current period. You
              can manage or cancel your subscription anytime in{' '}
              <strong>Settings &gt; [your name] &gt; Subscriptions</strong>.
            </li>
            <li>
              Payment is charged to your Apple&nbsp;ID account at confirmation
              of purchase and at the start of each renewal period.
            </li>
            <li>
              Prices may change; you&rsquo;ll be notified in advance as
              required by the App&nbsp;Store, and any change applies only to
              future renewal periods.
            </li>
            <li>
              Refunds are handled by Apple according to Apple&rsquo;s own
              policies — we don&rsquo;t have access to process refunds
              directly.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={4}>Free features vs. Pro</SectionHeading>
        <div className={sectionBody}>
          <p>
            Volt offers a free tier and additional features unlocked by Volt
            Pro (currently: 4K export, watermark removal, extended clip length,
            and select caption styles/tools — subject to change as the App
            evolves). We may adjust what&rsquo;s free vs. Pro-gated in future
            updates.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={5}>Acceptable use</SectionHeading>
        <div className={sectionBody}>
          <p>You agree not to:</p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>
              Reverse-engineer, decompile, or attempt to extract the source
              code of Volt, except where applicable law permits it.
            </li>
            <li>
              Use Volt in any way that violates applicable law or infringes
              anyone&rsquo;s rights.
            </li>
            <li>
              Attempt to disrupt, overload, or interfere with Volt&rsquo;s
              operation.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={6}>Disclaimer of warranties</SectionHeading>
        <div className={sectionBody}>
          <p>
            Volt is provided{' '}
            <strong>&ldquo;as is&rdquo; and &ldquo;as available,&rdquo;</strong>{' '}
            without warranties of any kind. Automatic transcription and
            translation are AI-generated and may contain errors — we
            don&rsquo;t guarantee accuracy, completeness, or fitness for any
            particular purpose. You&rsquo;re responsible for reviewing captions
            before publishing or relying on them.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={7}>Limitation of liability</SectionHeading>
        <div className={sectionBody}>
          <p>
            To the maximum extent permitted by law, we are not liable for any
            indirect, incidental, special, or consequential damages arising
            from your use of (or inability to use) Volt, including but not
            limited to loss of data, loss of content, or loss of profits.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={8}>Termination</SectionHeading>
        <div className={sectionBody}>
          <p>
            We may suspend or terminate your access to Volt if you violate
            these Terms. You may stop using Volt, and cancel any subscription,
            at any time.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={9}>Apple-required terms</SectionHeading>
        <div className={sectionBody}>
          <p>
            Because Volt is distributed through the Apple App&nbsp;Store, the
            following terms apply, as required by Apple:
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>
              These Terms are between you and us only,{' '}
              <strong>not with Apple</strong>, and Apple is not responsible for
              the App or its content.
            </li>
            <li>
              Apple has no obligation to provide maintenance or support for the
              App.
            </li>
            <li>
              In the event of any failure of the App to conform to any
              applicable warranty, you may notify Apple, and Apple will refund
              the purchase price (if any) for the App to you; to the maximum
              extent permitted by law, Apple has no other warranty obligation
              with respect to the App.
            </li>
            <li>
              Apple is not responsible for addressing any claims by you or any
              third party relating to the App, including product liability
              claims, claims that the App fails to conform to legal or
              regulatory requirements, and claims arising under consumer
              protection or similar legislation.
            </li>
            <li>
              Apple is not responsible for the investigation, defense,
              settlement, and discharge of any third-party claim that the App
              infringes that third party&rsquo;s intellectual property rights.
            </li>
            <li>
              You must comply with all applicable third-party terms when using
              the App (e.g., your wireless carrier&rsquo;s data plan terms).
            </li>
            <li>
              You represent that you are not located in a country subject to a
              U.S. Government embargo or on any U.S. Government
              restricted-parties list.
            </li>
            <li>
              Apple and Apple&rsquo;s subsidiaries are third-party
              beneficiaries of these Terms, and upon your acceptance, Apple has
              the right (and will be deemed to have accepted the right) to
              enforce these Terms against you as a third-party beneficiary.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={10}>Changes to these Terms</SectionHeading>
        <div className={sectionBody}>
          <p>
            We may update these Terms from time to time. Continued use of Volt
            after an update means you accept the revised Terms. The current
            version will always be posted at this location.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading n={11}>Governing law</SectionHeading>
        <div className={sectionBody}>
          <p>
            These Terms are governed by the laws of Maharashtra, India, without
            regard to conflict-of-law principles, except where superseded by
            mandatory consumer-protection law in your jurisdiction of
            residence.
          </p>
        </div>
      </section>

      <LegalContact>Questions about these Terms:</LegalContact>
    </article>
  );
}
