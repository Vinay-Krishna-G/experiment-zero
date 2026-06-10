// ─── Research Log Data ────────────────────────────────────────────────────────
// Single source of truth for the Research Log section (Phase 4).
// To add a log entry: append one object to RESEARCH_LOGS. No component editing needed.
//
// content field supports plain text or markdown-style paragraphs.
// The Research Log UI will render whatever is in this file.

export type ResearchCategory =
  | "AI / ML"
  | "System Design"
  | "Product"
  | "Engineering"
  | "Design"
  | "Tools"
  | "Reflection";

export interface ResearchLog {
  id: string;
  title: string;
  date: string;
  category: ResearchCategory;
  /** One-sentence summary shown in list view */
  summary: string;
  /** Full content shown in expanded view — plain paragraphs separated by \n\n */
  content: string;
  /** Optional: links to related experiments or blueprints */
  relatedExperimentId?: string;
  relatedBlueprintId?: string;
}

export const RESEARCH_LOGS: ResearchLog[] = [
  {
    id: "rl-001",
    title: "Why RAG accuracy depends more on chunking than on the model",
    date: "June 2026",
    category: "AI / ML",
    summary:
      "The quality of retrieval-augmented generation is bottlenecked not by the language model, but by how documents are split into chunks.",
    content:
      "During the AI Codebase Analyzer experiment, I discovered that switching between GPT-4 and Claude 3 produced marginal quality differences — but changing chunk size from 1000 to 512 tokens with 50-token overlap improved retrieval accuracy significantly.\n\nThe reason: when chunks are too large, the relevant signal gets diluted by surrounding context. When too small, the chunk loses enough context to be useful on its own.\n\nThe sweet spot varies by document type. Code files benefit from function-level chunking. Documentation benefits from paragraph-level chunking. This is why a fixed chunk size strategy almost always underperforms a semantic chunking approach.\n\nLesson: before touching the model, optimize the index.",
    relatedExperimentId: "002",
    relatedBlueprintId: "bp-002",
  },
  {
    id: "rl-002",
    title: "The portfolio as a living document",
    date: "June 2026",
    category: "Design",
    summary:
      "A portfolio treated as a finished product becomes outdated instantly. A portfolio treated as a living archive grows more valuable over time.",
    content:
      "Most portfolios are designed once and then neglected. The moment a new project ships, the portfolio is already behind.\n\nThe architecture of Experiment Zero was designed specifically to solve this: data lives in flat files, components are pure renderers. Adding a new experiment means editing one object in experiments.ts.\n\nBut the real insight is philosophical. A portfolio shouldn't be finished — it should be continuously accurate. The laboratory metaphor earns its keep here: a laboratory is always running experiments, always accumulating field notes, always updating its status board.\n\nTreat the portfolio like you treat your best code: designed for maintainability, not just for presentation.",
    relatedExperimentId: "003",
    relatedBlueprintId: "bp-003",
  },
];

export function getResearchLogById(id: string): ResearchLog | undefined {
  return RESEARCH_LOGS.find((log) => log.id === id);
}

export function getResearchLogsByCategory(
  category: ResearchCategory
): ResearchLog[] {
  return RESEARCH_LOGS.filter((log) => log.category === category);
}
