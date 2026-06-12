import { createResearchLog } from "../factories";

export const schemaShiftCascadingFailure = createResearchLog({
  id: "schema-shift-cascading-failure",
  publishedAt: "2026-06-12",
  "title": "Schema shift cascading failure",
  "date": "2025.08.14",
  "category": "Failed Experiment",
  "summary": "Ad-hoc column additions created 1:many contradictions and broke auth.",
  "content": "Migration failed again today.\n\n- Week 1: Assumed 1:1 relationship between Users and Workspaces.\n- Week 3: Feature request required multi-workspace support.\n\nAdded columns ad-hoc to patch it. Now the entire authentication flow is broken.\n\nThe 'build-the-plane-as-you-fly' approach doesn't work for databases. You can iterate on UI. You cannot iterate on gravity.\n\nNote to self: Next project, lock down the relational constraints on day zero. No code until the whiteboard schema survives worst-case interrogation.",
  "tags": [
    "engineering",
    "schema",
    "lessons"
  ],

});
