import { getNode, getConnectedNodes } from "../graph";
import type { LineageViewData, LineageImplementationItem } from "@/components/narrative/types";

/**
 * Resolves architectural lineage records for a blueprint, identifying implemented experiments
 * from the graph and grouping them by completion status.
 */
export function getBlueprintLineage(id: string): LineageViewData | null {
  const bpNode = getNode(`bp-${id}`);
  if (!bpNode) return null;

  // Find all implementing nodes via inbound connections
  const inboundNodes = getConnectedNodes(bpNode.id, "inbound");
  
  const active: LineageImplementationItem[] = [];
  const completed: LineageImplementationItem[] = [];
  const planned: LineageImplementationItem[] = [];

  inboundNodes
    .filter((node) => node.type === "experiment")
    .forEach((node) => {
      const item: LineageImplementationItem = {
        id: node.id.replace("exp-", ""),
        slug: node.id.replace("exp-", ""),
        title: node.label,
        status: node.status,
        progress: (node.metadata.progress as number) || 0,
      };

      if (node.status === "Completed") {
        completed.push(item);
      } else if (node.status === "Planned") {
        planned.push(item);
      } else {
        active.push(item);
      }
    });

  return {
    blueprintId: id,
    title: bpNode.label,
    status: bpNode.status,
    objective: (bpNode.metadata.objective as string) || "",
    implementations: { active, completed, planned },
    technologies: (bpNode.metadata.technologies as string[]) || [],
  };
}
