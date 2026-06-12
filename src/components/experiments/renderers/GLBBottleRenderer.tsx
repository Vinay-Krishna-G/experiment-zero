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
import { Suspense } from "react";
import { Html } from "@react-three/drei";
import CSSBottleRenderer from "./CSSBottleRenderer";
import LaboratoryStage from "./stage/LaboratoryStage";
import { useLaboratoryTheme } from "./theme/ThemeContext";
import type { BottleRendererProps } from "./types";

export default function GLBBottleRenderer(props: BottleRendererProps) {
  const { theme } = useLaboratoryTheme();

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
        shadows
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
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
          <LaboratoryStage 
            experiment={props.experiment}
            isSelected={props.isSelected}
            theme={theme}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
