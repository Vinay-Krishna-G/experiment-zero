import { MetadataRoute } from 'next';
import { EXPERIMENTS } from '@/data/experiments';

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
    url: `${SITE_URL}/experiments/exp-${exp.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blueprintRoutes: MetadataRoute.Sitemap = EXPERIMENTS.filter(e => e.blueprintId).map(exp => ({
    url: `${SITE_URL}/blueprints/${exp.blueprintId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const researchRoutes: MetadataRoute.Sitemap = EXPERIMENTS.slice(0, 2).map(exp => ({
    url: `${SITE_URL}/research/log-${exp.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...baseRoutes, ...experimentRoutes, ...blueprintRoutes, ...researchRoutes];
}
