import Link from 'next/link';
import { EXPERIMENTS, type Experiment } from '@/content';

export default function RelatedContentGrid({ experiment }: { experiment: Experiment }) {
  // Hybrid algorithm: explicitly defined IDs first, then match by category, then stack intersection
  let related: Experiment[] = [];
  
  if (experiment.relatedIds && experiment.relatedIds.length > 0) {
    related = experiment.relatedIds
      .map(id => EXPERIMENTS.find(e => e.id === id))
      .filter((e): e is Experiment => e !== undefined);
  }

  if (related.length < 2) {
    const byCategory = EXPERIMENTS.filter(e => e.category === experiment.category && e.id !== experiment.id);
    related = [...related, ...byCategory].slice(0, 2);
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-24 pt-12 border-t border-white/10">
      <h3 className="text-xl font-serif text-white/90 mb-8">Related Records</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.map(exp => (
          <Link 
            key={exp.id} 
            href={`/experiments/exp-${exp.id}`}
            className="block p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded"
          >
            <div className="text-xs text-white/40 mb-2 uppercase tracking-wider">{exp.category}</div>
            <h4 className="text-lg text-emerald-400 font-medium mb-2">{exp.title}</h4>
            <p className="text-sm text-white/60 line-clamp-2">{exp.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
