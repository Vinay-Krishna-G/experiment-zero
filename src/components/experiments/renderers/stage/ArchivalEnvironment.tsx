import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ContactShadows } from "@react-three/drei";
import { useDeviceTier } from "../theme/DeviceTierContext";

export default function ArchivalEnvironment({
  isSelected
}: {
  isSelected: boolean;
}) {
  const tier = useDeviceTier();
  const dustRef = useRef<THREE.Points>(null);

  const [[dustBasePositions, dustCurrentPositions, dustPhases]] = useState(() => {
    const count = 25; 
    const basePos = new Float32Array(count * 3);
    const currPos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 2.0; 
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.0;
      
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
    if (dustRef.current) {
      const dustArray = dustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < dustArray.length / 3; i++) {
        dustArray[i * 3] = dustBasePositions[i * 3] + Math.cos(time * 0.1 + dustPhases[i]) * 0.1;
        dustArray[i * 3 + 1] = dustBasePositions[i * 3 + 1] + Math.sin(time * 0.05 + dustPhases[i]) * 0.15;
        dustArray[i * 3 + 2] = dustBasePositions[i * 3 + 2] + Math.sin(time * 0.08 + dustPhases[i]) * 0.1;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position"
            args={[dustCurrentPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.03} 
          color="#fffcf5"
          transparent 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
          opacity={0.3}
        />
      </points>

      <mesh position={[0, -0.975, 0]} castShadow={tier !== "low"} receiveShadow={tier !== "low"}>
        <cylinderGeometry args={[0.55, 0.6, 0.15, 32]} />
        <meshStandardMaterial 
          color="#3d2b1f" 
          roughness={0.6} 
          metalness={0.4} 
          emissive="#b8860b"
          emissiveIntensity={isSelected ? 0.15 : 0}
        />
      </mesh>

      {tier === "low" ? (
        <ContactShadows position={[0, -1.04, 0]} opacity={0.4} scale={2} blur={2} frames={1} />
      ) : (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
          <circleGeometry args={[2.0, 32]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      )}
    </group>
  );
}
