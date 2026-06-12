export type EngineeringSignal =
  | "System Design"
  | "Performance Optimization"
  | "Data Modeling"
  | "API Design"
  | "Distributed Systems Thinking"
  | "Frontend Architecture"
  | "DX Improvements"
  | "Build Tooling"
  | "Type Safety"
  | "Testing Strategy"
  | "Scalability Planning";

export interface SkillNodeLink {
  id: string;
  slug: string;
  title: string;
  type: "experiment" | "blueprint" | "research" | "insight";
  route: string;
}

export interface SkillMatrixEntry {
  signal: EngineeringSignal;
  nodes: SkillNodeLink[];
}
