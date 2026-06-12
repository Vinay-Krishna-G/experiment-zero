export interface ContentSections {
  problem?: string;
  solution?: string;
  architecture?: string;
  challenges?: string;
  results?: string;
}

export interface TimelineStage {
  label: string;
  status: "done" | "current" | "pending";
}
