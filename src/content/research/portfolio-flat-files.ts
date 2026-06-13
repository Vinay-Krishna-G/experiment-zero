import { createResearchLog } from "../factories";

export const portfolioFlatFiles = createResearchLog({
  id: "portfolio-flat-files",
  date: "2026-06-13",
  publishedAt: "2026-06-13",
  title: "Why I Chose Flat Files Over a CMS",
  category: "System Design Note",
  summary: "Exploring the tradeoff between editorial convenience and engineering integrity.",
  content: `## Problem
Most portfolios rely on a Headless CMS (like Sanity or Contentful) to manage project data. While this makes updating content easy, it introduces a massive disconnect between the codebase and the content. If a component expects a certain field, and the CMS schema changes, the build breaks at runtime. I needed a way to guarantee that broken content relationships would fail at compile time.

## Decision
I decided to reject the CMS approach entirely and use TypeScript flat files (registries) as the single source of truth. Every project, blueprint, and research log is a strongly-typed object inside the repository.

## Outcome
The result is a statically generated site that boasts 100% type safety. If an experiment references a blueprint ID that doesn't exist, TypeScript throws an error before a build is even attempted.

## Lessons Learned
- Content is just data, and for developer portfolios, type safety is more valuable than non-technical editorial access.
- Storing content in the repository creates a perfect historical audit log via Git.
- This approach is highly scalable for single-author sites, but would struggle in a multi-author environment.`,
  tags: ["Architecture","CMS","TypeScript"],
  relatedExperimentId: "experiment-zero",
  relatedBlueprintId: "experiment-zero"
});
