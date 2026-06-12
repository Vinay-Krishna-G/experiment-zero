import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SpecimenFireflies from "../effects/SpecimenFireflies";
import { useDeviceTier } from "../../theme/DeviceTierContext";
import type { Experiment } from "@/types";
import type { LaboratoryTheme } from "../../lighting";
import { getVisualProfile } from "@/visuals/getVisualProfile";
import { COLORS } from "@/visuals/colors";

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

  const profile = getVisualProfile(
    experiment.primaryCategory,
    experiment.status,
    experiment.archived,
    tier
  );

  const glassMat = profile.material;
  const motion = profile.motion;
  const glassColorHex = COLORS[glassMat.glassColor].hex;
  const glassSpecularHex = COLORS[glassMat.glassSpecularColor].hex;
  const liquidColorHex = COLORS[glassMat.liquidColor].hex;
  const liquidEmissiveHex = COLORS[glassMat.liquidEmissive].hex;

  const sizeScales = { small: 0.8, medium: 1.0, large: 1.2 };
  const scale = sizeScales[bottle.size] || 1.0;

  useFrame((state) => {
    const time = state.clock.elapsedTime * motion.baseSpeed;
    const speedMultiplier = isSelected ? 2.0 : 1.0;

    if (liquidRef.current) {
      // Bobbing
      const noise = motion.noiseIntensity > 0 
        ? (Math.sin(time * 1.7) * Math.cos(time * 1.3) * 0.5) 
        : 0;
      liquidRef.current.position.y = (Math.sin(time * motion.bobbingFrequency * speedMultiplier) + noise) * motion.bobbingAmplitude;
      
      if (motion.rotationScale > 0) {
        liquidRef.current.rotation.y = time * motion.rotationScale * speedMultiplier;
      }

      // Breathing Emissive Pulse
      const breathingCycle = isSelected ? Math.sin(time * motion.breathingSpeed * (Math.PI * 2)) : 0;
      const livingScale = (1.0 - motion.breathingAmplitude) + breathingCycle * motion.breathingAmplitude;
      const material = liquidRef.current.material as THREE.MeshStandardMaterial;
      const baseEmissive = (isSelected ? 1.5 : 0.6) * theme.liquidEmissiveMultiplier * glassMat.liquidEmissiveIntensity;
      material.emissiveIntensity = baseEmissive * (isSelected ? livingScale : 1.0);
    }
  });

  const baseEmissiveIntensity = (isSelected ? 1.5 : 0.6) * theme.liquidEmissiveMultiplier * glassMat.liquidEmissiveIntensity;
  const particleOpacity = theme.particleBrightness * (isSelected ? 1.0 : 0.5) * profile.particles.opacity;

  return (
    <group scale={scale}>
      <mesh castShadow={tier !== "low"} receiveShadow={tier !== "low"}>
        <capsuleGeometry args={[0.45, 0.9, 16, 32]} />
        {tier === "low" ? (
          <meshStandardMaterial 
            color={glassColorHex}
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        ) : (
          <meshPhysicalMaterial 
            transparent
            color={glassColorHex}
            transmission={glassMat.glassTransmission * theme.glassTransmission}
            opacity={glassMat.glassOpacity * theme.glassOpacity}
            roughness={glassMat.glassRoughness}
            metalness={glassMat.glassMetalness}
            ior={glassMat.glassIor}
            thickness={glassMat.glassThickness}
            clearcoat={glassMat.glassClearcoat}
            clearcoatRoughness={glassMat.glassClearcoatRoughness}
            specularIntensity={glassMat.glassSpecularIntensity}
            specularColor={new THREE.Color(glassSpecularHex)}
          />
        )}
      </mesh>

      <mesh ref={liquidRef}>
        <capsuleGeometry args={[0.35, 0.7 * bottle.fillLevel, 16, 32]} />
        <meshStandardMaterial 
          color={liquidColorHex} 
          emissive={liquidEmissiveHex}
          emissiveIntensity={baseEmissiveIntensity}
          transparent
          opacity={glassMat.liquidOpacity}
          roughness={glassMat.liquidRoughness}
        />
      </mesh>

      <SpecimenFireflies 
        baseColor={liquidColorHex}
        isSelected={isSelected}
        particleOpacity={particleOpacity}
        particlePreset={profile.particles}
      />
    </group>
  );
}
