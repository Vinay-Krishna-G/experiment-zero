import { createBlueprint } from "../factories";

export const aiCodebaseAnalyzer = createBlueprint({
  id: "ai-codebase-analyzer",
  publishedAt: "2026-06-12",
  projectId: "002",
  title: "FastAPI Next.js RAG Vector Pipeline Blueprint",
  objective: "FastAPI and Next.js RAG indexing pipeline architecture. Context-safe segmentation, Pinecone retrieval pods.",
  technologies: [
    "Python",
    "LangChain",
    "Pinecone",
    "Next.js",
    "TypeScript",
    "FastAPI"
  ],
  stages: [
    {
      name: "Repository Arrival",
      annotation: "Clone or upload repository files"
    },
    {
      name: "Source Excavation",
      annotation: "Extract meaningful code + comment content"
    },
    {
      name: "Knowledge Extraction",
      annotation: "Split into context-window-safe segments"
    },
    {
      name: "Memory Construction",
      annotation: "Convert chunks to vector representations"
    },
    {
      name: "Retrieval Expedition",
      annotation: "Store vectors in Pinecone for retrieval"
    },
    {
      name: "Insight Delivery",
      annotation: "Retrieve relevant chunks, augment LLM prompt"
    }
  ],
  discoveries: [
    {
      text: "Large repositories require chunked indexing — full-file embedding exceeds context limits."
    },
    {
      text: "Metadata (file path, function name) dramatically improves retrieval precision."
    },
    {
      text: "RAG accuracy depends more on chunking strategy than on the LLM model chosen."
    },
    {
      text: "Users ask architectural questions more than implementation questions."
    }
  ],
  lessons: [
    "Optimizing how the code is split into chunks mattered far more than which LLM I used.",
    "Decoupling the Python backend (FastAPI) from the frontend (Next.js) made scaling the system much easier.",
    "Building a simple script to test retrieval accuracy saved hours of manual testing."
  ],
  status: "In Development",
  evidence: {
    problem: "FastAPI serves as a high-performance Python ASGI API layer wrapping vector pipelines (LangChain), while Next.js coordinates interactive React client views.",
    constraints: [
      "Must serialize data fast between Node.js frontend and Python backend.",
      "Python processes must not block standard web server request threads.",
      "Must prevent Pinecone index context exhaustion by splitting files into deterministic 1000-character segments."
    ],
    alternatives: [
      {
        name: "Express.js Python Shell Execution",
        pros: ["Saves separate server hosting costs and network hops by running in a single node process"],
        cons: ["Extremely high thread blocking overhead", "Slow data serialization times"]
      }
    ],
    finalDecision: "Deploy a standalone FastAPI Python ASGI microservice alongside a Next.js App Router client, with Pinecone queries scaling horizontally.",
    tradeoffs: [
      "Slightly higher deployment complexity with multi-service pipelines in exchange for isolated compute runtimes."
    ],
    outcome: {
      description: "FastAPI serves as a decoupled high-performance Python ASGI layer with ingestion scaling via Celery task queues.",
      metrics: [
        "FastAPI response times under 120ms",
        "Eliminated Node.js CPU thread blocking entirely",
        "Deterministic 1000-character chunking segments"
      ]
    },
    engineeringSignals: ["API Design", "Distributed Systems Thinking", "Scalability Planning"]
  }
});
