import { createResearchLog } from "../factories";

export const portfolioStaticVsDynamic = createResearchLog({
  id: "portfolio-static-vs-dynamic",
  publishedAt: "2026-06-13",
  title: "Static Generation vs Dynamic Content",
  category: "System Design Note",
  summary: "Evaluating performance tradeoffs in deployment strategies for content-heavy sites.",
  content: `## Problem
With a complex relational content system, rendering pages dynamically on every request would require multiple database lookups or expensive file reads. This would severely impact Time to First Byte (TTFB) and First Contentful Paint (FCP), especially for users far from the deployment region.

## Decision
I utilized Next.js Static Site Generation (SSG). Because the content is managed via TypeScript registries within the repository, the entire relational graph can be resolved at build time.

## Outcome
The portfolio is delivered as static HTML and CSS from a global CDN edge. Database latency is completely eliminated, resulting in instant page loads and maximum SEO performance.

## Lessons Learned
- For read-heavy applications where content updates are infrequent (like a portfolio), dynamic server rendering is an unnecessary bottleneck.
- Resolving relational data at build time vastly simplifies deployment architecture and removes runtime failure vectors.`,
  tags: ["Next.js","Performance","SSG"],
  relatedExperimentId: "experiment-zero",
  relatedBlueprintId: "experiment-zero"
});
