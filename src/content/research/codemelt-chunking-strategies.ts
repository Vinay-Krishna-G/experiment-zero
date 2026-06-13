import { createResearchLog } from "../factories";

export const codemeltChunkingStrategies = createResearchLog({
  id: "codemelt-chunking-strategies",
  publishedAt: "2026-06-13",
  title: "Chunking Strategies for Large Codebases",
  category: "System Design Note",
  summary: "Balancing context preservation with retrieval efficiency in RAG pipelines.",
  content: `## Problem
In a Retrieval-Augmented Generation (RAG) pipeline for code, naive chunking (e.g., splitting by every 500 characters) frequently breaks functions in half or separates variable declarations from their usage. This destroys the semantic meaning of the code snippet, making the resulting vector embedding useless for retrieval.

## Decision
I implemented syntax-aware chunking strategies using LangChain. Instead of blind character counts, the ingestion pipeline respects function boundaries, class definitions, and module exports.

## Outcome
Retrieval accuracy improved significantly. When the LLM was provided with intact, complete functions rather than fragmented text blocks, its ability to explain the code and identify bugs increased dramatically.

## Lessons Learned
- In code-based RAG, chunking strategy is often more important than the choice of the underlying embedding model.
- Preserving structural boundaries is critical for maintaining semantic meaning in vector space.`,
  tags: ["RAG","LangChain","Vector Databases"],
  relatedExperimentId: "ai-codebase-analyzer",
  relatedBlueprintId: "ai-codebase-analyzer"
});
