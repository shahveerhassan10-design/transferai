"use client";

import { useRouter } from "next/navigation";
import { usePlan } from "@/lib/plan-context";
import { GRADES } from "@/lib/sample-data";
import { Button, LinkButton } from "@/components/Button";

export default function CoursesPage() {
  const router = useRouter();
  const { state, addCourseRow, updateCourseRow, removeCourseRow } = usePlan();

  function handleContinue() {
    router.push("/plan/results");
  }

  return (
    <div>
      <p className="text-[14px] font-medium text-blue-700">Step 3 of 4</p>
      <h1 className="mt-2 font-display text-[30px] text-ink">Log what you&apos;ve completed</h1>
      <p className="mt-2 text-[15px] text-ink-soft">
        Add every transferable course you&apos;ve finished. You can add or edit these
        later — nothing here is final.
      </p>

      <div className="mt-9 space-y-4">
        {state.courses.length === 0 && (
          <div className="rounded-xl border border-dashed border-line p-8 text-center">
            <p className="text-[15px] text-ink-soft">No courses added yet.</p>
          </div>
        )}

        {state.courses.map((course, i) => (
          <div
            key={course.id}
            className="rounded-xl border border-line-soft p-4 sm:p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[13px] font-medium text-ink-soft">Course {i + 1}</span>
              <button
                type="button"
                onClick={() => removeCourseRow(course.id)}
                className="text-[13px] text-danger-ink hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-[0.8fr_1.6fr_0.6fr_0.6fr]">
              <input
                className="rounded-lg border border-line px-3 py-2 text-[14px] outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                placeholder="Course code (e.g. ENGL-1A)"
                value={course.courseCode}
                onChange={(e) => updateCourseRow(course.id, { courseCode: e.target.value })}
              />
              <input
                className="rounded-lg border border-line px-3 py-2 text-[14px] outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                placeholder="Course name (e.g. College Composition)"
                value={course.courseName}
                onChange={(e) => updateCourseRow(course.id, { courseName: e.target.value })}
              />
              <input
                className="rounded-lg border border-line px-3 py-2 text-[14px] outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                type="number"
                min="0"
                step="0.5"
                placeholder="Units"
                value={course.units}
                onChange={(e) => updateCourseRow(course.id, { units: e.target.value })}
              />
              <select
                className="rounded-lg border border-line px-3 py-2 text-[14px] outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                value={course.grade}
                onChange={(e) => updateCourseRow(course.id, { grade: e.target.value })}
              >
                <option value="">Grade</option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addCourseRow}
          className="w-full rounded-xl border border-dashed border-line py-3 text-[14px] font-medium text-blue-700 hover:border-blue-700 hover:bg-blue-50"
        >
          + Add a course
        </button>
      </div>

      <div className="mt-9 flex items-center justify-between">
        <LinkButton href="/plan/target" variant="ghost">
          Back
        </LinkButton>
        <Button onClick={handleContinue}>See my plan</Button>
      </div>
    </div>
  );
}
