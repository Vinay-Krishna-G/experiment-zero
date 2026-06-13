import {
  Experiment,
  Blueprint,
  ResearchLog,
  PrimaryCategory,
  ExperimentStatus,
  BaseContent
} from "@/types";
import { AppearancePreset, APPEARANCE_PRESETS } from "./bottles";

// ─── UTILS ───────────────────────────────────────────────────────────────────

function deriveAppearance(category: PrimaryCategory, status: ExperimentStatus, archived: boolean): AppearancePreset {
  if (archived) return "amber-archive";
  if (status === "Research") return "obsidian-research";
  
  switch (category) {
    case "Portfolio": return "violet-ai";
    case "Education": return "slate-infrastructure";
    case "Research": return "obsidian-research";
    case "Developer Tool": return "emerald-core";
    case "Productivity": return "crystal-prototype";
    default: return "crystal-prototype";
  }
}

function deriveProgress(status: ExperimentStatus, explicitProgress?: number): number {
  if (explicitProgress !== undefined) return explicitProgress;
  if (status === "Completed") return 100;
  if (status === "Planned") return 0;
  return 0; // Default to 0 if not provided
}

// ─── AUTHORING INTERFACES ────────────────────────────────────────────────────

type BaseAuthoring = Omit<BaseContent, "slug" | "visibility" | "archived" | "featured" | "priority" | "updatedAt"> & {
  visibility?: BaseContent["visibility"];
  archived?: boolean;
  featured?: boolean;
  priority?: number;
  updatedAt?: string;
};

export type ExperimentAuthoring = Omit<Experiment, keyof BaseContent | "bottle" | "slug" | "progress" | "year"> & BaseAuthoring & {
  progress?: number;
};

export type BlueprintAuthoring = Omit<Blueprint, keyof BaseContent | "slug"> & BaseAuthoring;

export type ResearchLogAuthoring = Omit<ResearchLog, keyof BaseContent | "slug"> & BaseAuthoring;

// ─── FACTORIES ────────────────────────────────────────────────────────────────

export function createExperiment(config: ExperimentAuthoring): Experiment {
  const progress = deriveProgress(config.status, config.progress);
  const archived = config.archived ?? false;
  const appearanceName = deriveAppearance(config.primaryCategory, config.status, archived);
  const appearance = APPEARANCE_PRESETS[appearanceName];

  return {
    ...config,
    slug: config.id,
    visibility: config.visibility ?? "public",
    archived,
    featured: config.featured ?? false,
    priority: config.priority ?? 0,
    updatedAt: config.updatedAt ?? config.publishedAt,
    progress,
    year: config.publishedAt.split("-")[0],
    bottle: {
      ...appearance,
      label: config.id.substring(0, 3).toUpperCase(),
      fillLevel: progress / 100
    }
  };
}

export function createBlueprint(config: BlueprintAuthoring): Blueprint {
  return {
    ...config,
    slug: config.id,
    visibility: config.visibility ?? "public",
    archived: config.archived ?? false,
    featured: config.featured ?? false,
    priority: config.priority ?? 0,
    updatedAt: config.updatedAt ?? config.publishedAt,
  };
}

export function createResearchLog(config: ResearchLogAuthoring): ResearchLog {
  return {
    ...config,
    slug: config.id,
    visibility: config.visibility ?? "public",
    archived: config.archived ?? false,
    featured: config.featured ?? false,
    priority: config.priority ?? 0,
    updatedAt: config.updatedAt ?? config.publishedAt,
  };
}
