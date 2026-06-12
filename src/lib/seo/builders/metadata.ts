import type { Metadata } from 'next';
import { type Experiment, type Blueprint, type ResearchLog } from '@/content';

const SITE_URL = 'https://vinaykrishna.dev';

export function buildExperimentMetadata(experiment: Experiment): Metadata {
  const url = `${SITE_URL}/experiments/exp-${experiment.id}`;
  const ogImage = experiment.ogImage || '/og-image.jpg';

  return {
    title: `${experiment.title} — Experiment Zero`,
    description: experiment.description,
    alternates: {
      canonical: url,
    },
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
