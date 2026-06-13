import { type Experiment } from '@/content';
import EnterLaboratoryCTA from './EnterLaboratoryCTA';
import RelatedContentGrid from './RelatedContentGrid';
import { getExperimentJourney } from '@/narrative/queries/journey';
import ExperimentJourneyView from '@/components/narrative/ExperimentJourneyView';
import { ImpactPanel } from '@/components/narrative';
import ArchitectureOverview from '@/components/artifacts/ArchitectureOverview';
import SystemPipeline from '@/components/artifacts/SystemPipeline';
import ArtifactRelationshipMap from '@/components/artifacts/ArtifactRelationshipMap';

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
            {experiment.id === 'codemelt' && (
              <SystemPipeline 
                title="RAG Pipeline Architecture"
                accentColor="var(--accent-emerald)"
                stages={[
                  { id: "repo", label: "Repository Upload", purpose: "Ingest target source code repository." },
                  { id: "extract", label: "File Extraction", purpose: "Filter non-code files and parse text." },
                  { id: "chunk", label: "Chunking Strategy", purpose: "Split into semantic blocks.", tradeoff: "AST parsing vs. Token length." },
                  { id: "embed", label: "Embedding Generation", purpose: "Convert chunks to dense vectors." },
                  { id: "vectordb", label: "Vector Storage", purpose: "Store embeddings in Pinecone." },
                  { id: "retrieve", label: "Retriever", purpose: "Fetch top-K relevant chunks via cosine similarity." },
                  { id: "llm", label: "LLM Response", purpose: "Synthesize answer using context window." }
                ]}
              />
            )}
          </div>
        )}

        {experiment.id === 'experiment-zero' && <ArchitectureOverview />}
        {experiment.id === 'promptvault' && (
          <SystemPipeline 
            title="System Interaction Flow"
            accentColor="#1e3a8a"
            stages={[
              { id: "auth", label: "Authentication", purpose: "Secure user sessions." },
              { id: "registry", label: "Prompt Registry", purpose: "Store immutable prompt templates." },
              { id: "category", label: "Categorization", purpose: "Apply semantic tags." },
              { id: "search", label: "Search Engine", purpose: "Full-text indexing." },
              { id: "persist", label: "Persistence", purpose: "PostgreSQL storage." },
              { id: "retrieve", label: "Retrieval API", purpose: "Expose endpoints for external integration.", tradeoff: "Latency vs Cache consistency." }
            ]}
          />
        )}
        
        {/* Relationship Map for all Flagship projects */}
        {(experiment.id === 'experiment-zero' || experiment.id === 'codemelt' || experiment.id === 'promptvault') && journeyData && (
          <ArtifactRelationshipMap 
            experimentTitle={experiment.title}
            blueprintTitle={journeyData.blueprintTitle}
            logs={journeyData.logs}
            hasEvidence={!!experiment.evidence}
          />
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
