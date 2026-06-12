import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SpecimenFireflies from "../effects/SpecimenFireflies";
import type { Experiment } from "@/data/experiments";
import type { LaboratoryTheme } from "../../lighting";

const LIQUID_HEX_COLORS: Record<string, string> = {
  emerald: "#10b981", 
  amber: "#f59e0b",   
  ruby: "#ef4444",    
  cobalt: "#3b82f6",  
  void: "#78716c",    
  amethyst: "#8b5cf6",
  silver: "#cbd5e1"   
};

export default function ProceduralSpecimen({ 
  experiment, 
  isSelected,
  theme
}: { 
  experiment: Experiment; 
  isSelected: boolean;
  theme: LaboratoryTheme;
}) {
  const liquidRef = useRef<THREE.Mesh>(null);
  const baseColor = LIQUID_HEX_COLORS[experiment.liquidColor] || "#10b981";

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speedMultiplier = isSelected ? 2.0 : 1.0;

    if (liquidRef.current) {
      liquidRef.current.position.y = Math.sin(time * 0.6 * speedMultiplier) * 0.04;
      
      const breathingCycle = isSelected ? Math.sin(time * (Math.PI * 2 / 10)) : 0;
      const livingScale = 0.975 + breathingCycle * 0.025;
      const material = liquidRef.current.material as THREE.MeshStandardMaterial;
      const baseEmissive = (isSelected ? 1.5 : 0.6) * theme.liquidEmissiveMultiplier;
      material.emissiveIntensity = baseEmissive * (isSelected ? livingScale : 1.0);
    }
  });

  const emissiveIntensity = (isSelected ? 1.5 : 0.6) * theme.liquidEmissiveMultiplier;
  const particleOpacity = theme.particleBrightness * (isSelected ? 1.0 : 0.5);

  return (
    <group>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.45, 0.9, 16, 32]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={theme.glassTransmission}
          opacity={theme.glassOpacity}
          transparent
          roughness={0.05}
          metalness={0.1}
          thickness={0.5}
          ior={1.5}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh ref={liquidRef}>
        <capsuleGeometry args={[0.35, 0.7, 16, 32]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={baseColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={0.85}
          roughness={0.4}
        />
      </mesh>

      <SpecimenFireflies 
        baseColor={baseColor}
        isSelected={isSelected}
        particleOpacity={particleOpacity}
      />
    </group>
  );
}
