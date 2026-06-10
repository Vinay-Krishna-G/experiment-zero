"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlueprintStage, Discovery } from "@/data/blueprints";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Waypoint symbols — cycle as requested
const WAYPOINT_SYMBOLS = ["◉", "◈", "⬡"];

const routeVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.35, delayChildren: 0.2 }
  }
};

const waypointVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

interface BlueprintMapProps {
  stages: BlueprintStage[];
  discoveries: Discovery[];
}

export default function BlueprintMap({ stages, discoveries }: BlueprintMapProps) {
  const [revealed, setRevealed] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      {/* SVG Definitions for the connector line */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="route-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-emerald)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--border-subtle)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Route header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
          Expedition Route
        </div>
        <div style={{ flex: 1, height: 1, backgroundColor: "var(--border-subtle)", backgroundImage: "repeating-linear-gradient(to right, rgba(28,20,8,0.12) 0px, rgba(28,20,8,0.12) 4px, transparent 4px, transparent 10px)" }} />
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.2em", color: "var(--fg-subtle)", opacity: 0.7 }}>
          {stages.length} waypoints
        </div>
      </div>

      {/* ── Route ── */}
      <motion.div
        variants={routeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        style={{ display: "flex", flexDirection: "column", position: "relative", paddingLeft: "52px" }}
      >
        {stages.map((stage, i) => {
          const isVisible = i < revealed;
          const isLast = i === stages.length - 1;
          const isCurrent = i === revealed - 1;
          const discovery = i < discoveries.length ? discoveries[i] : null;
          
          const isEven = i % 2 === 0;
          const indent = isEven ? 0 : 36;
          const symbol = WAYPOINT_SYMBOLS[i % WAYPOINT_SYMBOLS.length];

          return (
            <motion.div
              key={stage.name}
              variants={waypointVariants}
              onAnimationStart={() => setRevealed(i + 1)}
              style={{
                display: "flex",
                gap: "1.25rem",
                alignItems: "stretch",
                paddingLeft: indent,
                paddingBottom: isLast ? 0 : "2.5rem",
                position: "relative",
              }}
            >
              {/* ── Waypoint node column ── */}
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: "22px" }}>
                
                {/* Floating WP Label */}
                <motion.div
                  initial={{ opacity: 0, x: 5 }}
                  animate={isVisible ? { opacity: 0.5, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{
                    position: "absolute",
                    right: "calc(100% + 12px)",
                    top: "4px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.48rem",
                    letterSpacing: "0.1em",
                    color: "var(--fg-subtle)",
                    whiteSpace: "nowrap",
                  }}
                >
                  WP-{String(i + 1).padStart(2, "0")}
                </motion.div>

                {/* Waypoint node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: isCurrent ? "var(--accent-emerald)" : "var(--bg-card)",
                    border: `1.5px solid ${isCurrent ? "var(--accent-emerald)" : "var(--border-medium)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isCurrent ? "0 0 0 4px rgba(45,106,79,0.15)" : "none",
                    transition: "box-shadow 0.4s ease",
                    position: "relative",
                    zIndex: 2,
                    flexShrink: 0,
                  }}
                >
                  <span style={{
                    fontSize: "0.48rem",
                    color: isCurrent ? "#fff" : "var(--fg-subtle)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}>
                    {symbol}
                  </span>
                </motion.div>

                {/* Connector to next */}
                {!isLast && (
                  <div style={{ flex: 1, width: "100%", position: "relative", minHeight: "32px" }}>
                    <svg
                      viewBox="0 0 36 100"
                      preserveAspectRatio="none"
                      style={{
                        position: "absolute",
                        top: "4px",
                        bottom: "-8px",
                        left: isEven ? "11px" : "-25px",
                        width: "36px",
                        height: "calc(100% + 4px)",
                        overflow: "visible",
                        zIndex: 1,
                      }}
                    >
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={isVisible ? { pathLength: 1 } : {}}
                        transition={{ duration: 0.4, ease: "linear", delay: 0.15 }}
                        d={isEven 
                          ? "M 0 0 L 0 50 L 36 50 L 36 100" 
                          : "M 36 0 L 36 50 L 0 50 L 0 100"
                        }
                        fill="none"
                        stroke="url(#route-gradient)"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="4 2"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* ── Waypoint content ── */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, ease: EASE, delay: 0.08 }}
                style={{ flex: 1, paddingBottom: isLast ? 0 : "0.5rem" }}
              >
                {/* Waypoint header */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: isCurrent ? "var(--accent-emerald)" : "var(--fg-primary)",
                    transition: "color 0.3s ease",
                  }}>
                    {stage.name}
                  </span>
                  {isCurrent && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.44rem", letterSpacing: "0.2em", color: "var(--accent-emerald)", textTransform: "uppercase" }}
                    >
                      ← CURRENT POSITION
                    </motion.span>
                  )}
                </div>

                {/* Annotation */}
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "var(--fg-muted)",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                  margin: 0,
                }}>
                  {stage.annotation}
                </p>

                {/* Discovery note — pinned beside waypoint */}
                <AnimatePresence>
                  {discovery && isVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        marginTop: "0.6rem",
                      }}
                    >
                      {/* Annotation connection line */}
                      <div aria-hidden="true" style={{
                        width: "1rem",
                        height: "1px",
                        backgroundColor: "var(--border-subtle)",
                        marginTop: "1.2rem",
                        flexShrink: 0,
                      }} />
                      
                      <div
                        style={{
                          flex: 1,
                          maxWidth: "clamp(180px, 75%, 320px)",
                          backgroundColor: "color-mix(in srgb, var(--bg-secondary) 97%, #A07820 3%)",
                          border: "1px solid var(--border-subtle)",
                          borderTop: "1px solid rgba(160, 120, 32, 0.3)",
                          borderRadius: "1px",
                          padding: "0.5rem 0.65rem",
                          transform: "rotate(-1.5deg)",
                          transformOrigin: "top left",
                          boxShadow: "1px 2px 5px rgba(28,20,8,0.05), inset 0 1px 0 rgba(255,255,255,0.4)",
                          position: "relative",
                        }}
                      >
                        {/* Pin dot at top */}
                        <div aria-hidden="true" style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 5, height: 5, borderRadius: "50%", backgroundColor: "rgba(146, 100, 14, 0.5)", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.42rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(146, 100, 14, 0.7)", marginBottom: "0.2rem" }}>
                          Discovery #{discovery.id}
                        </div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--fg-muted)", lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
                          {discovery.text}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Route complete marker ── */}
      {revealed >= stages.length && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <div style={{ height: 1, flex: 1, backgroundColor: "var(--border-subtle)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-subtle)", opacity: 0.7 }}>
            Expedition complete
          </span>
          <div style={{ height: 1, width: "2rem", backgroundColor: "var(--border-subtle)" }} />
        </motion.div>
      )}
    </div>
  );
}
