import { createResearchLog } from "../factories";

export const portfolioContentSystem = createResearchLog({
  id: "portfolio-content-system",
  publishedAt: "2026-06-13",
  title: "Building a Portfolio as a Content System",
  category: "Observation",
  summary: "Shifting the perspective of a portfolio from a static brochure to a living archive.",
  content: `## Problem
Standard portfolios are effectively digital brochures. They show a screenshot, a title, and a link. This fails to demonstrate the actual engineering process, architectural decisions, and constraints faced during development. The challenge was figuring out how to showcase the *how* and *why* alongside the *what*.

## Decision
I architected the portfolio as a relational content system. Rather than having a 'Projects' page, I created an 'Experiment Vault' where every project acts as a node connected to Research Logs, Architectural Blueprints, and Field Notes.

## Outcome
This shift transforms the portfolio into a technical knowledge base. When a recruiter or engineer views a project, they aren't just seeing the final product; they can navigate through the architectural decisions and lessons learned that led to that product.

## Lessons Learned
- Emphasizing the engineering process requires an information architecture built for exploration, not just presentation.
- Connecting nodes of information (Projects to Blueprints to Logs) creates a much more compelling narrative for technical reviewers.`,
  tags: ["Information Architecture","System Design"],
  relatedExperimentId: "experiment-zero",
  relatedBlueprintId: "experiment-zero"
});
