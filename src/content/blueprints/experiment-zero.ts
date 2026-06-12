import type { Blueprint } from "@/types";

export const experimentzero: Blueprint = {
  "id": "bp-003",
  "projectId": "003",
  "title": "Experiment Zero",
  "objective": "Design a portfolio that feels like entering a living laboratory — not a resume page. Every section should reinforce a narrative: an inventor documenting work in progress.",
  "technologies": [
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Framer Motion",
    "CSS Custom Properties"
  ],
  "stages": [
    {
      "name": "Concept Formation",
      "annotation": "Warm paper, muted emerald, JetBrains Mono — inventor notebook"
    },
    {
      "name": "Identity Research",
      "annotation": "Playfair Display editorial + Inter body + JetBrains Mono"
    },
    {
      "name": "Laboratory Design",
      "annotation": "Data-driven components — content lives in data files"
    },
    {
      "name": "Archive Construction",
      "annotation": "Framer Motion — staggered reveals, parallax, sweep lines"
    },
    {
      "name": "System Expansion",
      "annotation": "CSS bottle system with BottleRenderer abstraction for Phase 6"
    },
    {
      "name": "Public Launch",
      "annotation": "Expedition route maps replacing conventional diagrams"
    }
  ],
  "discoveries": [
    {
      "id": "D1",
      "text": "A portfolio should feel like a place, not a page. The difference is whether the visitor explores or browses."
    },
    {
      "id": "D2",
      "text": "Data-driven architecture eliminates the 'update the portfolio' tax — content lives in one file."
    },
    {
      "id": "D3",
      "text": "CSS-only bottles are convincing enough for Phase 1 — premature Three.js would slow momentum."
    }
  ],
  "lessons": [
    "Establish a strong design language first — it makes every subsequent decision easier.",
    "Separate data from presentation from the beginning, even if it feels like over-engineering.",
    "Animated motion should feel earned, not decorative. Every animation should serve the narrative."
  ],
  "status": "In Development",
  "slug": "experiment-zero"
};
