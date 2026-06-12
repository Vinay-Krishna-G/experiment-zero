import type { ResearchLog } from "@/types";
import type { NarrativeNode, NarrativeEdge } from "../types";
import type { ResolvedGraphSubset } from "./experiments";

export function resolveResearch(researchLogs: ResearchLog[]): ResolvedGraphSubset {
  const nodes: NarrativeNode[] = [];
  const edges: NarrativeEdge[] = [];

  researchLogs.forEach((log) => {
    // 1. Create research node
    nodes.push({
      id: `res-${log.id}`,
      type: "research",
      label: log.title,
      status: "Published", // logs are published logs
      visibility: log.visibility,
      metadata: {
        publishedAt: log.publishedAt,
        updatedAt: log.updatedAt || log.publishedAt,
        category: log.category,
        summary: log.summary,
        tags: log.tags,
      },
    });

    // 2. Create edge to related experiment (documented_by)
    if (log.relatedExperimentId) {
      edges.push({
        id: `edge-res-${log.id}->exp-${log.relatedExperimentId}`,
        source: `res-${log.id}`,
        target: `exp-${log.relatedExperimentId}`,
        type: "documented_by",
      });
    }

    // 3. Create edge to related blueprint (documented_by)
    if (log.relatedBlueprintId) {
      edges.push({
        id: `edge-res-${log.id}->bp-${log.relatedBlueprintId}`,
        source: `res-${log.id}`,
        target: `bp-${log.relatedBlueprintId}`,
        type: "documented_by",
      });
    }
  });

  return { nodes, edges };
}
