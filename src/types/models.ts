import type { BottleConfig } from "./renderer";
import type { ContentSections, TimelineStage } from "./content";

export type ContentVisibility = "public" | "unlisted" | "draft";

export interface BaseContent {
  id: string;
  slug: string;
  visibility: ContentVisibility;
  archived: boolean;
  featured: boolean;
  priority: number;
  publishedAt: string;
  updatedAt: string;
  promptSource?: string;
  aiAssisted?: boolean;
}

export type PrimaryCategory =
  | "Developer Tool"
  | "Research"
  | "Infrastructure"
  | "AI"
  | "Frontend"
  | "Backend"
  | "Design"
  | "Productivity"
  | "Unknown";

export type ExperimentStatus =
  | "Completed"
  | "In Progress"
  | "Beta"
  | "Research"
  | "On Hold"
  | "Planned";

export type RackSlot = "active" | "completed" | "future";

export interface Experiment extends BaseContent {
  title: string;
  tagline: string;
  description: string;
  status: ExperimentStatus;
  primaryCategory: PrimaryCategory;
  progress: number;
  tags: string[];
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
  id?: string;
  text: string;
}

export interface Blueprint extends BaseContent {
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

export interface ResearchLog extends BaseContent {
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
  id?: string;
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
