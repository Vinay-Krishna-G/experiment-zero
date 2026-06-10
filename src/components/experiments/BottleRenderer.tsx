"use client";

/**
 * BottleRenderer.tsx — Phase 6 abstraction layer.
 *
 * CURRENT:  Renders CSS bottle (ExperimentBottle)
 * FUTURE:   Swap USE_3D_BOTTLES = true to render Three.js GLB (BottleGLB)
 *
 * No changes needed in ExperimentRack.tsx when switching renderers.
 * The interface contract (experiment, isSelected, onClick) stays identical.
 */

import type { Experiment } from "@/data/experiments";
import ExperimentBottle from "./ExperimentBottle";
// Future import: import BottleGLB from "./BottleGLB";

// ─── Feature flag — flip to true in Phase 6 ──────────────────────────────────
const USE_3D_BOTTLES = false;

interface BottleRendererProps {
  experiment: Experiment;
  isSelected: boolean;
  onClick: () => void;
}

export default function BottleRenderer(props: BottleRendererProps) {
  if (USE_3D_BOTTLES) {
    // return <BottleGLB {...props} />;
    return null; // placeholder until Phase 6
  }
  return <ExperimentBottle {...props} />;
}
