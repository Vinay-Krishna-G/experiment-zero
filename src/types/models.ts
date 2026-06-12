import type { BottleConfig } from "./renderer";
import type { ContentSections, TimelineStage } from "./content";

export type ExperimentStatus =
  | "Completed"
  | "In Progress"
  | "On Hold"
  | "Archived"
  | "Planned";

export type ExperimentCategory =
  | "Productivity"
  | "AI Tooling"
  | "Dev Tools"
  | "Portfolio"
  | "Design"
  | "Research"
  | "Unknown";

export type RackSlot = "active" | "completed" | "future";

export interface Experiment {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ExperimentStatus;
  category: ExperimentCategory;
  year: string;
  complexity: number;
  timeline: TimelineStage[];
  stack: string[];
  github?: string;
  demo?: string;
  blueprintId?: string;
  content?: ContentSections;
  relatedIds?: string[];
  ogImage?: string;
  bottle: BottleConfig;
}

// ─── Blueprint Types ──────────────────────────────────────────────────────────

export type BlueprintStatus = "Verified" | "In Development";

export interface BlueprintStage {
  name: string;
  annotation: string;
}

export interface Discovery {
  id: string;
  text: string;
}

export interface Blueprint {
  id: string;
  slug: string; // Added to match Experiment architecture
  projectId: string;
  title: string;
  objective: string;
  technologies: string[];
  stages: BlueprintStage[];
  discoveries: Discovery[];
  lessons: string[];
  status: BlueprintStatus;
}

// ─── Research Types ───────────────────────────────────────────────────────────

export type ResearchCategory =
  | "Observation"
  | "Discovery"
  | "Lesson Learned"
  | "Failed Experiment"
  | "System Design Note"
  | "Future Expedition";

export interface ResearchLog {
  id: string;
  slug: string; // Added to match Experiment architecture
  title: string;
  date: string;
  category: ResearchCategory;
  summary: string;
  content: string;
  tags: string[];
  relatedExperimentId?: string;
  relatedBlueprintId?: string;
}

// ─── Field Note Types ─────────────────────────────────────────────────────────

export interface FieldNote {
  id: string;
  date: string;
  tag: string;
  note: string;
}

// ─── Lab Status Types ─────────────────────────────────────────────────────────

export interface LabStatusData {
  invention: string;
  inventionNote: string;
  destination: string;
  destinationNote: string;
  studies: string[];
  currentStatus: string[];
  updatedAt: string;
}
