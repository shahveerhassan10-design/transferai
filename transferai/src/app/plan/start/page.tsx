"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { usePlan } from "@/lib/plan-context";
import { CALIFORNIA_COMMUNITY_COLLEGES } from "@/lib/sample-data";
import { TextField, SelectField } from "@/components/fields";
import { Button, LinkButton } from "@/components/Button";

export default function StudentInfoPage() {
  const router = useRouter();
  const { state, setStudent } = usePlan();
  const [form, setForm] = useState(state.student);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStudent(form);
    router.push("/plan/target");
  }

  return (
    <div>
      <p className="text-[14px] font-medium text-blue-700">Step 1 of 4</p>
      <h1 className="mt-2 font-display text-[30px] text-ink">Tell us about you</h1>
      <p className="mt-2 text-[15px] text-ink-soft">
        This helps us frame your plan. Nothing here is saved to an account yet — it stays
        in your browser for this preview.
      </p>

      <form onSubmit={handleSubmit} className="mt-9 space-y-6">
        <TextField
          label="Full name"
          placeholder="e.g. Amina Khan"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />

        <SelectField
          label="Current community college"
          options={CALIFORNIA_COMMUNITY_COLLEGES}
          value={form.currentCollege}
          onChange={(e) => setForm({ ...form, currentCollege: e.target.value })}
          required
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            label="Current GPA"
            type="number"
            min="0"
            max="4"
            step="0.01"
            placeholder="e.g. 3.4"
            hint="On a 4.0 scale"
            value={form.gpa}
            onChange={(e) => setForm({ ...form, gpa: e.target.value })}
            required
          />
          <TextField
            label="Completed transferable units"
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 45"
            hint="An estimate is fine"
            value={form.transferableUnits}
            onChange={(e) => setForm({ ...form, transferableUnits: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <LinkButton href="/" variant="ghost">
            Back to home
          </LinkButton>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  );
}
