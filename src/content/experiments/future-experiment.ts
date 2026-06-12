import { createExperiment } from "../factories";

export const futureExperiment = createExperiment({
  id: "future-experiment",
  publishedAt: "2026-06-12",
  title: "Future Experiment",
  tagline: "The next invention is taking shape.",
  description:
    "Every great laboratory has a bench reserved for the next experiment. This shelf is being prepared. The idea is forming. The ingredients are being gathered.",
  status: "Planned",
  primaryCategory: "Developer Tool",
  tags: ["Unknown"],
  complexity: 1,
  timeline: [
    { label: "Idea", status: "pending" },
    { label: "Research", status: "pending" },
    { label: "Prototype", status: "pending" },
    { label: "Deployment", status: "pending" },
    { label: "Shipped", status: "pending" },
  ],
  stack: [],
  blueprintId: "future-experiment",
});
