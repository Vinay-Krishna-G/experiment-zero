import Link from "next/link";
import type { DiscoveryNavigatorData } from "./types";

export default function DiscoveryNavigator({ data }: { data: DiscoveryNavigatorData }) {
  const { parentProject, previousLog, nextLog } = data;

  // If there are no previous or next links, we only display target context if parentProject is set
  if (!previousLog && !nextLog && !parentProject) {
    return null;
  }

  return (
    <div className="my-16 border-t border-white/10 pt-10">
      {parentProject && (
        <div className="text-center mb-6">
          <span className="text-[0.6rem] font-mono tracking-widest text-white/40 uppercase block mb-1">
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
            className="group block p-5 rounded border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition duration-200 text-left"
          >
            <span className="text-[0.6rem] font-mono tracking-widest text-white/40 uppercase block mb-1">
              &larr; Previous Insight
            </span>
            <span className="font-serif text-sm font-medium text-white group-hover:text-emerald-300 transition line-clamp-1">
              {previousLog.title}
            </span>
          </Link>
        ) : (
          <div className="p-5 rounded border border-dashed border-white/5 opacity-30 text-left">
            <span className="text-[0.6rem] font-mono tracking-widest text-white/30 uppercase block mb-1">
              &larr; Previous Insight
            </span>
            <span className="text-sm font-serif italic text-white/40 font-light">
              Beginning of chain
            </span>
          </div>
        )}

        {/* Next Log Link */}
        {nextLog ? (
          <Link 
            href={`/research/${nextLog.slug}`}
            className="group block p-5 rounded border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition duration-200 text-right"
          >
            <span className="text-[0.6rem] font-mono tracking-widest text-white/40 uppercase block mb-1">
              Next Insight &rarr;
            </span>
            <span className="font-serif text-sm font-medium text-white group-hover:text-emerald-300 transition line-clamp-1">
              {nextLog.title}
            </span>
          </Link>
        ) : (
          <div className="p-5 rounded border border-dashed border-white/5 opacity-30 text-right">
            <span className="text-[0.6rem] font-mono tracking-widest text-white/30 uppercase block mb-1">
              Next Insight &rarr;
            </span>
            <span className="text-sm font-serif italic text-white/40 font-light">
              End of chain
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
