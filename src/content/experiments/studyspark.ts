
import { createExperiment } from "../factories";

export const studySpark = createExperiment({
  id: "studyspark",

  publishedAt: "2026-06-12",

  title: "StudySpark",

  tagline:
    "A full-stack study management platform for organizing learning, tracking progress, and improving study consistency.",

  description:
    "StudySpark is a full-stack learning and productivity platform designed to help students manage subjects, organize notes, track learning progress, and maintain structured study workflows. Instead of relying on multiple disconnected tools, learners can manage their study materials, monitor progress, and build consistent learning habits within a single centralized workspace.",

  status: "Completed",

  primaryCategory: "Education",

  tags: [
    "Education",
    "Productivity",
    "Learning",
    "Full Stack",
    "Student Tools"
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
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "React Router",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT Authentication"
  ],

  blueprintId: "studyspark",
  github: "https://github.com",
  liveUrl: "https://study-spark-seven-rouge.vercel.app/",

  evidence: {
    problem:
      "Students often use multiple disconnected tools for studying, including note-taking applications, task managers, spreadsheets, and physical notebooks. This fragmented workflow makes it difficult to stay organized, track progress, and maintain consistent study habits.",

    constraints: [
      "Learning content must remain organized and easy to navigate.",
      "Progress tracking should remain simple and intuitive.",
      "The platform should support multiple subjects and topics.",
      "Authentication and personal study data must remain secure.",
      "The application should be accessible across devices."
    ],

    alternatives: [
      {
        name: "Traditional Note-Taking Applications",
        pros: [
          "Easy content creation",
          "Widely available"
        ],
        cons: [
          "Limited progress tracking",
          "No structured learning hierarchy",
          "Weak study planning capabilities"
        ]
      },
      {
        name: "Multiple Specialized Apps",
        pros: [
          "Dedicated tools for each task"
        ],
        cons: [
          "Fragmented workflow",
          "Context switching overhead",
          "Difficult to maintain consistency"
        ]
      }
    ],

    finalDecision:
      "Build a centralized study management platform combining subject organization, note management, progress tracking, and learning workflows within a single full-stack application.",

    tradeoffs: [
      "Focused on delivering a strong learning workflow before introducing advanced AI-powered features.",
      "Prioritized simplicity and usability over complex analytics during the MVP stage.",
      "Built a traditional full-stack architecture to establish a strong foundation for future educational features."
    ],

    outcome: {
      description:
        "Delivered a functional learning platform that enables students to organize subjects, manage notes, monitor study progress, and maintain structured learning routines.",

      metrics: [
        "User authentication system implemented",
        "Subject and topic management workflow",
        "Notes management functionality",
        "Progress tracking capabilities",
        "Responsive full-stack web application",
        "Cloud-based persistence using MongoDB"
      ]
    },

    engineeringSignals: [
      "Full Stack Development",
      "Authentication & Security",
      "Database Design",
      "REST API Development",
      "Education Technology",
      "Product Development",
      "User Experience Design"
    ]
  }
});

