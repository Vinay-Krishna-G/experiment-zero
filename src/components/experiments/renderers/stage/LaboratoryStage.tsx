import LaboratoryLighting from "./LaboratoryLighting";
import ArchivalEnvironment from "./ArchivalEnvironment";
import ProceduralSpecimen from "./specimens/ProceduralSpecimen";
import type { Experiment } from "@/data/experiments";
import type { LaboratoryTheme } from "../lighting";

export default function LaboratoryStage({
  experiment,
  isSelected,
  theme
}: {
  experiment: Experiment;
  isSelected: boolean;
  theme: LaboratoryTheme;
}) {
  return (
    <group>
      <LaboratoryLighting theme={theme} isSelected={isSelected} />
      <ArchivalEnvironment isSelected={isSelected} />
      <ProceduralSpecimen 
        experiment={experiment} 
        isSelected={isSelected} 
        theme={theme} 
      />
    </group>
  );
}
