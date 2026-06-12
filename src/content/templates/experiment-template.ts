import { type Experiment } from "@/types";

export const newExperimentTemplate: Experiment = {
  id: "00X",
  slug: "experiment-name",
  title: "Experiment Title",
  tagline: "Short descriptive tagline.",
  description: "A comprehensive description of the experiment, its goals, and context.",
  status: "Planned", // "Completed" | "In Progress" | "On Hold" | "Archived" | "Planned"
  category: "Unknown", // "Productivity" | "AI Tooling" | "Dev Tools" | "Portfolio" | "Design" | "Research" | "Unknown"
  year: "2026",
  complexity: 1, // 1-6
  stack: ["Technology 1", "Technology 2"],
  timeline: [
    { label: "Idea", status: "done" },
    { label: "Research", status: "current" },
    { label: "Prototype", status: "pending" },
  ],
  github: "https://github.com/yourusername/repo",
  demo: "https://demo-url.com",
  blueprintId: "bp-XXX",
  content: {
    problem: "What problem are you solving?",
    solution: "How are you solving it?",
    architecture: "Technical architecture overview.",
    challenges: "What were the hard parts?",
    results: "What was the outcome?",
  },
  bottle: {
    size: "medium", // "small" | "medium" | "large"
    glass: "clear", // "emerald" | "amber" | "copper" | "slate" | "clear"
    glow: "none", // "green" | "gold" | "blue" | "crimson" | "none"
    label: "EXP",
    fillLevel: 0.0, // 0.0 to 1.0
  },
  relatedIds: [], // IDs of related experiments
  ogImage: "/og-image.jpg"
};
