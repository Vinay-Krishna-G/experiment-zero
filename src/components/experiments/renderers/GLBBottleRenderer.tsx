"use client";

/**
 * ARCHITECTURE NOTES: Single Canvas Strategy
 * 
 * Future intended architecture for Phase 6B:
 * LaboratoryCanvas (Global `<Canvas>`)
 *  ├── Bottle A
 *  ├── Bottle B
 *  ├── Bottle C
 *  └── Bottle D
 * 
 * Phase 6A establishes the infrastructure but does not lock us into 
 * multi-canvas design. To prevent creating one Canvas per bottle,
 * we strictly ONLY mount the Canvas for the active (selected) bottle.
 * 
 * PERFORMANCE BUDGET:
 * - GLB target < 1.5MB
 * - 60 FPS target
 * - Dynamic import only (handled in BottleRenderer)
 * - No hidden canvases (unmount when inactive)
 * - No idle render loops when inactive
 */

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Html, PerformanceMonitor } from "@react-three/drei";
import CSSBottleRenderer from "./CSSBottleRenderer";
import LaboratoryStage from "./stage/LaboratoryStage";
import { useLaboratoryTheme } from "./theme/ThemeContext";
import { DeviceTierProvider, type DeviceTier, getHardwareTier } from "./theme/DeviceTierContext";
import type { BottleRendererProps } from "./types";

export default function GLBBottleRenderer(props: BottleRendererProps) {
  const { theme } = useLaboratoryTheme();
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    const hwTier = getHardwareTier();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTier(hwTier);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hwTier === "low") setDpr([1, 1]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (hwTier === "medium") setDpr([1, 1.5]);
  }, []);

  // Only mount active bottles as WebGL.
  // Inactive bottles fallback to CSS renderer to avoid WebGL context limits.
  if (!props.isSelected) {
    return <CSSBottleRenderer {...props} />;
  }

  return (
    <div 
      className="glb-renderer-container" 
      onClick={props.onClick}
      style={{
        width: 120,
        height: 180,
        margin: "0 auto",
        cursor: "pointer",
        position: "relative",
      }}
      aria-label={`3D view of ${props.experiment.title}`}
      role="button"
    >
      <Canvas 
        shadows={tier !== "low"}
        gl={{ alpha: true, antialias: tier !== "low" }}
        dpr={dpr}
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <PerformanceMonitor
          bounds={() => [40, 55]}
          flipflops={3}
          onDecline={() => {
            setTier((t) => (t === "high" ? "medium" : "low"));
            setDpr([1, 1.5]);
          }}
          onFallback={() => {
            setTier("low");
            setDpr([1, 1]);
          }}
        >
          <Suspense fallback={
            <Html center>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", textAlign: "center", color: "var(--fg-subtle)", whiteSpace: "nowrap", letterSpacing: "0.15em" }}>
                <div style={{ marginBottom: "0.5rem" }}>ARCHIVE RECOVERY IN PROGRESS</div>
                <div style={{ opacity: 0.7, fontSize: "0.45rem" }}>ARCHIVE REF: EXP-{props.experiment.id.toUpperCase()}</div>
                <div style={{ opacity: 0.7, fontSize: "0.45rem" }}>STATUS: INITIALIZING</div>
              </div>
            </Html>
          }>
            <DeviceTierProvider value={tier}>
              <LaboratoryStage 
                experiment={props.experiment}
                isSelected={props.isSelected}
                theme={theme}
              />
            </DeviceTierProvider>
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
