"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CompletedCourse, PlanState, StudentInfo, TargetSelection } from "./types";
import { emptyStudentInfo, emptyTargetSelection, newCourseRow } from "./sample-data";

const STORAGE_KEY = "transferai.plan.v1";

interface PlanContextValue {
  state: PlanState;
  hydrated: boolean;
  setStudent: (student: StudentInfo) => void;
  setTarget: (target: TargetSelection) => void;
  setCourses: (courses: CompletedCourse[]) => void;
  addCourseRow: () => void;
  updateCourseRow: (id: string, patch: Partial<CompletedCourse>) => void;
  removeCourseRow: (id: string) => void;
  resetPlan: () => void;
}

function emptyPlanState(): PlanState {
  return {
    student: emptyStudentInfo(),
    target: emptyTargetSelection(),
    courses: [],
  };
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlanState>(emptyPlanState());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PlanState;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from an external store (localStorage) on mount
        setState({
          student: { ...emptyStudentInfo(), ...parsed.student },
          target: { ...emptyTargetSelection(), ...parsed.target },
          courses: Array.isArray(parsed.courses) ? parsed.courses : [],
        });
      }
    } catch {
      // ignore malformed local storage data
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const value = useMemo<PlanContextValue>(
    () => ({
      state,
      hydrated,
      setStudent: (student) => setState((s) => ({ ...s, student })),
      setTarget: (target) => setState((s) => ({ ...s, target })),
      setCourses: (courses) => setState((s) => ({ ...s, courses })),
      addCourseRow: () =>
        setState((s) => ({ ...s, courses: [...s.courses, newCourseRow()] })),
      updateCourseRow: (id, patch) =>
        setState((s) => ({
          ...s,
          courses: s.courses.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      removeCourseRow: (id) =>
        setState((s) => ({ ...s, courses: s.courses.filter((c) => c.id !== id) })),
      resetPlan: () => {
        setState(emptyPlanState());
        window.localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [state, hydrated]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
