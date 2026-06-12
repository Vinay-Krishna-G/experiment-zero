import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { LaboratoryTheme } from "../lighting";
import type * as THREE from "three";

export default function LaboratoryLighting({ 
  theme, 
  isSelected 
}: { 
  theme: LaboratoryTheme;
  isSelected: boolean;
}) {
  const rimLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const breathingCycle = isSelected ? Math.sin(time * (Math.PI * 2 / 10)) : 0;
    const livingScale = 0.975 + breathingCycle * 0.025;
    
    if (rimLightRef.current) {
      rimLightRef.current.intensity = theme.rimIntensity * (isSelected ? livingScale : 1.0);
    }
  });

  return (
    <group>
      <ambientLight intensity={theme.ambientIntensity} color={theme.ambientColor} />
      <spotLight 
        position={[0, 5, 2]} 
        angle={0.4} 
        penumbra={1} 
        intensity={theme.keyIntensity * 1.5} 
        color="#fffcf5" 
        castShadow 
      />
      <directionalLight 
        position={[5, 10, 8]} 
        intensity={theme.keyIntensity} 
        color={theme.keyColor} 
      />
      <directionalLight 
        ref={rimLightRef}
        position={[-8, 5, -8]} 
        intensity={theme.rimIntensity} 
        color={theme.rimColor} 
      />
      <Environment preset="warehouse" />
    </group>
  );
}
