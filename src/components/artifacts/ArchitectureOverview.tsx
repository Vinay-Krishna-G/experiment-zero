"use client";

import { motion } from "framer-motion";

export default function ArchitectureOverview() {
  const navy = "#1e3a8a";

  const nodes = [
    { id: "content", label: "CONTENT REGISTRY", x: 50, y: 80, delay: 0 },
    { id: "validation", label: "VALIDATION PIPELINE", x: 260, y: 80, delay: 0.2 },
    { id: "graph", label: "NARRATIVE GRAPH", x: 470, y: 80, delay: 0.4 },
    { id: "evidence", label: "EVIDENCE PLATFORM", x: 680, y: 80, delay: 0.6 },
    { id: "blueprint", label: "BLUEPRINT SYSTEM", x: 680, y: 240, delay: 0.8 },
    { id: "rendering", label: "RENDERING LAYER", x: 470, y: 240, delay: 1.0 },
    { id: "ssg", label: "STATIC SITE GEN.", x: 260, y: 240, delay: 1.2 },
  ];

  const nodeWidth = 140;
  const nodeHeight = 50;

  const paths = [
    // Row 1
    { d: "M 190 105 L 260 105", delay: 0.1 },
    { d: "M 400 105 L 470 105", delay: 0.3 },
    { d: "M 610 105 L 680 105", delay: 0.5 },
    // Turn down
    { d: "M 750 130 L 750 240", delay: 0.7 },
    // Row 2 (going left)
    { d: "M 680 265 L 610 265", delay: 0.9 },
    { d: "M 470 265 L 400 265", delay: 1.1 },
  ];

  return (
    <div
      style={{
        margin: "3rem 0",
        padding: "1rem",
        backgroundColor: "rgba(15,23,42,0.02)",
        border: `1px solid ${navy}`,
        borderRadius: "2px",
        overflow: "hidden"
      }}
      aria-label="Experiment Zero Architecture SVG"
    >
      <div style={{ padding: "0.5rem 1rem", borderBottom: `1px dashed ${navy}`, marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: navy, textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 }}>
          Arch. Draft — Flow Plate 1A
        </h3>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: navy, opacity: 0.6 }}>SYSTEM SPECIFICATION</span>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox="0 0 880 340" style={{ width: "100%", minWidth: "700px", height: "auto" }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" />
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={navy} strokeWidth="0.5" strokeOpacity="0.1" />
            </pattern>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={navy} />
            </marker>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Connections */}
          {paths.map((p, i) => (
            <motion.path
              key={i}
              d={p.d}
              fill="none"
              stroke={navy}
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: p.delay, ease: "easeInOut" }}
            />
          ))}

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: node.delay }}
            >
              <rect
                x={node.x}
                y={node.y}
                width={nodeWidth}
                height={nodeHeight}
                fill="var(--bg-primary)"
                stroke={navy}
                strokeWidth="1.5"
                rx="2"
              />
              <text
                x={node.x + nodeWidth / 2}
                y={node.y + 28}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="700"
                fill={navy}
                letterSpacing="1"
              >
                {node.label}
              </text>
              {/* Corner accents */}
              <circle cx={node.x + 4} cy={node.y + 4} r="1" fill={navy} />
              <circle cx={node.x + nodeWidth - 4} cy={node.y + 4} r="1" fill={navy} />
              <circle cx={node.x + 4} cy={node.y + nodeHeight - 4} r="1" fill={navy} />
              <circle cx={node.x + nodeWidth - 4} cy={node.y + nodeHeight - 4} r="1" fill={navy} />
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}
