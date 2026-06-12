"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SkillMatrixEntry } from "@/evidence/types";

interface SkillMatrixProps {
  matrix: SkillMatrixEntry[];
}

export default function SkillMatrix({ matrix }: SkillMatrixProps) {
  if (matrix.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          backgroundColor: "var(--bg-card)",
          border: "1px dashed var(--border-subtle)",
          borderRadius: "6px",
          textAlign: "center",
          fontStyle: "italic",
          color: "var(--fg-muted)",
        }}
      >
        No competency mappings found. Populate evidence blocks in registries to generate matrix entries.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {matrix.map((entry, index) => (
        <motion.div
          key={entry.signal}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(28, 25, 23, 0.01)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            position: "relative",
            overflow: "hidden",
            backgroundImage: "linear-gradient(180deg, rgba(28, 25, 23, 0.005) 0%, transparent 100%)",
          }}
          whileHover={{
            y: -3,
            borderColor: "var(--accent-emerald)",
            boxShadow: "0 8px 20px rgba(28, 25, 23, 0.04)",
          }}
        >
          {/* Top category label */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 600,
                color: "var(--accent-emerald)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Competency Sector
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--fg-primary)",
              }}
            >
              {entry.signal}
            </h3>
          </div>

          {/* List of supporting assets */}
          <div
            style={{
              borderTop: "1px dashed var(--border-subtle)",
              paddingTop: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 500,
                color: "var(--fg-muted)",
                textTransform: "uppercase",
              }}
            >
              Supporting Assets ({entry.nodes.length}):
            </span>

            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {entry.nodes.map((node) => {
                let badgeColor = "var(--fg-muted)";
                if (node.type === "experiment") badgeColor = "var(--accent-emerald)";
                else if (node.type === "blueprint") badgeColor = "var(--accent-copper)";
                else if (node.type === "insight") badgeColor = "#2b6cb0";

                return (
                  <li
                    key={node.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.52rem",
                        fontWeight: 600,
                        color: badgeColor,
                        border: `1px solid ${badgeColor}33`,
                        padding: "0.1rem 0.3rem",
                        borderRadius: "3px",
                        textTransform: "uppercase",
                        width: "68px",
                        textAlign: "center",
                        flexShrink: 0,
                        display: "inline-block",
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
                        color: "var(--fg-secondary)",
                        textDecoration: "none",
                        lineHeight: 1.35,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      className="ink-underline"
                    >
                      {node.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
