// Note: Blueprint interface needs to be moved to src/types/models.ts during execution
// import { type Blueprint } from "@/types";

export const newBlueprintTemplate = {
  id: "bp-XXX",
  projectId: "00X", // Maps to experiment ID
  title: "Blueprint Title",
  objective: "The core objective of this technical blueprint.",
  technologies: ["Tech 1", "Tech 2"],
  stages: [
    { name: "Stage 1", annotation: "Annotation for stage 1" },
  ],
  discoveries: [
    { id: "D1", text: "Key discovery text." },
  ],
  lessons: [
    "Lesson learned."
  ],
  status: "Draft", // "Published" | "Draft" | "In Development"
};
