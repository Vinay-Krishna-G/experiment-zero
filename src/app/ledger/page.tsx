import { getLedgerEvents } from "@/narrative/queries/ledger";
import { getNodesByType } from "@/narrative/graph";
import { LedgerHub } from "@/components/narrative";

export const metadata = {
  title: "Laboratory Ledger | Experiment Zero",
  description: "The chronological ledger hub of Experiment Zero. Semantic indices, timelines, system architecture milestones, and research logs archives.",
};

export default function LedgerHubPage() {
  const events = getLedgerEvents();

  // 1. Compile metrics
  const totalEvents = events.length;
  const experiments = getNodesByType("experiment");
  const blueprints = getNodesByType("blueprint");
  const logs = getNodesByType("research");

  const activeExperiments = experiments.filter(
    (e) => e.status !== "Completed" && e.status !== "Planned" && e.status !== "On Hold"
  ).length;
  
  const verifiedBlueprints = blueprints.filter(
    (b) => b.status === "Verified"
  ).length;

  const stats = {
    totalEvents,
    activeExperiments,
    verifiedBlueprints,
    researchLogs: logs.length,
  };

  // 2. Map project threads
  const projects = experiments.map((e) => ({
    name: e.label,
    slug: e.id.replace("exp-", ""),
    status: e.status,
  }));

  // 3. Extract unique tags
  const tagsSet = new Set<string>();
  experiments.forEach((e) => {
    const etags = (e.metadata.tags as string[]) || [];
    etags.forEach((t) => tagsSet.add(t));
  });
  logs.forEach((l) => {
    const ltags = (l.metadata.tags as string[]) || [];
    ltags.forEach((t) => tagsSet.add(t));
  });
  const tags = Array.from(tagsSet);

  // 4. Structured Data schemas
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Laboratory",
        "item": "https://experiment-zero.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ledger",
        "item": "https://experiment-zero.vercel.app/ledger",
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Laboratory Ledger Hub",
    "description": "The canonical archival database index tracking chronological research insights, status updates, and code milestones.",
    "url": "https://experiment-zero.vercel.app/ledger",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <LedgerHub 
        events={events} 
        stats={stats} 
        projects={projects} 
        tags={tags} 
      />
    </>
  );
}
