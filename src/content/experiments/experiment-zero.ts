import { createExperiment } from "../factories";

export const experimentZero = createExperiment({
  id: "experiment-zero",
  publishedAt: "2026-06-12",
  title: "Experiment Zero",
  tagline: "The laboratory portfolio itself.",
  description:
    "This portfolio is itself an experiment — an attempt to build a personal brand that feels like entering a living laboratory. Built with Next.js, Framer Motion, and a design language inspired by inventor notebooks.",
  status: "In Progress",
  primaryCategory: "Developer Tool",
  tags: ["Portfolio"],
  complexity: 4,
  timeline: [
    { label: "Idea", status: "done" },
    { label: "Research", status: "done" },
    { label: "Building", status: "current" },
    { label: "Polish", status: "pending" },
    { label: "Launched", status: "pending" },
  ],
  stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  blueprintId: "experiment-zero",
});
