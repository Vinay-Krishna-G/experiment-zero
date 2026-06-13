import { createExperiment } from "../factories";

export const experimentZero = createExperiment({
  id: "experiment-zero",
  publishedAt: "2026-06-12",
  title: "Static Developer Portfolio: Build Integrity Engine",
  tagline: "A statically generated portfolio built to ensure 100% type safety and zero runtime errors.",
  description:
    "A Next.js static site generator (SSG) portfolio utilizing strict CI/CD prebuild validation hooks to enforce content schemas before deployment.",
  status: "In Progress",
  primaryCategory: "Developer Tool",
  tags: ["Portfolio"],
  complexity: 4,
  timeline: [
    { label: "Idea", status: "done" },
    { label: "Research", status: "done" },
    { label: "Building", status: "current" },
    { label: "Polish", status: "pending" },
    { label: "Launched", status: "pending" },
  ],
  stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  blueprintId: "experiment-zero",
  evidence: {
    problem: "Developer portfolios are traditionally static resumes that fail to demonstrate actual engineering processes, tradeoff rationale, or performance optimizations.",
    constraints: [
      "Must compile 100% statically (next build).",
      "First Contentful Paint must load under 150ms.",
      "Build pipeline must block deployments on link errors."
    ],
    alternatives: [
      {
        name: "Standard React SPA",
        pros: ["Simple deployment", "Extremely dynamic client state transitions"],
        cons: ["Poor SEO crawls due to client-side data rendering requirements"]
      },
      {
        name: "Dynamic Server SSR",
        pros: ["High interactivity with live server data connections"],
        cons: ["Increases hosting dependencies and setup complexity", "Harder to serve over edge CDNs globally with zero DB latency"]
      }
    ],
    finalDecision: "Next.js App Router static site generation (SSG) utilizing custom prebuild integrity tests.",
    tradeoffs: [
      "Chose to manage content in local TypeScript files instead of a CMS. This removed the ability to edit via a UI, but guaranteed that broken links would fail the build before deploying."
    ],
    outcome: {
      description: "Static portfolio achieving 100/100 Lighthouse performance metrics with zero runtime data crashes.",
      metrics: [
        "100% Google Lighthouse score",
        "Zero runtime crashes",
        "Ingestion checks run in < 500ms"
      ]
    },
    engineeringSignals: ["Frontend Architecture", "DX Improvements", "Type Safety"]
  }
});
