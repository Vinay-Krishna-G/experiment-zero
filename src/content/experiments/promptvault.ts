
import { createExperiment } from "../factories";

export const promptvault = createExperiment({
  id: "promptvault",

  publishedAt: "2026-06-12",

  title: "PromptVault",

  tagline:
    "A full-stack platform for organizing, managing, and discovering AI prompts.",

  description:
    "PromptVault is a full-stack prompt management platform designed to help users store, organize, search, and reuse AI prompts efficiently. As AI tools became a daily part of workflows, managing useful prompts across multiple chats and platforms became increasingly difficult. PromptVault provides a centralized workspace where users can build personal prompt libraries, organize prompts into categories, search instantly, and access their collections from anywhere.",

  status: "Completed",

  primaryCategory: "Developer Tool",

  tags: [
    "AI",
    "Productivity",
    "Prompt Engineering",
    "Full Stack",
    "SaaS"
  ],

  complexity: 4,

  timeline: [
    { label: "Research", status: "done" },
    { label: "Planning", status: "done" },
    { label: "Development", status: "done" },
    { label: "Deployment", status: "done" },
    { label: "Live", status: "done" }
  ],

  stack: [
    "React",
    "Vite",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT Authentication",
    "Tailwind CSS",
    "Cloudinary",
    "Resend"
  ],

  blueprintId: "promptvault",
  github: "https://github.com",
  liveUrl: "https://trendyprompt.vercel.app",

  evidence: {
    problem:
      "Useful AI prompts are often scattered across chat histories, notes applications, documents, and browser bookmarks. As prompt libraries grow, finding and reusing effective prompts becomes increasingly difficult, leading to duplicated effort and inefficient workflows.",

    constraints: [
      "Users must securely access personal prompt libraries.",
      "Search and retrieval should feel instantaneous.",
      "Prompt organization should remain flexible as categories evolve.",
      "The system should support future AI-related features without major schema redesigns.",
      "The application should remain lightweight and responsive."
    ],

    alternatives: [
      {
        name: "Markdown Files and Notes Apps",
        pros: [
          "Simple setup",
          "No backend infrastructure required"
        ],
        cons: [
          "Difficult to search at scale",
          "Poor organization",
          "No authentication or cloud synchronization"
        ]
      },
      {
        name: "Browser Bookmarks",
        pros: [
          "Easy to save references"
        ],
        cons: [
          "Not designed for prompt management",
          "No categorization workflow",
          "Limited search capabilities"
        ]
      }
    ],

    finalDecision:
      "Build a dedicated full-stack prompt management platform using React, Express, MongoDB, and JWT authentication, providing centralized storage, categorization, search, and retrieval capabilities.",

    tradeoffs: [
      "Chose MongoDB over a relational database to allow flexible prompt schemas and faster feature iteration.",
      "Implemented custom JWT authentication instead of adopting a larger authentication framework to maintain full control over the authentication flow.",
      "Used client-side search for the MVP to provide fast retrieval while avoiding the operational complexity of dedicated search infrastructure."
    ],

    outcome: {
      description:
        "Delivered a deployed full-stack application that enables users to manage AI prompts through a centralized, authenticated workspace with categorization, search, and cloud persistence.",

      metrics: [
        "Custom JWT authentication system",
        "Cloud-based prompt persistence",
        "Client-side instant prompt search",
        "Image upload support via Cloudinary",
        "Email infrastructure powered by Resend",
        "Production deployment on Vercel"
      ]
    },

    engineeringSignals: [
      "Full Stack Development",
      "Authentication & Security",
      "Database Design",
      "REST API Development",
      "Cloud Integrations",
      "Product Architecture"
    ]
  }
});

