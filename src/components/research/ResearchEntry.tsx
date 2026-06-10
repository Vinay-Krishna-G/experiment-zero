"use client";

import { motion } from "framer-motion";
import type { ResearchLog } from "@/data/researchLogs";
import { EXPERIMENTS } from "@/data/experiments";
import { BLUEPRINTS } from "@/data/blueprints";
import ArchiveReference from "@/components/ui/ArchiveReference";

interface ResearchEntryProps {
  log: ResearchLog;
}

export default function ResearchEntry({ log }: ResearchEntryProps) {
  const relatedExp = log.relatedExperimentId ? EXPERIMENTS.find(e => e.id === log.relatedExperimentId) : null;
  const relatedBp = log.relatedBlueprintId ? BLUEPRINTS.find(b => b.id === log.relatedBlueprintId) : null;

  return (
    <motion.div
      key={log.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "3px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(28,25,23,0.06), 0 2px 10px rgba(28,25,23,0.04)",
        padding: "clamp(2rem, 5vw, 4rem)",
        minHeight: "500px",
      }}
      className="ruled-card"
    >
      {/* ── Document Imperfections & Aging ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 0% 0%, rgba(28,20,8,0.05) 0%, transparent 45%)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 100% 100%, rgba(28,20,8,0.03) 0%, transparent 40%)", pointerEvents: "none" }} />
      
      {/* ── Spine Tape ── */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "2rem", background: "linear-gradient(to right, rgba(28,25,23,0.06), rgba(28,25,23,0.01))", borderRight: "1px solid var(--border-subtle)" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: 40, left: 0, bottom: 40, width: "4px", borderRight: "1px dashed rgba(28,25,23,0.15)" }} />

      <div style={{ position: "relative", zIndex: 1, paddingLeft: "1.5rem" }}>
        
        {/* ── Metadata Header ── */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem",
          borderBottom: "1px solid var(--border-medium)", paddingBottom: "1rem", marginBottom: "2.5rem",
          fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-subtle)"
        }}>
          <div style={{ display: "flex", gap: "2rem" }}>
            <span>REF: {log.id.toUpperCase()}</span>
            <span>{log.date}</span>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            <span style={{ color: "var(--accent-copper)", fontWeight: 600 }}>{log.category}</span>
          </div>
        </div>

        {/* ── Title ── */}
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "var(--fg-primary)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          marginBottom: "2.5rem",
          maxWidth: "24ch"
        }}>
          {log.title}
        </h3>

        {/* ── Content Body ── */}
        <div style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
          color: "var(--fg-secondary)",
          lineHeight: 1.85,
          maxWidth: "60ch",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          {log.content.split("\n\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* ── Footer: Tags & Cross Refs ── */}
        <div style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px dashed var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem"
        }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {log.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--fg-muted)", backgroundColor: "rgba(28,25,23,0.05)", padding: "0.3rem 0.6rem", borderRadius: "2px"
              }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Cross References */}
          {(relatedExp || relatedBp) && (
            <div style={{
              display: "flex", gap: "2rem", flexWrap: "wrap",
            }}>
              {relatedExp && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
                    RELATED EXPERIMENT
                  </span>
                  <ArchiveReference type="experiment" id={`exp-${relatedExp.id}`} title={relatedExp.title} />
                </div>
              )}
              {relatedBp && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
                    RELATED BLUEPRINT
                  </span>
                  <ArchiveReference type="blueprint" id={relatedBp.id} title={relatedBp.title} />
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
