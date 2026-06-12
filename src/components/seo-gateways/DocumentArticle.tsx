import { type Experiment } from '@/content';
import EnterLaboratoryCTA from './EnterLaboratoryCTA';
import RelatedContentGrid from './RelatedContentGrid';

export default function DocumentArticle({ experiment }: { experiment: Experiment }) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-emerald-500/30">
      <article>
        <header className="mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-emerald-400 mb-6">
            <span>{experiment.primaryCategory}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{experiment.year}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            {experiment.title}
          </h1>
          <p className="text-xl text-white/60 font-light">
            {experiment.tagline}
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">Overview</h2>
          <p className="text-lg leading-relaxed text-white/80">
            {experiment.description}
          </p>
        </section>

        {experiment.content?.problem && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">The Problem</h2>
            <p className="leading-relaxed">{experiment.content.problem}</p>
          </section>
        )}

        {experiment.content?.solution && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">The Solution</h2>
            <p className="leading-relaxed">{experiment.content.solution}</p>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {experiment.stack.map(tech => (
              <span key={tech} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-white/70">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <EnterLaboratoryCTA expId={experiment.id} />
        <RelatedContentGrid experiment={experiment} />
      </article>
    </main>
  );
}
