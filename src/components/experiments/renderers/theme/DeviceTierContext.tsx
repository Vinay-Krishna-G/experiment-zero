"use client";

import { createContext, useContext } from "react";

export type DeviceTier = "low" | "medium" | "high";

export const DeviceTierContext = createContext<DeviceTier>("high");

export const DeviceTierProvider = DeviceTierContext.Provider;

export function useDeviceTier() {
  const context = useContext(DeviceTierContext);
  if (context === undefined) {
    return "high";
  }
  return context;
}

export function getHardwareTier(): DeviceTier {
  if (typeof window === "undefined" || typeof navigator === "undefined") return "high";

  let score = 0;

  const cores = navigator.hardwareConcurrency || 4;
  if (cores >= 8) score += 2;
  else if (cores >= 4) score += 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memory = (navigator as any).deviceMemory || 4;
  if (memory >= 8) score += 2;
  else if (memory >= 4) score += 1;

  const pixels = window.innerWidth * window.innerHeight;
  if (pixels > 2073600) score -= 1; // Heavy fill rate penalty

  if (score >= 4) return "high";
  if (score >= 2) return "medium";
  return "low";
}
