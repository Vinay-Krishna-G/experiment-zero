import type { ContentVisibility, EvidenceBlock } from "@/types";

export type NodeType = "experiment" | "blueprint" | "research" | "field_note";

export type KnowledgeCategory =
  | "lesson"
  | "pattern"
  | "antipattern"
  | "discovery"
  | "architectural_decision"
  | "failure_analysis"
  | "performance_insight"
  | "engineering_principle";

export type KnowledgeTier =
  | "observation"
  | "validated_pattern"
  | "engineering_principle";

export type ArtifactLifecycle =
  | "draft"
  | "emerging"
  | "validated"
  | "deprecated";

export type ArtifactSourceType =
  | "research"
  | "experiment"
  | "blueprint"
  | "ledger_event"
  | "impact";

export interface ArtifactSource {
  nodeId: string; // E.g., "res-log1"
  sourceType: ArtifactSourceType;
  evidenceStrength: number; // 0 to 1
  context: string;
}

export interface ArtifactRelationship {
  targetArtifactId: string;
  relationType: "evolves_from" | "mitigates" | "extends" | "conflicts_with";
  strength: number; // 0 to 1
}

export interface CareerSignal {
  demonstrates: string[];
}

export interface ArtifactMetrics {
  viewsCount: number;
  complexityRank: number; // 0 to 10
}

export interface KnowledgeArtifact {
  id: string;
  slug: string;
  title: string;
  summary: string;
  takeaway: string;
  visibility: ContentVisibility;
  knowledgeCategory: KnowledgeCategory;
  knowledgeTier: KnowledgeTier;
  lifecycleStatus: ArtifactLifecycle;
  importanceScore: number; // 0 to 100
  confidenceScore: number; // 0 to 100
  
  // Recruiter contexts
  problemContext: string;
  discoveryContext: string;
  importanceContext: string;
  changeContext: string;
  impactContext: string;

  careerSignal: CareerSignal;
  sources: ArtifactSource[];
  relationships: ArtifactRelationship[];
  
  metadata: {
    semanticTags: string[];
    entityReferences: string[];
    embeddingUri?: string;
    embeddingModel?: string;
  };
  metrics: ArtifactMetrics;
  evidence?: EvidenceBlock;
}

// ─── Cluster Mappings ────────────────────────────────────────────────────────

export interface ClusterRelationship {
  targetClusterId: string;
  relationType: "prerequisite" | "extensions" | "complements";
  strength: number; // 0 to 1
}

export interface ClusterMetrics {
  totalArtifacts: number;
  averageImportance: number;
}

export interface KnowledgeCluster {
  id: string; // e.g. "cluster-system-design"
  title: string;
  category: string; // matches Category dynamic URL slug
  description: string;
  capabilitySummary: string; // Recruiter capabilities summary
  artifactIds: string[];
  relationships: ClusterRelationship[];
  metrics: ClusterMetrics;
}

// ─── View Payloads ────────────────────────────────────────────────────────────

export interface ConnectedNodeLink {
  id: string;
  slug: string;
  type: NodeType;
  label: string;
  route: "experiments" | "blueprints" | "research";
}

export interface SiblingInsightLink {
  id: string;
  slug: string;
  title: string;
  category: KnowledgeCategory;
}

export interface InsightArticleViewData {
  artifact: KnowledgeArtifact;
  skills: string[];
  connectedNodes: ConnectedNodeLink[];
  relatedInsights: SiblingInsightLink[];
}

export interface CategoryLandingData {
  cluster: KnowledgeCluster;
  artifacts: KnowledgeArtifact[];
  relatedClusters: KnowledgeCluster[];
}
