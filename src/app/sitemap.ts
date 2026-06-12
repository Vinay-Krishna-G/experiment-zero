import { MetadataRoute } from 'next';
import { EXPERIMENTS, BLUEPRINTS, RESEARCH_LOGS } from '@/content';

const SITE_URL = 'https://vinaykrishna.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
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

  return [...baseRoutes, ...experimentRoutes, ...blueprintRoutes, ...researchRoutes];
}
