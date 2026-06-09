"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Experiment } from "@/data/experiments";

const STATUS_COLORS: Record<Experiment["status"], string> = {
  Completed: "var(--accent-emerald)",
  "In Progress": "var(--accent-copper)",
  "On Hold": "var(--fg-muted)",
  Archived: "var(--fg-subtle)",
  Planned: "var(--fg-subtle)",
};

interface ExperimentPreviewProps {
  experiment: Experiment | null;
  onClose: () => void;
}

export default function ExperimentPreview({
  experiment,
  onClose,
}: ExperimentPreviewProps) {
  return (
    <AnimatePresence>
      {experiment && (
        <motion.div
          key={experiment.id}
          id={`preview-${experiment.id}`}
          role="region"
          aria-label={`Experiment preview: ${experiment.title}`}
          initial={{ opacity: 0, y: 16, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 8, height: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            overflow: "hidden",
            marginTop: "2.5rem",
          }}
        >
          {/* Journal page container */}
          <div
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "3px",
              position: "relative",
              overflow: "hidden",
              boxShadow:
                "0 8px 32px rgba(28, 25, 23, 0.08), 0 2px 8px rgba(28, 25, 23, 0.05)",
            }}
          >
            {/* Left spine — colored per liquid type */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: 4,
                backgroundColor: STATUS_COLORS[experiment.status],
                opacity: 0.6,
              }}
            />

            {/* Corner fold */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "0 24px 24px 0",
                borderColor: `transparent var(--bg-secondary) transparent transparent`,
              }}
            />

            <div
              style={{
                padding: "2rem 2rem 2rem 2.5rem",
              }}
            >
              {/* Journal header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  {/* Experiment number */}
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--fg-subtle)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Experiment #{experiment.id} — {experiment.category}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                      fontWeight: 700,
                      color: "var(--fg-primary)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {experiment.title}
                  </h3>

                  {/* Tagline */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      color: "var(--fg-muted)",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                    }}
                  >
                    {experiment.tagline}
                  </p>
                </div>

                {/* Meta badges + close */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "0.5rem",
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    aria-label="Close experiment preview"
                    id={`close-preview-${experiment.id}`}
                    style={{
                      background: "none",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "2px",
                      cursor: "pointer",
                      padding: "0.3rem 0.6rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      color: "var(--fg-muted)",
                      textTransform: "uppercase",
                      transition: "border-color 0.2s ease, color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--fg-muted)";
                      el.style.color = "var(--fg-primary)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border-subtle)";
                      el.style.color = "var(--fg-muted)";
                    }}
                  >
                    Close ×
                  </button>

                  {/* Status */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.52rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: STATUS_COLORS[experiment.status],
                      border: `1px solid ${STATUS_COLORS[experiment.status]}`,
                      padding: "0.25rem 0.6rem",
                      borderRadius: "2px",
                      opacity: 0.85,
                    }}
                  >
                    {experiment.status}
                  </span>

                  {/* Year */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.52rem",
                      letterSpacing: "0.18em",
                      color: "var(--fg-subtle)",
                    }}
                  >
                    {experiment.year}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  backgroundColor: "var(--border-subtle)",
                  marginBottom: "1.5rem",
                }}
                aria-hidden="true"
              />

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
                  color: "var(--fg-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "1.75rem",
                  maxWidth: "64ch",
                }}
              >
                {experiment.description}
              </p>

              {/* Stack */}
              {experiment.stack.length > 0 && (
                <div style={{ marginBottom: "1.75rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "var(--fg-subtle)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    Stack
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {experiment.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.08em",
                          color: "var(--fg-secondary)",
                          backgroundColor: "var(--bg-secondary)",
                          border: "1px solid var(--border-subtle)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "2px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action links */}
              {(experiment.github || experiment.demo) && (
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {experiment.github && (
                    <a
                      href={experiment.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`preview-github-${experiment.id}`}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--fg-secondary)",
                        border: "1px solid var(--border-medium)",
                        padding: "0.4rem 0.9rem",
                        textDecoration: "none",
                        borderRadius: "2px",
                        transition: "border-color 0.2s ease, color 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--fg-primary)";
                        el.style.color = "var(--fg-primary)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border-medium)";
                        el.style.color = "var(--fg-secondary)";
                      }}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {experiment.demo && (
                    <a
                      href={experiment.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`preview-demo-${experiment.id}`}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--bg-card)",
                        backgroundColor: "var(--fg-primary)",
                        padding: "0.4rem 0.9rem",
                        textDecoration: "none",
                        borderRadius: "2px",
                        transition: "background-color 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-emerald)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--fg-primary)";
                      }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              )}

              {/* Planned placeholder */}
              {experiment.status === "Planned" && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--fg-subtle)",
                    fontStyle: "italic",
                  }}
                >
                  Experiment not yet started — notes being gathered.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
