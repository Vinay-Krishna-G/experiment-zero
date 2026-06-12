import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SpecimenFireflies({ 
  baseColor, 
  isSelected,
  particleOpacity
}: { 
  baseColor: string; 
  isSelected: boolean;
  particleOpacity: number;
}) {
  const particlesRef = useRef<THREE.Points>(null);

  const [[basePositions, currentPositions, phases]] = useState(() => {
    const count = 12; 
    const basePos = new Float32Array(count * 3);
    const currPos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
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
    const time = state.clock.elapsedTime;
    const speedMultiplier = isSelected ? 2.0 : 1.0;

    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArray.length / 3; i++) {
        posArray[i * 3] = basePositions[i * 3] + Math.cos(time * 0.2 + phases[i]) * 0.02 * speedMultiplier;
        posArray[i * 3 + 1] = basePositions[i * 3 + 1] + Math.sin(time * 0.3 + phases[i]) * 0.1 * speedMultiplier;
        posArray[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(time * 0.25 + phases[i]) * 0.02 * speedMultiplier;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particleSize = isSelected ? 0.07 : 0.04;

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
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        opacity={particleOpacity}
      />
    </points>
  );
}
