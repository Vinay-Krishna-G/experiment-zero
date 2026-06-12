"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ConnectedNodeLink } from "@/insights/types";

interface RelatedGraphPanelProps {
  connectedNodes: ConnectedNodeLink[];
}

export default function RelatedGraphPanel({
  connectedNodes,
}: RelatedGraphPanelProps) {
  if (connectedNodes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
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
        Narrative Graph Context
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: "var(--fg-secondary)",
          marginBottom: "1.25rem",
          lineHeight: 1.4,
        }}
      >
        This insight was compiled from records in the laboratory graph:
      </p>

      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {connectedNodes.map((node, index) => {
          let labelColor = "var(--fg-muted)";
          if (node.type === "experiment") labelColor = "var(--accent-emerald)";
          else if (node.type === "blueprint") labelColor = "var(--accent-copper)";

          return (
            <motion.li
              key={node.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.5rem",
                borderRadius: "4px",
                backgroundColor: "rgba(28, 25, 23, 0.015)",
                border: "1px solid rgba(28, 25, 23, 0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  fontWeight: 600,
                  color: labelColor,
                  border: `1px solid ${labelColor}29`,
                  padding: "0.15rem 0.35rem",
                  borderRadius: "3px",
                  textTransform: "uppercase",
                  width: "75px",
                  textAlign: "center",
                  display: "inline-block",
                  letterSpacing: "0.02em",
                }}
              >
                {node.type}
              </span>
              <Link
                href={`/${node.route}/${node.slug}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--fg-primary)",
                  textDecoration: "none",
                  flex: 1,
                }}
                className="ink-underline"
              >
                {node.label}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
