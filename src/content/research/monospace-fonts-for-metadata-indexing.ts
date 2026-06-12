import { createResearchLog } from "../factories";

export const monospaceFontsForMetadataIndexing = createResearchLog({
  id: "monospace-fonts-for-metadata-indexing",
  publishedAt: "2026-06-12",
  "title": "Monospace fonts for metadata indexing",
  "date": "2026.03.18",
  "category": "Discovery",
  "summary": "Using typography to visually separate narrative content from technical metadata creates immediate hierarchy.",
  "content": "While designing the Blueprint Archive, I struggled to differentiate the narrative content from the technical metadata (dates, IDs, statuses).\n\nThe breakthrough was typographic: assigning JetBrains Mono exclusively to technical metadata, and Playfair Display exclusively to narrative titles.\n\nThis created an immediate, visceral hierarchy. The eye naturally scans monospace text as 'data' and serif text as 'story'. It reinforced the 'recovered engineering document' aesthetic without relying on heavy borders or background colors.",
  "tags": [
    "design",
    "typography",
    "ui"
  ],

});
