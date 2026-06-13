import { type ResearchLog } from '@/content';
import EnterLaboratoryCTA from './EnterLaboratoryCTA';
import { getDiscoveryNavigator } from '@/narrative/queries/discovery';
import DiscoveryNavigator from '@/components/narrative/DiscoveryNavigator';

export default function ResearchArticle({ log }: { log: ResearchLog }) {
  const navigatorData = getDiscoveryNavigator(log.id);
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] font-sans selection:bg-[var(--accent-emerald-dim)] selection:text-[var(--fg-primary)]">
      <article>
        <header className="mb-16 border-b border-[var(--border-subtle)] pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-emerald-400 mb-6">
            <span>Research Log</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{log.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--fg-primary)] mb-6">
            {log.title}
          </h1>
          <p className="text-xl text-[var(--fg-secondary)] font-light">
            {log.summary}
          </p>
        </header>

        <section className="mb-12 prose prose-invert max-w-none">
          <h2 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4 not-prose">Content</h2>
          <div className="text-lg leading-relaxed text-[var(--fg-primary)] whitespace-pre-wrap">
            {log.content}
          </div>
        </section>

        {log.tags?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {log.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full text-[var(--fg-secondary)]">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {log.relatedExperimentId && (
          <EnterLaboratoryCTA expId={log.relatedExperimentId} />
        )}

        {navigatorData && <DiscoveryNavigator data={navigatorData} />}
      </article>
    </main>
  );
}
