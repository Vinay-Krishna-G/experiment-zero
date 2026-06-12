import { Center, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { EXPERIMENTS, type Experiment } from "@/content";
import type { LaboratoryTheme } from "../../lighting";
import { useDeviceTier } from "../../theme/DeviceTierContext";

// Preload globally so suspense doesn't pop in on first click
EXPERIMENTS.forEach((exp) => {
  useGLTF.preload(`/models/specimens/exp-${exp.id}.glb`);
});

export default function GLBSpecimen({
  experiment
}: {
  experiment: Experiment;
  isSelected: boolean;
  theme: LaboratoryTheme;
}) {
  const tier = useDeviceTier();
  const assetUrl = `/models/specimens/exp-${experiment.id}.glb`;
  
  const { scene } = useGLTF(assetUrl);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = tier !== "low";
          child.receiveShadow = tier !== "low";
        }
      });
    }
  }, [scene, tier]);

  return (
    <group>
      <Center bottom position={[0, -0.9, 0]}>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
