export default function Home() {
  return (
    <main>
      <div className="hero">
        <div className="rise">
          <p className="eyebrow">Shazem · Independent developer</p>
          <h1>I build iPhone apps.</h1>
          <p>
            A studio of one — designing, coding, and shipping apps for iOS. The
            first one is taking shape right now, and when it ships, it will live
            here on this shelf.
          </p>
        </div>

        {/* Signature element: the app shelf. As apps ship, each dashed
            slot becomes a real app icon linking to its page. */}
        <div className="shelf rise">
          <div
            className="icon-slot"
            aria-label="App slot: first app in development"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div className="slot-label">
            <strong>App 01</strong>
            <code>in development</code>
          </div>
        </div>
      </div>

      <section id="now">
        <h2>Now</h2>
        <div>
          <p>
            Writing Swift and SwiftUI most days, sweating the small interactions
            that make an app feel at home on the iPhone.
          </p>
          <p>
            This page is deliberately small. As apps ship, the shelf above grows
            — each icon will open a page with screenshots, a story, and an
            App&nbsp;Store link.
          </p>
        </div>
      </section>

      <section id="elsewhere">
        <h2>Elsewhere</h2>
        <ul className="links">
          <li>
            <a href="https://github.com/shazemdev">GitHub</a>
          </li>
          <li>
            <a href="mailto:hello@shazem.dev">hello@shazem.dev</a>
          </li>
        </ul>
      </section>
    </main>
  );
}
