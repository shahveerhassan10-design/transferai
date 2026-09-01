"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { usePlan } from "@/lib/plan-context";
import { MAJORS, TRANSFER_TERMS, UC_CAMPUSES } from "@/lib/sample-data";
import { SelectField } from "@/components/fields";
import { Button, LinkButton } from "@/components/Button";

export default function TargetPage() {
  const router = useRouter();
  const { state, setTarget } = usePlan();
  const [form, setForm] = useState(state.target);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTarget(form);
    router.push("/plan/courses");
  }

  return (
    <div>
      <p className="text-[14px] font-medium text-blue-700">Step 2 of 4</p>
      <h1 className="mt-2 font-display text-[30px] text-ink">Choose where you&apos;re headed</h1>
      <p className="mt-2 text-[15px] text-ink-soft">
        Pick one target for now. You can build additional plans for other campuses later.
      </p>

      <form onSubmit={handleSubmit} className="mt-9 space-y-6">
        <SelectField
          label="Target UC campus"
          options={UC_CAMPUSES}
          value={form.university}
          onChange={(e) => setForm({ ...form, university: e.target.value })}
          required
        />

        <SelectField
          label="Target major"
          options={MAJORS}
          value={form.major}
          onChange={(e) => setForm({ ...form, major: e.target.value })}
          required
        />

        <SelectField
          label="Desired transfer term"
          options={TRANSFER_TERMS}
          value={form.transferTerm}
          onChange={(e) => setForm({ ...form, transferTerm: e.target.value })}
          required
        />

        <div className="flex items-center justify-between pt-4">
          <LinkButton href="/plan/start" variant="ghost">
            Back
          </LinkButton>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  );
}
