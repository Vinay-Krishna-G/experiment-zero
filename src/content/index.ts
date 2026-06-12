import { promptvault } from "./experiments/promptvault";
import { aiCodebaseAnalyzer } from "./experiments/ai-codebase-analyzer";
import { experimentZero } from "./experiments/experiment-zero";
import { futureExperiment } from "./experiments/future-experiment";
import type { Experiment, RackSlot, BaseContent, Blueprint, ResearchLog } from "@/types";

export * from "@/types";

export const ALL_EXPERIMENTS: Experiment[] = [
  promptvault,
  aiCodebaseAnalyzer,
  experimentZero,
  futureExperiment,
];

import * as blueprintsObj from './blueprints';
import * as researchLogsObj from './research';
import * as fieldNotesObj from './notes';
import * as labStatusObj from './status';

export const ALL_BLUEPRINTS = Object.values(blueprintsObj) as Blueprint[];
export const ALL_RESEARCH_LOGS = Object.values(researchLogsObj) as ResearchLog[];
export const FIELD_NOTES = Object.values(fieldNotesObj);
export const LAB_STATUS = labStatusObj.labStatus;

// ─── SORTING AND FILTERING ───────────────────────────────────────────────────

function sortContent<T extends BaseContent>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.priority !== b.priority) return b.priority - a.priority;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

function getVisible<T extends BaseContent>(items: T[]): T[] {
  return sortContent(items.filter(item => item.visibility === "public"));
}

export function getAllExperiments(): Experiment[] {
  return getVisible(ALL_EXPERIMENTS);
}

export function getAllBlueprints() {
  return getVisible(ALL_BLUEPRINTS);
}

export function getAllResearchLogs() {
  return getVisible(ALL_RESEARCH_LOGS);
}

export function getExperimentById(id: string): Experiment | undefined {
  const exp = ALL_EXPERIMENTS.find((e) => e.id === id);
  return (process.env.NODE_ENV === "development" || exp?.visibility !== "draft") ? exp : undefined;
}

export function getExperimentBySlug(slug: string): Experiment | undefined {
  const exp = ALL_EXPERIMENTS.find((e) => e.slug === slug);
  return (process.env.NODE_ENV === "development" || exp?.visibility !== "draft") ? exp : undefined;
}

export function getBlueprintById(id: string) {
  const bp = ALL_BLUEPRINTS.find((b) => b.id === id);
  return (process.env.NODE_ENV === "development" || bp?.visibility !== "draft") ? bp : undefined;
}

export function getBlueprintBySlug(slug: string) {
  const bp = ALL_BLUEPRINTS.find((b) => b.slug === slug);
  return (process.env.NODE_ENV === "development" || bp?.visibility !== "draft") ? bp : undefined;
}

export function getResearchLogById(id: string) {
  const log = ALL_RESEARCH_LOGS.find((l) => l.id === id);
  return (process.env.NODE_ENV === "development" || log?.visibility !== "draft") ? log : undefined;
}

export function getResearchLogBySlug(slug: string) {
  const log = ALL_RESEARCH_LOGS.find((l) => l.slug === slug);
  return (process.env.NODE_ENV === "development" || log?.visibility !== "draft") ? log : undefined;
}

export function getBlueprintByProjectId(projectId: string) {
  const bp = ALL_BLUEPRINTS.find((b) => b.projectId === projectId);
  return (process.env.NODE_ENV === "development" || bp?.visibility !== "draft") ? bp : undefined;
}

// ─── Rack assignment (auto-sorting) ──────────────────────────────────────────

export function getRackSlot(exp: Experiment): RackSlot {
  if (exp.status === "Completed" || exp.archived) return "completed";
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
      (e) => e.status === "Completed" || e.archived
    ).length,
    active: experiments.filter((e) => e.status === "In Progress" || e.status === "Beta" || e.status === "Research").length,
    planned: experiments.filter((e) => e.status === "Planned").length,
    onHold: experiments.filter((e) => e.status === "On Hold").length,
  };
}

export function getAllFieldNotes() {
  return FIELD_NOTES;
}

export function getLabStatus() {
  return LAB_STATUS;
}

export function getResearchLogsByCategory(category: string) {
  return getVisible(ALL_RESEARCH_LOGS).filter((l) => l.category === category);
}

// Ensure legacy exports for compatibility during transition
export const EXPERIMENTS = getAllExperiments();
export const BLUEPRINTS = getAllBlueprints();
export const RESEARCH_LOGS = getAllResearchLogs();
