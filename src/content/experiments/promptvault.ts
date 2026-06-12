import { type Experiment } from "@/types";

export const promptvault: Experiment = {
  id: "001",
  slug: "promptvault",
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
  bottle: {
    size: "medium",
    glass: "emerald",
    glow: "green",
    label: "PromptVault",
    fillLevel: 0.9,
  },
};
