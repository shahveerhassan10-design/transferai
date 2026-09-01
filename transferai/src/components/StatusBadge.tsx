import type { RequirementStatus } from "@/lib/types";

const STYLES: Record<RequirementStatus, string> = {
  met: "bg-success-bg text-success-ink",
  "in-progress": "bg-warning-bg text-warning-ink",
  missing: "bg-danger-bg text-danger-ink",
};

const LABELS: Record<RequirementStatus, string> = {
  met: "Met",
  "in-progress": "In progress",
  missing: "Missing",
};

export function StatusBadge({ status }: { status: RequirementStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
