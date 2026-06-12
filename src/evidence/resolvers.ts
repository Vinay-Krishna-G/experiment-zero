import { ALL_EXPERIMENTS, ALL_BLUEPRINTS, ALL_RESEARCH_LOGS } from "@/content";
import { KNOWLEDGE_ARTIFACTS } from "@/insights/registry";
import type { SkillMatrixEntry, SkillNodeLink, EngineeringSignal } from "./types";

/**
 * Builds the Skill Evidence Matrix mapping signals to supporting nodes across all content types.
 * Performance: O(N) traversal.
 */
export function getSkillMatrix(): SkillMatrixEntry[] {
  const matrix = {} as Record<EngineeringSignal, SkillNodeLink[]>;

  const handleItem = (
    item: { id: string; slug: string; title: string; evidence?: import("@/types").EvidenceBlock },
    type: "experiment" | "blueprint" | "research" | "insight",
    route: string
  ) => {
    if (!item.evidence || !item.evidence.engineeringSignals) return;

    item.evidence.engineeringSignals.forEach((sig: string) => {
      const signalKey = sig as EngineeringSignal;
      if (!matrix[signalKey]) {
        matrix[signalKey] = [];
      }

      const exists = matrix[signalKey].some((node) => node.id === item.id);
      if (!exists) {
        matrix[signalKey].push({
          id: item.id,
          slug: item.slug,
          title: item.title,
          type,
          route,
        });
      }
    });
  };

  // Process Experiments
  ALL_EXPERIMENTS.forEach((exp) => handleItem(exp, "experiment", "experiments"));

  // Process Blueprints
  ALL_BLUEPRINTS.forEach((bp) => handleItem(bp, "blueprint", "blueprints"));

  // Process Research Logs
  ALL_RESEARCH_LOGS.forEach((log) => handleItem(log, "research", "research"));

  // Process Knowledge Insights
  KNOWLEDGE_ARTIFACTS.forEach((art) => handleItem(art, "insight", "insights"));

  return Object.entries(matrix)
    .map(([signal, nodes]) => ({
      signal: signal as EngineeringSignal,
      nodes,
    }))
    .sort((a, b) => a.signal.localeCompare(b.signal));
}
