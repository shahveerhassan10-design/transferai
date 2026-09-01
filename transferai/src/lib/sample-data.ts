import type {
  CompletedCourse,
  GeneratedPlan,
  PlanState,
  RecommendedCourse,
  RequirementItem,
  SemesterPlanItem,
} from "./types";

export const CALIFORNIA_COMMUNITY_COLLEGES = [
  "Diablo Valley College",
  "De Anza College",
  "Santa Monica College",
  "Foothill College",
  "Pasadena City College",
  "Sacramento City College",
  "San Diego Mesa College",
  "Irvine Valley College",
  "American River College",
  "Orange Coast College",
  "Other California community college",
];

export const UC_CAMPUSES = [
  "UC Berkeley",
  "UC Los Angeles (UCLA)",
  "UC San Diego",
  "UC Davis",
  "UC Irvine",
  "UC Santa Barbara",
  "UC Santa Cruz",
  "UC Riverside",
  "UC Merced",
];

export const MAJORS = [
  "Political Science",
  "Computer Science",
  "Business Administration",
  "Psychology",
  "Biology",
  "Economics",
  "Sociology",
  "Communication",
  "Mechanical Engineering",
  "English",
];

export const TRANSFER_TERMS = [
  "Fall 2027",
  "Spring 2028",
  "Fall 2028",
  "Spring 2029",
  "Fall 2029",
];

export const GRADES = ["A", "A-", "B+", "B", "B-", "C+", "C", "P"];

export function emptyStudentInfo() {
  return {
    fullName: "",
    currentCollege: "",
    gpa: "",
    transferableUnits: "",
  };
}

export function emptyTargetSelection() {
  return {
    university: "",
    major: "",
    transferTerm: "",
  };
}

export function newCourseRow(): CompletedCourse {
  return {
    id: crypto.randomUUID(),
    courseCode: "",
    courseName: "",
    units: "",
    grade: "",
  };
}

/**
 * Builds a SAMPLE transfer plan. This is illustrative placeholder logic only —
 * it does not reflect real Cal-GETC, IGETC, or major-prep requirements, and it
 * is not connected to ASSIST.org or any official articulation data yet.
 */
export function generateSamplePlan(state: PlanState): GeneratedPlan {
  const enteredCourseCount = state.courses.filter(
    (c) => c.courseName.trim().length > 0
  ).length;
  const gpa = Number.parseFloat(state.student.gpa) || 0;
  const units = Number.parseFloat(state.student.transferableUnits) || 0;

  // Purely illustrative scoring so the demo feels responsive to input.
  // Not a real transfer-readiness calculation.
  const courseScore = Math.min(enteredCourseCount * 8, 40);
  const gpaScore = Math.min((gpa / 4) * 30, 30);
  const unitsScore = Math.min((units / 60) * 30, 30);
  const readinessScore = Math.round(
    Math.min(courseScore + gpaScore + unitsScore, 96)
  );

  const readinessLabel =
    readinessScore >= 75
      ? "On track"
      : readinessScore >= 45
      ? "Making progress"
      : "Early stage";

  const completed: RequirementItem[] = [
    {
      id: "req-1",
      category: "Cal-GETC Area 1 — English",
      title: "College Composition",
      detail: "Sample match: satisfied by an entered or assumed English composition course.",
      status: "met",
    },
    {
      id: "req-2",
      category: "Cal-GETC Area 2 — Math",
      title: "Quantitative Reasoning",
      detail: "Sample match: statistics or college-level math course on file.",
      status: enteredCourseCount >= 1 ? "met" : "in-progress",
    },
    {
      id: "req-3",
      category: "Major Prep",
      title: "Introductory major coursework",
      detail: `Sample match based on courses entered for ${state.target.major || "your major"}.`,
      status: enteredCourseCount >= 2 ? "met" : "in-progress",
    },
  ];

  const missing: RequirementItem[] = [
    {
      id: "req-4",
      category: "Cal-GETC Area 3 — Arts & Humanities",
      title: "One additional Arts & Humanities course",
      detail: "Sample gap: no matching course found in your entered coursework.",
      status: "missing",
    },
    {
      id: "req-5",
      category: "Cal-GETC Area 4 — Social & Behavioral Sciences",
      title: "One additional Social & Behavioral Sciences course",
      detail: "Sample gap: commonly needed alongside a Political Science or Social Science major.",
      status: "missing",
    },
    {
      id: "req-6",
      category: "Major Prep",
      title: "Upper-sequence major prep course",
      detail: `Sample gap: most ${state.target.university || "UC"} campuses expect this before transfer.`,
      status: enteredCourseCount >= 4 ? "in-progress" : "missing",
    },
  ];

  const recommended: RecommendedCourse[] = [
    {
      id: "rec-1",
      courseCode: "SPCH-141",
      courseName: "Argumentation & Debate",
      reason: "Sample suggestion for Cal-GETC Area 1C / communication requirement.",
      priority: "High",
    },
    {
      id: "rec-2",
      courseCode: "POLI-120",
      courseName: "Comparative Government",
      reason: "Sample suggestion to strengthen major-prep depth for Political Science.",
      priority: "Medium",
    },
    {
      id: "rec-3",
      courseCode: "HIST-140",
      courseName: "World History Since 1500",
      reason: "Sample suggestion to fill an Area 3/4 gap.",
      priority: "Medium",
    },
    {
      id: "rec-4",
      courseCode: "STAT-142",
      courseName: "Elementary Statistics",
      reason: "Sample suggestion — many majors expect a statistics course before transfer.",
      priority: "Low",
    },
  ];

  const schedule: SemesterPlanItem[] = [
    {
      term: "This term",
      courses: ["Continue current course load", "Meet with a transfer counselor"],
      focus: "Confirm major-prep articulation on ASSIST.org",
    },
    {
      term: "Next term",
      courses: ["SPCH-141 — Argumentation & Debate", "POLI-120 — Comparative Government"],
      focus: "Close Cal-GETC Area 1C and add major-prep depth",
    },
    {
      term: "Following term",
      courses: ["HIST-140 — World History Since 1500", "STAT-142 — Elementary Statistics"],
      focus: "Close remaining breadth areas",
    },
    {
      term: state.target.transferTerm || "Target transfer term",
      courses: ["Finalize UC application", "Submit final transcripts"],
      focus: "Application submission and verification",
    },
  ];

  const warnings: string[] = [
    "This plan uses SAMPLE requirement data and does not reflect verified Cal-GETC, IGETC, or campus-specific articulation.",
    "Course availability, prerequisites, and requirement changes are not accounted for in this demo.",
    "Transfer admission is competitive and is never guaranteed by GPA or unit count alone.",
  ];

  if (gpa > 0 && gpa < 2.4) {
    warnings.push(
      "Your entered GPA is below the minimum most UC campuses require for transfer — verify current minimums with the campus you're applying to."
    );
  }

  const sources = [
    { label: "ASSIST.org — official CA transfer articulation", url: "https://assist.org" },
    { label: "University of California — Transfer admission requirements", url: "https://admission.universityofcalifornia.edu/admission-requirements/transfer-requirements/" },
    { label: "Cal-GETC overview (California Community Colleges)", url: "https://www.cccco.edu" },
  ];

  return {
    readinessScore,
    readinessLabel,
    summary: `This is a SAMPLE transfer plan for ${state.target.major || "your major"} at ${state.target.university || "your target UC campus"}, generated from placeholder requirement data.`,
    completed,
    missing,
    recommended,
    schedule,
    warnings,
    sources,
  };
}
