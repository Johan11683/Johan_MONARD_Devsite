import type { ProcessContent } from "./process.types";
import { PROCESS_DEFAULT } from "./process.default";

type ProcessPartial = Partial<ProcessContent>;

function safeString(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v : fallback;
}

function normalizeLocaleText(
  incoming: unknown,
  fallback: { fr: string; en: string }
): { fr: string; en: string } {
  const obj = incoming && typeof incoming === "object" ? (incoming as Record<string, unknown>) : {};
  return {
    fr: safeString(obj.fr, fallback.fr),
    en: safeString(obj.en, fallback.en),
  };
}

function normalizeSteps(incoming: unknown): ProcessContent["steps"] {
  const base = PROCESS_DEFAULT.steps;

  const arr = Array.isArray(incoming) ? incoming : [];

  return base.map((baseStep, i) => {
    const step = (arr[i] && typeof arr[i] === "object") ? (arr[i] as Record<string, unknown>) : {};

    return {
      title: normalizeLocaleText(step.title, baseStep.title),
      text: normalizeLocaleText(step.text, baseStep.text),
    };
  });
}

export function normalizeProcessContent(data: ProcessPartial | null): ProcessContent {
  return {
    kicker: normalizeLocaleText(data?.kicker, PROCESS_DEFAULT.kicker),
    title: normalizeLocaleText(data?.title, PROCESS_DEFAULT.title),
    subtitle: normalizeLocaleText(data?.subtitle, PROCESS_DEFAULT.subtitle),
    steps: normalizeSteps(data?.steps),
  };
}
