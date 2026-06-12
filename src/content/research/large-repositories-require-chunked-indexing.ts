import { createResearchLog } from "../factories";

export const largeRepositoriesRequireChunkedIndexing = createResearchLog({
  id: "large-repositories-require-chunked-indexing",
  publishedAt: "2026-06-12",
  "title": "Large repositories require chunked indexing",
  "date": "2026.01.22",
  "category": "System Design Note",
  "summary": "Attempting to index monolithic repositories requires a multi-pass chunked strategy to avoid context exhaustion.",
  "content": "Attempting to index a monolithic 500k-line enterprise repository in one pass during the AI Codebase Analyzer project caused consistent out-of-memory errors and context window exhaustion.\n\nThe initial assumption was that we needed a larger context window model. The reality was that we needed a better ingestion strategy.\n\nI implemented a multi-pass chunked indexing system. We parsed the AST (Abstract Syntax Tree), extracted function boundaries, and indexed chunks with metadata pointers to their parent modules.\n\nThis not only solved the memory limits but dramatically improved the precision of the generated documentation. The model could now see the trees without losing the forest.",
  "tags": [
    "rag",
    "performance",
    "code-analysis"
  ],
  "relatedBlueprintId": "ai-codebase-analyzer",
  "relatedExperimentId": "ai-codebase-analyzer",

});
