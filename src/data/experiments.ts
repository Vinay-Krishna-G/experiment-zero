// ─── Experiment Data Model ────────────────────────────────────────────────────
//
// This file is the single source of truth for all experiments.
// Architecture is designed for Phase 6 replacement with Three.js GLB bottles:
//   - Presentation layer (ExperimentBottle.tsx) can be swapped to BottleGLB.tsx
//   - All business logic stays in ExperimentRack.tsx + ExperimentPreview.tsx
//   - Data never moves — only the renderer changes.

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

export interface Experiment {
  id: string;                        // "001", "002" …
  title: string;
  tagline: string;                   // One-sentence description for bottle label
  description: string;               // Full description for preview panel
  status: ExperimentStatus;
  category: ExperimentCategory;
  year: string;
  stack: string[];
  github?: string;
  demo?: string;
  /** Liquid fill level 0–1 — represents project completion */
  fillLevel: number;
  /** Liquid color token — maps to CSS variable */
  liquidColor: "emerald" | "amber" | "copper" | "slate";
}

// ─── Experiment Registry ──────────────────────────────────────────────────────

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
    stack: ["Next.js", "MongoDB", "TypeScript", "TailwindCSS"],
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
    stack: ["Python", "LangChain", "Next.js", "TypeScript", "Pinecone"],
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
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
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
    stack: [],
    fillLevel: 0.1,
    liquidColor: "slate",
  },
];

// ─── Utility helpers ──────────────────────────────────────────────────────────

export function getExperimentById(id: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.id === id);
}

export function getExperimentsByStatus(status: ExperimentStatus): Experiment[] {
  return EXPERIMENTS.filter((e) => e.status === status);
}
