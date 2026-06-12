import { notFound } from 'next/navigation';
import { BLUEPRINTS, getBlueprintBySlug } from '@/content';
import { buildBlueprintMetadata } from '@/lib/seo/builders/metadata';
import { buildBreadcrumbSchema } from '@/lib/seo/jsonld/breadcrumbs';
import { buildBlueprintSchema } from '@/lib/seo/jsonld/schemas';
import BlueprintArticle from '@/components/seo-gateways/BlueprintArticle';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLUEPRINTS.map(bp => ({
    slug: bp.slug
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  
  if (!blueprint) {
    return { title: 'Not Found' };
  }

  return buildBlueprintMetadata(blueprint);
}

export default async function BlueprintSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);

  if (!blueprint) {
    notFound();
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Laboratory', item: '/' },
    { name: 'Blueprints', item: '/blueprints' },
    { name: blueprint.title, item: `/blueprints/${slug}` }
  ]);

  const creativeWork = buildBlueprintSchema(blueprint);

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
      <BlueprintArticle blueprint={blueprint} />
    </>
  );
}
