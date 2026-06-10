// ─── Blueprint Archive Data ───────────────────────────────────────────────────
// Single source of truth for Blueprint Archive.
// To add a blueprint: append one object. No component editing needed.

export type BlueprintStatus = "Verified" | "In Development";

export interface BlueprintStage {
  /** Stage name displayed as waypoint on the expedition map */
  name: string;
  /** Short annotation shown beside the waypoint */
  annotation: string;
}

export interface Discovery {
  id: string;
  text: string;
}

export interface Blueprint {
  id: string;
  /** Links to corresponding Experiment via Experiment.blueprintId */
  projectId: string;
  title: string;
  objective: string;
  technologies: string[];
  /** Ordered stages rendered as expedition route */
  stages: BlueprintStage[];
  discoveries: Discovery[];
  lessons: string[];
  status: BlueprintStatus;
}

// ─── Registry ─────────────────────────────────────────────────────────────────

export const BLUEPRINTS: Blueprint[] = [
  {
    id: "bp-001",
    projectId: "001",
    title: "PromptVault",
    objective:
      "Design a system that allows developers and creators to store, organize, and instantly retrieve AI prompts — eliminating the problem of losing high-value prompts inside chat history.",
    technologies: ["Next.js", "MongoDB", "TypeScript", "TailwindCSS", "NextAuth"],
    stages: [
      {
        name: "Problem Definition",
        annotation: "Identified prompt loss as a recurring frustration",
      },
      {
        name: "Data Modeling",
        annotation: "Designed prompt schema with tagging taxonomy",
      },
      {
        name: "API Design",
        annotation: "REST endpoints for CRUD + full-text search",
      },
      {
        name: "UI Architecture",
        annotation: "Tag-based filtering, keyboard-first navigation",
      },
      {
        name: "Authentication",
        annotation: "NextAuth with session-based user vaults",
      },
      {
        name: "Deployment",
        annotation: "Shipped to production on Vercel + MongoDB Atlas",
      },
    ],
    discoveries: [
      {
        id: "D1",
        text: "Tagging taxonomy matters more than search — users navigate by category, not keyword.",
      },
      {
        id: "D2",
        text: "One-click copy is the most-used feature. Friction here kills the product.",
      },
      {
        id: "D3",
        text: "MongoDB's full-text search was sufficient at this scale; no Elasticsearch needed.",
      },
    ],
    lessons: [
      "Build the core interaction first, then add organization features.",
      "Data model changes are expensive — design the schema carefully upfront.",
      "User authentication should be treated as infrastructure, not a feature.",
    ],
    status: "Verified",
  },
  {
    id: "bp-002",
    projectId: "002",
    title: "AI Codebase Analyzer",
    objective:
      "Build a tool that lets developers ask natural language questions about any codebase — without manually reading thousands of files. The system must stay accurate across large repositories.",
    technologies: ["Python", "LangChain", "Pinecone", "Next.js", "TypeScript", "FastAPI"],
    stages: [
      {
        name: "Repository Ingestion",
        annotation: "Clone or upload repository files",
      },
      {
        name: "File Parsing",
        annotation: "Extract meaningful code + comment content",
      },
      {
        name: "Chunking",
        annotation: "Split into context-window-safe segments",
      },
      {
        name: "Embedding",
        annotation: "Convert chunks to vector representations",
      },
      {
        name: "Index Storage",
        annotation: "Store vectors in Pinecone for retrieval",
      },
      {
        name: "Query Pipeline",
        annotation: "Retrieve relevant chunks, augment LLM prompt",
      },
      {
        name: "Answer Generation",
        annotation: "LLM synthesizes accurate, grounded response",
      },
    ],
    discoveries: [
      {
        id: "D1",
        text: "Large repositories require chunked indexing — full-file embedding exceeds context limits.",
      },
      {
        id: "D2",
        text: "Metadata (file path, function name) dramatically improves retrieval precision.",
      },
      {
        id: "D3",
        text: "RAG accuracy depends more on chunking strategy than on the LLM model chosen.",
      },
      {
        id: "D4",
        text: "Users ask architectural questions more than implementation questions.",
      },
    ],
    lessons: [
      "Retrieval quality is the bottleneck — optimize chunk size and metadata before tuning LLM.",
      "FastAPI was the right choice for the Python backend; Next.js handled the UI layer well.",
      "Build an evaluation harness early — otherwise you are guessing at quality.",
    ],
    status: "In Development",
  },
  {
    id: "bp-003",
    projectId: "003",
    title: "Experiment Zero",
    objective:
      "Design a portfolio that feels like entering a living laboratory — not a resume page. Every section should reinforce a narrative: an inventor documenting work in progress.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "CSS Custom Properties"],
    stages: [
      {
        name: "Design Language",
        annotation: "Warm paper, muted emerald, JetBrains Mono — inventor notebook",
      },
      {
        name: "Typography System",
        annotation: "Playfair Display editorial + Inter body + JetBrains Mono",
      },
      {
        name: "Component Architecture",
        annotation: "Data-driven components — content lives in data files",
      },
      {
        name: "Animation Layer",
        annotation: "Framer Motion — staggered reveals, parallax, sweep lines",
      },
      {
        name: "Experiment Rack",
        annotation: "CSS bottle system with BottleRenderer abstraction for Phase 6",
      },
      {
        name: "Blueprint Archive",
        annotation: "Expedition route maps replacing conventional diagrams",
      },
    ],
    discoveries: [
      {
        id: "D1",
        text: "A portfolio should feel like a place, not a page. The difference is whether the visitor explores or browses.",
      },
      {
        id: "D2",
        text: "Data-driven architecture eliminates the 'update the portfolio' tax — content lives in one file.",
      },
      {
        id: "D3",
        text: "CSS-only bottles are convincing enough for Phase 1 — premature Three.js would slow momentum.",
      },
    ],
    lessons: [
      "Establish a strong design language first — it makes every subsequent decision easier.",
      "Separate data from presentation from the beginning, even if it feels like over-engineering.",
      "Animated motion should feel earned, not decorative. Every animation should serve the narrative.",
    ],
    status: "In Development",
  },
  {
    id: "bp-004",
    projectId: "004",
    title: "Future Blueprint",
    objective:
      "The next experiment is still being conceived. The problem space is known; the solution approach is forming. Research and ideation are underway.",
    technologies: [],
    stages: [
      { name: "Problem Research", annotation: "Identifying the core friction" },
      { name: "Solution Mapping", annotation: "Exploring possible approaches" },
      { name: "Technology Selection", annotation: "Choosing the right tools" },
      { name: "Prototype", annotation: "First working version" },
      { name: "Iteration", annotation: "Refining based on feedback" },
      { name: "Deployment", annotation: "Releasing into the world" },
    ],
    discoveries: [
      { id: "D1", text: "Research in progress — discoveries being documented." },
    ],
    lessons: ["Lessons will be recorded as the experiment progresses."],
    status: "In Development",
  },
];

export function getBlueprintById(id: string): Blueprint | undefined {
  return BLUEPRINTS.find((b) => b.id === id);
}

export function getBlueprintByProjectId(projectId: string): Blueprint | undefined {
  return BLUEPRINTS.find((b) => b.projectId === projectId);
}
