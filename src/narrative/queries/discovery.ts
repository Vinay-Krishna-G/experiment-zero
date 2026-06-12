import { getNode, getOutboundEdges, getConnectedNodes } from "../graph";
import type { DiscoveryNavigatorData } from "@/components/narrative/types";

/**
 * Resolves narrative page navigation elements for a research log, identifying the parent project
 * and siblings within the shared category. Implements a deterministic sort order: publishedAt, then slug.
 */
export function getDiscoveryNavigator(id: string): DiscoveryNavigatorData | null {
  const logNode = getNode(`res-${id}`);
  if (!logNode) return null;

  // 1. Identify target parent project from outbound edges
  const outbound = getOutboundEdges(logNode.id);
  const targetEdge = outbound.find((edge) => edge.type === "documented_by");
  if (!targetEdge) {
    return { logId: id, title: logNode.label };
  }

  const targetNode = getNode(targetEdge.target);
  if (!targetNode) {
    return { logId: id, title: logNode.label };
  }

  // 2. Resolve sibling logs documenting the same project node
  const inboundSiblings = getConnectedNodes(targetNode.id, "inbound");
  const sortedSiblings = inboundSiblings
    .filter((node) => node.type === "research")
    .sort((a, b) => {
      const dateA = new Date(a.metadata.publishedAt).getTime();
      const dateB = new Date(b.metadata.publishedAt).getTime();
      if (dateA !== dateB) return dateA - dateB;
      // Tie breaker using slug ID sorting to be completely deterministic
      return a.id.localeCompare(b.id);
    });

  const currentIndex = sortedSiblings.findIndex((node) => node.id === logNode.id);
  const prevNode = currentIndex > 0 ? sortedSiblings[currentIndex - 1] : undefined;
  const nextNode = currentIndex < sortedSiblings.length - 1 ? sortedSiblings[currentIndex + 1] : undefined;

  const parentProject = {
    id: targetNode.id.replace("exp-", "").replace("bp-", ""),
    type: targetNode.type as "experiment" | "blueprint",
    label: targetNode.label,
    slug: targetNode.id.replace("exp-", "").replace("bp-", ""),
  };

  return {
    logId: id,
    title: logNode.label,
    parentProject,
    previousLog: prevNode
      ? {
          id: prevNode.id.replace("res-", ""),
          slug: prevNode.id.replace("res-", ""),
          title: prevNode.label,
        }
      : undefined,
    nextLog: nextNode
      ? {
          id: nextNode.id.replace("res-", ""),
          slug: nextNode.id.replace("res-", ""),
          title: nextNode.label,
        }
      : undefined,
  };
}
