"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { KnowledgeArtifact } from "@/insights/types";

interface InsightCardProps {
  artifact: KnowledgeArtifact;
  index?: number;
}

export default function InsightCard({ artifact, index = 0 }: InsightCardProps) {
  // Format Category
  const categoryLabel = artifact.knowledgeCategory
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Tier color mapping
  let tierColor = "var(--fg-muted)";
  if (artifact.knowledgeTier === "engineering_principle") {
    tierColor = "var(--accent-copper)";
  } else if (artifact.knowledgeTier === "validated_pattern") {
    tierColor = "var(--accent-emerald)";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.5rem",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "6px",
        height: "100%",
        boxShadow: "0 2px 8px rgba(28, 25, 23, 0.02)",
        transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        position: "relative",
      }}
      whileHover={{
        y: -4,
        borderColor: "var(--border-medium)",
        boxShadow: "0 8px 24px rgba(28, 25, 23, 0.06)",
      }}
    >
      <div>
        {/* Category & Status Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "var(--fg-muted)",
              textTransform: "uppercase",
            }}
          >
            {categoryLabel}
          </span>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              fontWeight: 500,
              color: tierColor,
              border: `1px solid ${tierColor}33`,
              padding: "0.15rem 0.4rem",
              borderRadius: "3px",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            {artifact.knowledgeTier.replace(/_/g, " ")}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            fontWeight: 700,
            lineHeight: 1.25,
            color: "var(--fg-primary)",
            marginBottom: "0.75rem",
          }}
        >
          <Link
            href={`/insights/${artifact.slug}`}
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
            className="ink-underline"
          >
            {artifact.title}
          </Link>
        </h3>

        {/* Summary */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            lineHeight: 1.45,
            color: "var(--fg-secondary)",
            marginBottom: "1.25rem",
          }}
        >
          {artifact.summary}
        </p>
      </div>

      <div>
        {/* Skill Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem",
            marginTop: "auto",
            paddingTop: "0.75rem",
            borderTop: "1px dashed var(--border-subtle)",
          }}
        >
          {artifact.careerSignal.demonstrates.slice(0, 3).map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "var(--fg-muted)",
                backgroundColor: "var(--bg-secondary)",
                padding: "0.15rem 0.4rem",
                borderRadius: "3px",
                whiteSpace: "nowrap",
              }}
            >
              {skill}
            </span>
          ))}
          {artifact.careerSignal.demonstrates.length > 3 && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "var(--fg-subtle)",
                padding: "0.15rem 0.2rem",
              }}
            >
              +{artifact.careerSignal.demonstrates.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
