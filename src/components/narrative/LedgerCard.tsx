import Link from "next/link";
import type { LedgerEvent } from "./types";

export default function LedgerCard({ event }: { event: LedgerEvent }) {
  const { title, date, type, description, slug, route, severity, metadata } = event;
  const { projectName, projectSlug, semanticTags, aiSummary, relatedTriples } = metadata;

  // Colors based on severity
  const severityColors = {
    success: "border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-400",
    warning: "border-amber-500/20 bg-amber-500/[0.02] text-amber-400",
    info: "border-white/10 bg-white/[0.01] text-white/60",
  };

  const badgeColors = {
    status_change: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    milestone: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    research_log: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };

  return (
    <article 
      className={`p-6 rounded-lg border transition duration-300 hover:border-white/15 hover:bg-white/[0.03] ${severityColors[severity]}`}
      aria-label={`${title} event on ${date}`}
    >
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-0.5 rounded text-[0.6rem] font-mono tracking-widest uppercase border ${badgeColors[type]}`}>
            {type.replace("_", " ")}
          </span>
          <span className="text-[0.65rem] font-mono tracking-widest text-white/40">
            {date}
          </span>
        </div>

        {projectName && projectSlug && (
          <Link 
            href={`/ledger/project/${projectSlug}`}
            className="text-[0.65rem] font-mono tracking-widest uppercase text-emerald-400/80 hover:text-emerald-300 transition"
          >
            Silo: {projectName}
          </Link>
        )}
      </header>

      <div className="mb-4">
        <h4 className="font-serif text-lg text-white font-medium tracking-wide mb-2">
          <Link href={`/${route}/${slug}`} className="hover:text-emerald-300 transition">
            {title}
          </Link>
        </h4>
        <p className="text-sm text-white/70 font-light leading-relaxed">
          {description}
        </p>
      </div>

      {aiSummary && (
        <div className="mb-4 p-3 rounded bg-white/[0.01] border border-white/5 text-xs text-white/50 italic leading-relaxed">
          {aiSummary}
        </div>
      )}

      {/* Semantic relation panel (Narrative Graph links) */}
      <footer className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/5">
        {semanticTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[0.55rem] font-mono uppercase tracking-widest text-white/30 mr-1">Tags:</span>
            {semanticTags.map((tag) => (
              <Link
                key={tag}
                href={`/ledger/tag/${tag.toLowerCase()}`}
                className="px-2 py-0.5 text-[0.6rem] font-mono bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 rounded text-white/60 hover:text-white transition"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {relatedTriples && relatedTriples.length > 0 && (
          <div className="text-[0.58rem] font-mono text-white/30">
            <span>Graph links: </span>
            {relatedTriples.map((triple, idx) => (
              <span key={idx} className="text-emerald-400/80">
                {triple.subject.split("-")[1]} &mdash;({triple.predicate})&rarr; {triple.object.split("-")[1]}
              </span>
            ))}
          </div>
        )}
      </footer>
    </article>
  );
}
