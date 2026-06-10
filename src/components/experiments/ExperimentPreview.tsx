"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { Experiment } from "@/data/experiments";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATUS_COLORS: Record<Experiment["status"], string> = {
  Completed: "var(--accent-emerald)",
  "In Progress": "var(--accent-copper)",
  "On Hold": "var(--fg-muted)",
  Archived: "var(--fg-subtle)",
  Planned: "var(--fg-subtle)",
};

// Staggered content reveal
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

interface ExperimentPreviewProps {
  experiment: Experiment | null;
  onClose: () => void;
}

// ── Complexity bar component ──────────────────────────────────────────────────
function ComplexityBar({ score }: { score: number }) {
  const MAX = 6;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: MAX }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "1px",
              backgroundColor:
                i < score ? "var(--fg-primary)" : "var(--border-medium)",
              transition: "background-color 0.2s ease",
            }}
          />
        ))}
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "var(--fg-muted)", letterSpacing: "0.1em" }}>
        {score} / {MAX}
      </span>
    </div>
  );
}

// ── Specimen tag ──────────────────────────────────────────────────────────────
function SpecimenTag({ tech }: { tech: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.58rem",
      letterSpacing: "0.1em",
      color: "var(--fg-secondary)",
      backgroundColor: "var(--bg-secondary)",
      border: "1px solid var(--border-medium)",
      padding: "0.3rem 0.65rem",
      borderRadius: "2px",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
    }}>
      <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent-emerald)", display: "inline-block", opacity: 0.7, flexShrink: 0 }} aria-hidden="true" />
      {tech}
    </span>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────
function TimelineView({ stages }: { stages: Experiment["timeline"] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {stages.map((stage, i) => (
        <div key={stage.label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
          {/* Left track */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            {/* Node */}
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor:
                stage.status === "done"
                  ? "var(--accent-emerald)"
                  : stage.status === "current"
                  ? "var(--accent-copper)"
                  : "var(--border-medium)",
              border: stage.status === "current" ? "2px solid var(--accent-copper)" : "none",
              flexShrink: 0,
              marginTop: 2,
              boxShadow: stage.status === "current" ? "0 0 0 3px rgba(146,64,14,0.2)" : "none",
              transition: "all 0.3s ease",
            }} />
            {/* Connector */}
            {i < stages.length - 1 && (
              <div style={{
                width: 1,
                height: 20,
                backgroundColor:
                  stage.status === "done" ? "var(--accent-emerald)" : "var(--border-subtle)",
                opacity: 0.6,
                marginBlock: "2px",
              }} />
            )}
          </div>
          {/* Label */}
          <div style={{ paddingBottom: i < stages.length - 1 ? "0.15rem" : 0 }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:
                stage.status === "done"
                  ? "var(--fg-secondary)"
                  : stage.status === "current"
                  ? "var(--accent-copper)"
                  : "var(--fg-subtle)",
              fontWeight: stage.status === "current" ? 600 : 400,
            }}>
              {stage.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ExperimentPreview({ experiment, onClose }: ExperimentPreviewProps) {
  return (
    <AnimatePresence mode="wait">
      {experiment && (
        <motion.div
          key={experiment.id}
          id={`preview-${experiment.id}`}
          role="region"
          aria-label={`Experiment journal: ${experiment.title}`}
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 10, height: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ overflow: "hidden", marginTop: "2.5rem" }}
        >
          <div style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "3px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(28,25,23,0.08), 0 2px 8px rgba(28,25,23,0.05)",
          }}>
            {/* Spine */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, backgroundColor: STATUS_COLORS[experiment.status], opacity: 0.6 }} />
            {/* Corner fold */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 24px 24px 0", borderColor: "transparent var(--bg-secondary) transparent transparent" }} />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ padding: "2rem 2rem 2rem 2.5rem" }}
            >
              {/* ── Header ── */}
              <motion.div variants={rowVariants} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.35rem" }}>
                    Experiment #{experiment.id} — {experiment.category}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 700, color: "var(--fg-primary)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                    {experiment.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.5 }}>
                    {experiment.tagline}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                  <button
                    onClick={onClose}
                    aria-label="Close experiment preview"
                    id={`close-preview-${experiment.id}`}
                    style={{ background: "none", border: "1px solid var(--border-subtle)", borderRadius: "2px", cursor: "pointer", padding: "0.3rem 0.6rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--fg-muted)", textTransform: "uppercase", transition: "border-color 0.2s ease, color 0.2s ease" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--fg-muted)"; el.style.color = "var(--fg-primary)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-subtle)"; el.style.color = "var(--fg-muted)"; }}
                  >
                    Close ×
                  </button>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", color: STATUS_COLORS[experiment.status], border: `1px solid ${STATUS_COLORS[experiment.status]}`, padding: "0.25rem 0.6rem", borderRadius: "2px", opacity: 0.85 }}>
                    {experiment.status}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.18em", color: "var(--fg-subtle)" }}>
                    {experiment.year}
                  </span>
                </div>
              </motion.div>

              <motion.div variants={rowVariants} style={{ height: 1, backgroundColor: "var(--border-subtle)", marginBottom: "1.75rem" }} aria-hidden="true" />

              {/* ── Description ── */}
              <motion.p variants={rowVariants} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--fg-secondary)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "64ch" }}>
                {experiment.description}
              </motion.p>

              {/* ── Complexity + Timeline (side by side) ── */}
              <motion.div variants={rowVariants} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
                {/* Complexity */}
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.6rem" }}>
                    Complexity
                  </div>
                  <ComplexityBar score={experiment.complexity} />
                </div>

                {/* Timeline */}
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.6rem" }}>
                    Timeline
                  </div>
                  <TimelineView stages={experiment.timeline} />
                </div>
              </motion.div>

              {/* ── Stack (specimen tags) ── */}
              {experiment.stack.length > 0 && (
                <motion.div variants={rowVariants} style={{ marginBottom: "1.75rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.6rem" }}>
                    Technology Stack
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {experiment.stack.map((tech) => (
                      <SpecimenTag key={tech} tech={tech} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Action links ── */}
              {(experiment.github || experiment.demo) && (
                <motion.div variants={rowVariants} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {experiment.github && (
                    <a href={experiment.github} target="_blank" rel="noopener noreferrer" id={`preview-github-${experiment.id}`}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-secondary)", border: "1px solid var(--border-medium)", padding: "0.4rem 0.9rem", textDecoration: "none", borderRadius: "2px", transition: "border-color 0.2s ease, color 0.2s ease", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--fg-primary)"; el.style.color = "var(--fg-primary)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-medium)"; el.style.color = "var(--fg-secondary)"; }}>
                      GitHub ↗
                    </a>
                  )}
                  {experiment.demo && (
                    <a href={experiment.demo} target="_blank" rel="noopener noreferrer" id={`preview-demo-${experiment.id}`}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bg-card)", backgroundColor: "var(--fg-primary)", padding: "0.4rem 0.9rem", textDecoration: "none", borderRadius: "2px", transition: "background-color 0.2s ease", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-emerald)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--fg-primary)"; }}>
                      Live Demo ↗
                    </a>
                  )}
                </motion.div>
              )}

              {experiment.status === "Planned" && (
                <motion.p variants={rowVariants} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-subtle)", fontStyle: "italic" }}>
                  Experiment not yet started — notes being gathered.
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
