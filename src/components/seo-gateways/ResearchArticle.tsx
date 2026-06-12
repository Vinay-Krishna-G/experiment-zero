import { type ResearchLog } from '@/content';
import EnterLaboratoryCTA from './EnterLaboratoryCTA';
import { getDiscoveryNavigator } from '@/narrative/queries/discovery';
import DiscoveryNavigator from '@/components/narrative/DiscoveryNavigator';

export default function ResearchArticle({ log }: { log: ResearchLog }) {
  const navigatorData = getDiscoveryNavigator(log.id);
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-emerald-500/30">
      <article>
        <header className="mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-emerald-400 mb-6">
            <span>Research Log</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{log.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            {log.title}
          </h1>
          <p className="text-xl text-white/60 font-light">
            {log.summary}
          </p>
        </header>

        <section className="mb-12 prose prose-invert max-w-none">
          <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4 not-prose">Content</h2>
          <div className="text-lg leading-relaxed text-white/80 whitespace-pre-wrap">
            {log.content}
          </div>
        </section>

        {log.tags?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {log.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-white/70">
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
