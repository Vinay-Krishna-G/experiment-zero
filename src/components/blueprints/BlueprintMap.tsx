"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlueprintStage, Discovery } from "@/data/blueprints";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Waypoint symbols — expedition markers cycling through a set
const WAYPOINT_SYMBOLS = ["◉", "◈", "◆", "▸", "◎", "⬡", "◉", "◈"];

// Subtle offset directions to create a non-linear, route-like feel
const ROUTE_OFFSETS = [0, 18, 6, 24, 12, 20, 4, 16];

interface BlueprintMapProps {
  stages: BlueprintStage[];
  discoveries: Discovery[];
}

export default function BlueprintMap({ stages, discoveries }: BlueprintMapProps) {
  const [revealed, setRevealed] = useState(0);
  const hasStarted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRevealed(0);
    hasStarted.current = false;
  }, [stages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let i = 0;
          const tick = () => {
            i++;
            setRevealed(i);
            if (i < stages.length) setTimeout(tick, 320);
          };
          setTimeout(tick, 300);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [stages.length]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
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

      {/* ── Route grid: left margin annotations + center route + right discoveries ── */}
      <div style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: "0 1.5rem", position: "relative" }}>
        {stages.map((stage, i) => {
          const isVisible = i < revealed;
          const isLast = i === stages.length - 1;
          const isCurrent = i === revealed - 1;
          // Alternate discovery pinning — first half on right
          const discovery = i < discoveries.length ? discoveries[i] : null;
          // Horizontal indent to create route-like zigzag feel
          const indent = ROUTE_OFFSETS[i % ROUTE_OFFSETS.length];
          const symbol = WAYPOINT_SYMBOLS[i % WAYPOINT_SYMBOLS.length];

          return (
            <div
              key={stage.name}
              style={{ display: "contents" }}
            >
              {/* ── Left: distance / checkpoint marker ── */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "2px" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 0.45 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.42rem",
                    letterSpacing: "0.08em",
                    color: "var(--fg-subtle)",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    userSelect: "none",
                    height: isLast ? 16 : 80,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.div>
                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={isVisible ? { scaleY: 1, opacity: 0.2 } : {}}
                    transition={{ duration: 0.2, ease: "easeIn" }}
                    style={{
                      width: 1,
                      flex: 1,
                      backgroundColor: "var(--fg-subtle)",
                      transformOrigin: "top",
                      borderLeft: "1px dashed rgba(28,20,8,0.18)",
                    }}
                  />
                )}
              </div>

              {/* ── Right: waypoint row ── */}
              <div style={{ paddingBottom: isLast ? 0 : "1rem", paddingLeft: indent }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  {/* Waypoint node */}
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1px" }}>
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
                        fontSize: "0.45rem",
                        color: isCurrent ? "#fff" : "var(--fg-subtle)",
                        lineHeight: 1,
                        userSelect: "none",
                      }}>
                        {symbol}
                      </span>
                    </motion.div>

                    {/* Connector to next */}
                    {!isLast && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isVisible ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.3, ease: "easeIn", delay: 0.12 }}
                        style={{
                          width: 1.5,
                          height: 28,
                          background: "linear-gradient(to bottom, var(--accent-emerald), var(--border-subtle))",
                          opacity: 0.4,
                          transformOrigin: "top",
                          marginTop: 2,
                        }}
                      />
                    )}
                  </div>

                  {/* Waypoint content */}
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
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.44rem", letterSpacing: "0.2em", color: "var(--accent-emerald)", textTransform: "uppercase", opacity: 0.8 }}>
                          ← current
                        </span>
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
                          initial={{ opacity: 0, y: 6, rotate: -1.5 }}
                          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE, delay: 0.25 }}
                          style={{
                            marginTop: "0.75rem",
                            display: "inline-block",
                            maxWidth: "clamp(180px, 70%, 340px)",
                            backgroundColor: "color-mix(in srgb, var(--bg-secondary) 95%, #A07820 5%)",
                            border: "1px solid var(--border-subtle)",
                            borderTop: "2px solid rgba(160, 120, 32, 0.45)",
                            borderRadius: "1px",
                            padding: "0.55rem 0.75rem",
                            transform: "rotate(-1.5deg)",
                            transformOrigin: "top left",
                            boxShadow: "2px 3px 8px rgba(28,20,8,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
                            position: "relative",
                          }}
                        >
                          {/* Pin dot at top */}
                          <div aria-hidden="true" style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 7, height: 7, borderRadius: "50%", backgroundColor: "rgba(146, 100, 14, 0.6)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.44rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(146, 100, 14, 0.8)", marginBottom: "0.28rem" }}>
                            Discovery #{discovery.id}
                          </div>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "var(--fg-secondary)", lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
                            {discovery.text}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
            Route documented
          </span>
          <div style={{ height: 1, width: "2rem", backgroundColor: "var(--border-subtle)" }} />
        </motion.div>
      )}
    </div>
  );
}
