import { KNOWLEDGE_ARTIFACTS, KNOWLEDGE_CLUSTERS } from "../registry";
import { getNode } from "@/narrative/graph";

function runInsightsTests() {
  console.log("=== RUNNING KNOWLEDGE INSIGHTS INTEGRITY TESTS ===");
  let failures = 0;

  const artifactIds = new Set<string>();
  const artifactSlugs = new Set<string>();

  // 1. Verify all Knowledge Artifacts
  KNOWLEDGE_ARTIFACTS.forEach((art) => {
    // Unique ID
    if (artifactIds.has(art.id)) {
      console.error(`[FAIL] Duplicate Artifact ID detected: ${art.id}`);
      failures++;
    }
    artifactIds.add(art.id);

    // Unique Slug
    if (artifactSlugs.has(art.slug)) {
      console.error(`[FAIL] Duplicate Artifact Slug detected: ${art.slug}`);
      failures++;
    }
    artifactSlugs.add(art.slug);

    // Validate lifecycle status
    const validLifecycles = ["draft", "emerging", "validated", "deprecated"];
    if (!validLifecycles.includes(art.lifecycleStatus)) {
      console.error(`[FAIL] Artifact (${art.id}) has invalid lifecycle: ${art.lifecycleStatus}`);
      failures++;
    }

    // Validate knowledge category
    const validCategories = [
      "lesson",
      "pattern",
      "antipattern",
      "discovery",
      "architectural_decision",
      "failure_analysis",
      "performance_insight",
      "engineering_principle",
    ];
    if (!validCategories.includes(art.knowledgeCategory)) {
      console.error(`[FAIL] Artifact (${art.id}) has invalid category: ${art.knowledgeCategory}`);
      failures++;
    }

    // Validate sources exist in the Narrative Graph
    art.sources.forEach((source) => {
      const node = getNode(source.nodeId);
      if (!node) {
        console.error(
          `[FAIL] Artifact (${art.id}) references source nodeId "${source.nodeId}" which does not exist in NarrativeGraph.`
        );
        failures++;
      } else {
        // Source type matches
        const graphTypeToSourceType: Record<string, string> = {
          research: "research",
          experiment: "experiment",
          blueprint: "blueprint",
        };
        const expectedSourceType = graphTypeToSourceType[node.type];
        if (expectedSourceType && source.sourceType !== expectedSourceType) {
          console.warn(
            `[WARN] Source type mismatch for Node ${source.nodeId}: graph type "${node.type}" vs registry source type "${source.sourceType}"`
          );
        }
      }
    });

    // Check relationship target exists
    art.relationships.forEach((rel) => {
      const targetExists = KNOWLEDGE_ARTIFACTS.some((a) => a.id === rel.targetArtifactId);
      if (!targetExists) {
        console.error(
          `[FAIL] Artifact (${art.id}) has relationship to targetArtifactId "${rel.targetArtifactId}" which does not exist.`
        );
        failures++;
      }
    });
  });

  // 2. Verify all Knowledge Clusters
  const clusterIds = new Set<string>();
  const clusterCategories = new Set<string>();

  KNOWLEDGE_CLUSTERS.forEach((cluster) => {
    // Unique ID
    if (clusterIds.has(cluster.id)) {
      console.error(`[FAIL] Duplicate Cluster ID: ${cluster.id}`);
      failures++;
    }
    clusterIds.add(cluster.id);

    // Unique category slug
    if (clusterCategories.has(cluster.category)) {
      console.error(`[FAIL] Duplicate Cluster Category: ${cluster.category}`);
      failures++;
    }
    clusterCategories.add(cluster.category);

    // Verify all artifact IDs associated with cluster exist
    cluster.artifactIds.forEach((artId) => {
      if (!artifactIds.has(artId)) {
        console.error(
          `[FAIL] Cluster (${cluster.id}) references artifactId "${artId}" which does not exist in registry.`
        );
        failures++;
      }
    });

    // Verify relationships targets exist
    cluster.relationships.forEach((rel) => {
      const targetExists = KNOWLEDGE_CLUSTERS.some((c) => c.id === rel.targetClusterId);
      if (!targetExists) {
        console.error(
          `[FAIL] Cluster (${cluster.id}) has relationship to targetClusterId "${rel.targetClusterId}" which does not exist.`
        );
        failures++;
      }
    });
  });

  if (failures > 0) {
    console.error(`\nKnowledge platform integrity validation failed: ${failures} errors.`);
    process.exit(1);
  } else {
    console.log("\n[All Knowledge Platform integrity validation checks passed successfully]\n");
  }
}

runInsightsTests();
