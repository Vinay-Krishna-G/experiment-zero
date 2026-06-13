import { createBlueprint } from "../factories";

export const experimentZero = createBlueprint({
  id: "experiment-zero",

  publishedAt: "2026-06-12",

  projectId: "experiment-zero",

  title: "Portfolio Architecture",

  objective:
    "Design a fully static, content-driven developer portfolio that functions as a living archive of engineering experiments, research logs, and technical blueprints, relying entirely on compile-time type safety rather than a runtime CMS.",

  technologies: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Static Site Generation"
  ],

  stages: [
    {
      name: "Information Architecture",
      annotation:
        "Designed the relational graph between Experiments, Blueprints, Research Logs, and Field Notes."
    },
    {
      name: "Data Modeling",
      annotation:
        "Built strictly typed TypeScript registries to act as a flat-file database."
    },
    {
      name: "Layout & Navigation",
      annotation:
        "Implemented the 'Experiment Vault' modal routing and base layout."
    },
    {
      name: "Interactive Physics",
      annotation:
        "Developed custom bottle physics (liquid, smoke, fireflies) for the vault index."
    },
    {
      name: "Schema Refactoring",
      annotation:
        "Extracted configuration into a Single Source of Truth architecture."
    },
    {
      name: "Deployment",
      annotation:
        "Deployed as a 100% static application with zero runtime data dependencies."
    }
  ],

  discoveries: [
    {
      text:
        "Abstracting content into TypeScript registries provides better developer experience and type safety than relying on a headless CMS for single-author sites."
    },
    {
      text:
        "A portfolio feels much more engaging when treated as an interconnected knowledge base rather than a linear list of projects."
    },
    {
      text:
        "Static site generation (SSG) completely eliminates database latency, making exploration instant."
    }
  ],

  lessons: [
    "Type safety is a powerful tool for maintaining content integrity over time.",
    "Complex interactive animations (like the specimen bottles) must be carefully isolated from layout shifts to maintain performance.",
    "Decoupling the 'identity' and 'content' configurations from the UI components is essential for long-term maintainability."
  ],

  status: "Verified",

  evidence: {
    problem:
      "Most developer portfolios act as simple digital brochures. They show the final outcome of a project but fail to demonstrate the engineering constraints, design decisions, and architectural tradeoffs that led to that outcome.",

    constraints: [
      "Must be fully statically generated.",
      "Must not require a runtime database or CMS.",
      "Broken relational links between projects and blueprints must fail the build.",
      "Content should be manageable entirely through the code repository.",
      "Must be highly performant and accessible."
    ],

    alternatives: [
      {
        name: "Headless CMS (Sanity, Contentful)",
        pros: [
          "Easy editorial interface",
          "Decoupled content management"
        ],
        cons: [
          "Introduces runtime/build-time network dependencies",
          "Schema mismatches between codebase and CMS can cause failures"
        ]
      },
      {
        name: "Standard React SPA",
        pros: [
          "High interactivity",
          "Simple deployment"
        ],
        cons: [
          "Poor SEO capabilities",
          "Does not scale well for large amounts of interconnected content"
        ]
      }
    ],

    finalDecision:
      "Build a static site using Next.js App Router and local TypeScript registries. This ensures 100% type safety and zero network latency for content retrieval.",

    tradeoffs: [
      "Chose to manage content entirely in code, sacrificing a visual editing interface in exchange for complete control and type safety.",
      "Accepted the burden of modeling complex relational structures manually rather than relying on a relational database."
    ],

    outcome: {
      description:
        "Delivered a highly structured, content-driven portfolio platform that showcases the 'how' and 'why' of engineering projects, entirely validated at build-time.",

      metrics: [
        "Build-time validation for content integrity",
        "Type-safe content architecture",
        "Responsive experience across desktop and mobile devices",
        "Zero external database dependencies",
        "Fully static deployment"
      ]
    },

    engineeringSignals: [
      "System Design",
      "Frontend Architecture",
      "Static Site Generation",
      "Content Modeling",
      "TypeScript Proficiency",
      "Developer Experience"
    ]
  }
});
