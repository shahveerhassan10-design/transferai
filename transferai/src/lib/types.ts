export type RequirementStatus = "met" | "in-progress" | "missing";

export interface CompletedCourse {
  id: string;
  courseCode: string;
  courseName: string;
  units: string;
  grade: string;
}

export interface StudentInfo {
  fullName: string;
  currentCollege: string;
  gpa: string;
  transferableUnits: string;
}

export interface TargetSelection {
  university: string;
  major: string;
  transferTerm: string;
}

export interface PlanState {
  student: StudentInfo;
  target: TargetSelection;
  courses: CompletedCourse[];
}

export interface RequirementItem {
  id: string;
  category: string;
  title: string;
  detail: string;
  status: RequirementStatus;
}

export interface RecommendedCourse {
  id: string;
  courseCode: string;
  courseName: string;
  reason: string;
  priority: "High" | "Medium" | "Low";
}

export interface SemesterPlanItem {
  term: string;
  courses: string[];
  focus: string;
}

export interface GeneratedPlan {
  readinessScore: number;
  readinessLabel: string;
  summary: string;
  completed: RequirementItem[];
  missing: RequirementItem[];
  recommended: RecommendedCourse[];
  schedule: SemesterPlanItem[];
  warnings: string[];
  sources: { label: string; url: string }[];
}
