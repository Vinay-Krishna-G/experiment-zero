"use client";

import { motion } from "framer-motion";

export interface PipelineStage {
  id: string;
  label: string;
  purpose: string;
  tradeoff?: string;
}

interface SystemPipelineProps {
  title: string;
  stages: PipelineStage[];
  accentColor?: string;
  stampLabel?: string;
}

export default function SystemPipeline({
  title,
  stages,
  accentColor = "var(--accent-emerald)",
  stampLabel = "PIPELINE SPEC"
}: SystemPipelineProps) {
  return (
    <div
      style={{
        margin: "3rem 0",
        padding: "2.5rem 2rem",
        backgroundColor: "var(--bg-card)",
        border: `1px solid var(--border-medium)`,
        borderRadius: "2px",
        position: "relative",
        boxShadow: "0 4px 20px rgba(28,25,23,0.05)"
      }}
      aria-label={`System Pipeline: ${title}`}
    >
      {/* Archive Stamp */}
      <div aria-hidden="true" style={{ position: "absolute", top: "1.5rem", right: "2rem", opacity: 0.6 }}>
        <div style={{ border: `1px solid ${accentColor}`, padding: "0.2rem 0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: accentColor, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {stampLabel}
        </div>
      </div>

      <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--fg-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: `1px dashed var(--border-subtle)`, paddingBottom: "0.5rem" }}>
        <span style={{ display: "inline-block", width: "6px", height: "6px", backgroundColor: accentColor }} />
        {title}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {stages.map((stage, i) => (
          <div key={stage.id} style={{ display: "flex" }}>
            
            {/* Timeline Column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40px", flexShrink: 0, marginRight: "1.5rem" }}>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: accentColor, border: `3px solid var(--bg-card)`, boxShadow: `0 0 0 1px ${accentColor}`, zIndex: 2 }}
              />
              {i < stages.length - 1 && (
                <div style={{ flex: 1, width: "1px", backgroundColor: accentColor, opacity: 0.3, marginTop: "4px", marginBottom: "4px" }} />
              )}
            </div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ flex: 1, paddingBottom: i < stages.length - 1 ? "2.5rem" : "0" }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "var(--fg-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                {stage.label}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", width: "65px", flexShrink: 0 }}>Purpose</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--fg-secondary)", lineHeight: 1.5 }}>{stage.purpose}</span>
                </div>
                
                {stage.tradeoff && (
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline", marginTop: "0.25rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--accent-copper)", textTransform: "uppercase", letterSpacing: "0.1em", width: "65px", flexShrink: 0 }}>Tradeoff</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--fg-secondary)", lineHeight: 1.5, borderLeft: `2px solid var(--accent-copper-dim)`, paddingLeft: "0.5rem" }}>{stage.tradeoff}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
