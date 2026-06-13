import { createBlueprint } from "../factories";

export const experimentZero = createBlueprint({
  id: "experiment-zero",
  publishedAt: "2026-06-12",
  projectId: "003",
  title: "Static Site Validation Hooks Architecture Blueprint",
  objective: "Architecture layout for static developer portfolios. Prebuild schema validators and static route compilations.",
  technologies: [
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Framer Motion",
    "CSS Custom Properties"
  ],
  stages: [
    {
      name: "Concept Formation",
      annotation: "Warm paper, muted emerald, JetBrains Mono — inventor notebook"
    },
    {
      name: "Identity Research",
      annotation: "Playfair Display editorial + Inter body + JetBrains Mono"
    },
    {
      name: "Laboratory Design",
      annotation: "Data-driven components — content lives in data files"
    },
    {
      name: "Archive Construction",
      annotation: "Framer Motion — staggered reveals, parallax, sweep lines"
    },
    {
      name: "System Expansion",
      annotation: "CSS bottle system with BottleRenderer abstraction for Phase 6"
    },
    {
      name: "Public Launch",
      annotation: "Expedition route maps replacing conventional diagrams"
    }
  ],
  discoveries: [
    {
      text: "A portfolio should feel like a place, not a page. The difference is whether the visitor explores or browses."
    },
    {
      text: "Data-driven architecture eliminates the 'update the portfolio' tax — content lives in one file."
    },
    {
      text: "CSS-only bottles are convincing enough for Phase 1 — premature Three.js would slow momentum."
    }
  ],
  lessons: [
    "Establish a strong design language first — it makes every subsequent decision easier.",
    "Separate data from presentation from the beginning, even if it feels like over-engineering.",
    "Animated motion should feel earned, not decorative. Every animation should serve the narrative."
  ],
  status: "In Development",
  evidence: {
    problem: "Static developer portfolios must ensure sitemap correctness, zero database costs, and absolute stability without sacrificing content relationships.",
    constraints: [
      "Must run statically on Next.js edge environments.",
      "Must validate all internal links and category mappings at build time.",
      "Must compile routes in under 30 seconds."
    ],
    alternatives: [
      {
        name: "Headless CMS Integration",
        pros: ["Easy content editing GUI interface"],
        cons: ["Introduces external API network latency at build time", "Prone to runtime link corruption and dynamic page breaks"]
      }
    ],
    finalDecision: "Decoupled data registries feeding static templates, with prebuild script validation verifying dynamic relationships.",
    tradeoffs: [
      "Traded visual content editor GUI interface for local file-based type safety and offline developer experience."
    ],
    outcome: {
      description: "Implemented git commit validation hooks and local prebuild compiler guards to verify content schemas.",
      metrics: [
        "Zero database hosting dependencies or costs",
        "Next.js static files scale infinitely on CDN edge boundaries",
        "npx tsx src/content/validate.ts catches all invalid registry mappings before git commit"
      ]
    },
    engineeringSignals: ["Frontend Architecture", "Type Safety", "Build Tooling"]
  }
});
