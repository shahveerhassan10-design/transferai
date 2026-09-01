"use client";

import { usePathname } from "next/navigation";

const STOPS = [
  { href: "/plan/start", label: "Student info" },
  { href: "/plan/target", label: "Target" },
  { href: "/plan/courses", label: "Courses" },
  { href: "/plan/results", label: "Your plan" },
];

export function ProgressRail() {
  const pathname = usePathname();
  const activeIndex = STOPS.findIndex((s) => pathname?.startsWith(s.href));

  return (
    <div className="border-b border-line-soft bg-blue-50/60">
      <div className="mx-auto flex max-w-5xl items-center px-6 py-4 sm:px-8">
        {STOPS.map((stop, i) => {
          const state =
            i < activeIndex ? "done" : i === activeIndex ? "current" : "upcoming";
          return (
            <div key={stop.href} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2.5">
                <span
                  className={
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-medium " +
                    (state === "done"
                      ? "bg-blue-700 text-white"
                      : state === "current"
                      ? "bg-white text-blue-700 ring-2 ring-blue-700"
                      : "bg-white text-ink-soft ring-1 ring-line")
                  }
                >
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span
                  className={
                    "hidden text-[14px] sm:inline " +
                    (state === "upcoming" ? "text-ink-soft" : "font-medium text-ink")
                  }
                >
                  {stop.label}
                </span>
              </div>
              {i < STOPS.length - 1 && (
                <span
                  className={
                    "mx-3 h-px flex-1 " + (state === "done" ? "bg-blue-700" : "bg-line")
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
