import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SpecimenFireflies from "../effects/SpecimenFireflies";
import { useDeviceTier } from "../../theme/DeviceTierContext";
import type { Experiment } from "@/types";
import type { LaboratoryTheme } from "../../lighting";
import { GLASS_PRESETS, GLOW_PRESETS } from "../../presets";

export default function ProceduralSpecimen({ 
  experiment, 
  isSelected,
  theme
}: { 
  experiment: Experiment; 
  isSelected: boolean;
  theme: LaboratoryTheme;
}) {
  const tier = useDeviceTier();
  const liquidRef = useRef<THREE.Mesh>(null);
  const bottle = experiment.bottle;
  const glowColor = GLOW_PRESETS[bottle.glow] || GLOW_PRESETS.green;
  const glassConfig = GLASS_PRESETS[bottle.glass] || GLASS_PRESETS.emerald;

  const sizeScales = { small: 0.8, medium: 1.0, large: 1.2 };
  const scale = sizeScales[bottle.size] || 1.0;

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
    <group scale={scale}>
      <mesh castShadow={tier !== "low"} receiveShadow={tier !== "low"}>
        <capsuleGeometry args={[0.45, 0.9, 16, 32]} />
        {tier === "low" ? (
          <meshStandardMaterial 
            color="#ffffff"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        ) : (
          <meshPhysicalMaterial 
            transparent
            {...glassConfig}
            transmission={theme.glassTransmission} // Dynamic override based on environment
            opacity={theme.glassOpacity}
          />
        )}
      </mesh>

      <mesh ref={liquidRef}>
        <capsuleGeometry args={[0.35, 0.7 * bottle.fillLevel, 16, 32]} />
        <meshStandardMaterial 
          color={glowColor} 
          emissive={glowColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={0.85}
          roughness={0.4}
        />
      </mesh>

      <SpecimenFireflies 
        baseColor={glowColor}
        isSelected={isSelected}
        particleOpacity={particleOpacity}
      />
    </group>
  );
}
