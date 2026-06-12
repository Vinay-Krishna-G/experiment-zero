import { createExperiment } from "../factories";

export const aiCodebaseAnalyzer = createExperiment({
  id: "ai-codebase-analyzer",
  publishedAt: "2026-06-12",
  title: "AI Codebase Analyzer",
  tagline: "Understand any codebase without reading every file.",
  description:
    "An AI-powered tool that indexes a codebase and answers natural language questions about its architecture, dependencies, and patterns. Uses RAG (Retrieval-Augmented Generation) to stay accurate on large repos.",
  status: "In Progress",
  primaryCategory: "Developer Tool",
  tags: ["AI Tooling"],
  complexity: 5,
  timeline: [
    { label: "Idea", status: "done" },
    { label: "Research", status: "done" },
    { label: "Prototype", status: "current" },
    { label: "Deployment", status: "pending" },
    { label: "Shipped", status: "pending" },
  ],
  stack: ["Python", "LangChain", "Next.js", "TypeScript", "Pinecone"],
  blueprintId: "ai-codebase-analyzer",
});
