import { type Experiment } from '@/data/experiments';

const SITE_URL = 'https://vinaykrishna.dev';

export function buildCreativeWorkSchema(experiment: Experiment) {
  const url = `${SITE_URL}/experiments/exp-${experiment.id}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": experiment.title,
    "headline": experiment.tagline,
    "description": experiment.description,
    "url": url,
    "author": {
      "@type": "Person",
      "name": "Vinay Krishna",
      "url": SITE_URL
    },
    "dateCreated": experiment.year,
    "keywords": [experiment.category, ...experiment.stack].join(', ')
  };
}
