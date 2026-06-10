// ─── Experiment Data Model ────────────────────────────────────────────────────
// Single source of truth for all experiments.
// To add an experiment: append one object. No component editing needed.
// Phase 6: BottleRenderer.tsx swaps CSS → Three.js GLB. This file never changes.

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

export interface TimelineStage {
  label: string;
  status: "done" | "current" | "pending";
}

export interface Experiment {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ExperimentStatus;
  category: ExperimentCategory;
  year: string;
  /** 1–6 complexity rating */
  complexity: number;
  timeline: TimelineStage[];
  stack: string[];
  github?: string;
  demo?: string;
  /** Link to corresponding Blueprint document */
  blueprintId?: string;
  /** Liquid fill level 0–1 — represents project completion */
  fillLevel: number;
  /** Liquid color — maps to CSS token in ExperimentBottle */
  liquidColor: "emerald" | "amber" | "copper" | "slate";
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

// ─── Registry ─────────────────────────────────────────────────────────────────

export const EXPERIMENTS: Experiment[] = [
  {
    id: "001",
    title: "PromptVault",
    tagline: "A curated library for your best prompts.",
    description:
      "A productivity tool for storing, organizing, and quickly retrieving AI prompts. Built to solve the problem of losing great prompts in chat history. Features tagging, search, and one-click copy.",
    status: "Completed",
    category: "Productivity",
    year: "2026",
    complexity: 3,
    timeline: [
      { label: "Idea", status: "done" },
      { label: "Research", status: "done" },
      { label: "Prototype", status: "done" },
      { label: "Deployment", status: "done" },
      { label: "Shipped", status: "done" },
    ],
    stack: ["Next.js", "MongoDB", "TypeScript", "TailwindCSS"],
    blueprintId: "bp-001",
    fillLevel: 0.9,
    liquidColor: "emerald",
  },
  {
    id: "002",
    title: "AI Codebase Analyzer",
    tagline: "Understand any codebase without reading every file.",
    description:
      "An AI-powered tool that indexes a codebase and answers natural language questions about its architecture, dependencies, and patterns. Uses RAG (Retrieval-Augmented Generation) to stay accurate on large repos.",
    status: "In Progress",
    category: "AI Tooling",
    year: "2026",
    complexity: 5,
    timeline: [
      { label: "Idea", status: "done" },
      { label: "Research", status: "done" },
      { label: "Prototype", status: "current" },
      { label: "Deployment", status: "pending" },
      { label: "Shipped", status: "pending" },
    ],
    stack: ["Python", "LangChain", "Next.js", "TypeScript", "Pinecone"],
    blueprintId: "bp-002",
    fillLevel: 0.55,
    liquidColor: "amber",
  },
  {
    id: "003",
    title: "Experiment Zero",
    tagline: "The laboratory portfolio itself.",
    description:
      "This portfolio is itself an experiment — an attempt to build a personal brand that feels like entering a living laboratory. Built with Next.js, Framer Motion, and a design language inspired by inventor notebooks.",
    status: "In Progress",
    category: "Portfolio",
    year: "2026",
    complexity: 4,
    timeline: [
      { label: "Idea", status: "done" },
      { label: "Research", status: "done" },
      { label: "Building", status: "current" },
      { label: "Polish", status: "pending" },
      { label: "Launched", status: "pending" },
    ],
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    blueprintId: "bp-003",
    fillLevel: 0.4,
    liquidColor: "copper",
  },
  {
    id: "004",
    title: "Future Experiment",
    tagline: "The next invention is taking shape.",
    description:
      "Every great laboratory has a bench reserved for the next experiment. This shelf is being prepared. The idea is forming. The ingredients are being gathered.",
    status: "Planned",
    category: "Unknown",
    year: "2026",
    complexity: 1,
    timeline: [
      { label: "Idea", status: "pending" },
      { label: "Research", status: "pending" },
      { label: "Prototype", status: "pending" },
      { label: "Deployment", status: "pending" },
      { label: "Shipped", status: "pending" },
    ],
    stack: [],
    fillLevel: 0.1,
    liquidColor: "slate",
  },
];

export function getExperimentById(id: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.id === id);
}
