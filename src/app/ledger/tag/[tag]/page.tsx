import { getLedgerEvents } from "@/narrative/queries/ledger";
import { getNodesByType } from "@/narrative/graph";
import { LedgerTimelineView } from "@/components/narrative";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  const tagsSet = new Set<string>();
  
  const experiments = getNodesByType("experiment");
  experiments.forEach((e) => {
    const tags = (e.metadata.tags as string[]) || [];
    tags.forEach((t) => tagsSet.add(t.toLowerCase()));
  });

  const logs = getNodesByType("research");
  logs.forEach((l) => {
    const tags = (l.metadata.tags as string[]) || [];
    tags.forEach((t) => tagsSet.add(t.toLowerCase()));
  });

  return Array.from(tagsSet).map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  return {
    title: `Silo: #${capitalizedTag} | Experiment Zero`,
    description: `Chronological systems, logs, and development updates matching category tag #${capitalizedTag}.`,
  };
}

export default async function TagLedgerPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag).toLowerCase();

  const events = getLedgerEvents();
  const tagEvents = events.filter((event) =>
    event.metadata.semanticTags.some((t) => t.toLowerCase() === decodedTag)
  );

  // If no events match, return notFound
  if (tagEvents.length === 0) {
    notFound();
  }

  const capitalizedTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  // Structured Data schemas
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
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Silo #${capitalizedTag}`,
        "item": `https://experiment-zero.vercel.app/ledger/tag/${decodedTag}`,
      },
    ],
  };

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": `#${capitalizedTag}`,
    "description": `Topical classification node within the Experiment Zero knowledge graph.`,
    "inDefinedTermSet": "https://experiment-zero.vercel.app/ledger",
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Silo: #${capitalizedTag}`,
    "description": `Archival resources and timeline history relating to the topical category #${capitalizedTag}.`,
    "url": `https://experiment-zero.vercel.app/ledger/tag/${decodedTag}`,
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] font-sans selection:bg-[var(--accent-emerald-dim)] selection:text-[var(--fg-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="mb-6">
        <Link 
          href="/ledger" 
          className="text-xs uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition font-mono"
        >
          &larr; Return to Knowledge Hub
        </Link>
      </div>

      <LedgerTimelineView 
        initialEvents={tagEvents} 
        title={`Category Silo: #${capitalizedTag}`} 
      />
    </main>
  );
}
