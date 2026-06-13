import { createResearchLog } from "../factories";

export const architectureClarityMattersMoreThanVisualPolish = createResearchLog({
  id: "architecture-clarity-matters-more-than-visual-polish",
  publishedAt: "2026-06-12",
  "title": "Why I prioritized flat files over a database for my portfolio",
  "date": "2026.04.12",
  "category": "Lesson Learned",
  "summary": "A beautiful shell will crack under the weight of real content if the foundation is brittle.",
  "content": "I faced a problem early on: I was spending days tweaking glassmorphism effects and WebGL shaders, but the actual portfolio content was hardcoded and rigid. The app looked great but was impossible to maintain.\n\nTo fix this, I decided to rebuild the foundation. I moved all state into generic flat TypeScript files acting as a local CMS.\n\nThe result was immediate. Adding new features became trivial because the data was clean. Visuals draw the eye, but architecture sustains the project. Decoupling the data layer from the UI made every subsequent component easier to build.",
  "tags": [
    "architecture",
    "design",
    "portfolio"
  ],

});
