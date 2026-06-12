import type { Experiment } from "@/types";
import type { NarrativeNode, NarrativeEdge } from "../types";

export interface ResolvedGraphSubset {
  nodes: NarrativeNode[];
  edges: NarrativeEdge[];
}

export function resolveExperiments(experiments: Experiment[]): ResolvedGraphSubset {
  const nodes: NarrativeNode[] = [];
  const edges: NarrativeEdge[] = [];

  experiments.forEach((exp) => {
    // 1. Create narrative node for experiment
    nodes.push({
      id: `exp-${exp.id}`,
      type: "experiment",
      label: exp.title,
      status: exp.status,
      visibility: exp.visibility,
      metadata: {
        publishedAt: exp.publishedAt,
        updatedAt: exp.updatedAt || exp.publishedAt,
        category: exp.primaryCategory,
        tagline: exp.tagline,
        tags: exp.tags,
        complexity: exp.complexity,
        progress: exp.progress,
      },
    });

    // 2. Create edges from experiment to blueprint (implements)
    if (exp.blueprintId) {
      edges.push({
        id: `edge-exp-${exp.id}->bp-${exp.blueprintId}`,
        source: `exp-${exp.id}`,
        target: `bp-${exp.blueprintId}`,
        type: "implements",
      });
    }

    // 3. Create edges for related experiments (relates_to)
    if (exp.relatedIds && exp.relatedIds.length > 0) {
      exp.relatedIds.forEach((relId) => {
        edges.push({
          id: `edge-exp-${exp.id}->exp-${relId}`,
          source: `exp-${exp.id}`,
          target: `exp-${relId}`,
          type: "relates_to",
        });
      });
    }
  });

  return { nodes, edges };
}
