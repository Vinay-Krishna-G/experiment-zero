import type { ResearchLog } from "@/types";

export const decouplingrenderingfrominteractionstate: ResearchLog = {
  "id": "rl-010",
  "title": "Decoupling rendering from interaction state",
  "date": "2026.04.28",
  "category": "System Design Note",
  "summary": "A strict boundary between the interactive container and presentation layer ensures smooth future refactors.",
  "content": "Anticipating the transition to 3D rendering, I forced a strict separation between the 'Experiment Rack' (the interactive container) and the 'Bottle Renderer' (the presentation layer).\n\nThe Rack knows which bottle is clicked, which is hovered, and what data it holds. The Renderer only knows how to draw a bottle on screen.\n\nThis means that when I swap the CSS bottle for a Three.js GLB model, the complex selection logic and animations remain untouched. Good boundaries make future refactors boring.",
  "tags": [
    "react",
    "patterns",
    "threejs"
  ],
  "relatedExperimentId": "exp-001",
  "slug": "decoupling-rendering-from-interaction-state"
};
