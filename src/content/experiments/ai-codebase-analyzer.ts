import { type Experiment } from "@/types";

export const aiCodebaseAnalyzer: Experiment = {
  id: "002",
  slug: "ai-codebase-analyzer",
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
  bottle: {
    size: "large",
    glass: "amber",
    glow: "gold",
    label: "Analyzer",
    fillLevel: 0.55,
  },
};
