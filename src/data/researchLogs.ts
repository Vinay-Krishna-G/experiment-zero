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
    title: "One-click copy became the most-used feature",
    date: "2025.11.08",
    category: "Discovery",
    summary: "The most complex engineering backend is only valuable if it perfectly serves the simplest possible frontend interaction.",
    content: "When building PromptVault, I assumed the semantic search engine would be the star feature. I spent weeks refining embeddings and ranking algorithms.\n\nYet, analytics and user feedback pointed to something much simpler: the raw utility of the 'Copy to Clipboard' button on every snippet.\n\nUsers weren't coming to browse; they were coming to execute. They wanted to find a prompt, copy it, and paste it into an LLM interface with zero friction.\n\nIt shifted my entire product philosophy. The complex engineering backend is only valuable if it perfectly serves the simplest possible frontend interaction.",
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
    title: "Data models should be stabilized early",
    date: "2025.08.14",
    category: "Failed Experiment",
    summary: "Building features before stabilizing the data model leads to cascading migration failures.",
    content: "During the first month of development on an early prototype, I adopted an agile 'build-the-plane-as-you-fly' approach to the database schema. I added columns as features required them.\n\nThis led to a cascading failure of migrations. Features built on week one broke during week three because the underlying assumptions about data relationships had shifted from 1:1 to 1:many.\n\nI scrapped the database and spent two days whiteboarding the absolute worst-case complexity the system would need to handle. Stabilizing the data model early isn't waterfall planning; it's establishing the laws of physics for your application.",
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
    title: "The cost of uncontrolled state",
    date: "2025.09.30",
    category: "Failed Experiment",
    summary: "Avoiding state management libraries to 'keep it simple' often creates infinitely more complex component trees.",
    content: "I once tried to build a complex multi-step wizard using only React Context and local state, avoiding external state management libraries to 'keep it simple'.\n\nIt didn't stay simple. The component tree became a tangled web of prop drilling, infinite render loops, and stale closures. Debugging a simple toggle took hours because the state mutation could have originated from anywhere.\n\nI learned the hard way that 'simple' tools don't always scale to complex problems. Adopting a strict unidirectional data flow is a necessity, not an optimization, for complex UI state.",
    tags: ["react", "state-management", "architecture"]
  },
  {
    id: "rl-007",
    title: "Building the Ship in a Bottle",
    date: "2026.06.10",
    category: "Future Expedition",
    summary: "Planning the architectural transition from CSS representations to 3D WebGL models.",
    content: "The current iteration of the Experiment Rack uses CSS to render the bottles. It's performant and clean, but lacks depth.\n\nThe next major milestone is to replace these CSS representations with actual 3D WebGL models using Three.js and React Three Fiber.\n\nThe architectural challenge will be maintaining the snappy, instant-load feel of the site while loading heavy GLB assets. I plan to use asynchronous loading, suspense boundaries, and low-poly placeholders. The renderer abstraction layer is already in place; now we just need to build the ship.",
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
    title: "Listening to users vs intuition",
    date: "2025.12.05",
    category: "Observation",
    summary: "Users request specific implementations, but you must build solutions to their underlying problems.",
    content: "A recurring challenge in product development is balancing user feedback against your own vision.\n\nUsers requested a complex folder-hierarchy system for organizing snippets in PromptVault. My intuition said that tags and powerful search would be faster and more scalable.\n\nI shipped the tag/search system. Initially, there was pushback. A month later, those same users admitted they were retrieving snippets twice as fast as they would have with folders.\n\nListen to users to understand their problems. Trust your intuition and engineering experience to design the solution.",
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
