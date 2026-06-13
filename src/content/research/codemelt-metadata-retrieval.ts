import { createResearchLog } from "../factories";

export const codemeltMetadataRetrieval = createResearchLog({
  id: "codemelt-metadata-retrieval",
  publishedAt: "2026-06-13",
  title: "Metadata Improves Retrieval More Than Bigger Models",
  category: "Discovery",
  summary: "Discovering the power of hybrid search in specialized AI applications.",
  content: `## Problem
Even with syntax-aware chunking, vector similarity search sometimes returned conceptually similar code from completely irrelevant parts of the repository (e.g., a logging utility from the frontend when asking about a backend database transaction).

## Decision
I enhanced the vector index with rich metadata payloads. Every chunk stored its file path, language, module designation, and component type. I then implemented hybrid search: pre-filtering by metadata before performing vector similarity scoring.

## Outcome
The precision of the retrieval pipeline skyrocketed. By forcing the search to respect architectural boundaries (e.g., 'only search within src/backend/database'), the system eliminated false positives entirely.

## Lessons Learned
- Throwing a larger, more expensive LLM at a problem rarely fixes underlying retrieval flaws.
- Metadata is the secret weapon of effective RAG pipelines, providing the deterministic boundaries that probabilistic vector search lacks.`,
  tags: ["Search","RAG","Metadata"],
  relatedExperimentId: "ai-codebase-analyzer",
  relatedBlueprintId: "ai-codebase-analyzer"
});
