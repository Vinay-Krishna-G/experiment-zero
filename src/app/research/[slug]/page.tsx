import { notFound } from 'next/navigation';
import { RESEARCH_LOGS, getResearchLogBySlug } from '@/content';
import { buildResearchMetadata } from '@/lib/seo/builders/metadata';
import { buildBreadcrumbSchema } from '@/lib/seo/jsonld/breadcrumbs';
import { buildResearchSchema } from '@/lib/seo/jsonld/schemas';
import ResearchArticle from '@/components/seo-gateways/ResearchArticle';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return RESEARCH_LOGS.map(log => ({
    slug: log.slug
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const log = getResearchLogBySlug(slug);
  
  if (!log) {
    return { title: 'Not Found' };
  }

  return buildResearchMetadata(log);
}

export default async function ResearchSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const log = getResearchLogBySlug(slug);

  if (!log) {
    notFound();
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Laboratory', item: '/' },
    { name: 'Research Logs', item: '/research' },
    { name: log.title, item: `/research/${slug}` }
  ]);

  const creativeWork = buildResearchSchema(log);

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
      <ResearchArticle log={log} />
    </>
  );
}
