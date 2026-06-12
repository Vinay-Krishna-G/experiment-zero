import { promptvault } from "./experiments/promptvault";
import { aiCodebaseAnalyzer } from "./experiments/ai-codebase-analyzer";
import { experimentZero } from "./experiments/experiment-zero";
import { futureExperiment } from "./experiments/future-experiment";
import type { Experiment, RackSlot } from "@/types";

export * from "@/types";

export const EXPERIMENTS: Experiment[] = [
  promptvault,
  aiCodebaseAnalyzer,
  experimentZero,
  futureExperiment,
];

export function getExperimentById(id: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.id === id);
}

export function getExperimentBySlug(slug: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.slug === slug);
}

// ─── Rack assignment (auto-sorting) ──────────────────────────────────────────

export function getRackSlot(exp: Experiment): RackSlot {
  if (exp.status === "Completed" || exp.status === "Archived") return "completed";
  if (exp.status === "Planned" || exp.status === "On Hold") return "future";
  return "active";
}

export function groupByRack(
  experiments: Experiment[]
): Record<RackSlot, Experiment[]> {
  return experiments.reduce(
    (acc, exp) => {
      acc[getRackSlot(exp)].push(exp);
      return acc;
    },
    { active: [], completed: [], future: [] } as Record<RackSlot, Experiment[]>
  );
}

export function getInventoryCounts(experiments: Experiment[]) {
  return {
    completed: experiments.filter(
      (e) => e.status === "Completed" || e.status === "Archived"
    ).length,
    active: experiments.filter((e) => e.status === "In Progress").length,
    planned: experiments.filter((e) => e.status === "Planned").length,
    onHold: experiments.filter((e) => e.status === "On Hold").length,
  };
}


import * as blueprintsObj from './blueprints';
import * as researchLogsObj from './research';
import * as fieldNotesObj from './notes';
import * as labStatusObj from './status';

export const BLUEPRINTS = Object.values(blueprintsObj);
export const RESEARCH_LOGS = Object.values(researchLogsObj);
export const FIELD_NOTES = Object.values(fieldNotesObj);
export const LAB_STATUS = labStatusObj.labStatus;

export function getBlueprintById(id: string) {
  return BLUEPRINTS.find((b) => b.id === id);
}

export function getBlueprintBySlug(slug: string) {
  return BLUEPRINTS.find((b) => b.slug === slug);
}

export function getAllBlueprints() {
  return BLUEPRINTS;
}

export function getResearchLogById(id: string) {
  return RESEARCH_LOGS.find((l) => l.id === id);
}

export function getResearchLogBySlug(slug: string) {
  return RESEARCH_LOGS.find((l) => l.slug === slug);
}

export function getAllResearchLogs() {
  return RESEARCH_LOGS;
}

export function getAllFieldNotes() {
  return FIELD_NOTES;
}

export function getLabStatus() {
  return LAB_STATUS;
}

export function getResearchLogsByCategory(category: string) {
  return RESEARCH_LOGS.filter((l) => l.category === category);
}

export function getBlueprintByProjectId(projectId: string) {
  return BLUEPRINTS.find((b) => b.projectId === projectId);
}
