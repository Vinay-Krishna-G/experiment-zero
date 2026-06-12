import type { ResearchLog } from "@/types";

export const contextapiinfinitelooptrace: ResearchLog = {
  "id": "rl-006",
  "title": "Context API infinite loop trace",
  "date": "2025.09.30",
  "category": "Failed Experiment",
  "summary": "Attempted to use raw React Context for a 6-step wizard. Resulted in untraceable state mutations.",
  "content": "Spent 4 hours tracing a bug in the wizard flow.\n\n- Toggle state triggers Context update\n- Causes full tree re-render\n- Re-initializes child local state\n- Fires stale closure effect\n- Mutates Context again\n\nInfinite loop.\n\nThought I was being 'clean' by avoiding external state libraries. Instead, I built a bespoke, undocumented, broken version of Redux.\n\nHypothesis: 'Simple' tools (Context) applied to complex problems (global mutative state) actually generate the most technical debt.\n\nIs strict unidirectional data flow an absolute requirement here?",
  "tags": [
    "react",
    "state-management",
    "architecture"
  ],
  "slug": "context-api-infinite-loop-trace"
};
