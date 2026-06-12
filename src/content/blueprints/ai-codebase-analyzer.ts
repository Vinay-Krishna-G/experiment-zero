import { createBlueprint } from "../factories";

export const aiCodebaseAnalyzer = createBlueprint({
  id: "ai-codebase-analyzer",
  publishedAt: "2026-06-12",
  "projectId": "002",
  "title": "AI Codebase Analyzer",
  "objective": "Build a tool that lets developers ask natural language questions about any codebase — without manually reading thousands of files. The system must stay accurate across large repositories.",
  "technologies": [
    "Python",
    "LangChain",
    "Pinecone",
    "Next.js",
    "TypeScript",
    "FastAPI"
  ],
  "stages": [
    {
      "name": "Repository Arrival",
      "annotation": "Clone or upload repository files"
    },
    {
      "name": "Source Excavation",
      "annotation": "Extract meaningful code + comment content"
    },
    {
      "name": "Knowledge Extraction",
      "annotation": "Split into context-window-safe segments"
    },
    {
      "name": "Memory Construction",
      "annotation": "Convert chunks to vector representations"
    },
    {
      "name": "Retrieval Expedition",
      "annotation": "Store vectors in Pinecone for retrieval"
    },
    {
      "name": "Insight Delivery",
      "annotation": "Retrieve relevant chunks, augment LLM prompt"
    }
  ],
  "discoveries": [
    {
      "text": "Large repositories require chunked indexing — full-file embedding exceeds context limits."
    },
    {
      "text": "Metadata (file path, function name) dramatically improves retrieval precision."
    },
    {
      "text": "RAG accuracy depends more on chunking strategy than on the LLM model chosen."
    },
    {
      "text": "Users ask architectural questions more than implementation questions."
    }
  ],
  "lessons": [
    "Retrieval quality is the bottleneck — optimize chunk size and metadata before tuning LLM.",
    "FastAPI was the right choice for the Python backend; Next.js handled the UI layer well.",
    "Build an evaluation harness early — otherwise you are guessing at quality."
  ],
  "status": "In Development",

});
