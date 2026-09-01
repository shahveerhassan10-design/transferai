"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlan } from "@/lib/plan-context";
import { generateSamplePlan } from "@/lib/sample-data";
import { downloadPlanPdf } from "@/lib/generate-pdf";
import { StatusBadge } from "@/components/StatusBadge";
import { Button, LinkButton } from "@/components/Button";

export default function ResultsPage() {
  const router = useRouter();
  const { state, hydrated, resetPlan } = usePlan();
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (hydrated && (!state.target.university || !state.target.major)) {
      router.replace("/plan/target");
    }
  }, [hydrated, state.target.university, state.target.major, router]);

  const plan = useMemo(() => generateSamplePlan(state), [state]);

  if (!hydrated || !state.target.university) {
    return <p className="text-[15px] text-ink-soft">Loading your plan…</p>;
  }

  function handleDownload() {
    setDownloading(true);
    try {
      downloadPlanPdf(state, plan);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      <p className="text-[14px] font-medium text-blue-700">Step 4 of 4</p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[30px] text-ink">Your transfer plan</h1>
          <p className="mt-2 max-w-xl text-[15px] text-ink-soft">
            {plan.summary}
          </p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-[12px] font-medium text-blue-900">
          Sample data
        </span>
      </div>

      <ReadinessCard score={plan.readinessScore} label={plan.readinessLabel} />

      <Section title="Completed requirements">
        <RequirementList items={plan.completed} />
      </Section>

      <Section title="Missing requirements">
        <RequirementList items={plan.missing} />
      </Section>

      <Section title="Recommended courses">
        <div className="space-y-3">
          {plan.recommended.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-line-soft p-4"
            >
              <div>
                <p className="text-[14px] font-medium text-ink">
                  {r.courseCode} — {r.courseName}
                </p>
                <p className="mt-1 text-[13.5px] text-ink-soft">{r.reason}</p>
              </div>
              <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[12px] font-medium text-blue-900">
                {r.priority} priority
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Semester-by-semester schedule">
        <div className="grid gap-4 sm:grid-cols-2">
          {plan.schedule.map((s) => (
            <div key={s.term} className="rounded-xl border border-line-soft p-4">
              <p className="text-[14px] font-semibold text-blue-900">{s.term}</p>
              <ul className="mt-2 space-y-1">
                {s.courses.map((c) => (
                  <li key={c} className="text-[13.5px] text-ink">
                    • {c}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[12.5px] text-ink-soft">Focus: {s.focus}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Important warnings">
        <div className="space-y-2">
          {plan.warnings.map((w) => (
            <div
              key={w}
              className="rounded-lg bg-warning-bg px-4 py-3 text-[13.5px] text-warning-ink"
            >
              {w}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Official sources to verify against">
        <ul className="space-y-1.5">
          {plan.sources.map((s) => (
            <li key={s.url} className="text-[14px]">
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline underline-offset-2"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-10 rounded-xl border border-line-soft bg-blue-50/60 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink-soft">
          <span className="font-medium text-ink">Disclaimer:</span> This plan is built from
          sample data for demonstration purposes and does not guarantee admission to any
          university. Always verify current transfer requirements with ASSIST.org, your
          community college counselor, and your target university&apos;s admissions office.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <LinkButton href="/plan/courses" variant="ghost">
          Back to courses
        </LinkButton>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              resetPlan();
              router.push("/plan/start");
            }}
            className="text-[14px] text-ink-soft hover:text-ink hover:underline"
          >
            Start a new plan
          </button>
          <Button onClick={handleDownload} disabled={downloading}>
            {downloading ? "Preparing PDF…" : "Download transfer plan (PDF)"}
          </Button>
        </div>
      </div>
      <p className="mt-3 text-right text-[12.5px] text-ink-soft">
        This is an early demo PDF. A polished, fully detailed version arrives once
        TransferAI is connected to real data.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-[20px] text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function RequirementList({
  items,
}: {
  items: { id: string; category: string; title: string; detail: string; status: import("@/lib/types").RequirementStatus }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-line-soft p-4"
        >
          <div>
            <p className="text-[12.5px] font-medium uppercase tracking-normal text-ink-soft">
              {item.category}
            </p>
            <p className="mt-0.5 text-[14px] font-medium text-ink">{item.title}</p>
            <p className="mt-1 text-[13.5px] text-ink-soft">{item.detail}</p>
          </div>
          <StatusBadge status={item.status} />
        </div>
      ))}
    </div>
  );
}

function ReadinessCard({ score, label }: { score: number; label: string }) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-6 rounded-2xl border border-line-soft bg-blue-50/40 p-6">
      <svg width="104" height="104" viewBox="0 0 104 104" className="shrink-0">
        <circle cx="52" cy="52" r="42" fill="none" stroke="#d7e1f5" strokeWidth="10" />
        <circle
          cx="52"
          cy="52"
          r="42"
          fill="none"
          stroke="#1e4fbf"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 52 52)"
        />
        <text x="52" y="58" textAnchor="middle" fontSize="22" fontWeight="700" className="fill-ink">
          {score}
        </text>
      </svg>
      <div>
        <p className="text-[13px] font-medium text-blue-700">Transfer readiness (sample estimate)</p>
        <p className="mt-1 font-display text-[22px] text-ink">{label}</p>
        <p className="mt-1 max-w-md text-[13.5px] text-ink-soft">
          This score is illustrative only — it is not an admissions prediction and should
          not be treated as one.
        </p>
      </div>
    </div>
  );
}
