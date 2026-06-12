import type { Experiment } from "@/data/experiments";

export interface BottleRendererProps {
  experiment: Experiment;
  isSelected: boolean;
  onClick: () => void;
}
