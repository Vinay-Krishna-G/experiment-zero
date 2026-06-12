import { KNOWLEDGE_CLUSTERS, KNOWLEDGE_ARTIFACTS } from "../registry";
import type { KnowledgeCluster, CategoryLandingData } from "../types";

/**
 * Returns all active knowledge clusters.
 * Complexity: O(1) runtime.
 */
export function getKnowledgeClusters(): KnowledgeCluster[] {
  return KNOWLEDGE_CLUSTERS;
}

/**
 * Resolves a cluster landing context for a specific category slug.
 * Complexity: O(A + C) where A = total artifacts, C = total clusters.
 */
export function getKnowledgeClusterByCategory(categorySlug: string): CategoryLandingData | null {
  const cluster = KNOWLEDGE_CLUSTERS.find((c) => c.category === categorySlug);
  if (!cluster) return null;

  // Resolve child artifacts
  const artifacts = KNOWLEDGE_ARTIFACTS.filter(
    (art) => cluster.artifactIds.includes(art.id) && art.visibility === "public"
  );

  // Resolve related clusters
  const relatedIds = cluster.relationships.map((r) => r.targetClusterId);
  const relatedClusters = KNOWLEDGE_CLUSTERS.filter((c) => relatedIds.includes(c.id));

  return {
    cluster,
    artifacts,
    relatedClusters,
  };
}
