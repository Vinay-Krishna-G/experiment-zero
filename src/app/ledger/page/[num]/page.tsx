import { getLedgerEvents } from "@/narrative/queries/ledger";
import { LedgerTimelineView } from "@/components/narrative";
import { notFound } from "next/navigation";
import Link from "next/link";

const EVENTS_PER_PAGE = 20;

interface PageProps {
  params: Promise<{ num: string }>;
}

export function generateStaticParams() {
  const events = getLedgerEvents();
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE) || 1;
  const params = [];
  for (let i = 1; i <= totalPages; i++) {
    params.push({ num: String(i) });
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { num } = await params;
  return {
    title: `Ledger Page ${num} | Experiment Zero`,
    description: `Browse chronological laboratory ledger entries - Page ${num} of the archival indices.`,
  };
}

export default async function PaginatedLedgerPage({ params }: PageProps) {
  const { num } = await params;
  const pageNum = parseInt(num, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  const events = getLedgerEvents();
  const totalEvents = events.length;
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE) || 1;

  if (pageNum > totalPages) {
    notFound();
  }

  const startIdx = (pageNum - 1) * EVENTS_PER_PAGE;
  const pageEvents = events.slice(startIdx, startIdx + EVENTS_PER_PAGE);

  // Schema structured data for ItemList
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Laboratory Ledger - Page ${num}`,
    "numberOfItems": pageEvents.length,
    "itemListElement": pageEvents.map((event, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://experiment-zero.vercel.app/${event.route}/${event.slug}`,
      "name": event.title,
    })),
  };

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
        "name": `Page ${num}`,
        "item": `https://experiment-zero.vercel.app/ledger/page/${num}`,
      },
    ],
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] font-sans selection:bg-[var(--accent-emerald-dim)] selection:text-[var(--fg-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
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
        initialEvents={pageEvents} 
        title={`Ledger Archives (Page ${num} of ${totalPages})`} 
      />

      {/* Pagination controls */}
      <footer className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs text-[var(--fg-muted)]">
        {pageNum > 1 ? (
          <Link href={`/ledger/page/${pageNum - 1}`} className="hover:text-emerald-300 transition">
            &larr; Previous Page
          </Link>
        ) : (
          <span className="opacity-30">&larr; Previous Page</span>
        )}

        <span>Page {pageNum} of {totalPages}</span>

        {pageNum < totalPages ? (
          <Link href={`/ledger/page/${pageNum + 1}`} className="hover:text-emerald-300 transition">
            Next Page &rarr;
          </Link>
        ) : (
          <span className="opacity-30">Next Page &rarr;</span>
        )}
      </footer>
    </main>
  );
}
