// ─── Lab Status Data ──────────────────────────────────────────────────────────
// Single source of truth for LabStatusPanel.
// Update this file to update the displayed status — no component editing needed.

export interface LabStatusData {
  invention: string;
  inventionNote: string;
  destination: string;
  destinationNote: string;
  studies: string[];
  currentStatus: string[];
  updatedAt: string;
}

export const LAB_STATUS: LabStatusData = {
  invention: "AI Codebase Analyzer",
  inventionNote: "In progress",

  destination: "Launch First SaaS",
  destinationNote: "Active quest",

  studies: ["System Design", "Three.js", "AI Retrieval Systems"],

  currentStatus: ["Building", "Learning", "Experimenting"],

  updatedAt: "June 2026",
};
