import { createResearchLog } from "../factories";

export const largeRepositoriesRequireChunkedIndexing = createResearchLog({
  id: "large-repositories-require-chunked-indexing",
  publishedAt: "2026-06-12",
  "title": "Fixing LLM out-of-memory errors by chunking AST nodes",
  "date": "2026.01.22",
  "category": "System Design Note",
  "summary": "Attempting to index monolithic repositories requires a multi-pass chunked strategy to avoid context exhaustion.",
  "content": "Attempting to index a monolithic 500k-line enterprise repository in one pass caused consistent out-of-memory errors and context window exhaustion in the LLM.\n\nMy initial assumption was that we needed a larger context window model. The reality was that we needed a better ingestion strategy.\n\nI solved this by implementing a multi-pass chunked indexing system. I used a Python script to parse the AST (Abstract Syntax Tree), extract function boundaries, and index chunks with metadata pointers to their parent modules.\n\nThis not only solved the memory limits but dramatically improved the precision of the generated documentation. The model could now see individual functions clearly without being overwhelmed by the entire file.",
  "tags": [
    "rag",
    "performance",
    "code-analysis"
  ],
  "relatedBlueprintId": "ai-codebase-analyzer",
  "relatedExperimentId": "ai-codebase-analyzer",

});
