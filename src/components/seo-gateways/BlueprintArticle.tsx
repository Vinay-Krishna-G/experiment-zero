import { type Blueprint } from '@/content';
import EnterLaboratoryCTA from './EnterLaboratoryCTA';
import { getBlueprintLineage } from '@/narrative/queries/lineage';
import BlueprintLineageView from '@/components/narrative/BlueprintLineageView';
import { ImpactPanel } from '@/components/narrative';
import BlueprintSnapshot from '@/components/artifacts/BlueprintSnapshot';

export default function BlueprintArticle({ blueprint }: { blueprint: Blueprint }) {
  const lineageData = getBlueprintLineage(blueprint.id);
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] font-sans selection:bg-[var(--accent-emerald-dim)] selection:text-[var(--fg-primary)]">
      <article>
        <header className="mb-16 border-b border-[#1e3a8a] pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#1e3a8a] mb-6">
            <span>Blueprint</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{blueprint.status}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--fg-primary)] mb-6">
            {blueprint.title}
          </h1>
        </header>

        {blueprint.evidence && (
          <div className="mb-12">
            <ImpactPanel evidence={blueprint.evidence} />
          </div>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[#1e3a8a] mb-4">Objective</h2>
          <p className="text-lg leading-relaxed text-[var(--fg-primary)]">
            {blueprint.objective}
          </p>
        </section>

        <BlueprintSnapshot />

        {blueprint.technologies?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[#1e3a8a] mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {blueprint.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-sm bg-[rgba(15,23,42,0.05)] border border-[#1e3a8a] rounded-full text-[#0f172a] font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {blueprint.stages?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[#1e3a8a] mb-4">Stages</h2>
            <ul className="space-y-4">
              {blueprint.stages.map((stage, idx) => (
                <li key={idx} className="bg-[rgba(15,23,42,0.02)] border border-[#1e3a8a] rounded p-4">
                  <h3 className="font-medium text-[#0f172a] mb-1">{stage.name}</h3>
                  <p className="text-sm text-[#172554] opacity-80">{stage.annotation}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {lineageData && <BlueprintLineageView data={lineageData} />}

        <EnterLaboratoryCTA expId={blueprint.id} />
      </article>
    </main>
  );
}
