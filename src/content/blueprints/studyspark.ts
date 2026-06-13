
import { createBlueprint } from "../factories";

export const studyspark = createBlueprint({
  id: "studyspark",

  publishedAt: "2026-06-12",

  projectId: "studyspark",

  title: "StudySpark Architecture",

  objective:
    "Design a centralized learning platform that enables students to organize subjects, manage notes, track study progress, and maintain structured learning workflows from a single workspace.",

  technologies: [
    "React",
    "Vite",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT Authentication"
  ],

  stages: [
    {
      name: "Problem Discovery",
      annotation:
        "Identified fragmented study workflows across notebooks, note-taking apps, and task managers."
    },
    {
      name: "Learning Model Design",
      annotation:
        "Designed a hierarchy connecting subjects, topics, notes, and progress tracking."
    },
    {
      name: "Authentication Layer",
      annotation:
        "Implemented secure user accounts and protected learning data."
    },
    {
      name: "Study Workspace",
      annotation:
        "Built interfaces for subject management, topic organization, and note creation."
    },
    {
      name: "Progress Tracking",
      annotation:
        "Introduced completion tracking and learning progress monitoring."
    },
    {
      name: "Deployment",
      annotation:
        "Deployed the platform as a full-stack application accessible across devices."
    }
  ],

  discoveries: [
    {
      text:
        "Students care more about maintaining study consistency than advanced productivity features."
    },
    {
      text:
        "A clear learning hierarchy improves navigation and reduces information overload."
    },
    {
      text:
        "Progress visibility creates stronger engagement than simple note storage."
    }
  ],

  lessons: [
    "Designing the learning workflow before building features simplified the entire platform.",
    "Authentication should be implemented early when user-owned data is involved.",
    "Simple progress tracking provides immediate value without requiring complex analytics.",
    "Strong data relationships between subjects, topics, and notes improve maintainability."
  ],

  status: "Verified",

  evidence: {
    problem:
      "Students often manage their learning across multiple disconnected tools, making it difficult to organize study materials, monitor progress, and maintain effective study habits.",

    constraints: [
      "Learning content must remain organized and easy to navigate.",
      "Progress tracking should be intuitive and lightweight.",
      "Users must be able to manage multiple subjects simultaneously.",
      "Personal study data must remain secure.",
      "The platform should remain accessible across devices."
    ],

    alternatives: [
      {
        name: "Generic Note-Taking Applications",
        pros: [
          "Easy content creation",
          "Low learning curve"
        ],
        cons: [
          "No structured learning workflow",
          "Limited progress tracking",
          "Weak study planning support"
        ]
      },
      {
        name: "Multiple Specialized Tools",
        pros: [
          "Dedicated functionality for each task"
        ],
        cons: [
          "Fragmented workflow",
          "Frequent context switching",
          "Poor overall organization"
        ]
      }
    ],

    finalDecision:
      "Build a dedicated full-stack learning platform combining subject management, note organization, progress tracking, and study workflows within a single centralized system.",

    tradeoffs: [
      "Focused on core learning workflows before introducing AI-powered study features.",
      "Prioritized usability and organization over advanced analytics during the MVP stage.",
      "Used a traditional MERN-style architecture to provide flexibility for future educational tools."
    ],

    outcome: {
      description:
        "Delivered a functional education platform that enables students to organize learning materials, manage study content, and monitor progress from a centralized workspace.",

      metrics: [
        "User authentication system",
        "Subject and topic management",
        "Structured note organization",
        "Progress tracking workflow",
        "MongoDB cloud persistence",
        "Production deployment"
      ]
    },

    engineeringSignals: [
      "Full Stack Development",
      "Authentication & Security",
      "Database Design",
      "REST API Development",
      "Education Technology",
      "Data Modeling",
      "Product Architecture"
    ]
  }
});

