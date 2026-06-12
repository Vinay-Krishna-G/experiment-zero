import { notFound } from 'next/navigation';
import { EXPERIMENTS, getExperimentById } from '@/data/experiments';
import { buildExperimentMetadata } from '@/lib/seo/builders/metadata';
import { buildBreadcrumbSchema } from '@/lib/seo/jsonld/breadcrumbs';
import { buildCreativeWorkSchema } from '@/lib/seo/jsonld/schemas';
import DocumentArticle from '@/components/seo-gateways/DocumentArticle';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EXPERIMENTS.map(exp => ({
    slug: `exp-${exp.id}`
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const id = slug.replace('exp-', '');
  const experiment = getExperimentById(id);
  
  if (!experiment) {
    return { title: 'Not Found' };
  }

  return buildExperimentMetadata(experiment);
}

export default async function ExperimentSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const id = slug.replace('exp-', '');
  const experiment = getExperimentById(id);

  if (!experiment) {
    notFound();
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Laboratory', item: '/' },
    { name: 'Experiments', item: '/experiments' },
    { name: experiment.title, item: `/experiments/exp-${experiment.id}` }
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
