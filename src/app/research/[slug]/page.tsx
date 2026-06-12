import { notFound } from 'next/navigation';
import { EXPERIMENTS } from '@/data/experiments'; // Mock
import { buildExperimentMetadata } from '@/lib/seo/builders/metadata';
import { buildBreadcrumbSchema } from '@/lib/seo/jsonld/breadcrumbs';
import { buildCreativeWorkSchema } from '@/lib/seo/jsonld/schemas';
import DocumentArticle from '@/components/seo-gateways/DocumentArticle';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mocking research logs using experiments array for now until research.ts is provided
export function generateStaticParams() {
  return EXPERIMENTS.slice(0, 2).map(exp => ({
    slug: `log-${exp.id}`
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const id = slug.replace('log-', '');
  const experiment = EXPERIMENTS.find(e => e.id === id);
  
  if (!experiment) {
    return { title: 'Not Found' };
  }

  return buildExperimentMetadata(experiment);
}

export default async function ResearchSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const id = slug.replace('log-', '');
  const experiment = EXPERIMENTS.find(e => e.id === id);

  if (!experiment) {
    notFound();
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Laboratory', item: '/' },
    { name: 'Research Logs', item: '/research' },
    { name: experiment.title, item: `/research/${slug}` }
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
