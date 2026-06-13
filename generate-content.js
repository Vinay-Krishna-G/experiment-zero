/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const researchLogs = [
  // Portfolio
  {
    id: "portfolio-flat-files",
    title: "Why I Chose Flat Files Over a CMS",
    category: "System Design Note",
    summary: "Exploring the tradeoff between editorial convenience and engineering integrity.",
    content: "## Problem\nMost portfolios rely on a Headless CMS (like Sanity or Contentful) to manage project data. While this makes updating content easy, it introduces a massive disconnect between the codebase and the content. If a component expects a certain field, and the CMS schema changes, the build breaks at runtime. I needed a way to guarantee that broken content relationships would fail at compile time.\n\n## Decision\nI decided to reject the CMS approach entirely and use TypeScript flat files (registries) as the single source of truth. Every project, blueprint, and research log is a strongly-typed object inside the repository.\n\n## Outcome\nThe result is a statically generated site that boasts 100% type safety. If an experiment references a blueprint ID that doesn't exist, TypeScript throws an error before a build is even attempted.\n\n## Lessons Learned\n- Content is just data, and for developer portfolios, type safety is more valuable than non-technical editorial access.\n- Storing content in the repository creates a perfect historical audit log via Git.\n- This approach is highly scalable for single-author sites, but would struggle in a multi-author environment.",
    tags: ["Architecture", "CMS", "TypeScript"],
    relatedExperimentId: "experiment-zero",
    relatedBlueprintId: "experiment-zero"
  },
  {
    id: "portfolio-content-system",
    title: "Building a Portfolio as a Content System",
    category: "Observation",
    summary: "Shifting the perspective of a portfolio from a static brochure to a living archive.",
    content: "## Problem\nStandard portfolios are effectively digital brochures. They show a screenshot, a title, and a link. This fails to demonstrate the actual engineering process, architectural decisions, and constraints faced during development. The challenge was figuring out how to showcase the *how* and *why* alongside the *what*.\n\n## Decision\nI architected the portfolio as a relational content system. Rather than having a 'Projects' page, I created an 'Experiment Vault' where every project acts as a node connected to Research Logs, Architectural Blueprints, and Field Notes.\n\n## Outcome\nThis shift transforms the portfolio into a technical knowledge base. When a recruiter or engineer views a project, they aren't just seeing the final product; they can navigate through the architectural decisions and lessons learned that led to that product.\n\n## Lessons Learned\n- Emphasizing the engineering process requires an information architecture built for exploration, not just presentation.\n- Connecting nodes of information (Projects to Blueprints to Logs) creates a much more compelling narrative for technical reviewers.",
    tags: ["Information Architecture", "System Design"],
    relatedExperimentId: "experiment-zero",
    relatedBlueprintId: "experiment-zero"
  },
  {
    id: "portfolio-static-vs-dynamic",
    title: "Static Generation vs Dynamic Content",
    category: "System Design Note",
    summary: "Evaluating performance tradeoffs in deployment strategies for content-heavy sites.",
    content: "## Problem\nWith a complex relational content system, rendering pages dynamically on every request would require multiple database lookups or expensive file reads. This would severely impact Time to First Byte (TTFB) and First Contentful Paint (FCP), especially for users far from the deployment region.\n\n## Decision\nI utilized Next.js Static Site Generation (SSG). Because the content is managed via TypeScript registries within the repository, the entire relational graph can be resolved at build time.\n\n## Outcome\nThe portfolio is delivered as static HTML and CSS from a global CDN edge. Database latency is completely eliminated, resulting in instant page loads and maximum SEO performance.\n\n## Lessons Learned\n- For read-heavy applications where content updates are infrequent (like a portfolio), dynamic server rendering is an unnecessary bottleneck.\n- Resolving relational data at build time vastly simplifies deployment architecture and removes runtime failure vectors.",
    tags: ["Next.js", "Performance", "SSG"],
    relatedExperimentId: "experiment-zero",
    relatedBlueprintId: "experiment-zero"
  },
  // PromptVault
  {
    id: "promptvault-search-vs-categories",
    title: "Why Search Matters More Than Categories",
    category: "Discovery",
    summary: "Observing how users navigate large collections of text snippets.",
    content: "## Problem\nWhen building PromptVault, I initially assumed users would want deeply nested folder structures and strict categorization to organize their AI prompts. However, as the vault grew, manually categorizing every prompt became a high-friction task that users actively avoided.\n\n## Decision\nI shifted development focus away from complex folder hierarchies and instead prioritized an extremely fast, fuzzy search implementation combined with lightweight, flexible tagging.\n\n## Outcome\nThe user experience improved dramatically. Users were able to dump prompts into the vault with minimal friction and retrieve them instantly using a few keystrokes, completely bypassing the need to remember where a prompt was 'stored'.\n\n## Lessons Learned\n- In high-velocity workflows, retrieval speed is significantly more important than structural organization.\n- Forcing users into strict taxonomies creates friction; flexible tagging combined with powerful search accommodates organic usage patterns.",
    tags: ["UX", "Search", "Product Design"],
    relatedExperimentId: "promptvault",
    relatedBlueprintId: "promptvault"
  },
  {
    id: "promptvault-mongodb-flexibility",
    title: "MongoDB Flexibility During MVP Development",
    category: "System Design Note",
    summary: "Leveraging NoSQL to accelerate early product iteration.",
    content: "## Problem\nDuring the early stages of PromptVault's development, the data model for an 'AI Prompt' was constantly shifting. Some prompts required variables, others required context attachments, and some needed specific model parameters. Using a strict SQL database would have required writing and executing migrations for every minor feature addition.\n\n## Decision\nI chose MongoDB for the MVP to take advantage of its flexible, document-oriented schema. This allowed the application layer to enforce validation when necessary, while the database happily accepted evolving data shapes.\n\n## Outcome\nDevelopment velocity remained exceptionally high during the prototyping phase. I was able to test new prompt structures with users without touching database migration scripts or dealing with downtime.\n\n## Lessons Learned\n- NoSQL databases are incredibly valuable during the discovery phase of a product when schemas are highly volatile.\n- The tradeoff is that application-level validation becomes critical to prevent corrupted states from breaking the UI.",
    tags: ["Database", "MongoDB", "Architecture"],
    relatedExperimentId: "promptvault",
    relatedBlueprintId: "promptvault"
  },
  // CodeMelt
  {
    id: "codemelt-repository-understanding",
    title: "Why Repository Understanding Is Difficult",
    category: "Observation",
    summary: "Analyzing the cognitive load required to navigate unfamiliar codebases.",
    content: "## Problem\nWhen joining a new project, developers spend days tracing imports, reading outdated documentation, and trying to build a mental model of the system architecture. Passing an entire repository into a Large Language Model (LLM) is impossible due to context window limitations, and simple keyword search fails to capture architectural intent.\n\n## Decision\nCodeMelt was built on the premise that repository understanding requires semantic search combined with architectural awareness, not just string matching. The system needed to map relationships, not just index text.\n\n## Outcome\nBy treating the repository as a graph of knowledge rather than a collection of text files, CodeMelt surfaces relevant context much more effectively, drastically reducing onboarding time.\n\n## Lessons Learned\n- Code is highly contextual; a function's meaning depends on its callers and its placement within the broader architecture.\n- Developer tools succeed when they reduce the cognitive load of exploration, rather than simply generating more text to read.",
    tags: ["Developer Experience", "AI", "RAG"],
    relatedExperimentId: "ai-codebase-analyzer",
    relatedBlueprintId: "ai-codebase-analyzer"
  },
  {
    id: "codemelt-chunking-strategies",
    title: "Chunking Strategies for Large Codebases",
    category: "System Design Note",
    summary: "Balancing context preservation with retrieval efficiency in RAG pipelines.",
    content: "## Problem\nIn a Retrieval-Augmented Generation (RAG) pipeline for code, naive chunking (e.g., splitting by every 500 characters) frequently breaks functions in half or separates variable declarations from their usage. This destroys the semantic meaning of the code snippet, making the resulting vector embedding useless for retrieval.\n\n## Decision\nI implemented syntax-aware chunking strategies using LangChain. Instead of blind character counts, the ingestion pipeline respects function boundaries, class definitions, and module exports.\n\n## Outcome\nRetrieval accuracy improved significantly. When the LLM was provided with intact, complete functions rather than fragmented text blocks, its ability to explain the code and identify bugs increased dramatically.\n\n## Lessons Learned\n- In code-based RAG, chunking strategy is often more important than the choice of the underlying embedding model.\n- Preserving structural boundaries is critical for maintaining semantic meaning in vector space.",
    tags: ["RAG", "LangChain", "Vector Databases"],
    relatedExperimentId: "ai-codebase-analyzer",
    relatedBlueprintId: "ai-codebase-analyzer"
  },
  {
    id: "codemelt-metadata-retrieval",
    title: "Metadata Improves Retrieval More Than Bigger Models",
    category: "Discovery",
    summary: "Discovering the power of hybrid search in specialized AI applications.",
    content: "## Problem\nEven with syntax-aware chunking, vector similarity search sometimes returned conceptually similar code from completely irrelevant parts of the repository (e.g., a logging utility from the frontend when asking about a backend database transaction).\n\n## Decision\nI enhanced the vector index with rich metadata payloads. Every chunk stored its file path, language, module designation, and component type. I then implemented hybrid search: pre-filtering by metadata before performing vector similarity scoring.\n\n## Outcome\nThe precision of the retrieval pipeline skyrocketed. By forcing the search to respect architectural boundaries (e.g., 'only search within src/backend/database'), the system eliminated false positives entirely.\n\n## Lessons Learned\n- Throwing a larger, more expensive LLM at a problem rarely fixes underlying retrieval flaws.\n- Metadata is the secret weapon of effective RAG pipelines, providing the deterministic boundaries that probabilistic vector search lacks.",
    tags: ["Search", "RAG", "Metadata"],
    relatedExperimentId: "ai-codebase-analyzer",
    relatedBlueprintId: "ai-codebase-analyzer"
  },
  // StudySpark
  {
    id: "studyspark-study-workflows",
    title: "Designing Study Workflows Instead of Note Storage",
    category: "Observation",
    summary: "Shifting the product focus from content creation to learning progression.",
    content: "## Problem\nInitially, StudySpark was designed primarily as a note-taking application. However, user feedback indicated that the primary struggle wasn't writing notes, but managing the process of reviewing and mastering the material over time. A static repository of text wasn't solving the core educational challenge.\n\n## Decision\nI pivoted the platform's architecture to emphasize the *learning workflow*. Features like subject organization, topic hierarchies, and spaced review indicators were prioritized over complex text editing capabilities.\n\n## Outcome\nStudySpark evolved from a digital notebook into an active learning management system. Users reported feeling more in control of their curriculum and more consistent in their study habits.\n\n## Lessons Learned\n- Products should solve the user's ultimate goal (learning) rather than just facilitating the immediate action (typing).\n- Workflow design is often a stronger differentiator than feature density.",
    tags: ["Product Design", "Education", "UX"],
    relatedExperimentId: "studyspark",
    relatedBlueprintId: "studyspark"
  },
  {
    id: "studyspark-progress-tracking",
    title: "Progress Tracking Without Creating Friction",
    category: "System Design Note",
    summary: "Implementing analytics that motivate rather than overwhelm.",
    content: "## Problem\nTo help students stay consistent, StudySpark needed a progress tracking system. However, requiring users to manually log every minute spent studying or fill out complex completion forms created too much administrative overhead, causing users to abandon the tracking features entirely.\n\n## Decision\nI designed a lightweight, frictionless progress model based on simple state transitions (e.g., 'To Learn', 'Reviewing', 'Mastered') at the topic level. The system automatically derived overall subject progress from these simple, binary user inputs.\n\n## Outcome\nEngagement with the progress tracking features stabilized. Students received the motivational benefits of seeing their progress bars fill up without feeling burdened by the data entry process.\n\n## Lessons Learned\n- Analytics and tracking systems must balance the value of the insights generated against the friction required to collect the data.\n- Simple, low-friction interactions (like a single click to mark a topic as 'Mastered') often yield more reliable engagement than granular tracking tools.",
    tags: ["UX", "Analytics", "Engagement"],
    relatedExperimentId: "studyspark",
    relatedBlueprintId: "studyspark"
  }
];

const fieldNotes = [
  // Portfolio
  { tag: "Architecture", note: "Type safety isn't just about catching errors; it's about making the architecture self-documenting." },
  { tag: "Performance", note: "Database latency is the enemy of exploration. Static generation eliminates it entirely." },
  { tag: "Design", note: "A portfolio should feel like a place, not a page. Exploration requires a structured environment." },
  { tag: "Content", note: "Code rots, but documentation compounds. Building a system that forces documentation ensures long-term value." },
  { tag: "Deployment", note: "Moving complexity to the build step reduces operational anxiety to zero." },
  
  // PromptVault
  { tag: "Product", note: "Users don't want to organize things; they want to find things. Optimize for retrieval." },
  { tag: "Database", note: "Schema flexibility in NoSQL is a prototype superpower, but a maintenance liability in production." },
  { tag: "UX", note: "If the core action (copying a prompt) takes more than one click, the product fails." },
  { tag: "Security", note: "Rolling your own JWT auth forces you to understand security boundaries deeply, even if it's more work upfront." },
  { tag: "Engineering", note: "Build the MVP around the single highest-value interaction. Everything else is secondary." },
  
  // CodeMelt
  { tag: "AI", note: "The hardest part of RAG isn't the generation; it's feeding the right context into the prompt." },
  { tag: "Architecture", note: "Decoupling heavy ingestion pipelines from the frontend prevents UI thread blocking and improves stability." },
  { tag: "Search", note: "Vector similarity is probabilistic. Metadata filtering makes it deterministic. You need both." },
  { tag: "Data Processing", note: "Syntax-aware chunking preserves the semantic intent of code far better than fixed-size character splitting." },
  { tag: "Product", note: "Developer tools must reduce cognitive load. If it requires a manual, it's too complex." },
  
  // StudySpark
  { tag: "UX", note: "Frictionless progress tracking motivates users; complex tracking creates a chore they will avoid." },
  { tag: "Design", note: "A clear information hierarchy reduces overwhelm when managing large amounts of study material." },
  { tag: "Engineering", note: "Relational data models shine when representing structured curricula and topic dependencies." },
  { tag: "Product", note: "Focus on the workflow (learning) rather than the artifact (the note)." },
  { tag: "Architecture", note: "Building a traditional full-stack app provides a rock-solid foundation before introducing complex AI features." }
];

const fsR = fs;

// Generate Research Logs
let researchExports = '';
researchLogs.forEach((log) => {
  const content = `import { createResearchLog } from "../factories";\n\nexport const ${log.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())} = createResearchLog({\n  id: "${log.id}",\n  date: "2026-06-13",\n  publishedAt: "2026-06-13",\n  title: "${log.title}",\n  category: "${log.category}",\n  summary: "${log.summary}",\n  content: \`${log.content.replace(/`/g, "\\`")}\`,\n  tags: ${JSON.stringify(log.tags)},\n  relatedExperimentId: "${log.relatedExperimentId}",\n  relatedBlueprintId: "${log.relatedBlueprintId}"\n});\n`;
  fsR.writeFileSync(path.join('src/content/research', `${log.id}.ts`), content);

  researchExports += `export { ${log.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())} } from "./${log.id}";\n`;
});
fsR.writeFileSync('src/content/research/index.ts', researchExports);

// Generate Field Notes
let notesExports = 'import type { FieldNote } from "@/types";\n\n';
let exportList = [];
fieldNotes.forEach((note, i) => {
  const id = `note${(i + 1).toString().padStart(2, '0')}`;
  const content = `import type { FieldNote } from "@/types";\n\nexport const ${id}: FieldNote = {\n  id: "note-${i + 1}",\n  date: "June 2026",\n  tag: "${note.tag}",\n  note: "${note.note.replace(/"/g, '\\"')}"\n};\n`;
  fsR.writeFileSync(path.join('src/content/notes', `${id}.ts`), content);
  notesExports += `export { ${id} } from "./${id}";\n`;
});
fsR.writeFileSync('src/content/notes/index.ts', notesExports);

console.log('Content generated successfully');
