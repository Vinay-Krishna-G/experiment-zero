import { getNodesByType, getConnectedNodes, getOutboundEdges } from "../graph";
import type { LedgerEvent, LedgerSemanticRelation } from "@/components/narrative/types";

/**
 * Traverses NARRATIVE_GRAPH and resolves all entity nodes into chronological LedgerEvent records.
 * Incorporates importance scores, tag weights, AI summary mockups, and semantic relationship triples.
 */
export function getLedgerEvents(): LedgerEvent[] {
  const events: LedgerEvent[] = [];

  // 1. Resolve research logs as ledger events
  const logs = getNodesByType("research");
  logs.forEach((log) => {
    const parents = getConnectedNodes(log.id, "outbound");
    const parent = parents.find((p) => p.type === "experiment" || p.type === "blueprint");
    
    const projectName = parent ? parent.label : "General Research";
    const projectSlug = parent ? parent.id.replace("exp-", "").replace("bp-", "") : "";
    const tags = (log.metadata.tags as string[]) || [];

    const tagWeights: Record<string, number> = {};
    tags.forEach((tag) => {
      tagWeights[tag] = 1.0;
    });

    const relatedTriples: LedgerSemanticRelation[] = [];
    if (parent) {
      relatedTriples.push({
        subject: log.id,
        predicate: "documents",
        object: parent.id,
        strength: 0.9,
      });
    }

    const isFeatured = log.visibility === "public" && log.id.includes("polish"); // simulate featured weight
    const importanceScore = isFeatured ? 85 : 55;

    events.push({
      id: `event-${log.id}`,
      date: log.metadata.publishedAt,
      type: "research_log",
      knowledgeType: "research",
      importanceScore,
      title: log.label,
      description: (log.metadata.summary as string) || "",
      slug: log.id.replace("res-", ""),
      route: "research",
      severity: "info",
      metadata: {
        projectName,
        projectSlug,
        semanticTags: tags,
        aiSummary: `[AI Analysis] High-value research log on ${projectName} focusing on categories: ${tags.join(", ")}.`,
        tagWeights,
        relatedTriples,
      },
    });
  });

  // 2. Resolve experiment milestones / status events
  const exps = getNodesByType("experiment");
  exps.forEach((exp) => {
    const tags = (exp.metadata.tags as string[]) || [];
    const progress = (exp.metadata.progress as number) || 0;
    const tagWeights: Record<string, number> = {};
    tags.forEach((tag) => {
      tagWeights[tag] = 1.0;
    });

    const relatedTriples: LedgerSemanticRelation[] = [];
    const outbound = getOutboundEdges(exp.id);
    const implementsEdge = outbound.find((edge) => edge.type === "implements");
    if (implementsEdge) {
      relatedTriples.push({
        subject: exp.id,
        predicate: "implements",
        object: implementsEdge.target,
        strength: 1.0,
      });
    }

    const importanceScore = exp.status === "Completed" ? 95 : exp.status === "In Progress" ? 65 : 40;
    const severity = exp.status === "Completed" ? "success" : "info";

    events.push({
      id: `event-${exp.id}-status`,
      date: exp.metadata.updatedAt,
      type: "status_change",
      knowledgeType: "experiment",
      importanceScore,
      title: `${exp.label} Checkpoint`,
      description: `Experiment set to "${exp.status}" (${progress}% completed).`,
      slug: exp.id.replace("exp-", ""),
      route: "experiments",
      severity,
      metadata: {
        projectName: exp.label,
        projectSlug: exp.id.replace("exp-", ""),
        semanticTags: tags,
        aiSummary: `[AI Summary] Project status update for ${exp.label}: "${exp.status}" with progress at ${progress}%.`,
        tagWeights,
        relatedTriples,
      },
    });
  });

  // 3. Resolve blueprints milestones
  const bps = getNodesByType("blueprint");
  bps.forEach((bp) => {
    const technologies = (bp.metadata.technologies as string[]) || [];
    const tagWeights: Record<string, number> = {};
    technologies.forEach((tech) => {
      tagWeights[tech] = 1.0;
    });

    events.push({
      id: `event-${bp.id}-blueprint`,
      date: bp.metadata.publishedAt,
      type: "milestone",
      knowledgeType: "architecture",
      importanceScore: 75,
      title: `${bp.label} Architecture Verified`,
      description: `System objective design and stages specifications completed.`,
      slug: bp.id.replace("bp-", ""),
      route: "blueprints",
      severity: "info",
      metadata: {
        projectName: bp.label,
        projectSlug: bp.id.replace("bp-", ""),
        semanticTags: technologies,
        aiSummary: `[AI Summary] System design verified for ${bp.label} blueprint using tech stack: ${technologies.join(", ")}.`,
        tagWeights,
      },
    });
  });

  // 4. Sort chronologically (newest first)
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
