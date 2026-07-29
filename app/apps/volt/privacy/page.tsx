import type { Metadata } from 'next';
import { Eyebrow, LegalDocHead, LegalContact } from '../ui';

export const metadata: Metadata = {
  title: 'Volt — Privacy Policy',
  description:
    'Volt has no server: your videos, transcripts and captions never leave your iPhone. How Volt handles data, on-device.',
  alternates: { canonical: '/apps/volt/privacy' },
};

// Body copy inherits the .volt base (16px / 1.7); strong leads step up to the
// primary text colour.
const sectionBody =
  'mt-4 flex max-w-[66ch] flex-col gap-4 text-(--volt-text-secondary) [&_strong]:font-semibold [&_strong]:text-(--volt-text)';

export default function VoltPrivacyPage() {
  return (
    <article>
      <LegalDocHead
        title="Privacy Policy"
        effective="July 30, 2026"
        current="privacy"
      />

      <div className="mt-10 rounded-[10px] border border-(--volt-border) border-l-[3px] border-l-(--volt-accent) bg-(--volt-card) p-6">
        <Eyebrow>The short version</Eyebrow>
        <p className="mt-3 max-w-[66ch] text-(--volt-text-secondary)">
          Volt does not have a server. Your videos, transcripts, and captions
          never leave your iPhone. Volt has no user accounts, no analytics, no
          ad tracking, and no third-party data sharing. The only network
          activity Volt performs is downloading its own speech-recognition
          model file (once) and talking to Apple&rsquo;s App&nbsp;Store for
          subscriptions — neither involves sending your content anywhere.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold">What Volt processes, and where</h2>
        <div className={sectionBody}>
          <p>
            <strong>Videos you select.</strong> When you pick a video (via the
            system Photos picker), Volt copies it into its own local, private
            app storage on your device to transcribe, caption, and export it.
            This file never leaves your device — Volt has no backend to send it
            to.
          </p>
          <p>
            <strong>Speech-to-text transcription.</strong> Volt uses an
            on-device AI model (WhisperKit, running fully locally on your
            iPhone&rsquo;s Neural Engine) to convert your video&rsquo;s speech
            into captions. This happens entirely on your device. No audio or
            video is uploaded to us or to any third party as part of
            transcription.
          </p>
          <p>
            <strong>The one-time model download.</strong> The first time you
            caption a video, Volt downloads a speech-recognition model file
            (about 145MB) from Hugging Face, a third-party model hosting
            service, so it can run transcription locally afterward. This
            download contains no information about you or your content —
            it&rsquo;s Volt fetching its own software component, the same way
            an app might download a font or a dictionary.
          </p>
          <p>
            <strong>Captions and project history.</strong> Your edited
            transcripts, caption style choices, and a list of your recent
            projects are stored locally on your device using Apple&rsquo;s
            on-device data storage (SwiftData). None of this is transmitted to
            us.
          </p>
          <p>
            <strong>Exporting and sharing.</strong> When you export a captioned
            video, it&rsquo;s saved to your Photos library on your device. If
            you use the Share button, iOS&rsquo;s native share sheet lets you
            choose where to send it (Messages, TikTok, Instagram, etc.) —
            that&rsquo;s a direct action between your device and the
            destination you pick. Volt itself does not send your video
            anywhere.
          </p>
          <p>
            <strong>Language preference.</strong> Volt remembers the last
            language you selected for transcription, stored locally on your
            device, so you don&rsquo;t have to re-select it every time.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Permissions Volt requests</h2>
        <div className={sectionBody}>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>
              <strong>Photos (add-only):</strong> to save your exported,
              captioned videos to your Photos library.
            </li>
          </ul>
          <p>
            Volt does not request access to your microphone, contacts,
            location, or full photo library.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Subscriptions (Volt Pro)</h2>
        <div className={sectionBody}>
          <p>
            Volt Pro is an auto-renewable subscription processed entirely by
            Apple through the App&nbsp;Store (StoreKit). Volt never sees,
            collects, or stores your payment information — Apple handles
            billing, receipts, and renewal directly. Apple&rsquo;s own privacy
            policy governs the payment information you provide to the
            App&nbsp;Store.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">
          Analytics, advertising, and tracking
        </h2>
        <div className={sectionBody}>
          <p>
            Volt does not use analytics SDKs, advertising networks, or tracking
            of any kind. We don&rsquo;t know how you use the app, and we
            can&rsquo;t — there&rsquo;s no channel for that data to reach us.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Children&rsquo;s privacy</h2>
        <div className={sectionBody}>
          <p>
            Volt is not directed at children under 13, and we do not knowingly
            collect personal information from anyone, regardless of age —
            consistent with the rest of this policy, since Volt doesn&rsquo;t
            collect personal information from any user.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Data retention and deletion</h2>
        <div className={sectionBody}>
          <p>
            Because everything Volt creates lives on your device, you&rsquo;re
            always in control: deleting a project from Volt&rsquo;s
            &ldquo;Recent&rdquo; list deletes its video and transcript from
            your device. Deleting the Volt app deletes all associated data.
            There is nothing stored elsewhere to separately request deletion
            of.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Changes to this policy</h2>
        <div className={sectionBody}>
          <p>
            If this policy changes, an updated version will be posted at this
            same location with a revised effective date. Continued use of Volt
            after a change constitutes acceptance of the updated policy.
          </p>
        </div>
      </section>

      <LegalContact>
        Questions about this policy or Volt&rsquo;s data practices:
      </LegalContact>
    </article>
  );
}
