import { createResearchLog } from "../factories";

export const studysparkProgressTracking = createResearchLog({
  id: "studyspark-progress-tracking",
  date: "2026-06-13",
  publishedAt: "2026-06-13",
  title: "Progress Tracking Without Creating Friction",
  category: "System Design Note",
  summary: "Implementing analytics that motivate rather than overwhelm.",
  content: `## Problem
To help students stay consistent, StudySpark needed a progress tracking system. However, requiring users to manually log every minute spent studying or fill out complex completion forms created too much administrative overhead, causing users to abandon the tracking features entirely.

## Decision
I designed a lightweight, frictionless progress model based on simple state transitions (e.g., 'To Learn', 'Reviewing', 'Mastered') at the topic level. The system automatically derived overall subject progress from these simple, binary user inputs.

## Outcome
Engagement with the progress tracking features stabilized. Students received the motivational benefits of seeing their progress bars fill up without feeling burdened by the data entry process.

## Lessons Learned
- Analytics and tracking systems must balance the value of the insights generated against the friction required to collect the data.
- Simple, low-friction interactions (like a single click to mark a topic as 'Mastered') often yield more reliable engagement than granular tracking tools.`,
  tags: ["UX","Analytics","Engagement"],
  relatedExperimentId: "studyspark",
  relatedBlueprintId: "studyspark"
});
