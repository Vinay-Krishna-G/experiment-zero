import Link from "next/link";
import LedgerTimelineView from "./LedgerTimelineView";
import type { LedgerEvent } from "./types";

interface LedgerHubProps {
  events: LedgerEvent[];
  stats: {
    totalEvents: number;
    activeExperiments: number;
    verifiedBlueprints: number;
    researchLogs: number;
  };
  projects: { name: string; slug: string; status: string }[];
  tags: string[];
}

export default function LedgerHub({ events, stats, projects, tags }: LedgerHubProps) {
  // Take top 5 events for recent preview timeline
  const recentEvents = events.slice(0, 5);

  return (
    <main className="max-w-5xl mx-auto px-6 py-24 min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-emerald-500/30">
      
      {/* Header section */}
      <header className="mb-16 border-b border-white/10 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
            Platform Engine: Phase 7D
          </span>
          <Link 
            href="/ledger/feed.xml"
            className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono tracking-widest uppercase text-orange-400 hover:text-orange-300 transition"
            target="_blank"
            aria-label="Syndicate ledger via RSS Feed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            RSS Syndicate
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Laboratory Ledger
        </h1>
        <p className="text-lg text-white/60 font-light max-w-2xl leading-relaxed">
          The canonical chronological index of Experiment Zero. A semantic knowledge archive tracking system builds, dynamic visual profile transitions, architectural verification stages, and research notebooks.
        </p>
      </header>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16" aria-label="Laboratory metrics summary">
        {[
          { label: "Ledger Events", value: stats.totalEvents },
          { label: "Active Nodes", value: stats.activeExperiments },
          { label: "Verified Blueprints", value: stats.verifiedBlueprints },
          { label: "Research Entries", value: stats.researchLogs },
        ].map((stat, idx) => (
          <div key={idx} className="p-4 rounded border border-white/5 bg-white/[0.01] text-left">
            <div className="text-[0.6rem] font-mono uppercase tracking-widest text-white/40 mb-1">{stat.label}</div>
            <div className="text-2xl font-mono text-white font-semibold">{stat.value}</div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main timeline stream (Left) */}
        <div className="lg:col-span-2">
          <LedgerTimelineView initialEvents={recentEvents} title="Recent Ledger Checkpoints" />
          
          <div className="mt-8 text-center">
            <Link 
              href="/ledger/page/1"
              className="inline-block text-xs uppercase tracking-wider text-emerald-400 hover:text-emerald-300 font-mono border border-emerald-500/20 hover:border-emerald-500/40 px-6 py-3 rounded transition bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer"
            >
              Browse Full Chronological Archive &rarr;
            </Link>
          </div>
        </div>

        {/* Sidebar panels (Right) */}
        <aside className="space-y-12" aria-label="Timeline navigation filters">
          
          {/* Project Threads */}
          <section className="p-6 rounded border border-white/5 bg-white/[0.01]">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono font-semibold">
              Project Threads
            </h3>
            <ul className="space-y-3">
              {projects.map((proj) => (
                <li key={proj.slug}>
                  <Link 
                    href={`/ledger/project/${proj.slug}`}
                    className="block p-3 rounded border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition duration-200"
                  >
                    <span className="font-serif text-sm font-medium text-white block hover:text-emerald-300 transition">
                      {proj.name}
                    </span>
                    <span className="text-[0.6rem] font-mono text-white/40 tracking-widest uppercase">
                      status: {proj.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Topical categories */}
          <section className="p-6 rounded border border-white/5 bg-white/[0.01]">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono font-semibold">
              Semantic Tag Silos
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/ledger/tag/${tag.toLowerCase()}`}
                  className="px-3 py-1.5 text-xs font-mono bg-white/5 border border-white/10 hover:border-white/20 rounded text-white/60 hover:text-white transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </section>

          {/* Annual archives */}
          <section className="p-6 rounded border border-white/5 bg-white/[0.01]">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono font-semibold">
              Annual ledgers
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {["2026", "2025"].map((year) => (
                <Link
                  key={year}
                  href={`/ledger/year/${year}`}
                  className="p-3 text-center text-xs font-mono bg-white/5 border border-white/10 hover:border-white/20 rounded text-white/60 hover:text-white transition block"
                >
                  {year} Archive
                </Link>
              ))}
            </div>
          </section>

        </aside>
      </div>

    </main>
  );
}
