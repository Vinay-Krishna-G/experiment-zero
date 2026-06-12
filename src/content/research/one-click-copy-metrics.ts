import { createResearchLog } from "../factories";

export const oneClickCopyMetrics = createResearchLog({
  id: "one-click-copy-metrics",
  publishedAt: "2026-06-12",
  "title": "One-click copy metrics",
  "date": "2025.11.08",
  "category": "Discovery",
  "summary": "Usage data reveals execution speed matters more than semantic discovery.",
  "content": "PromptVault usage data is in.\n\n- Search usage: 12%\n- Copy button usage: 84%\n\nI assumed discovery was the bottleneck. It wasn't.\n\nExecution was.\n\nPeople don't want to browse. They want to paste.\n\nNote to self: Never optimize retrieval until friction at the point of execution is near zero.",
  "tags": [
    "product",
    "user-experience",
    "prompt-engineering"
  ],
  "relatedExperimentId": "promptvault",

});
