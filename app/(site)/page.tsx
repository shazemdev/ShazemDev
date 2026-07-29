// A short, honest SwiftUI snippet — the technical layer of the page, set in
// the mono face. Kept in a constant so JSX never has to escape its braces.
const snippet = `struct ShelfSlot: View {
    @State private var isPressed = false

    var body: some View {
        RoundedRectangle(cornerRadius: 27, style: .continuous)
            .strokeBorder(style: StrokeStyle(lineWidth: 2, dash: [8]))
            .scaleEffect(isPressed ? 0.96 : 1)
            .animation(.snappy(duration: 0.2), value: isPressed)
    }
}`;

export default function Home() {
  return (
    <>
      {/* ── Hero band ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-hairline bg-canvas">
        {/* The brand mesh, at hero scale and nowhere else. */}
        <div
          aria-hidden="true"
          className="mesh pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%]"
        />

        <div className="page flex flex-col items-center py-20 text-center sm:py-28">
          <p className="badge motion-safe:animate-rise">
            <span className="font-mono text-ink" translate="no">
              iOS
            </span>
            Independent developer, studio of one
          </p>

          <h1 className="mt-6 max-w-[18ch] text-display-lg text-balance text-ink sm:text-display-xl motion-safe:animate-rise motion-safe:[animation-delay:80ms]">
            I build iPhone apps.
          </h1>

          <p className="mt-5 max-w-[52ch] text-body-lg text-pretty text-body motion-safe:animate-rise motion-safe:[animation-delay:160ms]">
            Designing, coding and shipping for iOS. The first one — Volt, an
            on-device video captioning app — is taking shape right now and
            already has its place on this shelf.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 motion-safe:animate-rise motion-safe:[animation-delay:240ms]">
            <a href="#now" className="btn btn-primary">
              See what I&rsquo;m building
            </a>
            <a href="mailto:hello@shazem.dev" className="btn btn-secondary">
              Say hello
            </a>
          </div>

          {/* Signature element: the app shelf. As apps ship, each dashed slot
              becomes a real app icon linking to its page. */}
          <div className="mt-20 flex flex-col items-center motion-safe:animate-rise motion-safe:[animation-delay:320ms]">
            <div className="relative">
              <a
                href="/apps/volt"
                aria-label="Volt — on-device auto-captions for iPhone, in development"
                className="block rounded-squircle transition-transform duration-150 motion-safe:hover:-translate-y-1"
              >
                <img
                  src="/volt/icon.png"
                  alt=""
                  width={512}
                  height={512}
                  className="size-40 rounded-squircle shadow-soft sm:size-42"
                />
              </a>
              {/* The shelf shadow the icon sits on. */}
              <div
                aria-hidden="true"
                className="shelf-shadow absolute inset-x-[15%] -bottom-5 h-3 rounded-full"
              />
            </div>

            <p className="mt-9 text-body-sm font-medium text-ink">Volt</p>
            <p className="badge mt-2">
              <span className="font-mono">in development</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Now ───────────────────────────────────────────────────────────── */}
      <section id="now" className="border-b border-hairline bg-canvas-soft">
        <div className="page grid gap-6 py-20 sm:py-24 md:grid-cols-[200px_1fr] md:gap-10">
          <h2 className="eyebrow text-body md:pt-2">Now</h2>

          <div className="flex max-w-[58ch] flex-col gap-4">
            <p className="text-display-md text-pretty text-ink sm:text-display-lg">
              A studio of one, shipping slowly on purpose.
            </p>
            <p className="text-body-lg text-body">
              I write Swift and SwiftUI most days, sweating the small
              interactions that make an app feel at home on the iPhone.
            </p>
            <p className="text-body-md text-body">
              This page is deliberately small. As apps ship, the shelf above
              grows — each icon opens a page with screenshots, a story and an
              App&nbsp;Store link.
            </p>
          </div>
        </div>
      </section>

      {/* ── Craft: the polarity-flipped band ──────────────────────────────── */}
      <section
        id="craft"
        className="border-b border-hairline bg-primary text-on-primary"
      >
        <div className="page grid gap-6 py-20 sm:py-24 md:grid-cols-[200px_1fr] md:gap-10">
          <h2 className="eyebrow text-hairline-strong md:pt-2">Craft</h2>

          <div className="flex min-w-0 flex-col gap-6">
            <p className="max-w-[26ch] text-display-md text-balance text-on-primary sm:text-display-lg">
              The third state is the whole job.
            </p>
            <p className="max-w-[58ch] text-body-lg text-hairline-strong">
              Anyone can build the resting state and the tapped state. The part
              that takes the time is everything in between — the press that
              gives a little, the spring that settles instead of snapping.
            </p>

            <pre
              className="overflow-x-auto rounded-md bg-black/30 p-6 font-mono text-code text-hairline ring-1 ring-white/10"
              translate="no"
            >
              <code>{snippet}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── Elsewhere ─────────────────────────────────────────────────────── */}
      <section id="elsewhere" className="bg-canvas">
        <div className="page grid gap-6 py-20 sm:py-24 md:grid-cols-[200px_1fr] md:gap-10">
          <h2 className="eyebrow text-body md:pt-2">Elsewhere</h2>

          <ul className="flex flex-wrap gap-3">
            <li>
              <a
                href="https://github.com/shazemdev"
                className="btn btn-secondary"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:hello@shazem.dev" className="btn btn-secondary">
                hello@shazem.dev
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
