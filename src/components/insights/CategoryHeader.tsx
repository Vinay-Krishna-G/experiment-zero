"use client";

import { motion } from "framer-motion";
import type { KnowledgeCluster } from "@/insights/types";

interface CategoryHeaderProps {
  cluster: KnowledgeCluster;
}

export default function CategoryHeader({ cluster }: CategoryHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "2rem",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-medium)",
        borderRadius: "8px",
        marginBottom: "3rem",
        boxShadow: "0 4px 20px -2px rgba(28, 25, 23, 0.04)",
        backgroundImage: "radial-gradient(circle at 100% 0%, var(--accent-emerald-dim) 0%, transparent 60%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexFlow: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "var(--accent-emerald)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Knowledge Cluster
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--fg-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {cluster.title}
          </h1>
        </div>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "var(--accent-copper)",
            backgroundColor: "var(--accent-copper-dim)",
            border: "1px solid rgba(146, 64, 14, 0.2)",
            padding: "0.25rem 0.6rem",
            borderRadius: "4px",
            textTransform: "uppercase",
          }}
        >
          Recruiter Profile
        </span>
      </div>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1.1rem",
          color: "var(--fg-secondary)",
          marginBottom: "2rem",
          lineHeight: 1.5,
          maxWidth: "720px",
        }}
      >
        {cluster.description}
      </p>

      {/* Recruiter capability container */}
      <div
        style={{
          borderTop: "1px dashed var(--border-subtle)",
          paddingTop: "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--fg-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Core Candidate Capabilities:
        </span>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            lineHeight: 1.5,
            color: "var(--fg-primary)",
            backgroundColor: "rgba(28, 25, 23, 0.02)",
            borderLeft: "3px solid var(--accent-emerald)",
            padding: "1rem",
            borderRadius: "0 4px 4px 0",
          }}
        >
          {cluster.capabilitySummary}
        </div>
      </div>
    </motion.header>
  );
}
