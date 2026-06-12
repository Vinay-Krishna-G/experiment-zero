import type { ResearchLog } from "@/types";

export const folderhierarchyfeaturerequest: ResearchLog = {
  "id": "rl-009",
  "title": "Folder hierarchy feature request",
  "date": "2025.12.05",
  "category": "Observation",
  "summary": "Users asked for folders. I built tags instead. Awaiting metrics validation.",
  "content": "Feature request log is flooded with: 'Add folders for snippets.'\n\nAnalyzed the usage patterns. People aren't having trouble *storing* snippets, they are having trouble *finding* them.\n\nFolders create mutually exclusive silos. A React snippet can't live in both 'Frontend' and 'API' folders without duplicating.\n\nI refused the folder request. Shipped a multi-select tag system instead.\n\nImmediate pushback on Discord.\n\nWe'll see if the retrieval time metrics validate the decision next week. If average time-to-copy doesn't drop by 20%, I was wrong.",
  "tags": [
    "product",
    "feedback",
    "vision"
  ],
  "slug": "folder-hierarchy-feature-request"
};
