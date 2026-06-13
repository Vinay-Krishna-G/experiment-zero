import { permanentRedirect, notFound } from 'next/navigation';
import { EXPERIMENTS, getExperimentBySlug } from '@/content';
import { buildExperimentMetadata } from '@/lib/seo/builders/metadata';
import { buildBreadcrumbSchema } from '@/lib/seo/jsonld/breadcrumbs';
import { buildCreativeWorkSchema } from '@/lib/seo/jsonld/schemas';
import DocumentArticle from '@/components/seo-gateways/DocumentArticle';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EXPERIMENTS.map(exp => ({
    slug: exp.slug
  }));
}

const LEGACY_ID_MAP: Record<string, string> = {
  "001": "promptvault",
  "002": "codemelt",
  "003": "experiment-zero",
  "004": "studyspark",
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  const rawId = slug.startsWith('exp-') ? slug.replace('exp-', '') : slug;
  const canonicalSlug = LEGACY_ID_MAP[rawId] || rawId;
  const experiment = getExperimentBySlug(canonicalSlug);
  
  if (!experiment) {
    return { title: 'Not Found' };
  }

  return buildExperimentMetadata(experiment);
}

export default async function ExperimentSeoPage({ params }: PageProps) {
  const { slug } = await params;
  
  const rawId = slug.startsWith('exp-') ? slug.replace('exp-', '') : slug;
  const canonicalSlug = LEGACY_ID_MAP[rawId] || rawId;
  const experiment = getExperimentBySlug(canonicalSlug);

  if (!experiment) {
    notFound();
  }

  if (slug !== experiment.slug) {
    permanentRedirect(`/experiments/${experiment.slug}`);
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Laboratory', item: '/' },
    { name: 'Experiments', item: '/experiments' },
    { name: experiment.title, item: `/experiments/${experiment.slug}` }
  ]);

  const creativeWork = buildCreativeWorkSchema(experiment);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <DocumentArticle experiment={experiment} />
    </>
  );
}
