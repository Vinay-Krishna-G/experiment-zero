import { getNode, getOutboundEdges, getConnectedNodes } from "../graph";
import type { JourneyViewData, JourneyLogItem } from "@/components/narrative/types";

/**
 * Resolves narrative journey data for an experiment, identifying the connected blueprint
 * and associated research logs in chronological order.
 */
export function getExperimentJourney(id: string): JourneyViewData | null {
  const expNode = getNode(`exp-${id}`);
  if (!expNode) return null;

  // 1. Resolve implemented blueprint via outbound edges
  const outboundEdges = getOutboundEdges(expNode.id);
  const implementsEdge = outboundEdges.find((edge) => edge.type === "implements");
  const bpNode = implementsEdge ? getNode(implementsEdge.target) : undefined;

  // 2. Resolve documented_by logs via inbound connections
  const inboundNodes = getConnectedNodes(expNode.id, "inbound");
  const logs: JourneyLogItem[] = inboundNodes
    .filter((node) => node.type === "research")
    .map((node) => ({
      id: node.id.replace("res-", ""),
      slug: node.id.replace("res-", ""),
      title: node.label,
      date: node.metadata.publishedAt,
      summary: (node.metadata.summary as string) || "",
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    experimentId: id,
    title: expNode.label,
    status: expNode.status,
    progress: (expNode.metadata.progress as number) || 0,
    timeline: (expNode.metadata.timeline as { label: string; status: "done" | "current" | "pending" }[]) || [],
    logs,
    blueprintId: bpNode?.id.replace("bp-", ""),
    blueprintTitle: bpNode?.label,
  };
}
