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
import CSSBottleRenderer from "./CSSBottleRenderer";
import { ENABLE_DEBUG_MESH } from "./constants";
import type { BottleRendererProps } from "./types";

export default function GLBBottleRenderer(props: BottleRendererProps) {
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
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Temporary primitive geometry if no model exists yet */}
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 2.5, 32]} />
          <meshStandardMaterial 
            color="#10b981" 
            wireframe={ENABLE_DEBUG_MESH}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
