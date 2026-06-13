import { MetadataRoute } from 'next';
import { SITE_SETTINGS } from '@/content';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_SETTINGS.siteUrl}/sitemap.xml`,
  };
}
