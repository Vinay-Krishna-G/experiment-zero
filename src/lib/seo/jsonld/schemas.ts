import { type Experiment, type Blueprint, type ResearchLog } from '@/content';

const SITE_URL = 'https://vinaykrishna.dev';

export function buildCreativeWorkSchema(experiment: Experiment) {
  const url = `${SITE_URL}/experiments/${experiment.slug}`;
  
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
    "keywords": [experiment.primaryCategory, ...experiment.stack].join(', ')
  };
}

export function buildBlueprintSchema(blueprint: Blueprint) {
  const url = `${SITE_URL}/blueprints/${blueprint.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": blueprint.title,
    "description": blueprint.objective,
    "url": url,
    "author": {
      "@type": "Person",
      "name": "Vinay Krishna",
      "url": SITE_URL
    },
    "keywords": blueprint.technologies.join(', ')
  };
}

export function buildResearchSchema(log: ResearchLog) {
  const url = `${SITE_URL}/research/${log.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "name": log.title,
    "headline": log.title,
    "description": log.summary,
    "url": url,
    "author": {
      "@type": "Person",
      "name": "Vinay Krishna",
      "url": SITE_URL
    },
    "datePublished": log.publishedAt,
    "keywords": [log.category, ...log.tags].join(', ')
  };
}
