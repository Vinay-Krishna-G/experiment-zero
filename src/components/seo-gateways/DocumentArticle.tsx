import { type Experiment } from '@/content';
import EnterLaboratoryCTA from './EnterLaboratoryCTA';
import RelatedContentGrid from './RelatedContentGrid';
import { getExperimentJourney } from '@/narrative/queries/journey';
import ExperimentJourneyView from '@/components/narrative/ExperimentJourneyView';
import { ImpactPanel } from '@/components/narrative';

export default function DocumentArticle({ experiment }: { experiment: Experiment }) {
  const journeyData = getExperimentJourney(experiment.id);
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] font-sans selection:bg-[var(--accent-emerald-dim)] selection:text-[var(--fg-primary)]">
      <article>
        <header className="mb-16 border-b border-[var(--border-subtle)] pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-emerald-400 mb-6">
            <span>{experiment.primaryCategory}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{experiment.year}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--fg-primary)] mb-6">
            {experiment.title}
          </h1>
          <p className="text-xl text-[var(--fg-secondary)] font-light">
            {experiment.tagline}
          </p>
        </header>

        {experiment.evidence && (
          <div className="mb-12">
            <ImpactPanel evidence={experiment.evidence} />
          </div>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4">Overview</h2>
          <p className="text-lg leading-relaxed text-[var(--fg-primary)]">
            {experiment.description}
          </p>
        </section>

        {experiment.content?.problem && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4">The Problem</h2>
            <p className="leading-relaxed">{experiment.content.problem}</p>
          </section>
        )}

        {experiment.content?.solution && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4">The Solution</h2>
            <p className="leading-relaxed">{experiment.content.solution}</p>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {experiment.stack.map(tech => (
              <span key={tech} className="px-3 py-1 text-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full text-[var(--fg-secondary)]">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {journeyData && <ExperimentJourneyView data={journeyData} />}

        <EnterLaboratoryCTA expId={experiment.id} />
        <RelatedContentGrid experiment={experiment} />
      </article>
    </main>
  );
}
