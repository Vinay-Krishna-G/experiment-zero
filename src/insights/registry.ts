import type { KnowledgeArtifact, KnowledgeCluster } from "./types";

export const KNOWLEDGE_ARTIFACTS: KnowledgeArtifact[] = [
  {
    id: "validate-registry-contracts",
    slug: "validate-registry-contracts",
    title: "Validate Content Registry Contracts at Build Time",
    summary: "Verifying schema fields and dynamic reference integrity during prebuild hooks eliminates runtime page routing crashes.",
    takeaway: "Never trust content creators metadata inputs at runtime; enforce static compiler constraints.",
    visibility: "public",
    knowledgeCategory: "architectural_decision",
    knowledgeTier: "validated_pattern",
    lifecycleStatus: "validated",
    importanceScore: 92,
    confidenceScore: 98,
    problemContext: "Content metadata additions (such as draft settings, tags, or links) were frequently committed with missing fields, duplicate slugs, or dangling references. This caused dynamic page routers to throw exceptions and crash render pipelines for site visitors.",
    discoveryContext: "Diagnostic build trace logs showed that dynamic routing errors occurred during page generation when parsing legacy IDs. Manual verification was slow and prone to human oversight.",
    importanceContext: "In a content-driven architecture, validating registry contracts at compile-time blocks deployment on syntax or link corruption, guaranteeing absolute stability in production.",
    changeContext: "Constructed a centralized prebuild validation script (src/content/validate.ts) executing inside the npm prebuild hook. It asserts schema structures, slug uniqueness, and cross-reference integrity.",
    impactContext: "Caught 3 duplicate path collisions and blocked broken builds from deploying to production.",
    careerSignal: {
      demonstrates: ["Build Pipelines", "Type Safety", "Next.js App Router Architecture"],
    },
    sources: [
      {
        nodeId: "res-architecture-clarity-matters-more-than-visual-polish",
        sourceType: "research",
        evidenceStrength: 0.95,
        context: "Logs verified that clear file-based constraints are superior to runtime error boundaries.",
      },
    ],
    relationships: [],
    metadata: {
      semanticTags: ["Validation", "CI/CD", "Next.js"],
      entityReferences: ["validate.ts", "prebuild", "Next.js App Router"],
    },
    metrics: {
      viewsCount: 145,
      complexityRank: 4,
    },
  },
  {
    id: "decouple-specimen-state",
    slug: "decouple-specimen-state",
    title: "Decouple Specimen Renderers from Container Interaction",
    summary: "Isolating active interactive state selectors from physical WebGL canvas components avoids hardware context limits crash.",
    takeaway: "Keep structural layout container logic separated from Three.js rendering pipelines.",
    visibility: "public",
    knowledgeCategory: "pattern",
    knowledgeTier: "validated_pattern",
    lifecycleStatus: "validated",
    importanceScore: 88,
    confidenceScore: 92,
    problemContext: "Mounting multiple parallel Three.js Canvas components simultaneously exceeded browser limits, throwing WebGL context loss warnings and severely dropping page scrolling performance.",
    discoveryContext: "Render frame profiling showed high layout recalculation latency and CPU spikes when scrolling past the interactive experiment rack container.",
    importanceContext: "Maintaining 60 FPS scrolling and visual stability is vital to the portfolio's tactile laboratory feel; exceeding GPU memory allocations breaks that experience.",
    changeContext: "Decoupled the container logic (Rack) from WebGL assets, mounting the R3F Canvas exclusively on the selected bottle, falling back to a CSS-driven lightweight renderer for inactive ones.",
    impactContext: "Scrolling and transitions optimized to a flat 60 FPS with zero WebGL contexts crash warnings.",
    careerSignal: {
      demonstrates: ["WebGL Optimization", "React Three Fiber / Three.js", "State Decoupling"],
    },
    sources: [
      {
        nodeId: "res-decoupling-rendering-from-interaction-state",
        sourceType: "research",
        evidenceStrength: 0.9,
        context: "Documents the separation boundary between container selectors and the WebGL renderer.",
      },
      {
        nodeId: "res-glb-payload-vs-interaction-latency",
        sourceType: "research",
        evidenceStrength: 0.85,
        context: "Validates frame rates and scroll performance metrics on canvas swaps.",
      },
    ],
    relationships: [
      {
        targetArtifactId: "validate-registry-contracts",
        relationType: "extends",
        strength: 0.5,
      },
    ],
    metadata: {
      semanticTags: ["WebGL", "Three.js", "Performance"],
      entityReferences: ["GLBBottleRenderer", "CSSBottleRenderer", "useFrame"],
    },
    metrics: {
      viewsCount: 210,
      complexityRank: 7,
    },
  },
  {
    id: "optimize-interaction-friction",
    slug: "optimize-interaction-friction",
    title: "Optimize Interaction Points to Near-Zero Friction",
    summary: "Prioritizing actions (like clipboard copying) over retrieval queries based on usage data raises product retention rates.",
    takeaway: "Query speed doesn't matter if execution friction is high; build copy actions first.",
    visibility: "public",
    knowledgeCategory: "lesson",
    knowledgeTier: "observation",
    lifecycleStatus: "emerging",
    importanceScore: 78,
    confidenceScore: 80,
    problemContext: "Assuming discovery and search indexing were the primary user bottlenecks, initial efforts focused on search quality rather than simplifying item extraction.",
    discoveryContext: "Product analytics events showed that search filters were used by only 12% of visitors, while copy buttons captured 84% of interaction events.",
    importanceContext: "Friction at the point of action ruins search-oriented tools. Users want to paste, not browse.",
    changeContext: "Rebuilt grid elements to highlight copy controls, introducing clipboard actions immediately on hover.",
    impactContext: "Observed clipboard copy retention metrics rise by 45% post-implementation.",
    careerSignal: {
      demonstrates: ["Product Analytics", "Interface UX Design", "clipboard API"],
    },
    sources: [
      {
        nodeId: "res-one-click-copy-metrics",
        sourceType: "research",
        evidenceStrength: 0.95,
        context: "Logs direct analytics findings on user search vs clipboard actions.",
      },
    ],
    relationships: [],
    metadata: {
      semanticTags: ["UX", "Analytics", "Clipboard"],
      entityReferences: ["one-click-copy", "search quality", "clipboard API"],
    },
    metrics: {
      viewsCount: 95,
      complexityRank: 2,
    },
  },
];

export const KNOWLEDGE_CLUSTERS: KnowledgeCluster[] = [
  {
    id: "cluster-system-design",
    title: "System Design & Validation",
    category: "system-design",
    description: "Architectural patterns, static build verifications, and decoupled state containers.",
    capabilitySummary: "Demonstrates core mastery over Next.js build compilation pipelines, schema contract checks, and isolated component architectures.",
    artifactIds: ["validate-registry-contracts", "decouple-specimen-state"],
    relationships: [
      {
        targetClusterId: "cluster-performance-ux",
        relationType: "complements",
        strength: 0.8,
      },
    ],
    metrics: {
      totalArtifacts: 2,
      averageImportance: 90,
    },
  },
  {
    id: "cluster-performance-ux",
    title: "Performance Engineering & UX",
    category: "performance-ux",
    description: "GPU context optimizations, frame rate tracking, and usage-driven interfaces.",
    capabilitySummary: "Demonstrates core mastery over React Three Fiber animation frames, canvas pooling mechanisms, and frictionless clipboard execution paths.",
    artifactIds: ["decouple-specimen-state", "optimize-interaction-friction"],
    relationships: [
      {
        targetClusterId: "cluster-system-design",
        relationType: "extensions",
        strength: 0.6,
      },
    ],
    metrics: {
      totalArtifacts: 2,
      averageImportance: 83,
    },
  },
];
