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
  evidence: {
    problem: "Losing AI prompts in chaotic chat logs caused developers to constantly reinvent effective phrasing, decreasing efficiency and team retention of prompt strategies.",
    constraints: [
      "Must load in under 200ms on first print.",
      "Must offer instant copy options without invoking heavy clipboard frameworks.",
      "Must persist state locally for offline execution support."
    ],
    alternatives: [
      {
        name: "Browser Extension",
        pros: ["Always present on active AI chat screens"],
        cons: ["Requires complex store publishing reviews", "Limited local data persistence access"]
      },
      {
        name: "Static Markdown Folder",
        pros: ["Simple local management"],
        cons: ["No search indices", "High friction for copying values"]
      }
    ],
    finalDecision: "Built a Next.js static productivity hub optimized with client-side clipboard copy bindings and fast fuzzy search indexing.",
    tradeoffs: [
      "Traded visual canvas density for instant text alignment and clean keyboard shortcuts accessibility."
    ],
    outcome: {
      description: "Successfully decoupled prompt creation from the clipboard extraction path, reducing retrieval friction to zero.",
      metrics: [
        "120ms first content paint load",
        "Clipboard copy retention raised by 45%",
        "Zero external database dependencies"
      ]
    },
    engineeringSignals: ["System Design", "Performance Optimization", "DX Improvements"]
  }
});
