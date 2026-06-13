import { MetadataRoute } from 'next';
import { EXPERIMENTS, BLUEPRINTS, RESEARCH_LOGS, SITE_SETTINGS } from '@/content';
import { getKnowledgeArtifacts } from '@/insights/resolvers/artifacts';
import { getKnowledgeClusters } from '@/insights/resolvers/clusters';

const SITE_URL = SITE_SETTINGS.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/evidence`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const experimentRoutes: MetadataRoute.Sitemap = EXPERIMENTS.map(exp => ({
    url: `${SITE_URL}/experiments/${exp.slug}`,
    lastModified: new Date(exp.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blueprintRoutes: MetadataRoute.Sitemap = BLUEPRINTS.map(bp => ({
    url: `${SITE_URL}/blueprints/${bp.slug}`,
    lastModified: new Date(bp.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const researchRoutes: MetadataRoute.Sitemap = RESEARCH_LOGS.map(log => ({
    url: `${SITE_URL}/research/${log.slug}`,
    lastModified: new Date(log.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const insightRoutes: MetadataRoute.Sitemap = getKnowledgeArtifacts().map(art => ({
    url: `${SITE_URL}/insights/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const clusterRoutes: MetadataRoute.Sitemap = getKnowledgeClusters().map(cluster => ({
    url: `${SITE_URL}/insights/category/${cluster.category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...baseRoutes,
    ...experimentRoutes,
    ...blueprintRoutes,
    ...researchRoutes,
    ...insightRoutes,
    ...clusterRoutes,
  ];
}

