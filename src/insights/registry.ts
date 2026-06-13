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
    evidence: {
      problem: "Content additions (draft settings, slugs, relationships) were frequently committed with missing attributes or duplicate values, causing build breaks on Vercel deployment.",
      constraints: [
        "Must run within the standard prebuild step without network latency.",
        "Must enforce strict TypeScript compilation safety across all content objects."
      ],
      alternatives: [
        {
          name: "Runtime Error Boundaries",
          pros: ["Prevents complete page crashes during render"],
          cons: ["Shows broken content cards to active site visitors", "Leaves underlying data corrupt"]
        },
        {
          name: "Manual QA Reviews",
          pros: ["No initial code setup required"],
          cons: ["High human error rate", "Does not scale with rapid additions"]
        }
      ],
      finalDecision: "Implemented a static validation runner script executing as a prebuild hook, asserting schemas via compiler constraints.",
      tradeoffs: [
        "Slightly increased local build execution times (+400ms) to guarantee production stability."
      ],
      outcome: {
        description: "Enforced 100% type safety and integrity for all dynamic routes before deployment.",
        metrics: [
          "Zero dynamic routing crashes in production",
          "Blocked 3 invalid builds due to slug collisions",
          "Build time overhead limited to under 0.5s"
        ]
      },
      engineeringSignals: ["Build Tooling", "Type Safety", "Testing Strategy"]
    }
  },
  {
    id: "decouple-specimen-state",
    slug: "decouple-specimen-state",
    title: "WebGL Context Loss Optimization: Decoupling Canvas",
    summary: "Decoupling React Three Fiber Canvas containers. Flat 60 FPS scrolling and context lost recovery strategies.",
    takeaway: "Keeps browser frame rates smooth (60 FPS) on media-heavy pages by optimizing GPU memory allocations.",
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
      demonstrates: ["Performance Optimization", "WebGL / Three.js", "State Decoupling"],
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
    evidence: {
      problem: "Loading multiple parallel Three.js Canvas containers simultaneously exceeded WebGL limits, crashing scroll performance.",
      constraints: [
        "Must support 60 FPS viewport scrolling",
        "Must degrade gracefully on legacy mobile GPUs"
      ],
      alternatives: [
        {
          name: "Canvas Virtualization",
          pros: ["Maintains interactive 3D capabilities across all elements in the view"],
          cons: ["Extremely complex layout logic", "High maintenance and code overhead"]
        },
        {
          name: "Decoupling WebGL Assets",
          pros: ["Extremely low memory profile", "Simple state synchronization boundaries"],
          cons: ["Slightly lower visual depth for out-of-viewport items"]
        }
      ],
      finalDecision: "Decoupled renderers, using simple CSS fallback overlays for non-active canvas items.",
      tradeoffs: [
        "Slightly lower visual depth on inactive items in exchange for flat 60 FPS rendering."
      ],
      outcome: {
        description: "Eliminated WebGL context crash warnings completely while securing stable viewport performance.",
        metrics: [
          "Flat 60 FPS scrolling",
          "Zero WebGL context crashes",
          "Graceful degradation on legacy mobile GPUs"
        ]
      },
      engineeringSignals: ["Performance Optimization", "WebGL / Three.js", "State Decoupling"]
    }
  },
  {
    id: "optimize-interaction-friction",
    slug: "optimize-interaction-friction",
    title: "Clipboard Copy UX Telemetry & User Retention",
    summary: "Analytics data and case studies on clipboard API integrations. How user telemetry optimized portfolio actions.",
    takeaway: "Focuses developer time on high-impact user actions (like copy buttons) that analytics show capture 84% of events.",
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
      demonstrates: ["Product Thinking", "Interface UX Design", "Product Analytics"],
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
    evidence: {
      problem: "Focused initial engineering work on search relevance filters that were used by only 12% of visitors, while clipboard copy actions were bottlenecked by layout hoops.",
      constraints: [
        "Must run natively in all modern secure browser contexts (HTTPS)."
      ],
      alternatives: [
        {
          name: "Autocomplete Search Filters",
          pros: ["Allows granular query filtering for very large datasets"],
          cons: ["High implementation complexity", "Extremely low actual utilization by end users"]
        },
        {
          name: "Clipboard Copy Shortcuts",
          pros: ["Extremely low execution friction", "Directly targets dominant user workflow"],
          cons: ["Requires secure context (HTTPS) for navigator.clipboard API"]
        }
      ],
      finalDecision: "Highlight copy controls and expose clipboard actions instantly on cursor hover.",
      tradeoffs: [
        "Traded search filtering complexity for immediate visual copy action indicators."
      ],
      outcome: {
        description: "Raised item copy retention rates by 45% post-launch.",
        metrics: [
          "Raised item copy retention rates by 45% post-launch",
          "Reduced layout friction to immediate hover controls",
          "Identified search filter utilization drop to 12%"
        ]
      },
      engineeringSignals: ["Product Thinking", "Interface UX Design"]
    }
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
