import { PlanProvider } from "@/lib/plan-context";
import { ProgressRail } from "@/components/ProgressRail";

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      <ProgressRail />
      <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        {children}
      </main>
    </PlanProvider>
  );
}
