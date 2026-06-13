"use client";

import { motion } from "framer-motion";
import type { EvidenceBlock } from "@/types";
import EvidenceTimeline from "@/components/artifacts/EvidenceTimeline";

interface ImpactPanelProps {
  evidence: EvidenceBlock;
}

export default function ImpactPanel({ evidence }: ImpactPanelProps) {
  const { problem, constraints, alternatives, finalDecision, tradeoffs, outcome } = evidence;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="case-study-title"
      style={{
        padding: "2.5rem 2rem",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-medium)",
        borderRadius: "8px",
        boxShadow: "0 4px 24px rgba(28, 25, 23, 0.04)",
        backgroundImage: "radial-gradient(circle at 0% 100%, var(--accent-copper-dim) 0%, transparent 50%)",
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
      }}
    >
      {/* Title Header */}
      <div
        style={{
          borderBottom: "1px dashed var(--border-subtle)",
          paddingBottom: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "var(--accent-copper)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Case Study & Proof Metrics
        </span>
        <h2
          id="case-study-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "var(--fg-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          Engineering Decisions & Measurable Outcomes
        </h2>
      </div>

      <EvidenceTimeline />

      {/* Grid: Problem & Constraints */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}
        className="impact-grid"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--fg-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            01 / The Core Challenge
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.92rem",
              lineHeight: 1.55,
              color: "var(--fg-secondary)",
            }}
          >
            {problem}
          </p>
        </div>

        {constraints.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--fg-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              System Constraints
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {constraints.map((c, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    color: "var(--fg-secondary)",
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Alternatives Considered */}
      {alternatives.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--fg-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            02 / Alternatives Evaluated
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {alternatives.map((alt, index) => (
              <div
                key={index}
                style={{
                  padding: "1.25rem",
                  backgroundColor: "rgba(28, 25, 23, 0.015)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "6px",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--fg-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {alt.name}
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        fontWeight: 600,
                        color: "var(--accent-emerald)",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Pros:
                    </span>
                    <ul style={{ margin: 0, paddingLeft: "1rem", listStyleType: "circle" }}>
                      {alt.pros.map((p, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.8rem",
                            color: "var(--fg-secondary)",
                            lineHeight: 1.35,
                            marginBottom: "0.2rem",
                          }}
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        fontWeight: 600,
                        color: "var(--accent-copper)",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Cons:
                    </span>
                    <ul style={{ margin: 0, paddingLeft: "1rem", listStyleType: "circle" }}>
                      {alt.cons.map((c, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.8rem",
                            color: "var(--fg-secondary)",
                            lineHeight: 1.35,
                            marginBottom: "0.2rem",
                          }}
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decision & Tradeoffs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
          borderTop: "1px dashed var(--border-subtle)",
          paddingTop: "2rem",
        }}
        className="impact-grid"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--fg-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            03 / Final Decision & Rationale
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.92rem",
              lineHeight: 1.55,
              color: "var(--fg-secondary)",
            }}
          >
            {finalDecision}
          </p>
        </div>

        {tradeoffs.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--accent-copper)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Compromises & Tradeoffs
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {tradeoffs.map((t, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    color: "var(--fg-secondary)",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Quantitative Outcomes Panel */}
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "rgba(45, 106, 79, 0.02)",
          border: "1px solid rgba(45, 106, 79, 0.15)",
          borderRadius: "6px",
          borderLeft: "4px solid var(--accent-emerald)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--accent-emerald)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.75rem",
          }}
        >
          04 / Measurable Proof & Outcomes
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.92rem",
            lineHeight: 1.5,
            color: "var(--fg-secondary)",
            marginBottom: "1rem",
          }}
        >
          {outcome.description}
        </p>

        {outcome.metrics.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "1rem",
            }}
          >
            {outcome.metrics.map((m, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--accent-emerald)",
                  backgroundColor: "var(--accent-emerald-dim)",
                  border: "1px solid rgba(45, 106, 79, 0.2)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "4px",
                }}
              >
                ✔ {m}
              </span>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .impact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
