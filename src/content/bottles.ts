import { BottleConfig } from "@/types";

export type AppearancePreset = 
  | "emerald-core"
  | "amber-archive"
  | "obsidian-research"
  | "crystal-prototype"
  | "slate-infrastructure"
  | "violet-ai";

export const APPEARANCE_PRESETS: Record<AppearancePreset, Omit<BottleConfig, "fillLevel" | "label">> = {
  "emerald-core": {
    size: "medium",
    glass: "emerald",
    glow: "green",
  },
  "amber-archive": {
    size: "medium",
    glass: "amber",
    glow: "gold",
  },
  "obsidian-research": {
    size: "small",
    glass: "slate",
    glow: "blue",
  },
  "crystal-prototype": {
    size: "medium",
    glass: "clear",
    glow: "none",
  },
  "slate-infrastructure": {
    size: "large",
    glass: "slate",
    glow: "none",
  },
  "violet-ai": {
    size: "medium",
    glass: "clear",
    glow: "crimson",
  }
};
