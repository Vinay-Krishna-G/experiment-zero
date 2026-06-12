import { notFound } from 'next/navigation';
import { EXPERIMENTS, getExperimentById } from '@/data/experiments'; // Using experiments as mock data for now
import { buildExperimentMetadata } from '@/lib/seo/builders/metadata';
import { buildBreadcrumbSchema } from '@/lib/seo/jsonld/breadcrumbs';
import { buildCreativeWorkSchema } from '@/lib/seo/jsonld/schemas';
import DocumentArticle from '@/components/seo-gateways/DocumentArticle';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EXPERIMENTS.filter(e => e.blueprintId).map(exp => ({
    slug: exp.blueprintId
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  // Find experiment matching blueprintId
  const experiment = EXPERIMENTS.find(e => e.blueprintId === slug);
  
  if (!experiment) {
    return { title: 'Not Found' };
  }

  return buildExperimentMetadata(experiment);
}

export default async function BlueprintSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const experiment = EXPERIMENTS.find(e => e.blueprintId === slug);

  if (!experiment) {
    notFound();
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Laboratory', item: '/' },
    { name: 'Blueprints', item: '/blueprints' },
    { name: experiment.title, item: `/blueprints/${slug}` }
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
