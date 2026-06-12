import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParticlePreset } from "@/visuals/types";

export default function SpecimenFireflies({ 
  baseColor, 
  isSelected,
  particleOpacity,
  particlePreset
}: { 
  baseColor: string; 
  isSelected: boolean;
  particleOpacity: number;
  particlePreset: ParticlePreset;
}) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = particlePreset?.count ?? 0;

  const [[basePositions, currentPositions, phases]] = useState(() => {
    const particleCount = count || 1; // allocate at least 1 for standard Float32Array structure
    const basePos = new Float32Array(particleCount * 3);
    const currPos = new Float32Array(particleCount * 3);
    const ph = new Float32Array(particleCount);
    
    // Only fill if count is non-zero
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 0.25; 
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.2; 
      
      basePos[i * 3] = Math.cos(theta) * r;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = Math.sin(theta) * r;
      
      currPos[i * 3] = basePos[i * 3];
      currPos[i * 3 + 1] = basePos[i * 3 + 1];
      currPos[i * 3 + 2] = basePos[i * 3 + 2];
      
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [basePos, currPos, ph];
  });

  useFrame((state) => {
    if (count === 0 || !particlesRef.current) return;
    const time = state.clock.elapsedTime;
    const speedMultiplier = isSelected ? 2.0 : 1.0;
    const driftSpeed = particlePreset.driftSpeed * speedMultiplier;

    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      if (particlePreset.driftPattern === "spiral") {
        const angle = time * 0.5 * driftSpeed + phases[i];
        const radius = 0.15 + Math.sin(time * 0.1 + phases[i]) * 0.05;
        posArray[i * 3] = Math.cos(angle) * radius;
        posArray[i * 3 + 1] = basePositions[i * 3 + 1] + Math.sin(time * 0.1 * driftSpeed + phases[i]) * 0.2;
        posArray[i * 3 + 2] = Math.sin(angle) * radius;
      } else if (particlePreset.driftPattern === "chaotic") {
        posArray[i * 3] = basePositions[i * 3] + Math.cos(time * 0.8 * driftSpeed + phases[i]) * 0.05;
        posArray[i * 3 + 1] = basePositions[i * 3 + 1] + Math.sin(time * 1.2 * driftSpeed + phases[i]) * 0.25;
        posArray[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(time * 1.0 * driftSpeed + phases[i]) * 0.05;
      } else {
        posArray[i * 3] = basePositions[i * 3] + Math.cos(time * 0.2 * driftSpeed + phases[i]) * 0.02;
        posArray[i * 3 + 1] = basePositions[i * 3 + 1] + Math.sin(time * 0.3 * driftSpeed + phases[i]) * 0.1;
        posArray[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(time * 0.25 * driftSpeed + phases[i]) * 0.02;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (count === 0) {
    return null;
  }

  const particleSize = isSelected ? particlePreset.hoverSize : particlePreset.baseSize;
  const blendingMode = 
    particlePreset.blending === "additive" 
      ? THREE.AdditiveBlending 
      : particlePreset.blending === "multiply"
      ? THREE.MultiplyBlending
      : THREE.NormalBlending;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={particleSize} 
        color={baseColor}
        transparent 
        blending={blendingMode}
        depthWrite={false}
        sizeAttenuation
        opacity={particleOpacity}
      />
    </points>
  );
}
