import Link from "next/link";
import type { JourneyViewData } from "./types";

export default function ExperimentJourneyView({ data }: { data: JourneyViewData }) {
  const { title, status, progress, timeline, logs, blueprintId, blueprintTitle } = data;

  return (
    <div className="my-16 p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">Narrative Journey</h3>
          <h2 className="text-2xl font-serif text-[var(--fg-primary)] font-medium">{title} Timeline</h2>
        </div>

        {blueprintId && blueprintTitle && (
          <Link 
            href={`/blueprints/${blueprintId}`}
            className="inline-flex items-center text-xs uppercase tracking-wider text-emerald-400/80 hover:text-emerald-300 font-mono border border-emerald-500/20 hover:border-emerald-500/40 px-3 py-1.5 rounded transition bg-emerald-500/5 hover:bg-emerald-500/10"
          >
            Blueprint: {blueprintTitle}
          </Link>
        )}
      </div>

      {/* Progress segment */}
      <div className="mb-10">
        <div className="flex justify-between items-baseline text-xs uppercase tracking-wider text-[var(--fg-muted)] mb-2 font-mono">
          <span>Development Phase</span>
          <span>{status} ({progress}%)</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-right from-emerald-500 to-teal-400 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Roadmap milestones timeline */}
      {timeline.length > 0 && (
        <div className="mb-12">
          <h4 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-6 font-mono">Milestone Status</h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {timeline.map((step, idx) => {
              const isDone = step.status === "done";
              const isCurrent = step.status === "current";

              return (
                <div 
                  key={idx} 
                  className={`p-4 rounded border transition ${
                    isDone 
                      ? "border-emerald-500/30 bg-emerald-500/[0.03] text-[var(--fg-primary)]" 
                      : isCurrent 
                      ? "border-amber-500/30 bg-amber-500/[0.03] text-[var(--fg-primary)] animate-pulse" 
                      : "border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--fg-subtle)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[0.6rem] font-mono tracking-widest uppercase text-[var(--fg-muted)]">
                      Step 0{idx + 1}
                    </span>
                    <span 
                      className={`w-1.5 h-1.5 rounded-full ${
                        isDone ? "bg-emerald-400" : isCurrent ? "bg-amber-400" : "bg-white/20"
                      }`}
                    />
                  </div>
                  <div className="font-serif text-sm font-medium tracking-wide">
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Associated research logs stream */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-6 font-mono">Archive Logs</h4>
        {logs.length === 0 ? (
          <div className="text-sm text-[var(--fg-muted)] italic font-mono py-4 border border-dashed border-[var(--border-subtle)] text-center rounded">
            No research logs archived for this project phase.
          </div>
        ) : (
          <div className="relative border-l border-[var(--border-subtle)] pl-6 ml-3 space-y-8">
            {logs.map((log) => (
              <div key={log.id} className="relative group">
                {/* Timeline node node */}
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border border-emerald-500/40 bg-[var(--bg-primary)] transition group-hover:scale-125 group-hover:border-emerald-400" />
                
                <span className="text-[0.65rem] font-mono tracking-widest text-emerald-400/70 block mb-1">
                  {log.date}
                </span>
                
                <Link 
                  href={`/research/${log.slug}`}
                  className="block p-4 rounded border border-[var(--border-subtle)] hover:border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition duration-200"
                >
                  <h5 className="font-serif text-[var(--fg-primary)] group-hover:text-emerald-300 font-medium tracking-wide mb-2 transition">
                    {log.title}
                  </h5>
                  <p className="text-sm text-[var(--fg-secondary)] font-light line-clamp-2">
                    {log.summary}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
