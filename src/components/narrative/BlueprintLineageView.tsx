import Link from "next/link";
import type { LineageViewData } from "./types";

export default function BlueprintLineageView({ data }: { data: LineageViewData }) {
  const { title, status, objective, implementations, technologies } = data;
  const { active, completed, planned } = implementations;

  const totalImpl = active.length + completed.length + planned.length;

  return (
    <div className="my-16 p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">Architectural Lineage</h3>
          <h2 className="text-2xl font-serif text-[var(--fg-primary)] font-medium">{title} Executions</h2>
        </div>
        <div className="text-xs font-mono tracking-widest uppercase text-[var(--fg-muted)]">
          Status: <span className="text-emerald-400">{status}</span>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-3 font-mono">System Objective</h4>
        <p className="text-base text-[var(--fg-secondary)] leading-relaxed font-light">{objective}</p>
      </div>

      {technologies.length > 0 && (
        <div className="mb-10">
          <h4 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-3 font-mono">System Stack</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-mono bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full text-[var(--fg-secondary)]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-6 font-mono">Implementations ({totalImpl})</h4>
        
        {totalImpl === 0 ? (
          <div className="text-sm text-[var(--fg-muted)] italic font-mono py-8 border border-dashed border-[var(--border-subtle)] text-center rounded">
            No active or planned experiment nodes linked to this blueprint.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Completed Section */}
            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <h5 className="text-xs font-mono uppercase tracking-widest text-[var(--fg-secondary)]">Completed ({completed.length})</h5>
              </div>
              {completed.length === 0 ? (
                <div className="text-xs font-mono italic text-[var(--fg-subtle)] py-4">No nodes resolved.</div>
              ) : (
                <ul className="space-y-3">
                  {completed.map((item) => (
                    <li key={item.id}>
                      <Link 
                        href={`/experiments/${item.slug}`}
                        className="block p-3 rounded border border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-500/[0.02] hover:bg-emerald-500/[0.05] transition duration-200"
                      >
                        <span className="font-serif text-sm font-medium text-[var(--fg-primary)] block hover:text-emerald-300 transition">{item.title}</span>
                        <span className="text-[0.6rem] font-mono text-emerald-400/80 tracking-widest uppercase">Verified</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 2. Active Section */}
            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <h5 className="text-xs font-mono uppercase tracking-widest text-[var(--fg-secondary)]">Active ({active.length})</h5>
              </div>
              {active.length === 0 ? (
                <div className="text-xs font-mono italic text-[var(--fg-subtle)] py-4">No nodes resolved.</div>
              ) : (
                <ul className="space-y-3">
                  {active.map((item) => (
                    <li key={item.id}>
                      <Link 
                        href={`/experiments/${item.slug}`}
                        className="block p-3 rounded border border-amber-500/10 hover:border-amber-500/30 bg-amber-500/[0.02] hover:bg-amber-500/[0.05] transition duration-200"
                      >
                        <span className="font-serif text-sm font-medium text-[var(--fg-primary)] block hover:text-amber-300 transition">{item.title}</span>
                        <span className="text-[0.6rem] font-mono text-amber-400/80 tracking-widest uppercase">In Dev ({item.progress}%)</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 3. Planned Section */}
            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <h5 className="text-xs font-mono uppercase tracking-widest text-[var(--fg-secondary)]">Planned ({planned.length})</h5>
              </div>
              {planned.length === 0 ? (
                <div className="text-xs font-mono italic text-[var(--fg-subtle)] py-4">No nodes resolved.</div>
              ) : (
                <ul className="space-y-3">
                  {planned.map((item) => (
                    <li key={item.id}>
                      <Link 
                        href={`/experiments/${item.slug}`}
                        className="block p-3 rounded border border-[var(--border-subtle)] hover:border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-white/[0.05] transition duration-200 opacity-60 hover:opacity-100"
                      >
                        <span className="font-serif text-sm font-medium text-[var(--fg-primary)] block">{item.title}</span>
                        <span className="text-[0.6rem] font-mono text-[var(--fg-muted)] tracking-widest uppercase">Backlog</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
