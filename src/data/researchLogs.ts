// ─── Research Log Data ────────────────────────────────────────────────────────
// Single source of truth for the Research Log section (Phase 4A).
// To add a log entry: append one object to RESEARCH_LOGS. No component editing needed.

export type ResearchCategory =
  | "Observation"
  | "Discovery"
  | "Lesson Learned"
  | "Failed Experiment"
  | "System Design Note"
  | "Future Expedition";

export interface ResearchLog {
  id: string;
  title: string;
  date: string;
  category: ResearchCategory;
  /** One-sentence summary shown in list view */
  summary: string;
  /** Full content shown in expanded view — plain paragraphs separated by \n\n */
  content: string;
  /** Tags for categorization and quick scanning */
  tags: string[];
  /** Optional: links to related experiments or blueprints */
  relatedExperimentId?: string;
  relatedBlueprintId?: string;
}

export const RESEARCH_LOGS: ResearchLog[] = [
  {
    id: "rl-001",
    title: "Architecture clarity matters more than visual polish",
    date: "2026.04.12",
    category: "Lesson Learned",
    summary: "A beautiful shell will crack under the weight of real content if the foundation is brittle.",
    content: "In early iterations of Experiment Zero, I spent days tweaking glassmorphism effects and WebGL shaders before locking in the data model. The result was a beautiful shell that cracked under the weight of real content.\n\nI rebuilt the foundation, moving all state into generic flat files. Suddenly, adding new features became trivial. The UI naturally fell into place because it was reflecting a clean reality.\n\nVisuals draw the eye, but architecture sustains the project. If the foundation is brittle, no amount of CSS can save the user experience.",
    tags: ["architecture", "design", "portfolio"]
  },
  {
    id: "rl-002",
    title: "One-click copy metrics",
    date: "2025.11.08",
    category: "Discovery",
    summary: "Usage data reveals execution speed matters more than semantic discovery.",
    content: "PromptVault usage data is in.\n\n- Search usage: 12%\n- Copy button usage: 84%\n\nI assumed discovery was the bottleneck. It wasn't.\n\nExecution was.\n\nPeople don't want to browse. They want to paste.\n\nNote to self: Never optimize retrieval until friction at the point of execution is near zero.",
    tags: ["product", "user-experience", "prompt-engineering"],
    relatedExperimentId: "exp-002"
  },
  {
    id: "rl-003",
    title: "Large repositories require chunked indexing",
    date: "2026.01.22",
    category: "System Design Note",
    summary: "Attempting to index monolithic repositories requires a multi-pass chunked strategy to avoid context exhaustion.",
    content: "Attempting to index a monolithic 500k-line enterprise repository in one pass during the AI Codebase Analyzer project caused consistent out-of-memory errors and context window exhaustion.\n\nThe initial assumption was that we needed a larger context window model. The reality was that we needed a better ingestion strategy.\n\nI implemented a multi-pass chunked indexing system. We parsed the AST (Abstract Syntax Tree), extracted function boundaries, and indexed chunks with metadata pointers to their parent modules.\n\nThis not only solved the memory limits but dramatically improved the precision of the generated documentation. The model could now see the trees without losing the forest.",
    tags: ["rag", "performance", "code-analysis"],
    relatedBlueprintId: "bp-001"
  },
  {
    id: "rl-004",
    title: "Schema shift cascading failure",
    date: "2025.08.14",
    category: "Failed Experiment",
    summary: "Ad-hoc column additions created 1:many contradictions and broke auth.",
    content: "Migration failed again today.\n\n- Week 1: Assumed 1:1 relationship between Users and Workspaces.\n- Week 3: Feature request required multi-workspace support.\n\nAdded columns ad-hoc to patch it. Now the entire authentication flow is broken.\n\nThe 'build-the-plane-as-you-fly' approach doesn't work for databases. You can iterate on UI. You cannot iterate on gravity.\n\nNote to self: Next project, lock down the relational constraints on day zero. No code until the whiteboard schema survives worst-case interrogation.",
    tags: ["engineering", "schema", "lessons"]
  },
  {
    id: "rl-005",
    title: "The portfolio as a living archive",
    date: "2026.05.01",
    category: "Observation",
    summary: "A portfolio shouldn't be a cemetery for finished projects; it should be an active laboratory documenting the journey.",
    content: "Most portfolios are cemeteries for finished projects. They are polished once, deployed, and abandoned until the next job hunt.\n\nI realized that my best work isn't the finished product; it's the process. The failed prototypes, the architectural pivots, the late-night discoveries.\n\nExperiment Zero was built to treat the portfolio as a living laboratory. A place where unfinished thoughts and active experiments hold as much value as shipped code. By documenting the journey in a 'Research Log', I'm not just showing what I built—I'm showing how I think.",
    tags: ["career", "portfolio", "documentation"],
    relatedExperimentId: "exp-001"
  },
  {
    id: "rl-006",
    title: "Context API infinite loop trace",
    date: "2025.09.30",
    category: "Failed Experiment",
    summary: "Attempted to use raw React Context for a 6-step wizard. Resulted in untraceable state mutations.",
    content: "Spent 4 hours tracing a bug in the wizard flow.\n\n- Toggle state triggers Context update\n- Causes full tree re-render\n- Re-initializes child local state\n- Fires stale closure effect\n- Mutates Context again\n\nInfinite loop.\n\nThought I was being 'clean' by avoiding external state libraries. Instead, I built a bespoke, undocumented, broken version of Redux.\n\nHypothesis: 'Simple' tools (Context) applied to complex problems (global mutative state) actually generate the most technical debt.\n\nIs strict unidirectional data flow an absolute requirement here?",
    tags: ["react", "state-management", "architecture"]
  },
  {
    id: "rl-007",
    title: "GLB payload vs interaction latency",
    date: "2026.06.10",
    category: "Future Expedition",
    summary: "Can we load a 2MB 3D model without breaking the 60fps scroll feel?",
    content: "Current CSS bottle render time: ~4ms.\nTarget Three.js GLB payload: ~1.8MB.\n\nThe abstraction layer (BottleRenderer) is ready. But what happens to the interaction latency when the GLB mounts?\n\nStrategies to test:\n1. React Suspense boundaries around the Canvas\n2. Low-poly placeholder wireframes\n3. Web Worker for geometry parsing\n\nIf the 3D models drop frame rates during scroll, the tactile 'laboratory' feel is dead.\n\nQuestion: Should the 3D canvas only mount upon explicit user interaction (click), rather than rendering all 5 bottles simultaneously on load?",
    tags: ["3d", "threejs", "webgl"],
    relatedBlueprintId: "bp-003"
  },
  {
    id: "rl-008",
    title: "Monospace fonts for metadata indexing",
    date: "2026.03.18",
    category: "Discovery",
    summary: "Using typography to visually separate narrative content from technical metadata creates immediate hierarchy.",
    content: "While designing the Blueprint Archive, I struggled to differentiate the narrative content from the technical metadata (dates, IDs, statuses).\n\nThe breakthrough was typographic: assigning JetBrains Mono exclusively to technical metadata, and Playfair Display exclusively to narrative titles.\n\nThis created an immediate, visceral hierarchy. The eye naturally scans monospace text as 'data' and serif text as 'story'. It reinforced the 'recovered engineering document' aesthetic without relying on heavy borders or background colors.",
    tags: ["design", "typography", "ui"]
  },
  {
    id: "rl-009",
    title: "Folder hierarchy feature request",
    date: "2025.12.05",
    category: "Observation",
    summary: "Users asked for folders. I built tags instead. Awaiting metrics validation.",
    content: "Feature request log is flooded with: 'Add folders for snippets.'\n\nAnalyzed the usage patterns. People aren't having trouble *storing* snippets, they are having trouble *finding* them.\n\nFolders create mutually exclusive silos. A React snippet can't live in both 'Frontend' and 'API' folders without duplicating.\n\nI refused the folder request. Shipped a multi-select tag system instead.\n\nImmediate pushback on Discord.\n\nWe'll see if the retrieval time metrics validate the decision next week. If average time-to-copy doesn't drop by 20%, I was wrong.",
    tags: ["product", "feedback", "vision"]
  },
  {
    id: "rl-010",
    title: "Decoupling rendering from interaction state",
    date: "2026.04.28",
    category: "System Design Note",
    summary: "A strict boundary between the interactive container and presentation layer ensures smooth future refactors.",
    content: "Anticipating the transition to 3D rendering, I forced a strict separation between the 'Experiment Rack' (the interactive container) and the 'Bottle Renderer' (the presentation layer).\n\nThe Rack knows which bottle is clicked, which is hovered, and what data it holds. The Renderer only knows how to draw a bottle on screen.\n\nThis means that when I swap the CSS bottle for a Three.js GLB model, the complex selection logic and animations remain untouched. Good boundaries make future refactors boring.",
    tags: ["react", "patterns", "threejs"],
    relatedExperimentId: "exp-001"
  }
];

export function getResearchLogById(id: string): ResearchLog | undefined {
  return RESEARCH_LOGS.find((log) => log.id === id);
}

export function getResearchLogsByCategory(
  category: ResearchCategory
): ResearchLog[] {
  return RESEARCH_LOGS.filter((log) => log.category === category);
}
