import type { ContentVisibility } from "@/types";

export type NodeType = "experiment" | "blueprint" | "research" | "field_note";

export type EdgeType =
  | "implements"
  | "relates_to"
  | "documented_by"
  | "inspired_by"
  | "evolves_into";

export interface NodeMetadata {
  publishedAt: string;
  updatedAt: string;
  category?: string;
  [key: string]: unknown; // Strongly typed metadata bag
}

export interface NarrativeNode {
  id: string; // Structured ID e.g., "exp-promptvault" or "bp-promptvault"
  type: NodeType;
  label: string;
  status: string;
  visibility: ContentVisibility;
  metadata: NodeMetadata;
}

export interface NarrativeEdge {
  id: string; // e.g., "edge-exp-promptvault->bp-promptvault"
  source: string;
  target: string;
  type: EdgeType;
  metadata?: Record<string, unknown>;
}

export interface GraphMetadata {
  version: string;
  generatedAt: string;
}

export interface NarrativeGraph {
  nodes: Record<string, NarrativeNode>;
  edges: NarrativeEdge[];
  adjacencyList: Record<string, string[]>; // O(1) outbound traversals
  reverseAdjacencyList: Record<string, string[]>; // O(1) inbound traversals
  metadata: GraphMetadata;
}
