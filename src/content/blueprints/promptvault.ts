
import { createBlueprint } from "../factories";

export const promptvault = createBlueprint({
  id: "promptvault",

  publishedAt: "2026-06-12",

  projectId: "promptvault",

  title: "PromptVault Architecture",

  objective:
    "Design a scalable prompt management platform that enables users to securely store, organize, search, and retrieve AI prompts from a centralized workspace.",

  technologies: [
    "React",
    "Vite",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT Authentication",
    "Cloudinary",
    "Resend",
    "Tailwind CSS"
  ],

  stages: [
    {
      name: "Problem Discovery",
      annotation:
        "Identified prompt fragmentation across chat histories, notes apps, and browser bookmarks."
    },
    {
      name: "Data Modeling",
      annotation:
        "Designed prompt schemas, categories, tagging structures, and user ownership models."
    },
    {
      name: "Authentication Layer",
      annotation:
        "Implemented custom JWT authentication and protected API routes."
    },
    {
      name: "Prompt Management",
      annotation:
        "Built CRUD workflows for creating, organizing, and updating prompt collections."
    },
    {
      name: "Search & Retrieval",
      annotation:
        "Implemented fast client-side filtering and retrieval workflows."
    },
    {
      name: "Deployment",
      annotation:
        "Deployed full-stack application with cloud storage and production-ready infrastructure."
    }
  ],

  discoveries: [
    {
      text:
        "Users naturally organize prompts by category and workflow rather than relying entirely on search."
    },
    {
      text:
        "Fast retrieval and copy workflows provide more value than complex organizational features."
    },
    {
      text:
        "Flexible schemas allow prompt structures to evolve as AI workflows change."
    }
  ],

  lessons: [
    "Designing data models early reduces future migration effort.",
    "Authentication should be implemented before advanced product features.",
    "Simple retrieval workflows often provide more value than highly sophisticated search systems.",
    "Building the core user workflow first exposes product priorities faster than adding secondary features."
  ],

  status: "Verified",

  evidence: {
    problem:
      "As AI adoption increased, useful prompts became scattered across multiple tools and conversations. Users lacked a centralized system for storing, organizing, and reusing prompts efficiently.",

    constraints: [
      "User prompt libraries must remain private and secure.",
      "Prompt schemas should remain flexible as requirements evolve.",
      "Search and retrieval should feel immediate.",
      "The platform should support future AI-related features without major architectural rewrites.",
      "The application must remain deployable using modern serverless infrastructure."
    ],

    alternatives: [
      {
        name: "Relational Database (PostgreSQL)",
        pros: [
          "Strong schema enforcement",
          "Excellent relational querying"
        ],
        cons: [
          "Additional migration overhead during rapid product iteration"
        ]
      },
      {
        name: "Simple Notes Application",
        pros: [
          "Minimal development complexity"
        ],
        cons: [
          "Poor organization",
          "No authentication",
          "Limited scalability"
        ]
      }
    ],

    finalDecision:
      "Build a dedicated full-stack platform using MongoDB, Express, React, and JWT authentication with flexible document schemas and cloud-backed persistence.",

    tradeoffs: [
      "Chose MongoDB to enable faster schema evolution during product development.",
      "Implemented custom JWT authentication instead of introducing a larger authentication framework.",
      "Used client-side search for the MVP to prioritize simplicity and responsiveness."
    ],

    outcome: {
      description:
        "Delivered a production-ready prompt management platform with authentication, cloud persistence, prompt organization, search capabilities, and extensible architecture for future AI features.",

      metrics: [
        "Custom JWT authentication system",
        "Prompt categorization and tagging",
        "Cloudinary media upload integration",
        "Email infrastructure via Resend",
        "MongoDB cloud persistence",
        "Production deployment on Vercel"
      ]
    },

    engineeringSignals: [
      "System Design",
      "Authentication & Security",
      "Database Design",
      "REST API Development",
      "Cloud Integrations",
      "Data Modeling",
      "Product Architecture"
    ]
  }
});

