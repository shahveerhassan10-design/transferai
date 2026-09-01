import { jsPDF } from "jspdf";
import type { GeneratedPlan, PlanState } from "./types";

/**
 * Generates a basic, first-pass PDF of the transfer plan.
 *
 * This is intentionally simple. Once Supabase, Gemini, and official
 * ASSIST/UC data are connected, this should be replaced with a more
 * polished, branded PDF pipeline (see project notes).
 */
export function downloadPlanPdf(state: PlanState, plan: GeneratedPlan) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const marginX = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - marginX * 2;
  let y = 64;

  const blue: [number, number, number] = [30, 79, 191];
  const ink: [number, number, number] = [15, 31, 61];
  const soft: [number, number, number] = [76, 92, 122];

  function ensureSpace(lines = 1, lineHeight = 14) {
    if (y + lines * lineHeight > 740) {
      doc.addPage();
      y = 64;
    }
  }

  function heading(text: string) {
    ensureSpace(2, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...blue);
    doc.text(text, marginX, y);
    y += 18;
  }

  function paragraph(text: string, opts?: { color?: [number, number, number]; size?: number }) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(opts?.size ?? 10.5);
    doc.setTextColor(...(opts?.color ?? ink));
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    ensureSpace(lines.length, 14);
    doc.text(lines, marginX, y);
    y += lines.length * 14 + 6;
  }

  function bullet(text: string) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(...ink);
    const lines = doc.splitTextToSize(text, maxWidth - 14) as string[];
    ensureSpace(lines.length, 14);
    doc.text("•", marginX, y);
    doc.text(lines, marginX + 14, y);
    y += lines.length * 14 + 2;
  }

  // Header
  doc.setFillColor(...blue);
  doc.rect(0, 0, pageWidth, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...blue);
  doc.text("TransferAI — Transfer Plan", marginX, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...soft);
  doc.text("SAMPLE DATA — for demonstration purposes only", marginX, y);
  y += 26;

  heading("Student information");
  paragraph(`Name: ${state.student.fullName || "Not provided"}`);
  paragraph(`Current college: ${state.student.currentCollege || "Not provided"}`);
  paragraph(`GPA: ${state.student.gpa || "Not provided"}`);
  paragraph(`Completed transferable units: ${state.student.transferableUnits || "Not provided"}`);
  y += 6;

  heading("Target");
  paragraph(`University: ${state.target.university || "Not selected"}`);
  paragraph(`Major: ${state.target.major || "Not selected"}`);
  paragraph(`Desired transfer term: ${state.target.transferTerm || "Not selected"}`);
  y += 6;

  heading(`Transfer readiness — ${plan.readinessLabel} (${plan.readinessScore}/100, sample estimate)`);
  paragraph(plan.summary);
  y += 4;

  heading("Completed requirements (sample)");
  plan.completed.forEach((r) => bullet(`${r.category}: ${r.title} — ${r.detail}`));
  y += 6;

  heading("Missing requirements (sample)");
  plan.missing.forEach((r) => bullet(`${r.category}: ${r.title} — ${r.detail}`));
  y += 6;

  heading("Recommended courses (sample)");
  plan.recommended.forEach((r) =>
    bullet(`[${r.priority}] ${r.courseCode} — ${r.courseName}: ${r.reason}`)
  );
  y += 6;

  heading("Semester-by-semester plan (sample)");
  plan.schedule.forEach((s) => {
    paragraph(s.term, { color: blue, size: 11 });
    s.courses.forEach((c) => bullet(c));
    paragraph(`Focus: ${s.focus}`, { color: soft, size: 9.5 });
  });
  y += 4;

  heading("Important warnings");
  plan.warnings.forEach((w) => bullet(w));
  y += 6;

  heading("Official sources to verify against");
  plan.sources.forEach((s) => bullet(`${s.label} — ${s.url}`));
  y += 6;

  heading("Disclaimer");
  paragraph(
    "This plan was generated using sample data for demonstration purposes only. It does not reflect verified Cal-GETC, IGETC, or campus-specific articulation agreements, and it does not guarantee admission to any university. Always verify your transfer requirements with ASSIST.org, your community college counselor, and the official admissions office of your target university before making academic decisions."
  );

  const fileName = `TransferAI-Sample-Plan-${(state.target.university || "plan").replace(/\s+/g, "-")}.pdf`;
  doc.save(fileName);
}
