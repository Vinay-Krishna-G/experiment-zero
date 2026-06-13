import { createResearchLog } from "../factories";

export const codemeltRepositoryUnderstanding = createResearchLog({
  id: "codemelt-repository-understanding",
  publishedAt: "2026-06-13",
  title: "Why Repository Understanding Is Difficult",
  category: "Observation",
  summary: "Analyzing the cognitive load required to navigate unfamiliar codebases.",
  content: `## Problem
When joining a new project, developers spend days tracing imports, reading outdated documentation, and trying to build a mental model of the system architecture. Passing an entire repository into a Large Language Model (LLM) is impossible due to context window limitations, and simple keyword search fails to capture architectural intent.

## Decision
CodeMelt was built on the premise that repository understanding requires semantic search combined with architectural awareness, not just string matching. The system needed to map relationships, not just index text.

## Outcome
By treating the repository as a graph of knowledge rather than a collection of text files, CodeMelt surfaces relevant context much more effectively, drastically reducing onboarding time.

## Lessons Learned
- Code is highly contextual; a function's meaning depends on its callers and its placement within the broader architecture.
- Developer tools succeed when they reduce the cognitive load of exploration, rather than simply generating more text to read.`,
  tags: ["Developer Experience","AI","RAG"],
  relatedExperimentId: "ai-codebase-analyzer",
  relatedBlueprintId: "ai-codebase-analyzer"
});
