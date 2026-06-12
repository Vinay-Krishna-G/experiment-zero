import { createBlueprint } from "../factories";

export const promptvault = createBlueprint({
  id: "promptvault",
  publishedAt: "2026-06-12",
  "projectId": "001",
  "title": "PromptVault",
  "objective": "Design a system that allows developers and creators to store, organize, and instantly retrieve AI prompts — eliminating the problem of losing high-value prompts inside chat history.",
  "technologies": [
    "Next.js",
    "MongoDB",
    "TypeScript",
    "TailwindCSS",
    "NextAuth"
  ],
  "stages": [
    {
      "name": "Prompt Discovery",
      "annotation": "Identified prompt loss as a recurring frustration"
    },
    {
      "name": "Taxonomy Design",
      "annotation": "Designed prompt schema with tagging taxonomy"
    },
    {
      "name": "Storage Architecture",
      "annotation": "REST endpoints for CRUD + full-text search"
    },
    {
      "name": "Retrieval System",
      "annotation": "Tag-based filtering, keyboard-first navigation"
    },
    {
      "name": "Interface Construction",
      "annotation": "NextAuth with session-based user vaults"
    },
    {
      "name": "Launch Validation",
      "annotation": "Shipped to production on Vercel + MongoDB Atlas"
    }
  ],
  "discoveries": [
    {
      "text": "Tagging taxonomy matters more than search — users navigate by category, not keyword."
    },
    {
      "text": "One-click copy is the most-used feature. Friction here kills the product."
    },
    {
      "text": "MongoDB's full-text search was sufficient at this scale; no Elasticsearch needed."
    }
  ],
  "lessons": [
    "Build the core interaction first, then add organization features.",
    "Data model changes are expensive — design the schema carefully upfront.",
    "User authentication should be treated as infrastructure, not a feature."
  ],
  "status": "Verified",

});
