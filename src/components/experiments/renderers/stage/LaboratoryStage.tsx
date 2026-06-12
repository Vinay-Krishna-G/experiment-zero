import LaboratoryLighting from "./LaboratoryLighting";
import ArchivalEnvironment from "./ArchivalEnvironment";
import ProceduralSpecimen from "./specimens/ProceduralSpecimen";
import GLBSpecimen from "./specimens/GLBSpecimen";
import AspectAwareCamera from "./AspectAwareCamera";
import { ErrorBoundary } from "./ErrorBoundary";
import type { Experiment } from "@/content";
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
      <LaboratoryLighting 
        experiment={experiment}
        theme={theme} 
        isSelected={isSelected} 
      />
      <ArchivalEnvironment isSelected={isSelected} />
      
      {isGLBTarget ? (
        <ErrorBoundary fallback={
          <ProceduralSpecimen 
            key={experiment.id}
            experiment={experiment} 
            isSelected={isSelected} 
            theme={theme} 
          />
        }>
          <GLBSpecimen 
            key={experiment.id}
            experiment={experiment} 
            isSelected={isSelected} 
            theme={theme} 
          />
        </ErrorBoundary>
      ) : (
        <ProceduralSpecimen 
          key={experiment.id}
          experiment={experiment} 
          isSelected={isSelected} 
          theme={theme} 
        />
      )}
    </group>
  );
}
