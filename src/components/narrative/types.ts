export interface JourneyLogItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export interface JourneyViewData {
  experimentId: string;
  title: string;
  status: string;
  progress: number;
  timeline: { label: string; status: "done" | "current" | "pending" }[];
  logs: JourneyLogItem[];
  blueprintId?: string;
  blueprintTitle?: string;
}

export interface LineageImplementationItem {
  id: string;
  slug: string;
  title: string;
  status: string;
  progress: number;
}

export interface LineageViewData {
  blueprintId: string;
  title: string;
  status: string;
  objective: string;
  implementations: {
    active: LineageImplementationItem[];
    completed: LineageImplementationItem[];
    planned: LineageImplementationItem[];
  };
  technologies: string[];
}

export interface SiblingLogLink {
  id: string;
  slug: string;
  title: string;
}

export interface DiscoveryNavigatorData {
  logId: string;
  title: string;
  parentProject?: {
    id: string;
    type: "experiment" | "blueprint";
    label: string;
    slug: string;
  };
  previousLog?: SiblingLogLink;
  nextLog?: SiblingLogLink;
}

// ─── Phase 7D Ledger & Knowledge Hub Additions ────────────────────────────────

export type KnowledgeType =
  | "architecture"
  | "research"
  | "lesson"
  | "pattern"
  | "milestone"
  | "implementation"
  | "experiment";

export interface KnowledgeArtifact {
  id: string;
  title: string;
  summary: string;
  sourceEvents: string[]; // Event IDs that contributed to this artifact
  knowledgeType: "architecture" | "research" | "lesson" | "pattern";
  importanceScore: number; // 0 to 100
}

export interface ImpactArtifact {
  id: string;
  title: string;
  impactType:
    | "performance"
    | "architecture"
    | "developer_experience"
    | "scalability"
    | "seo"
    | "accessibility";
  summary: string;
  evidence: string[]; // File URLs or commits
  relatedEvents: string[]; // Ledger event IDs
  importanceScore: number; // 0 to 100
}

export interface LedgerSemanticRelation {
  subject: string;
  predicate: string;
  object: string;
  strength: number; // 0 to 1
}

export interface LedgerEvent {
  id: string; // e.g. "event-exp-promptvault-status"
  date: string;
  type: "status_change" | "milestone" | "research_log";
  knowledgeType: KnowledgeType;
  importanceScore: number; // 0 to 100
  title: string;
  description: string;
  slug: string;
  route: "experiments" | "blueprints" | "research";
  severity: "info" | "success" | "warning";
  metadata: {
    projectName: string;
    projectSlug: string;
    semanticTags: string[];
    aiSummary?: string;
    tagWeights?: Record<string, number>;
    embeddingUri?: string;
    embeddingModel?: string;
    relatedTriples?: LedgerSemanticRelation[];
  };
}

export interface LedgerViewData {
  events: LedgerEvent[];
  totalEvents: number;
  currentPage: number;
  totalPages: number;
}
