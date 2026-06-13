import type { Metadata } from 'next';
import { type Experiment, type Blueprint, type ResearchLog, SITE_SETTINGS } from '@/content';

const SITE_URL = SITE_SETTINGS.siteUrl;
const SITE_NAME = SITE_SETTINGS.name;

export function buildExperimentMetadata(experiment: Experiment): Metadata {
  const url = `${SITE_URL}/experiments/${experiment.slug}`;
  const ogImage = experiment.ogImage || '/og-image.jpg';

  return {
    title: `${experiment.title} — Experiment Zero`,
    description: experiment.description,
    alternates: {
      canonical: url,
    },
    ...(experiment.visibility === 'unlisted' ? {
      robots: {
        index: false,
        follow: true,
      }
    } : {}),
    openGraph: {
      title: `${experiment.title} — Experiment Zero`,
      description: experiment.description,
      url,
      siteName: 'Experiment Zero',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: experiment.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${experiment.title} — Experiment Zero`,
      description: experiment.description,
      images: [ogImage],
    },
  };
}

export function buildBlueprintMetadata(blueprint: Blueprint): Metadata {
  const url = `${SITE_URL}/blueprints/${blueprint.slug}`;
  const ogImage = '/og-image.jpg';

  return {
    title: `${blueprint.title} Blueprint — Experiment Zero`,
    description: blueprint.objective,
    alternates: {
      canonical: url,
    },
    ...(blueprint.visibility === 'unlisted' ? {
      robots: {
        index: false,
        follow: true,
      }
    } : {}),
    openGraph: {
      title: `${blueprint.title} Blueprint — Experiment Zero`,
      description: blueprint.objective,
      url,
      siteName: 'Experiment Zero',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blueprint.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blueprint.title} Blueprint — Experiment Zero`,
      description: blueprint.objective,
      images: [ogImage],
    },
  };
}

export function buildResearchMetadata(log: ResearchLog): Metadata {
  const url = `${SITE_URL}/research/${log.slug}`;
  const ogImage = '/og-image.jpg';

  return {
    title: `${log.title} — Research Log`,
    description: log.summary,
    alternates: {
      canonical: url,
    },
    ...(log.visibility === 'unlisted' ? {
      robots: {
        index: false,
        follow: true,
      }
    } : {}),
    openGraph: {
      title: `${log.title} — Research Log`,
      description: log.summary,
      url,
      siteName: 'Experiment Zero',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: log.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${log.title} — Research Log`,
      description: log.summary,
      images: [ogImage],
    },
  };
}
