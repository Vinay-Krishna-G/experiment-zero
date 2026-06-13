
import { createExperiment } from "../factories";

export const aiCodebaseAnalyzer = createExperiment({
  id: "codemelt",

  publishedAt: "2026-06-12",

  title: "CodeMelt",

  tagline:
    "An AI-powered developer intelligence platform for understanding, navigating, and analyzing codebases.",

  description:
    "CodeMelt helps developers understand unfamiliar codebases faster through AI-assisted repository analysis, architectural insights, code explanations, and contextual search. Instead of manually navigating hundreds of files, developers can explore repositories through a centralized workspace designed to surface meaningful relationships, implementation details, and architectural patterns.",

  status: "In Progress",

  primaryCategory: "Developer Tool",

  tags: [
    "AI",
    "Developer Tooling",
    "Code Analysis",
    "LLM",
    "Developer Experience"
  ],

  complexity: 5,

  timeline: [
    { label: "Research", status: "done" },
    { label: "Architecture", status: "done" },
    { label: "Prototype", status: "done" },
    { label: "Development", status: "current" },
    { label: "Launch", status: "pending" }
  ],

  stack: [
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "LangChain",
    "Pinecone",
    "OpenAI",
    "Tailwind CSS"
  ],

  blueprintId: "codemelt",
  github: "https://github.com",
  liveUrl: "https://codemelt.vercel.app",

  evidence: {
    problem:
      "Modern repositories often contain hundreds or thousands of files spread across multiple layers of architecture. Understanding business logic, system design, dependencies, and implementation details requires significant manual exploration. Large language models can assist, but repository size frequently exceeds available context windows.",

    constraints: [
      "Must support large repositories.",
      "Repository ingestion should remain scalable.",
      "Retrieved context must remain relevant to user queries.",
      "The system must avoid overwhelming the model with unnecessary files.",
      "Response quality should remain useful across multiple programming languages."
    ],

    alternatives: [
      {
        name: "Direct Repository Dumping",
        pros: [
          "Simple implementation",
          "No indexing pipeline required"
        ],
        cons: [
          "Exceeds LLM context limits",
          "Poor scalability",
          "High hallucination risk"
        ]
      },
      {
        name: "Manual Documentation Approach",
        pros: [
          "Human-curated explanations",
          "High accuracy"
        ],
        cons: [
          "Time consuming",
          "Difficult to maintain",
          "Does not scale across repositories"
        ]
      }
    ],

    finalDecision:
      "Implement a repository analysis pipeline that processes source code into structured chunks, enriches metadata, stores embeddings in a vector database, and retrieves only the most relevant context for AI-assisted reasoning.",

    tradeoffs: [
      "Accepted slower repository ingestion in exchange for faster and more relevant query responses.",
      "Introduced vector storage complexity to reduce context-window limitations.",
      "Invested additional engineering effort into metadata enrichment to improve retrieval quality."
    ],

    outcome: {
      description:
        "Built an evolving developer intelligence platform capable of helping engineers explore unfamiliar repositories, understand architecture decisions, and navigate complex codebases more efficiently.",

      metrics: [
        "Repository ingestion pipeline implemented",
        "Vector-based retrieval architecture",
        "Metadata-aware repository indexing",
        "Multi-language repository support",
        "AI-assisted code exploration workflow"
      ]
    },

    engineeringSignals: [
      "AI Engineering",
      "System Design",
      "Retrieval Augmented Generation",
      "Data Modeling",
      "Scalability Planning",
      "Developer Experience",
      "Platform Architecture"
    ]
  }
});

