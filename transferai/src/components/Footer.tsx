export function Footer() {
  return (
    <footer className="mt-auto border-t border-line-soft bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-700 font-display text-[12px] text-white">
                T
              </span>
              <span className="font-display text-[16px] text-ink">TransferAI</span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              A planning tool for California community college students preparing to
              transfer to the University of California. Built for clarity, not certainty.
            </p>
          </div>
          <div className="max-w-md rounded-lg border border-line-soft bg-blue-50/60 p-4">
            <p className="text-[13px] leading-relaxed text-ink-soft">
              TransferAI currently uses sample requirement data for demonstration
              purposes. Always confirm current transfer requirements with{" "}
              <a href="https://assist.org" className="text-blue-700 underline underline-offset-2">
                ASSIST.org
              </a>{" "}
              and your target university&apos;s admissions office before making
              academic decisions.
            </p>
          </div>
        </div>
        <p className="mt-8 text-[13px] text-ink-soft">
          © {new Date().getFullYear()} TransferAI. Not affiliated with the University of California.
        </p>
      </div>
    </footer>
  );
}
