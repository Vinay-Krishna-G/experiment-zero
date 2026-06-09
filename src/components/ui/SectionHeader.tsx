"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;     // "01"
  title: string;      // "EXPERIMENTS"
  description?: string;
}

export default function SectionHeader({ number, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{ marginBottom: "3rem" }}
    >
      {/* Number / Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: description ? "1rem" : 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            color: "var(--accent-emerald)",
            flexShrink: 0,
          }}
        >
          {number}
        </span>

        {/* Tick mark */}
        <div
          aria-hidden="true"
          style={{
            width: 8,
            height: 1,
            backgroundColor: "var(--accent-emerald)",
            flexShrink: 0,
            opacity: 0.6,
          }}
        />

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            color: "var(--fg-muted)",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>

        {/* Extending rule */}
        <div
          aria-hidden="true"
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "var(--border-subtle)",
          }}
        />
      </div>

      {/* Optional description */}
      {description && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--fg-subtle)",
            letterSpacing: "0.01em",
            paddingLeft: "calc(0.65rem * 2 + 8px + 1rem + 1rem)", // align with title
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
