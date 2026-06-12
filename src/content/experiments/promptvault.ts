import { createExperiment } from "../factories";

export const promptvault = createExperiment({
  id: "promptvault",
  publishedAt: "2026-06-12",
  title: "PromptVault",
  tagline: "A curated library for your best prompts.",
  description:
    "A productivity tool for storing, organizing, and quickly retrieving AI prompts. Built to solve the problem of losing great prompts in chat history. Features tagging, search, and one-click copy.",
  status: "Completed",
  primaryCategory: "Developer Tool",
  tags: ["Productivity"],
  complexity: 3,
  timeline: [
    { label: "Idea", status: "done" },
    { label: "Research", status: "done" },
    { label: "Prototype", status: "done" },
    { label: "Deployment", status: "done" },
    { label: "Shipped", status: "done" },
  ],
  stack: ["Next.js", "MongoDB", "TypeScript", "TailwindCSS"],
  blueprintId: "promptvault",
});
