import { createResearchLog } from "../factories";

export const promptvaultSearchVsCategories = createResearchLog({
  id: "promptvault-search-vs-categories",
  date: "2026-06-13",
  publishedAt: "2026-06-13",
  title: "Why Search Matters More Than Categories",
  category: "Discovery",
  summary: "Observing how users navigate large collections of text snippets.",
  content: `## Problem
When building PromptVault, I initially assumed users would want deeply nested folder structures and strict categorization to organize their AI prompts. However, as the vault grew, manually categorizing every prompt became a high-friction task that users actively avoided.

## Decision
I shifted development focus away from complex folder hierarchies and instead prioritized an extremely fast, fuzzy search implementation combined with lightweight, flexible tagging.

## Outcome
The user experience improved dramatically. Users were able to dump prompts into the vault with minimal friction and retrieve them instantly using a few keystrokes, completely bypassing the need to remember where a prompt was 'stored'.

## Lessons Learned
- In high-velocity workflows, retrieval speed is significantly more important than structural organization.
- Forcing users into strict taxonomies creates friction; flexible tagging combined with powerful search accommodates organic usage patterns.`,
  tags: ["UX","Search","Product Design"],
  relatedExperimentId: "promptvault",
  relatedBlueprintId: "promptvault"
});
