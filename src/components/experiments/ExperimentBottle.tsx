"use client";

import { motion } from "framer-motion";
import type { Experiment } from "@/data/experiments";

// ─── CSS Liquid Color Map ─────────────────────────────────────────────────────
const LIQUID_COLORS: Record<Experiment["liquidColor"], { base: string; highlight: string; glow: string }> = {
  emerald: {
    base: "rgba(45, 106, 79, 0.72)",
    highlight: "rgba(64, 145, 108, 0.45)",
    glow: "rgba(45, 106, 79, 0.25)",
  },
  amber: {
    base: "rgba(146, 100, 14, 0.72)",
    highlight: "rgba(180, 130, 40, 0.45)",
    glow: "rgba(146, 100, 14, 0.2)",
  },
  copper: {
    base: "rgba(146, 64, 14, 0.72)",
    highlight: "rgba(180, 90, 30, 0.45)",
    glow: "rgba(146, 64, 14, 0.2)",
  },
  slate: {
    base: "rgba(120, 113, 108, 0.45)",
    highlight: "rgba(168, 162, 158, 0.3)",
    glow: "rgba(120, 113, 108, 0.12)",
  },
};

interface ExperimentBottleProps {
  experiment: Experiment;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * CSS-only glass bottle representing one experiment.
 * Replacement interface: swap this component for <BottleGLB> in Phase 6
 * without changing ExperimentRack.tsx or experiments.ts.
 */
export default function ExperimentBottle({
  experiment,
  isSelected,
  onClick,
}: ExperimentBottleProps) {
  const colors = LIQUID_COLORS[experiment.liquidColor];
  const fillPct = `${Math.round(experiment.fillLevel * 100)}%`;
  // Liquid height: fill occupies bottom portion of body (max ~78% of bottle height)
  const liquidHeight = `${Math.round(experiment.fillLevel * 78)}%`;
  const isPlanned = experiment.status === "Planned";

  return (
    <motion.button
      id={`bottle-${experiment.id}`}
      aria-label={`${experiment.title} — ${experiment.status}`}
      aria-pressed={isSelected}
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        outline: "none",
      }}
    >
      {/* ── Bottle SVG silhouette ── */}
      <div
        style={{
          position: "relative",
          width: 72,
          height: 160,
          filter: isSelected
            ? `drop-shadow(0 0 12px ${colors.glow}) drop-shadow(0 8px 24px rgba(28,25,23,0.2))`
            : `drop-shadow(0 4px 12px rgba(28,25,23,0.12))`,
          transition: "filter 0.3s ease",
        }}
      >
        {/* Cork */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 18,
            height: 14,
            backgroundColor: "#8B6914",
            borderRadius: "3px 3px 1px 1px",
            background: "linear-gradient(to bottom, #A07820 0%, #6B4F0C 100%)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.2)",
            zIndex: 3,
            transition: "transform 0.4s ease",
          }}
          className="bottle-cork"
        />

        {/* Bottle neck */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 20,
            height: 28,
            background: "linear-gradient(to right, rgba(247,244,239,0.6) 0%, rgba(247,244,239,0.35) 40%, rgba(247,244,239,0.5) 100%)",
            border: "1px solid rgba(28,25,23,0.15)",
            borderBottom: "none",
            borderRadius: "3px 3px 0 0",
            zIndex: 2,
            overflow: "hidden",
          }}
        >
          {/* Neck glass highlight */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              width: "25%",
              height: "100%",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Bottle body */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 36,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to right, rgba(247,244,239,0.5) 0%, rgba(247,244,239,0.25) 50%, rgba(247,244,239,0.45) 100%)",
            border: `1px solid ${isSelected ? "rgba(28,25,23,0.25)" : "rgba(28,25,23,0.15)"}`,
            borderRadius: "6px 6px 8px 8px",
            overflow: "hidden",
            transition: "border-color 0.3s ease",
          }}
        >
          {/* Liquid fill */}
          {!isPlanned && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: liquidHeight,
                background: `linear-gradient(to top, ${colors.base} 0%, ${colors.highlight} 100%)`,
                transition: "height 0.6s ease",
              }}
            >
              {/* Liquid surface shimmer */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(to right, transparent, ${colors.highlight}, transparent)`,
                  opacity: 0.7,
                  animation: "liquid-shimmer 3s ease-in-out infinite",
                }}
              />
            </div>
          )}

          {/* Left glass highlight */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              left: "10%",
              width: "14%",
              height: "72%",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0.1))",
              borderRadius: "4px",
              pointerEvents: "none",
            }}
          />

          {/* Right glass edge shadow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "18%",
              height: "100%",
              background: "linear-gradient(to right, transparent, rgba(28,25,23,0.06))",
              pointerEvents: "none",
            }}
          />

          {/* Fill level indicator — tiny tick mark */}
          {!isPlanned && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: 0,
                bottom: liquidHeight,
                width: 5,
                height: 1,
                backgroundColor: "rgba(28,25,23,0.25)",
              }}
            />
          )}
        </div>

        {/* Selected ring */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "10px 10px 12px 12px",
              border: `1.5px solid ${colors.base}`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Label below bottle */}
      <div style={{ textAlign: "center", maxWidth: 88 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--fg-subtle)",
            marginBottom: "0.2rem",
          }}
        >
          #{experiment.id}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: isSelected ? "var(--fg-primary)" : "var(--fg-secondary)",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            transition: "color 0.2s ease",
          }}
        >
          {experiment.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.48rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color:
              experiment.status === "Completed"
                ? "var(--accent-emerald)"
                : experiment.status === "In Progress"
                ? "var(--accent-copper)"
                : "var(--fg-subtle)",
            marginTop: "0.25rem",
            opacity: 0.85,
          }}
        >
          {experiment.status}
        </div>
      </div>

      <style>{`
        @keyframes liquid-shimmer {
          0%, 100% { opacity: 0.6; transform: scaleX(0.8); }
          50%       { opacity: 1;   transform: scaleX(1.05); }
        }
        button:hover .bottle-cork {
          transform: translateX(-50%) rotate(4deg);
        }
      `}</style>
    </motion.button>
  );
}
