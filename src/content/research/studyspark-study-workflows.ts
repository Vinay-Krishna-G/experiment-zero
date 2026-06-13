import { createResearchLog } from "../factories";

export const studysparkStudyWorkflows = createResearchLog({
  id: "studyspark-study-workflows",
  publishedAt: "2026-06-13",
  title: "Designing Study Workflows Instead of Note Storage",
  category: "Observation",
  summary: "Shifting the product focus from content creation to learning progression.",
  content: `## Problem
Initially, StudySpark was designed primarily as a note-taking application. However, user feedback indicated that the primary struggle wasn't writing notes, but managing the process of reviewing and mastering the material over time. A static repository of text wasn't solving the core educational challenge.

## Decision
I pivoted the platform's architecture to emphasize the *learning workflow*. Features like subject organization, topic hierarchies, and spaced review indicators were prioritized over complex text editing capabilities.

## Outcome
StudySpark evolved from a digital notebook into an active learning management system. Users reported feeling more in control of their curriculum and more consistent in their study habits.

## Lessons Learned
- Products should solve the user's ultimate goal (learning) rather than just facilitating the immediate action (typing).
- Workflow design is often a stronger differentiator than feature density.`,
  tags: ["Product Design","Education","UX"],
  relatedExperimentId: "studyspark",
  relatedBlueprintId: "studyspark"
});
