import { NARRATIVE_GRAPH } from "../registry";
import { getPath, getConnectedNodes } from "../graph";

function runNarrativeTests() {
  console.log("=== RUNNING NARRATIVE GRAPH INTEGRITY TESTS ===");
  let failures = 0;

  // 1. Verify Node Count matches content registries
  const nodeCount = Object.keys(NARRATIVE_GRAPH.nodes).length;
  const edgeCount = NARRATIVE_GRAPH.edges.length;
  
  if (nodeCount === 0) {
    console.error("[FAIL] Graph contains 0 nodes. Registry compilation failed.");
    failures++;
  } else {
    console.log(`[PASS] Graph compiles successfully with ${nodeCount} nodes and ${edgeCount} edges.`);
  }

  // 2. Check for Dangling Edges (source or target node does not exist in graph)
  const danglingEdges = NARRATIVE_GRAPH.edges.filter(
    (edge) => !NARRATIVE_GRAPH.nodes[edge.source] || !NARRATIVE_GRAPH.nodes[edge.target]
  );
  if (danglingEdges.length > 0) {
    console.error(`[FAIL] Found ${danglingEdges.length} dangling edges:`);
    danglingEdges.forEach((edge) => {
      console.error(`       Edge: ${edge.id} (source: ${edge.source}, target: ${edge.target})`);
    });
    failures++;
  } else {
    console.log("[PASS] Graph contains no dangling edges.");
  }

  // 3. Directed Acyclic Graph (DAG) Check for hierarchical edges (implements, documented_by)
  // Check if implements / documented_by form any cycles
  const directedAdjacency: Record<string, string[]> = {};
  Object.keys(NARRATIVE_GRAPH.nodes).forEach((id) => {
    directedAdjacency[id] = [];
  });

  NARRATIVE_GRAPH.edges.forEach((edge) => {
    if (edge.type === "implements" || edge.type === "documented_by") {
      directedAdjacency[edge.source].push(edge.target);
    }
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();
  let hasCycle = false;

  function dfsCycle(nodeId: string): boolean {
    if (recStack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = directedAdjacency[nodeId] || [];
    for (const neighbor of neighbors) {
      if (dfsCycle(neighbor)) return true;
    }

    recStack.delete(nodeId);
    return false;
  }

  for (const node of Object.keys(NARRATIVE_GRAPH.nodes)) {
    if (dfsCycle(node)) {
      hasCycle = true;
      break;
    }
  }

  if (hasCycle) {
    console.error("[FAIL] Cycle detected in directed implement/document hierarchy.");
    failures++;
  } else {
    console.log("[PASS] Hierarchical relationships are cycle-free (DAG verified).");
  }

  // 4. Validate BFS pathfinding
  // Verification path: exp-promptvault should connect to bp-promptvault via "implements"
  const promptvaultPath = getPath("exp-promptvault", "bp-promptvault");
  if (!promptvaultPath) {
    console.error("[FAIL] Expected path from exp-promptvault to bp-promptvault but found none.");
    failures++;
  } else {
    const expected = ["exp-promptvault", "bp-promptvault"];
    const matches = promptvaultPath.length === expected.length && promptvaultPath.every((v, i) => v === expected[i]);
    if (!matches) {
      console.error(`[FAIL] Path search returned wrong sequence: ${JSON.stringify(promptvaultPath)}`);
      failures++;
    } else {
      console.log(`[PASS] BFS path resolution correct: ${promptvaultPath.join(" -> ")}`);
    }
  }

  // 5. Validate bidirectional O(1) adjacency traversals
  const connectedOut = getConnectedNodes("exp-promptvault", "outbound");
  const connectedIn = getConnectedNodes("bp-promptvault", "inbound");

  const hasOutBP = connectedOut.some((n) => n.id === "bp-promptvault");
  const hasInEXP = connectedIn.some((n) => n.id === "exp-promptvault");

  if (!hasOutBP || !hasInEXP) {
    console.error("[FAIL] Adjacency or reverse-adjacency mapping is incomplete.");
    failures++;
  } else {
    console.log("[PASS] Bidirectional adjacency traversals function correctly.");
  }

  if (failures > 0) {
    console.error(`\nNarrative graph validation failed: ${failures} errors.`);
    process.exit(1);
  } else {
    console.log("\n[All Narrative Graph validation checks passed successfully]\n");
  }
}

runNarrativeTests();
