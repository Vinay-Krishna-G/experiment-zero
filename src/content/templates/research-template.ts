// Note: ResearchLog interface needs to be moved to src/types/models.ts during execution
// import { type ResearchLog } from "@/types";

export const newResearchTemplate = {
  id: "log-XXX",
  title: "Research Log Title",
  date: "2026-06-12",
  author: "Author Name",
  topic: "Topic category", // "Machine Learning", "WebGL", etc.
  summary: "Brief summary of the research.",
  body: "Markdown or text string of the full research log.",
  tags: ["Tag1", "Tag2"],
  relatedExperiments: ["00X"],
};
