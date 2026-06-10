"use client";

import { motion } from "framer-motion";
import type { FieldNote } from "@/data/fieldNotes";

interface FieldNoteCardProps {
  note: FieldNote;
  /** Visual index for stagger delay */
  index?: number;
}

export default function FieldNoteCard({ note, index = 0 }: FieldNoteCardProps) {
  return (
    <motion.article
      aria-label={`Field Note ${note.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.08,
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 12px 40px rgba(28, 25, 23, 0.09), 0 2px 8px rgba(28, 25, 23, 0.05)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      style={{
        position: "relative",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "3px",
        padding: "1.5rem 1.75rem 1.5rem 2rem",
        boxShadow: "0 4px 16px rgba(28, 25, 23, 0.05)",
        overflow: "hidden",
      }}
    >
      {/* Left accent rule */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 3,
          backgroundColor: "var(--accent-copper)",
          opacity: 0.55,
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.85rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Pencil mark icon */}
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--accent-copper)",
              opacity: 0.7,
            }}
          >
            ✎
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
            }}
          >
            Field Note — {note.id}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {note.tag && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.52rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent-emerald)",
                border: "1px solid var(--accent-emerald-dim)",
                padding: "0.2rem 0.5rem",
                borderRadius: "2px",
                opacity: 0.8,
              }}
            >
              {note.tag}
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.14em",
              color: "var(--fg-subtle)",
            }}
          >
            {note.date}
          </span>
        </div>
      </div>

      {/* Note body */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
          fontWeight: 400,
          color: "var(--fg-secondary)",
          lineHeight: 1.75,
          letterSpacing: "-0.005em",
          fontStyle: "italic",
          maxWidth: "65ch",
        }}
      >
        {note.note}
      </p>
    </motion.article>
  );
}
