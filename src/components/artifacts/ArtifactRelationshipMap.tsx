"use client";

import { motion } from "framer-motion";

interface ArtifactRelationshipMapProps {
  experimentTitle: string;
  blueprintTitle?: string;
  logs?: { title: string }[];
  hasEvidence?: boolean;
}

export default function ArtifactRelationshipMap({
  experimentTitle,
  blueprintTitle,
  logs = [],
  hasEvidence = true
}: ArtifactRelationshipMapProps) {
  const children = [];
  if (blueprintTitle) children.push({ type: "blueprint", label: blueprintTitle });
  for (const log of logs) {
    children.push({ type: "insight", label: log.title });
  }
  if (hasEvidence) children.push({ type: "evidence", label: "Impact & Evidence Panel" });

  return (
    <div
      style={{
        margin: "3rem 0",
        padding: "2rem",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-medium)",
        borderRadius: "2px",
      }}
      aria-label="Artifact Relationship Map"
    >
      <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2rem" }}>
        System Topology
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {/* Root Node */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}
        >
          <div style={{ width: "8px", height: "8px", backgroundColor: "var(--accent-emerald)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--fg-primary)" }}>
            {experimentTitle}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--fg-subtle)", padding: "0.2rem 0.4rem", border: "1px solid var(--border-subtle)", borderRadius: "2px", textTransform: "uppercase" }}>
            Experiment
          </span>
        </motion.div>

        {/* Children Nodes */}
        <div style={{ position: "relative", paddingLeft: "1.2rem", marginLeft: "3px" }}>
          <div style={{ position: "absolute", top: 0, bottom: "20px", left: 0, width: "1px", backgroundColor: "var(--border-medium)" }} />
          
          {children.map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (i + 1) }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", position: "relative", height: "40px" }}
            >
              <div style={{ position: "absolute", left: "-1.2rem", width: "1.2rem", height: "1px", backgroundColor: "var(--border-medium)" }} />
              
              <div style={{ 
                width: "6px", height: "6px", borderRadius: "50%", 
                backgroundColor: child.type === "blueprint" ? "#1e3a8a" : child.type === "evidence" ? "#10b981" : "var(--accent-copper)"
              }} />
              
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--fg-secondary)" }}>
                {child.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
