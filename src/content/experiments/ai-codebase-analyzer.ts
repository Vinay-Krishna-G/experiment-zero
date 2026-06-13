import { createExperiment } from "../factories";

export const aiCodebaseAnalyzer = createExperiment({
  id: "ai-codebase-analyzer",
  publishedAt: "2026-06-12",
  title: "AI Codebase Search: Context-Safe Ingestion RAG",
  tagline: "Understand any codebase without reading every file.",
  description:
    "Case study on codebase search systems. LangChain vectors indexing, metadata filters, and Pinecone queries.",
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
  evidence: {
    problem: "Parsing raw directory trees and passing raw file dumps into LLMs exceeded context limits, leading to hallucinated explanations of repository architecture.",
    constraints: [
      "Must answer user query under 5 seconds.",
      "Pinecone index retrieval must reliably surface architecture context.",
      "Must support large multi-lingual files."
    ],
    alternatives: [
      {
        name: "Direct File Dumping",
        pros: ["Simple and fast to implement with minimal library overhead"],
        cons: ["Instantly exceeds LLM context windows on medium-sized repositories"]
      },
      {
        name: "MapReduce File Summarization",
        pros: ["Produces high-level architectural summaries well"],
        cons: ["Loses granular low-level implementation details and syntax context"]
      }
    ],
    finalDecision: "Implemented vector chunking with LangChain splitters augmented by metadata (file paths, signature models) stored in Pinecone.",
    tradeoffs: [
      "Traded initial chunk indexing speeds (+30s ingestion) in exchange for 3x faster runtime responses and zero model crashes."
    ],
    outcome: {
      description: "Moved heavy file indexing to a background Python job to keep the Next.js UI responsive.",
      metrics: [
        "Ingestion latency under 30s",
        "LLM retrieval context payload size limited to 4k tokens",
        "Query response time < 3.5s"
      ]
    },
    engineeringSignals: ["System Design", "Data Modeling", "Scalability Planning"]
  }
});
