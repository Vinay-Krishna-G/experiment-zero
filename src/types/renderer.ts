export type GlassPreset = "emerald" | "amber" | "copper" | "slate" | "clear";
export type GlowPreset = "green" | "gold" | "blue" | "crimson" | "none";
export type BottleSize = "small" | "medium" | "large";

export interface BottleConfig {
  size: BottleSize;
  glass: GlassPreset;
  glow: GlowPreset;
  label: string;
  fillLevel: number; // 0 to 1
}
