import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useDeviceTier } from "../theme/DeviceTierContext";
import type { LaboratoryTheme } from "../lighting";
import type * as THREE from "three";
import type { Experiment } from "@/types";
import { getVisualProfile } from "@/visuals/getVisualProfile";
import { COLORS } from "@/visuals/colors";

export default function LaboratoryLighting({ 
  experiment,
  theme, 
  isSelected 
}: { 
  experiment: Experiment;
  theme: LaboratoryTheme;
  isSelected: boolean;
}) {
  const tier = useDeviceTier();
  const rimLightRef = useRef<THREE.DirectionalLight>(null);

  const profile = getVisualProfile(
    experiment.primaryCategory,
    experiment.status,
    experiment.archived,
    tier
  );

  const lighting = profile.lighting;
  const atmosphere = profile.atmosphere;

  useFrame((state) => {
    const time = state.clock.elapsedTime * profile.motion.baseSpeed;
    const breathingCycle = isSelected ? Math.sin(time * profile.motion.breathingSpeed * (Math.PI * 2)) : 0;
    const livingScale = (1.0 - profile.motion.breathingAmplitude) + breathingCycle * profile.motion.breathingAmplitude;
    
    if (rimLightRef.current) {
      rimLightRef.current.intensity = lighting.rimIntensity * (isSelected ? livingScale : 1.0) * (theme.rimIntensity / 2.5);
    }
  });

  const ambientColorHex = COLORS[lighting.ambientColor].hex;
  const keyColorHex = COLORS[lighting.keyColor].hex;
  const rimColorHex = COLORS[lighting.rimColor].hex;
  const spotColorHex = COLORS[lighting.spotColor].hex;

  const resolvedAmbientIntensity = lighting.ambientIntensity * (theme.ambientIntensity / 0.15);
  const resolvedKeyIntensity = lighting.keyIntensity * (theme.keyIntensity / 0.4);
  const resolvedSpotIntensity = lighting.spotIntensity * (theme.keyIntensity / 0.4);

  return (
    <group>
      <ambientLight intensity={resolvedAmbientIntensity} color={ambientColorHex} />
      <spotLight 
        position={[0, 5, 2]} 
        angle={0.4} 
        penumbra={1} 
        intensity={resolvedSpotIntensity} 
        color={spotColorHex} 
        castShadow={tier !== "low"} 
        shadow-mapSize-width={tier === "medium" ? 512 : 1024}
        shadow-mapSize-height={tier === "medium" ? 512 : 1024}
      />
      <directionalLight 
        position={lighting.keyPosition} 
        intensity={resolvedKeyIntensity} 
        color={keyColorHex} 
      />
      <directionalLight 
        ref={rimLightRef}
        position={lighting.rimPosition} 
        intensity={lighting.rimIntensity} 
        color={rimColorHex} 
      />
      <Environment 
        preset={atmosphere.environmentMap} 
        resolution={tier === "low" ? 256 : tier === "medium" ? 512 : 1024} 
      />
    </group>
  );
}
