import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function AspectAwareCamera() {
  const aspect = useThree((state) => state.viewport.aspect);
  
  const isPortrait = aspect < 1.0;
  
  return (
    <PerspectiveCamera 
      makeDefault 
      position={[0, 0, isPortrait ? 7.5 : 5.5]} 
      fov={isPortrait ? 55 : 45} 
    />
  );
}
