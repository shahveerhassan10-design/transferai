import { LinkButton } from "@/components/Button";

export default function LandingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="text-[14px] font-medium text-blue-700">
              For California community college students
            </p>
            <h1 className="mt-3 font-display text-[38px] leading-[1.12] text-ink sm:text-[48px]">
              Find your clearest path from community college to a UC campus.
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
              TransferAI turns your coursework, GPA, and target major into a plain-language
              transfer plan — what you&apos;ve completed, what&apos;s missing, and what to
              take next, term by term.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href="/plan/start">Start your plan</LinkButton>
              <LinkButton href="#how-it-works" variant="secondary">
                See how it works
              </LinkButton>
            </div>
            <p className="mt-6 text-[13px] text-ink-soft">
              Free to try. No account required for this preview.
            </p>
          </div>

          <PathwayDiagram />
        </div>
      </section>

      {/* Trust strip */}
      <section id="sample-data" className="border-y border-line-soft bg-blue-50/60">
        <div className="mx-auto max-w-6xl px-6 py-6 sm:px-8">
          <p className="text-[14px] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">This preview uses sample requirement data.</span>{" "}
            TransferAI is not yet connected to ASSIST.org or official UC articulation
            agreements, so results should be treated as an example of the format your plan
            will take — not as verified guidance. Always confirm requirements with your
            college counselor and your target university.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <h2 className="font-display text-[30px] text-ink">How TransferAI works</h2>
        <p className="mt-3 max-w-xl text-[16px] text-ink-soft">
          Four short steps stand between where you are now and a plan you can act on.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "1",
              title: "Tell us where you're starting",
              body: "Your current community college, GPA, and transferable units.",
            },
            {
              n: "2",
              title: "Choose where you're headed",
              body: "Your target UC campus, major, and desired transfer term.",
            },
            {
              n: "3",
              title: "Log what you've completed",
              body: "Add the courses you've already taken, with grades and units.",
            },
            {
              n: "4",
              title: "Get your plan",
              body: "See what's done, what's missing, and a term-by-term path forward.",
            },
          ].map((step) => (
            <div key={step.n} className="rounded-xl border border-line-soft p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-display text-[15px] text-blue-900">
                {step.n}
              </span>
              <h3 className="mt-4 text-[16px] font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="bg-blue-50/40">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <h2 className="font-display text-[30px] text-ink">What your plan includes</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Transfer readiness", "A plain-language read on how far along your plan is."],
              ["Completed requirements", "The general-education and major-prep areas you've already satisfied."],
              ["Missing requirements", "The specific gaps left before you're transfer-ready."],
              ["Recommended courses", "Suggested courses to close those gaps, in priority order."],
              ["Semester-by-semester schedule", "A term-by-term outline from now through your transfer term."],
              ["Warnings worth your attention", "GPA, deadline, and eligibility flags that need a closer look."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl bg-white border border-line-soft p-6">
                <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8">
        <h2 className="font-display text-[30px] text-ink">
          Your transfer plan takes about five minutes to build.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[16px] text-ink-soft">
          You can always come back and update it as your coursework changes.
        </p>
        <div className="mt-8">
          <LinkButton href="/plan/start">Start your plan</LinkButton>
        </div>
      </section>
    </main>
  );
}

function PathwayDiagram() {
  return (
    <div className="rounded-2xl border border-line-soft bg-blue-50/50 p-6 sm:p-8">
      <svg viewBox="0 0 420 260" className="w-full" role="img" aria-label="Illustration of a route from a community college to a UC campus with milestones along the way">
        <path
          d="M 30 210 C 110 210, 90 130, 160 120 S 260 60, 300 60 S 380 60, 390 40"
          fill="none"
          stroke="#d7e1f5"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 30 210 C 110 210, 90 130, 160 120"
          fill="none"
          stroke="#1e4fbf"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Start node: community college */}
        <circle cx="30" cy="210" r="9" fill="#1e4fbf" />
        <text x="30" y="235" textAnchor="middle" className="fill-ink" fontSize="12" fontWeight="600">
          Community
        </text>
        <text x="30" y="249" textAnchor="middle" className="fill-ink" fontSize="12" fontWeight="600">
          college
        </text>

        {/* Milestone: courses */}
        <circle cx="160" cy="120" r="7" fill="#1e4fbf" />
        <text x="160" y="102" textAnchor="middle" className="fill-ink-soft" fontSize="11">
          Requirements
        </text>

        {/* Milestone: plan (upcoming) */}
        <circle cx="300" cy="60" r="7" fill="#fff" stroke="#1e4fbf" strokeWidth="2.5" />
        <text x="300" y="42" textAnchor="middle" className="fill-ink-soft" fontSize="11">
          Your plan
        </text>

        {/* End node: UC */}
        <circle cx="390" cy="40" r="9" fill="#fff" stroke="#102a63" strokeWidth="2.5" />
        <text x="368" y="22" textAnchor="middle" className="fill-ink" fontSize="12" fontWeight="600">
          UC campus
        </text>
      </svg>
      <p className="mt-2 text-center text-[13px] text-ink-soft">
        Sample route — your plan maps the requirements actually between you and your target campus.
      </p>
    </div>
  );
}
