import LaboratoryLighting from "./LaboratoryLighting";
import ArchivalEnvironment from "./ArchivalEnvironment";
import ProceduralSpecimen from "./specimens/ProceduralSpecimen";
import GLBSpecimen from "./specimens/GLBSpecimen";
import AspectAwareCamera from "./AspectAwareCamera";
import { ErrorBoundary } from "./ErrorBoundary";
import type { Experiment } from "@/data/experiments";
import type { LaboratoryTheme } from "../lighting";

const ENABLE_GLB = true;

export default function LaboratoryStage({
  experiment,
  isSelected,
  theme
}: {
  experiment: Experiment;
  isSelected: boolean;
  theme: LaboratoryTheme;
}) {
  const isGLBTarget = ENABLE_GLB;

  return (
    <group>
      <AspectAwareCamera />
      <LaboratoryLighting theme={theme} isSelected={isSelected} />
      <ArchivalEnvironment isSelected={isSelected} />
      
      {isGLBTarget ? (
        <ErrorBoundary fallback={
          <ProceduralSpecimen 
            experiment={experiment} 
            isSelected={isSelected} 
            theme={theme} 
          />
        }>
          <GLBSpecimen 
            experiment={experiment} 
            isSelected={isSelected} 
            theme={theme} 
          />
        </ErrorBoundary>
      ) : (
        <ProceduralSpecimen 
          experiment={experiment} 
          isSelected={isSelected} 
          theme={theme} 
        />
      )}
    </group>
  );
}
