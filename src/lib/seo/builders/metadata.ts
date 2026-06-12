import type { Metadata } from 'next';
import { type Experiment } from '@/data/experiments';

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
