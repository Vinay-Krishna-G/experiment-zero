
import { createExperiment } from "../factories";

export const experimentZero = createExperiment({
  id: "experiment-zero",
  publishedAt: "2026-06-12",

  title: "Portfolio",

  tagline:
    "A content-driven engineering portfolio documenting projects, architecture decisions, and technical discoveries.",

  description:
    "Antigravity is a portfolio platform built to showcase projects, architecture blueprints, engineering notes, and technical decision-making in a structured and maintainable way. Instead of functioning as a traditional portfolio, it acts as a living archive where every project is connected to its implementation details, tradeoffs, research notes, and technical documentation. The platform is powered by a content-first architecture using TypeScript registries, static generation, and schema validation to ensure long-term maintainability and reliability.",

  status: "In Progress",

  primaryCategory: "Portfolio Platform",

  tags: [
    "Portfolio",
    "Developer Platform",
    "Documentation",
    "Next.js",
    "TypeScript"
  ],

  complexity: 5,

  timeline: [
    { label: "Research", status: "done" },
    { label: "Architecture", status: "done" },
    { label: "Development", status: "current" },
    { label: "Content Population", status: "current" },
    { label: "Launch", status: "pending" }
  ],

  stack: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Static Site Generation",
    "Content Architecture"
  ],

  blueprintId: "experiment-zero",

  evidence: {
    problem:
      "Most developer portfolios focus on showcasing finished projects but fail to demonstrate engineering decision-making, architectural thinking, technical tradeoffs, and problem-solving processes. Recruiters and hiring managers often see outcomes without understanding how those outcomes were achieved.",

    constraints: [
      "Must be fully statically generated.",
      "Must not require a runtime database.",
      "Content should be manageable through TypeScript registries.",
      "Broken relationships between projects, blueprints, and notes must fail validation before deployment.",
      "Must maintain strong SEO and performance characteristics."
    ],

    alternatives: [
      {
        name: "Traditional Portfolio Website",
        pros: [
          "Simple implementation",
          "Easy content management"
        ],
        cons: [
          "Limited technical depth",
          "Poor demonstration of engineering process",
          "Projects become isolated showcase pages"
        ]
      },
      {
        name: "CMS-Driven Portfolio",
        pros: [
          "Easy content updates",
          "Non-technical editing workflow"
        ],
        cons: [
          "Additional infrastructure",
          "External dependencies",
          "Reduced type safety"
        ]
      }
    ],

    finalDecision:
      "Build a content-driven portfolio platform using Next.js, TypeScript registries, schema validation, and static generation to create a connected ecosystem of projects, architecture documents, and engineering notes.",

    tradeoffs: [
      "Chose TypeScript content registries instead of a CMS, sacrificing visual editing in exchange for type safety and maintainability.",
      "Chose static generation over server-rendered architecture to maximize performance and simplify deployment.",
      "Accepted a larger content modeling effort in exchange for stronger relationships between projects, blueprints, and engineering notes."
    ],

    outcome: {
      description:
        "Created a portfolio platform that documents not only what was built, but also why it was built, how decisions were made, and what was learned throughout the process.",

      metrics: [
        "Fully static deployment",
        "Connected project and blueprint architecture",
        "Schema-validated content pipeline",
        "Type-safe content management",
        "Optimized for recruiter and engineering-manager review"
      ]
    },

    engineeringSignals: [
      "Frontend Architecture",
      "Content Modeling",
      "Static Site Generation",
      "Developer Experience",
      "System Design",
      "Type Safety",
      "Information Architecture"
    ]
  }
});
