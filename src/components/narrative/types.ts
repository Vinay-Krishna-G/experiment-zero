export interface JourneyLogItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export interface JourneyViewData {
  experimentId: string;
  title: string;
  status: string;
  progress: number;
  timeline: { label: string; status: "done" | "current" | "pending" }[];
  logs: JourneyLogItem[];
  blueprintId?: string;
  blueprintTitle?: string;
}

export interface LineageImplementationItem {
  id: string;
  slug: string;
  title: string;
  status: string;
  progress: number;
}

export interface LineageViewData {
  blueprintId: string;
  title: string;
  status: string;
  objective: string;
  implementations: {
    active: LineageImplementationItem[];
    completed: LineageImplementationItem[];
    planned: LineageImplementationItem[];
  };
  technologies: string[];
}

export interface SiblingLogLink {
  id: string;
  slug: string;
  title: string;
}

export interface DiscoveryNavigatorData {
  logId: string;
  title: string;
  parentProject?: {
    id: string;
    type: "experiment" | "blueprint";
    label: string;
    slug: string;
  };
  previousLog?: SiblingLogLink;
  nextLog?: SiblingLogLink;
}
