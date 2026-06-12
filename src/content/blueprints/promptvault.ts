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
  evidence: {
    problem: "Authentication structures and prompt schemas were shifting, leading to database schema mismatches and API route failures on Vercel deployment.",
    constraints: [
      "Must use serverless MongoDB Atlas boundaries.",
      "Must limit schema validation checks to compile-time definitions.",
      "Must support nextauth JWT session models."
    ],
    alternatives: [
      {
        name: "NoSQL Schema-less Storage",
        pros: ["Unlimited flexibility during early prototyping"],
        cons: ["Prone to runtime errors when querying missing attributes"]
      },
      {
        name: "PostgreSQL Prisma Schema",
        pros: ["Strict referential integrity constraints"],
        cons: ["Requires complex migrations for every minor prompt structure adjustment"]
      }
    ],
    finalDecision: "Used MongoDB with TypeScript interface validations mapping to dynamic serverless REST api endpoints.",
    tradeoffs: [
      "Accepted slightly slower query speeds of text-based lookup in exchange for rapid prototype iterations and easy schema updates."
    ],
    outcome: {
      description: "Deployed dynamic, multi-tenant prompt vaults on serverless boundaries.",
      metrics: [
        "100% schema validation passes at compile time",
        "NextAuth JWT login verification under 50ms",
        "Zero schema migration downtime"
      ]
    },
    engineeringSignals: ["Data Modeling", "API Design", "Type Safety"]
  }
});
