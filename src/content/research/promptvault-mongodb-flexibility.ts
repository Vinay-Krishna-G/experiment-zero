import { createResearchLog } from "../factories";

export const promptvaultMongodbFlexibility = createResearchLog({
  id: "promptvault-mongodb-flexibility",
  publishedAt: "2026-06-13",
  title: "MongoDB Flexibility During MVP Development",
  category: "System Design Note",
  summary: "Leveraging NoSQL to accelerate early product iteration.",
  content: `## Problem
During the early stages of PromptVault's development, the data model for an 'AI Prompt' was constantly shifting. Some prompts required variables, others required context attachments, and some needed specific model parameters. Using a strict SQL database would have required writing and executing migrations for every minor feature addition.

## Decision
I chose MongoDB for the MVP to take advantage of its flexible, document-oriented schema. This allowed the application layer to enforce validation when necessary, while the database happily accepted evolving data shapes.

## Outcome
Development velocity remained exceptionally high during the prototyping phase. I was able to test new prompt structures with users without touching database migration scripts or dealing with downtime.

## Lessons Learned
- NoSQL databases are incredibly valuable during the discovery phase of a product when schemas are highly volatile.
- The tradeoff is that application-level validation becomes critical to prevent corrupted states from breaking the UI.`,
  tags: ["Database","MongoDB","Architecture"],
  relatedExperimentId: "promptvault",
  relatedBlueprintId: "promptvault"
});
