import { KNOWLEDGE_ARTIFACTS } from "../registry";
import { getNode } from "@/narrative/graph";
import type { 
  KnowledgeArtifact, 
  InsightArticleViewData, 
  ConnectedNodeLink, 
  SiblingInsightLink,
  NodeType
} from "../types";

/**
 * Retrieves all public knowledge artifacts.
 */
export function getKnowledgeArtifacts(): KnowledgeArtifact[] {
  return KNOWLEDGE_ARTIFACTS.filter((a) => a.visibility === "public");
}

/**
 * Resolves a full article view payload by slug, mapping graph sources and related insights.
 */
export function getInsightArticleData(slug: string): InsightArticleViewData | null {
  const artifact = KNOWLEDGE_ARTIFACTS.find(
    (a) => a.slug === slug && (a.visibility === "public" || process.env.NODE_ENV === "development")
  );
  if (!artifact) return null;

  const skills = artifact.careerSignal.demonstrates;

  // Resolve sources to narrative graph nodes
  const connectedNodes: ConnectedNodeLink[] = [];
  for (const source of artifact.sources) {
    const node = getNode(source.nodeId);
    if (!node) continue;

    let route: "experiments" | "blueprints" | "research" = "research";
    let nodeSlug = node.id;

    if (node.type === "experiment") {
      route = "experiments";
      nodeSlug = node.id.replace("exp-", "");
    } else if (node.type === "blueprint") {
      route = "blueprints";
      nodeSlug = node.id.replace("bp-", "");
    } else if (node.type === "research") {
      route = "research";
      nodeSlug = node.id.replace("res-", "");
    }

    connectedNodes.push({
      id: node.id,
      slug: nodeSlug,
      type: node.type as NodeType,
      label: node.label,
      route,
    });
  }

  // Resolve related/sibling insights
  // 1. Explicitly linked artifacts in relationships
  const relatedSlugsOrIds = new Set<string>(
    artifact.relationships.map((r) => r.targetArtifactId)
  );

  // 2. Fallback: Sibling artifacts sharing the same category
  const siblingArtifacts = KNOWLEDGE_ARTIFACTS.filter(
    (a) => 
      a.id !== artifact.id && 
      a.visibility === "public" && 
      (a.knowledgeCategory === artifact.knowledgeCategory || relatedSlugsOrIds.has(a.id))
  );

  const relatedInsights: SiblingInsightLink[] = siblingArtifacts.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: a.knowledgeCategory,
  }));

  return {
    artifact,
    skills,
    connectedNodes,
    relatedInsights,
  };
}
