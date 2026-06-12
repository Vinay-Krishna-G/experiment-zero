import { NARRATIVE_GRAPH } from "./registry";
import type { NarrativeNode, NarrativeEdge, NodeType } from "./types";

/**
 * Retrieves a single NarrativeNode by ID.
 * Performance: O(1)
 */
export function getNode(id: string): NarrativeNode | undefined {
  return NARRATIVE_GRAPH.nodes[id];
}

/**
 * Retrieves all nodes of a specific NodeType.
 * Performance: O(N)
 */
export function getNodesByType(type: NodeType): NarrativeNode[] {
  return Object.values(NARRATIVE_GRAPH.nodes).filter((node) => node.type === type);
}

/**
 * Retrieves all outbound edges from a specific node.
 * Performance: O(E)
 */
export function getOutboundEdges(nodeId: string): NarrativeEdge[] {
  return NARRATIVE_GRAPH.edges.filter((edge) => edge.source === nodeId);
}

/**
 * Retrieves all inbound edges pointing to a specific node.
 * Performance: O(E)
 */
export function getInboundEdges(nodeId: string): NarrativeEdge[] {
  return NARRATIVE_GRAPH.edges.filter((edge) => edge.target === nodeId);
}

/**
 * Retrieves adjacent nodes.
 * direction: "outbound" | "inbound" | "both"
 * Performance: O(1) adjacency lookup
 */
export function getConnectedNodes(
  nodeId: string,
  direction: "outbound" | "inbound" | "both" = "outbound"
): NarrativeNode[] {
  const nodeIds = new Set<string>();

  if (direction === "outbound" || direction === "both") {
    const outbound = NARRATIVE_GRAPH.adjacencyList[nodeId] || [];
    outbound.forEach((id) => nodeIds.add(id));
  }

  if (direction === "inbound" || direction === "both") {
    const inbound = NARRATIVE_GRAPH.reverseAdjacencyList[nodeId] || [];
    inbound.forEach((id) => nodeIds.add(id));
  }

  const result: NarrativeNode[] = [];
  nodeIds.forEach((id) => {
    const node = NARRATIVE_GRAPH.nodes[id];
    if (node) {
      result.push(node);
    }
  });

  return result;
}

/**
 * Finds the shortest path between startId and endId using Breadth-First Search (BFS).
 * Visited sets guarantee zero infinite loops on cyclic relationships.
 * Returns string[] representing node ID sequence, or null if no path exists.
 */
export function getPath(startId: string, endId: string): string[] | null {
  if (!NARRATIVE_GRAPH.nodes[startId] || !NARRATIVE_GRAPH.nodes[endId]) {
    return null;
  }
  if (startId === endId) {
    return [startId];
  }

  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const path = queue.shift();
    if (!path) continue;

    const currentId = path[path.length - 1];
    const neighbors = NARRATIVE_GRAPH.adjacencyList[currentId] || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        const newPath = [...path, neighbor];
        if (neighbor === endId) {
          return newPath;
        }
        queue.push(newPath);
      }
    }
  }

  return null;
}
