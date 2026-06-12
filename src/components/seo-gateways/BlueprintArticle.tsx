import { type Blueprint } from '@/content';
import EnterLaboratoryCTA from './EnterLaboratoryCTA';
import { getBlueprintLineage } from '@/narrative/queries/lineage';
import BlueprintLineageView from '@/components/narrative/BlueprintLineageView';
import { ImpactPanel } from '@/components/narrative';

export default function BlueprintArticle({ blueprint }: { blueprint: Blueprint }) {
  const lineageData = getBlueprintLineage(blueprint.id);
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-emerald-500/30">
      <article>
        <header className="mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-emerald-400 mb-6">
            <span>Blueprint</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{blueprint.status}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            {blueprint.title}
          </h1>
        </header>

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">Objective</h2>
          <p className="text-lg leading-relaxed text-white/80">
            {blueprint.objective}
          </p>
        </section>

        {blueprint.technologies?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {blueprint.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-white/70">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {blueprint.stages?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">Stages</h2>
            <ul className="space-y-4">
              {blueprint.stages.map((stage, idx) => (
                <li key={idx} className="bg-white/5 border border-white/10 rounded p-4">
                  <h3 className="font-medium text-white mb-1">{stage.name}</h3>
                  <p className="text-sm text-white/60">{stage.annotation}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {lineageData && <BlueprintLineageView data={lineageData} />}

        {blueprint.evidence && <ImpactPanel evidence={blueprint.evidence} />}

        <EnterLaboratoryCTA expId={blueprint.id} />
      </article>
    </main>
  );
}
