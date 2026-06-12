import { createResearchLog } from "../factories";

export const architectureClarityMattersMoreThanVisualPolish = createResearchLog({
  id: "architecture-clarity-matters-more-than-visual-polish",
  publishedAt: "2026-06-12",
  "title": "Architecture clarity matters more than visual polish",
  "date": "2026.04.12",
  "category": "Lesson Learned",
  "summary": "A beautiful shell will crack under the weight of real content if the foundation is brittle.",
  "content": "In early iterations of Experiment Zero, I spent days tweaking glassmorphism effects and WebGL shaders before locking in the data model. The result was a beautiful shell that cracked under the weight of real content.\n\nI rebuilt the foundation, moving all state into generic flat files. Suddenly, adding new features became trivial. The UI naturally fell into place because it was reflecting a clean reality.\n\nVisuals draw the eye, but architecture sustains the project. If the foundation is brittle, no amount of CSS can save the user experience.",
  "tags": [
    "architecture",
    "design",
    "portfolio"
  ],

});
