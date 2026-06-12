import { type Experiment } from "@/types";

export const experimentZero: Experiment = {
  id: "003",
  slug: "experiment-zero",
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
  bottle: {
    size: "medium",
    glass: "copper",
    glow: "none",
    label: "Exp Zero",
    fillLevel: 0.4,
  },
};
