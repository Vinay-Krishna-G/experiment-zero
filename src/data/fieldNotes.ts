// ─── Field Notes Data ─────────────────────────────────────────────────────────
// Single source of truth for FieldNotesSection.
// To add a note: append an object to FIELD_NOTES. No component editing needed.

export interface FieldNote {
  id: string;
  date: string;
  tag: string;
  note: string;
}

export const FIELD_NOTES: FieldNote[] = [
  {
    id: "08",
    date: "June 2026",
    tag: "AI Tooling",
    note: "Exploring ways to help developers understand large codebases without manually reading every file. The index should do the reading; the developer should do the thinking.",
  },
  {
    id: "07",
    date: "May 2026",
    tag: "Product",
    note: "Every good product is just a solved frustration. The best inventions come from spending enough time with a problem that you stop tolerating it.",
  },
  {
    id: "06",
    date: "May 2026",
    tag: "Design",
    note: "A portfolio should feel like a place, not a page. The difference is whether the visitor is browsing or exploring. Exploration requires mystery.",
  },
];
