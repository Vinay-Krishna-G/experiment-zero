import type { Experiment } from "@/content";

export interface BottleRendererProps {
  experiment: Experiment;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
}
