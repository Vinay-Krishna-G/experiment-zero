import { type Experiment } from "@/types";

export const futureExperiment: Experiment = {
  id: "004",
  slug: "future-experiment",
  title: "Future Experiment",
  tagline: "The next invention is taking shape.",
  description:
    "Every great laboratory has a bench reserved for the next experiment. This shelf is being prepared. The idea is forming. The ingredients are being gathered.",
  status: "Planned",
  category: "Unknown",
  year: "2026",
  complexity: 1,
  timeline: [
    { label: "Idea", status: "pending" },
    { label: "Research", status: "pending" },
    { label: "Prototype", status: "pending" },
    { label: "Deployment", status: "pending" },
    { label: "Shipped", status: "pending" },
  ],
  stack: [],
  bottle: {
    size: "small",
    glass: "slate",
    glow: "none",
    label: "TBD",
    fillLevel: 0.1,
  },
};
