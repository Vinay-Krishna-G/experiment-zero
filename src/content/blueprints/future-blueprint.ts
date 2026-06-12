import { createBlueprint } from "../factories";

export const futureBlueprint = createBlueprint({
  id: "future-experiment",
  publishedAt: "2026-06-12",
  "projectId": "004",
  "title": "Future Blueprint",
  "objective": "The next experiment is still being conceived. The problem space is known; the solution approach is forming. Research and ideation are underway.",
  "technologies": [],
  "stages": [
    {
      "name": "Problem Research",
      "annotation": "Identifying the core friction"
    },
    {
      "name": "Solution Mapping",
      "annotation": "Exploring possible approaches"
    },
    {
      "name": "Technology Selection",
      "annotation": "Choosing the right tools"
    },
    {
      "name": "Prototype",
      "annotation": "First working version"
    },
    {
      "name": "Iteration",
      "annotation": "Refining based on feedback"
    },
    {
      "name": "Deployment",
      "annotation": "Releasing into the world"
    }
  ],
  "discoveries": [
    {
      "text": "Research in progress — discoveries being documented."
    }
  ],
  "lessons": [
    "Lessons will be recorded as the experiment progresses."
  ],
  "status": "In Development",

});
