import { getLedgerEvents } from "@/narrative/queries/ledger";
import { getNodesByType } from "@/narrative/graph";
import { LedgerTimelineView } from "@/components/narrative";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const experiments = getNodesByType("experiment");
  return experiments.map((exp) => ({
    slug: exp.id.replace("exp-", ""),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const events = getLedgerEvents();
  const projectEvent = events.find((e) => e.metadata.projectSlug === slug);
  const projectName = projectEvent ? projectEvent.metadata.projectName : slug;

  return {
    title: `${projectName} Project Thread | Experiment Zero`,
    description: `Chronological activity, system builds, and research updates for project ${projectName}.`,
  };
}

export default async function ProjectLedgerPage({ params }: PageProps) {
  const { slug } = await params;

  // Verify project exists in graph
  const expNode = getNodesByType("experiment").find((e) => e.id.replace("exp-", "") === slug);
  if (!expNode) {
    notFound();
  }

  const projectName = expNode.label;
  const events = getLedgerEvents();
  const projectEvents = events.filter((event) => event.metadata.projectSlug === slug);

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
        "name": `${projectName} Thread`,
        "item": `https://experiment-zero.vercel.app/ledger/project/${slug}`,
      },
    ],
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    "name": `${projectName} Evolution Thread`,
    "description": `Activity timeline and development story of ${projectName}.`,
    "url": `https://experiment-zero.vercel.app/ledger/project/${slug}`,
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${projectName} Ledger Events`,
    "numberOfItems": projectEvents.length,
    "itemListElement": projectEvents.map((event, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://experiment-zero.vercel.app/${event.route}/${event.slug}`,
      "name": event.title,
    })),
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-emerald-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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
        initialEvents={projectEvents} 
        title={`${projectName} Development Log`} 
      />
    </main>
  );
}
