"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { Experiment } from "@/content";
import { BLUEPRINTS } from "@/content";
import { RESEARCH_LOGS } from "@/content";
import ArchiveReference from "@/components/ui/ArchiveReference";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATUS_COLORS: Record<Experiment["status"], string> = {
  Completed: "var(--accent-emerald)",
  "In Progress": "var(--accent-copper)",
  Beta: "var(--accent-amber)",
  Research: "var(--accent-emerald)",
  "On Hold": "var(--fg-muted)",
  Planned: "var(--fg-subtle)",
};

const CLASSIFICATION: Record<Experiment["status"], string> = {
  Completed: "Archived Research",
  "In Progress": "Active Research",
  Beta: "Active Research",
  Research: "Active Research",
  "On Hold": "Suspended",
  Planned: "Pre-Research",
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

import { useEffect } from "react";

interface ExperimentModalProps {
  experiment: Experiment | null;
  onClose: () => void;
}

// ── Complexity bar ────────────────────────────────────────────────────────────
function ComplexityBar({ score }: { score: number }) {
  const MAX = 6;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: MAX }).map((_, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "1px", backgroundColor: i < score ? "var(--fg-primary)" : "var(--border-medium)" }} />
        ))}
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "var(--fg-muted)", letterSpacing: "0.08em" }}>{score} / {MAX}</span>
    </div>
  );
}

// ── Specimen tag ──────────────────────────────────────────────────────────────
function SpecimenTag({ tech }: { tech: string }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.08em", color: "var(--fg-secondary)", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-medium)", padding: "0.3rem 0.65rem", borderRadius: "2px", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
      <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent-emerald)", display: "inline-block", opacity: 0.65, flexShrink: 0 }} aria-hidden="true" />
      {tech}
    </span>
  );
}

// ── Timeline with progress ────────────────────────────────────────────────────
function TimelineView({ stages }: { stages: Experiment["timeline"] }) {
  const done = stages.filter((s) => s.status === "done").length;
  const pct = Math.round((done / stages.length) * 100);
  const currentStage = stages.find((s) => s.status === "current");
  const nextStage = stages.find((s) => s.status === "pending");

  return (
    <div>
      {/* Stages */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "0.75rem" }}>
        {stages.map((stage, i) => (
          <div key={stage.label} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <div style={{
                width: 9, height: 9, borderRadius: "50%", marginTop: 3, flexShrink: 0,
                backgroundColor: stage.status === "done" ? "var(--accent-emerald)" : stage.status === "current" ? "var(--accent-copper)" : "var(--border-medium)",
                border: stage.status === "current" ? "1.5px solid var(--accent-copper)" : "none",
                boxShadow: stage.status === "current" ? "0 0 0 3px rgba(146,64,14,0.18)" : "none",
              }} />
              {i < stages.length - 1 && (
                <div style={{ width: 1, height: 18, backgroundColor: stage.status === "done" ? "var(--accent-emerald)" : "var(--border-subtle)", opacity: 0.5, marginBlock: "1px" }} />
              )}
            </div>
            <div style={{ paddingBottom: i < stages.length - 1 ? "0" : 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.08em", color: stage.status === "done" ? "var(--fg-secondary)" : stage.status === "current" ? "var(--accent-copper)" : "var(--fg-subtle)", fontWeight: stage.status === "current" ? 600 : 400 }}>
                {stage.label}
              </span>
              {stage.status === "done" && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.42rem", color: "var(--accent-emerald)", opacity: 0.7 }}>✓</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>Progress</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "var(--fg-secondary)", fontWeight: 600 }}>{pct}%</span>
        </div>
        <div style={{ height: 3, backgroundColor: "var(--border-subtle)", borderRadius: "2px", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            style={{ height: "100%", backgroundColor: "var(--accent-emerald)", borderRadius: "2px" }}
          />
        </div>
        {currentStage && (
          <div style={{ marginTop: "0.4rem", fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--fg-subtle)", fontStyle: "italic" }}>
            Current: {currentStage.label}
            {nextStage && <span> → Next: {nextStage.label}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Journal metadata row ──────────────────────────────────────────────────────
function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: "0.6rem", alignItems: "baseline" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", minWidth: 80, flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", letterSpacing: "0.06em", color: "var(--fg-secondary)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ExperimentModal({ experiment, onClose }: ExperimentModalProps) {
  const relatedBp = experiment?.blueprintId ? BLUEPRINTS.find(b => b.id === experiment.blueprintId) : null;
  const relatedLogs = experiment ? RESEARCH_LOGS.filter(log => log.relatedExperimentId === experiment.id) : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    if (experiment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [experiment, onClose]);

  return (
    <AnimatePresence mode="wait">
      {experiment && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "auto", display: "flex", justifyContent: "center" }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", inset: 0, backgroundColor: "rgba(10, 8, 6, 0.85)", backdropFilter: "blur(24px) saturate(1.2)" }}
            onClick={onClose}
          />

          <motion.div
            key={experiment.id}
            id={`preview-${experiment.id}`}
            role="dialog"
            aria-modal="true"
            aria-label={`Experiment journal: ${experiment.title}`}
            initial={{ y: "100%" }}
            animate={{ y: "8%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ 
              position: "absolute", 
              bottom: 0, 
              width: "100%", 
              maxWidth: "1000px", 
              height: "92%", 
              overflowY: "auto", 
              WebkitOverflowScrolling: "touch", // Smooth scrolling on mobile
              paddingBottom: "4rem" 
            }}
          >
            <div style={{ 
              backgroundColor: "var(--bg-card)", 
              backgroundImage: "radial-gradient(circle, rgba(28, 25, 23, 0.05) 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
              border: "1px solid var(--border-subtle)", 
              borderBottom: "none", 
              borderRadius: "8px 8px 0 0", 
              minHeight: "100%", 
              position: "relative", 
              overflow: "hidden", 
              boxShadow: "0 -8px 32px rgba(0,0,0,0.5)" 
            }}>
            {/* Spine */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: `linear-gradient(to right, ${STATUS_COLORS[experiment.status]}, transparent)`, opacity: 0.7 }} />
            {/* Corner fold */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 24px 24px 0", borderColor: "transparent var(--bg-secondary) transparent transparent" }} />
            {/* Subtle page edges */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 0% 0%, rgba(28,20,8,0.03) 0%, transparent 40%)", pointerEvents: "none" }} />

            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: "2rem 2rem 2rem 2.5rem" }}>
              {/* ── Journal entry header ── */}
              <motion.div variants={rowVariants} style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    {/* Entry number + category breadcrumb */}
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.4rem" }}>
                      Entry #{experiment.id} / {experiment.primaryCategory}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 700, color: "var(--fg-primary)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.4rem" }}>
                      {experiment.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--fg-secondary)", fontStyle: "italic", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                      {experiment.tagline}
                    </p>
                    {/* Journal metadata grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, max-content))", gap: "0.3rem 1.5rem" }}>
                      <MetaRow label="Entry" value={`#${experiment.id}`} />
                      <MetaRow label="Classification" value={CLASSIFICATION[experiment.status]} />
                      <MetaRow label="Archive Ref" value={`EXP-${experiment.id}`} />
                      <MetaRow label="Recorded" value={experiment.year} />
                    </div>
                  </div>

                  {/* Sticky Close Button Container */}
                  <div style={{ 
                    position: "sticky", 
                    top: "2rem", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "flex-end", 
                    gap: "0.5rem",
                    zIndex: 20
                  }}>
                    <button
                      onClick={onClose}
                      aria-label="Close archive"
                      style={{ background: "var(--bg-primary)", border: "1px solid var(--border-subtle)", borderRadius: "2px", cursor: "pointer", padding: "0.5rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--fg-primary)", transition: "border-color 0.2s ease, background-color 0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "var(--bg-card-hover)"; el.style.borderColor = "var(--fg-muted)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "var(--bg-primary)"; el.style.borderColor = "var(--border-subtle)"; }}
                    >
                      [CLOSE ARCHIVE]
                    </button>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: STATUS_COLORS[experiment.status], border: `1px solid ${STATUS_COLORS[experiment.status]}`, padding: "0.25rem 0.6rem", borderRadius: "2px", opacity: 0.85, backgroundColor: "var(--bg-card)" }}>
                      {experiment.status}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Rule */}
              <motion.div variants={rowVariants} style={{ height: 1, backgroundColor: "var(--border-subtle)", marginBottom: "1.75rem" }} aria-hidden="true" />

              {/* ── Description ── */}
              <motion.div variants={rowVariants} className="prose-reading">
                <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "var(--fg-secondary)", lineHeight: 1.85, marginBottom: "2rem" }}>
                  {experiment.description}
                </p>
              </motion.div>

              {/* ── Complexity + Timeline side-by-side ── */}
              <motion.div variants={rowVariants} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.65rem" }}>Complexity</div>
                  <ComplexityBar score={experiment.complexity} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.65rem" }}>Research Timeline</div>
                  <TimelineView stages={experiment.timeline} />
                </div>
              </motion.div>

              {/* ── Documented In ── */}
              {(relatedBp || relatedLogs.length > 0) && (
                <motion.div variants={rowVariants} style={{ marginBottom: "2rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.85rem" }}>
                    Documented In
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {relatedBp && (
                      <ArchiveReference type="blueprint" id={relatedBp.id} title={relatedBp.title} />
                    )}
                    {relatedLogs.map(log => (
                      <ArchiveReference key={log.id} type="research" id={log.id} title={log.title} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Stack ── */}
              {experiment.stack.length > 0 && (
                <motion.div variants={rowVariants} style={{ marginBottom: "1.75rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.65rem" }}>Technology Stack</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {experiment.stack.map((tech) => <SpecimenTag key={tech} tech={tech} />)}
                  </div>
                </motion.div>
              )}

              {/* ── Action links ── */}
              {(experiment.github || experiment.liveUrl || experiment.demo) && (
                <motion.div variants={rowVariants} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {experiment.github && (
                    <a href={experiment.github} target="_blank" rel="noopener noreferrer" id={`preview-github-${experiment.id}`}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-secondary)", border: "1px solid var(--border-medium)", padding: "0.4rem 0.9rem", textDecoration: "none", borderRadius: "2px", transition: "border-color 0.2s ease, color 0.2s ease", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--fg-primary)"; el.style.color = "var(--fg-primary)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-medium)"; el.style.color = "var(--fg-secondary)"; }}>
                      GitHub ↗
                    </a>
                  )}
                  {(experiment.liveUrl || experiment.demo) && (
                    <a href={experiment.liveUrl || experiment.demo} target="_blank" rel="noopener noreferrer" id={`preview-demo-${experiment.id}`}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bg-card)", backgroundColor: "var(--fg-primary)", padding: "0.4rem 0.9rem", textDecoration: "none", borderRadius: "2px", transition: "background-color 0.2s ease", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-emerald)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--fg-primary)"; }}>
                      Live Demo ↗
                    </a>
                  )}
                </motion.div>
              )}

              {experiment.status === "Planned" && (
                <motion.p variants={rowVariants} style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--fg-subtle)", fontStyle: "italic" }}>
                  Experiment not yet started — notes are being gathered.
                </motion.p>
              )}
            </motion.div>
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
