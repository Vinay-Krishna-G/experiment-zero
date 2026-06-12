"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experiment, GlowPreset } from "@/types";

const LIQUID_COLORS: Record<
  GlowPreset,
  { base: string; highlight: string; glow: string }
> = {
  green: {
    base: "rgba(45, 106, 79, 0.72)",
    highlight: "rgba(64, 145, 108, 0.45)",
    glow: "rgba(45, 106, 79, 0.25)",
  },
  gold: {
    base: "rgba(146, 100, 14, 0.72)",
    highlight: "rgba(180, 130, 40, 0.45)",
    glow: "rgba(146, 100, 14, 0.2)",
  },
  blue: {
    base: "rgba(30, 64, 175, 0.72)",
    highlight: "rgba(59, 130, 246, 0.45)",
    glow: "rgba(30, 64, 175, 0.2)",
  },
  crimson: {
    base: "rgba(153, 27, 27, 0.72)",
    highlight: "rgba(220, 38, 38, 0.45)",
    glow: "rgba(153, 27, 27, 0.2)",
  },
  none: {
    base: "rgba(0, 0, 0, 0)",
    highlight: "rgba(0, 0, 0, 0)",
    glow: "rgba(0, 0, 0, 0)",
  },
};

interface ExperimentBottleProps {
  experiment: Experiment;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * CSS glass bottle — Phase 6 interface: same props, swap via BottleRenderer.tsx.
 */
export default function ExperimentBottle({
  experiment,
  isSelected,
  onClick,
}: ExperimentBottleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = LIQUID_COLORS[experiment.bottle.glow] || LIQUID_COLORS.none;
  const liquidHeight = `${Math.round(experiment.bottle.fillLevel * 78)}%`;
  const isPlanned = experiment.status === "Planned";

  return (
    <div
      style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Specimen label — appears on hover, beside bottle ── */}
      <AnimatePresence>
        {isHovered && !isSelected && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "calc(100% + 0.75rem)",
              top: "20%",
              zIndex: 10,
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-medium)",
              borderRadius: "2px",
              padding: "0.6rem 0.75rem",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(28,25,23,0.1)",
              pointerEvents: "none",
            }}
          >
            {/* Label top rule */}
            <div
              style={{
                height: 1,
                backgroundColor: colors.base,
                marginBottom: "0.5rem",
                opacity: 0.6,
              }}
            />
            {[
              { k: "Specimen", v: `#${experiment.id}` },
              { k: "Status", v: experiment.status },
              { k: "Recovered", v: experiment.year },
              { k: "Category", v: experiment.category },
            ].map(({ k, v }) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "baseline",
                  marginBottom: "0.2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.48rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--fg-subtle)",
                    minWidth: 60,
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.1em",
                    color: "var(--fg-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottle button ── */}
      <motion.button
        id={`bottle-${experiment.id}`}
        aria-label={`${experiment.title} — ${experiment.status}`}
        aria-pressed={isSelected}
        onClick={onClick}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        animate={{ y: isHovered ? -12 : 0 }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        {/* Bottle silhouette */}
        <div
          style={{
            position: "relative",
            width: 72,
            height: 160,
            filter: isSelected
              ? `drop-shadow(0 0 14px ${colors.glow}) drop-shadow(0 8px 24px rgba(28,25,23,0.22))`
              : isHovered
              ? `drop-shadow(0 6px 18px rgba(28,25,23,0.18))`
              : `drop-shadow(0 4px 12px rgba(28,25,23,0.1))`,
            transition: "filter 0.3s ease",
          }}
        >
          {/* Cork — rotates on hover via JS animation */}
          <motion.div
            aria-hidden="true"
            animate={{ rotate: isHovered ? 5 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              x: "-50%",
              width: 18,
              height: 14,
              background: "linear-gradient(to bottom, #A07820 0%, #6B4F0C 100%)",
              borderRadius: "3px 3px 1px 1px",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.2)",
              zIndex: 3,
              originX: "50%",
              originY: "100%",
            }}
          />

          {/* Neck */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 20,
              height: 28,
              background:
                "linear-gradient(to right, rgba(247,244,239,0.6) 0%, rgba(247,244,239,0.35) 40%, rgba(247,244,239,0.5) 100%)",
              border: "1px solid rgba(28,25,23,0.15)",
              borderBottom: "none",
              borderRadius: "3px 3px 0 0",
              zIndex: 2,
              overflow: "hidden",
            }}
          >
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

          {/* Body */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 36,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to right, rgba(247,244,239,0.5) 0%, rgba(247,244,239,0.25) 50%, rgba(247,244,239,0.45) 100%)",
              border: `1px solid ${
                isSelected ? "rgba(28,25,23,0.28)" : "rgba(28,25,23,0.14)"
              }`,
              borderRadius: "6px 6px 8px 8px",
              overflow: "hidden",
              transition: "border-color 0.3s ease",
            }}
          >
            {/* Liquid fill */}
            {!isPlanned && (
              <motion.div
                animate={{ height: liquidHeight }}
                initial={{ height: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: `linear-gradient(to top, ${colors.base} 0%, ${colors.highlight} 100%)`,
                }}
              >
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
              </motion.div>
            )}

            {/* Left glass highlight */}
            <div
              style={{
                position: "absolute",
                top: "8%",
                left: "10%",
                width: "14%",
                height: "72%",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0.1))",
                borderRadius: "4px",
                pointerEvents: "none",
              }}
            />

            {/* Right shadow */}
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

            {/* Fill tick */}
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
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  position: "absolute",
                  inset: -5,
                  borderRadius: "10px 10px 12px 12px",
                  border: `1.5px solid ${colors.base}`,
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Label beneath bottle */}
        <div style={{ textAlign: "center", maxWidth: 90 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.22em",
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
              fontSize: "0.76rem",
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
              fontSize: "0.46rem",
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
      </motion.button>

      <style>{`
        @keyframes liquid-shimmer {
          0%, 100% { opacity: 0.6; transform: scaleX(0.8); }
          50%       { opacity: 1;   transform: scaleX(1.05); }
        }
      `}</style>
    </div>
  );
}
