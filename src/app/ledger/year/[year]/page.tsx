import { getLedgerEvents } from "@/narrative/queries/ledger";
import { LedgerTimelineView } from "@/components/narrative";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ year: string }>;
}

export function generateStaticParams() {
  const yearsSet = new Set<string>();
  const events = getLedgerEvents();
  
  events.forEach((event) => {
    const year = new Date(event.date).getFullYear().toString();
    yearsSet.add(year);
  });

  return Array.from(yearsSet).map((year) => ({
    year,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { year } = await params;
  return {
    title: `${year} Ledger Archive | Experiment Zero`,
    description: `Chronological systems, logs, and development updates recorded in the year ${year}.`,
  };
}

export default async function YearLedgerPage({ params }: PageProps) {
  const { year } = await params;
  const targetYear = parseInt(year, 10);

  if (isNaN(targetYear) || targetYear < 2000) {
    notFound();
  }

  const events = getLedgerEvents();
  const yearEvents = events.filter(
    (event) => new Date(event.date).getFullYear() === targetYear
  );

  if (yearEvents.length === 0) {
    notFound();
  }

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
        "name": `${year} Archive`,
        "item": `https://experiment-zero.vercel.app/ledger/year/${year}`,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${year} Laboratory Archive`,
    "description": `Archival resources and timeline history recorded in the year ${year}.`,
    "url": `https://experiment-zero.vercel.app/ledger/year/${year}`,
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] font-sans selection:bg-[var(--accent-emerald-dim)] selection:text-[var(--fg-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
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
        initialEvents={yearEvents} 
        title={`${year} Lab Records`} 
      />
    </main>
  );
}
