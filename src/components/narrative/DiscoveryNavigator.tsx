import Link from "next/link";
import type { DiscoveryNavigatorData } from "./types";

export default function DiscoveryNavigator({ data }: { data: DiscoveryNavigatorData }) {
  const { parentProject, previousLog, nextLog } = data;

  // If there are no previous or next links, we only display target context if parentProject is set
  if (!previousLog && !nextLog && !parentProject) {
    return null;
  }

  return (
    <div className="my-16 border-t border-[var(--border-subtle)] pt-10">
      {parentProject && (
        <div className="text-center mb-6">
          <span className="text-[0.6rem] font-mono tracking-widest text-[var(--fg-muted)] uppercase block mb-1">
            Research Context
          </span>
          <Link 
            href={parentProject.type === "experiment" ? `/experiments/${parentProject.slug}` : `/blueprints/${parentProject.slug}`}
            className="text-sm font-serif text-emerald-400 hover:text-emerald-300 transition"
          >
            {parentProject.label} ({parentProject.type === "experiment" ? "Experiment" : "Blueprint"})
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Log Link */}
        {previousLog ? (
          <Link 
            href={`/research/${previousLog.slug}`}
            className="group block p-5 rounded border border-[var(--border-subtle)] hover:border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition duration-200 text-left"
          >
            <span className="text-[0.6rem] font-mono tracking-widest text-[var(--fg-muted)] uppercase block mb-1">
              &larr; Previous Insight
            </span>
            <span className="font-serif text-sm font-medium text-[var(--fg-primary)] group-hover:text-emerald-300 transition line-clamp-1">
              {previousLog.title}
            </span>
          </Link>
        ) : (
          <div className="p-5 rounded border border-dashed border-[var(--border-subtle)] opacity-30 text-left">
            <span className="text-[0.6rem] font-mono tracking-widest text-[var(--fg-subtle)] uppercase block mb-1">
              &larr; Previous Insight
            </span>
            <span className="text-sm font-serif italic text-[var(--fg-muted)] font-light">
              Beginning of chain
            </span>
          </div>
        )}

        {/* Next Log Link */}
        {nextLog ? (
          <Link 
            href={`/research/${nextLog.slug}`}
            className="group block p-5 rounded border border-[var(--border-subtle)] hover:border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition duration-200 text-right"
          >
            <span className="text-[0.6rem] font-mono tracking-widest text-[var(--fg-muted)] uppercase block mb-1">
              Next Insight &rarr;
            </span>
            <span className="font-serif text-sm font-medium text-[var(--fg-primary)] group-hover:text-emerald-300 transition line-clamp-1">
              {nextLog.title}
            </span>
          </Link>
        ) : (
          <div className="p-5 rounded border border-dashed border-[var(--border-subtle)] opacity-30 text-right">
            <span className="text-[0.6rem] font-mono tracking-widest text-[var(--fg-subtle)] uppercase block mb-1">
              Next Insight &rarr;
            </span>
            <span className="text-sm font-serif italic text-[var(--fg-muted)] font-light">
              End of chain
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
