import type { Blueprint } from "@/types";
import type { NarrativeNode, NarrativeEdge } from "../types";
import type { ResolvedGraphSubset } from "./experiments";

export function resolveBlueprints(blueprints: Blueprint[]): ResolvedGraphSubset {
  const nodes: NarrativeNode[] = [];
  const edges: NarrativeEdge[] = []; // Blueprints do not declare outbound edges to other systems currently

  blueprints.forEach((bp) => {
    nodes.push({
      id: `bp-${bp.id}`,
      type: "blueprint",
      label: bp.title,
      status: bp.status,
      visibility: bp.visibility,
      metadata: {
        publishedAt: bp.publishedAt,
        updatedAt: bp.updatedAt || bp.publishedAt,
        objective: bp.objective,
        technologies: bp.technologies,
      },
    });
  });

  return { nodes, edges };
}
