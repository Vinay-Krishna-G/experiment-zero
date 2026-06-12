"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { KnowledgeCluster } from "@/insights/types";

interface ClusterRelatedListProps {
  relatedClusters: KnowledgeCluster[];
  currentClusterId: string;
}

export default function ClusterRelatedList({
  relatedClusters,
  currentClusterId,
}: ClusterRelatedListProps) {
  const filtered = relatedClusters.filter((c) => c.id !== currentClusterId);

  if (filtered.length === 0) return null;

  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "8px",
        boxShadow: "0 2px 12px rgba(28, 25, 23, 0.02)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--fg-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: "0.5rem",
        }}
      >
        Related Clusters
      </h3>

      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {filtered.map((cluster, index) => (
          <motion.li
            key={cluster.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              href={`/insights/category/${cluster.category}`}
              style={{
                textDecoration: "none",
                display: "block",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                  display: "block",
                  marginBottom: "0.25rem",
                  transition: "color 0.2s ease",
                }}
                className="hover-target"
              >
                {cluster.title} &rarr;
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--fg-muted)",
                  lineHeight: 1.4,
                  display: "block",
                }}
              >
                {cluster.description}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
