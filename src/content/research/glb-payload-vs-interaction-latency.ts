import { createResearchLog } from "../factories";

export const glbPayloadVsInteractionLatency = createResearchLog({
  id: "glb-payload-vs-interaction-latency",
  publishedAt: "2026-06-12",
  "title": "GLB payload vs interaction latency",
  "date": "2026.06.10",
  "category": "Future Expedition",
  "summary": "Can we load a 2MB 3D model without breaking the 60fps scroll feel?",
  "content": "Current CSS bottle render time: ~4ms.\nTarget Three.js GLB payload: ~1.8MB.\n\nThe abstraction layer (BottleRenderer) is ready. But what happens to the interaction latency when the GLB mounts?\n\nStrategies to test:\n1. React Suspense boundaries around the Canvas\n2. Low-poly placeholder wireframes\n3. Web Worker for geometry parsing\n\nIf the 3D models drop frame rates during scroll, the tactile 'laboratory' feel is dead.\n\nQuestion: Should the 3D canvas only mount upon explicit user interaction (click), rather than rendering all 5 bottles simultaneously on load?",
  "tags": [
    "3d",
    "threejs",
    "webgl"
  ],
  "relatedBlueprintId": "experiment-zero",
  "relatedExperimentId": "experiment-zero",

});
