"use client";

import { motion } from "framer-motion";
import type { CareerSignal } from "@/insights/types";

interface RecruiterPanelProps {
  careerSignal: CareerSignal;
  importanceScore: number;
  confidenceScore: number;
  takeaway: string;
  impactContext: string;
}

export default function RecruiterPanel({
  careerSignal,
  importanceScore,
  confidenceScore,
  takeaway,
  impactContext,
}: RecruiterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        padding: "1.75rem",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-medium)",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(28, 25, 23, 0.03)",
        backgroundImage: "linear-gradient(135deg, rgba(146, 64, 14, 0.02) 0%, transparent 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Header / Recruiter Tag */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px dashed var(--border-subtle)",
          paddingBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "var(--accent-copper)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--fg-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Recruiter Quick-Scan
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--fg-muted)",
          }}
        >
          Senior Technical Candidate Profile
        </span>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1rem",
        }}
      >
        <div
          style={{
            padding: "0.75rem",
            backgroundColor: "rgba(28, 25, 23, 0.02)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Impact Weight
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--accent-copper)",
            }}
          >
            {importanceScore}%
          </span>
        </div>

        <div
          style={{
            padding: "0.75rem",
            backgroundColor: "rgba(28, 25, 23, 0.02)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Confidence
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--accent-emerald)",
            }}
          >
            {confidenceScore}%
          </span>
        </div>
      </div>

      {/* Demonstrated Skills Checklist */}
      <div>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 600,
            color: "var(--fg-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
          }}
        >
          Demonstrated Capabilities:
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {careerSignal.demonstrates.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--accent-emerald)",
                backgroundColor: "var(--accent-emerald-dim)",
                border: "1px solid rgba(45, 106, 79, 0.2)",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                fontWeight: 500,
              }}
            >
              ✓ {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Key Takeaways summary */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Engineering Takeaway:
          </span>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--fg-primary)",
              lineHeight: 1.4,
              backgroundColor: "rgba(146, 64, 14, 0.03)",
              borderLeft: "2.5px solid var(--accent-copper)",
              padding: "0.6rem 0.8rem",
              borderRadius: "0 4px 4px 0",
            }}
          >
            {takeaway}
          </p>
        </div>

        <div>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Business/UX Impact:
          </span>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.4,
            }}
          >
            {impactContext}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
