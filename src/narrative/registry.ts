import { ALL_EXPERIMENTS, ALL_BLUEPRINTS, ALL_RESEARCH_LOGS } from "@/content";
import { resolveExperiments } from "./resolvers/experiments";
import { resolveBlueprints } from "./resolvers/blueprints";
import { resolveResearch } from "./resolvers/research";
import type { NarrativeGraph, NarrativeNode, NarrativeEdge } from "./types";

export function buildNarrativeGraph(): NarrativeGraph {
  const nodes: Record<string, NarrativeNode> = {};
  const edges: NarrativeEdge[] = [];
  const adjacencyList: Record<string, string[]> = {};
  const reverseAdjacencyList: Record<string, string[]> = {};

  const addNode = (node: NarrativeNode) => {
    nodes[node.id] = node;
    adjacencyList[node.id] = [];
    reverseAdjacencyList[node.id] = [];
  };

  // 1. Resolve content subsets
  const expGraph = resolveExperiments(ALL_EXPERIMENTS);
  const bpGraph = resolveBlueprints(ALL_BLUEPRINTS);
  const resGraph = resolveResearch(ALL_RESEARCH_LOGS);

  // 2. Insert all resolved nodes into graph map
  expGraph.nodes.forEach(addNode);
  bpGraph.nodes.forEach(addNode);
  resGraph.nodes.forEach(addNode);

  // 3. Collect all edges
  const rawEdges = [...expGraph.edges, ...bpGraph.edges, ...resGraph.edges];

  // 4. Verify integrity and construct adjacency lists
  rawEdges.forEach((edge) => {
    if (nodes[edge.source] && nodes[edge.target]) {
      edges.push(edge);

      // Outbound map: source -> target
      if (!adjacencyList[edge.source].includes(edge.target)) {
        adjacencyList[edge.source].push(edge.target);
      }

      // Inbound map: target -> source
      if (!reverseAdjacencyList[edge.target].includes(edge.source)) {
        reverseAdjacencyList[edge.target].push(edge.source);
      }
    }
  });

  return {
    nodes,
    edges,
    adjacencyList,
    reverseAdjacencyList,
    metadata: {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
    },
  };
}

export const NARRATIVE_GRAPH = buildNarrativeGraph();
