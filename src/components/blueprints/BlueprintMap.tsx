"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { BlueprintStage, Discovery } from "@/data/blueprints";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface BlueprintMapProps {
  stages: BlueprintStage[];
  discoveries: Discovery[];
}

export default function BlueprintMap({ stages, discoveries }: BlueprintMapProps) {
  const [revealed, setRevealed] = useState(0);
  const hasStarted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive reveal — one waypoint every 300ms once in view
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
            if (i < stages.length) setTimeout(tick, 280);
          };
          setTimeout(tick, 200);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [stages.length]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Map label */}
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span>System Flow</span>
        <div style={{ flex: 1, height: 1, backgroundColor: "var(--border-subtle)" }} />
        <span style={{ opacity: 0.6 }}>{stages.length} stages</span>
      </div>

      {/* Route container — horizontal on desktop, vertical on mobile */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          position: "relative",
        }}
      >
        {stages.map((stage, i) => {
          const isVisible = i < revealed;
          const isLast = i === stages.length - 1;
          // Pin discoveries to every other stage
          const discovery = discoveries[i] ?? null;

          return (
            <div key={stage.name} style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", position: "relative" }}>
              {/* ── Left: track + node ── */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 24 }}>
                {/* Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-card)",
                    border: "2px solid var(--accent-emerald)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--accent-emerald)", opacity: isVisible ? 1 : 0 }} />
                </motion.div>

                {/* Connector line — animated draw */}
                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={isVisible ? { scaleY: 1, opacity: 0.5 } : { scaleY: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeIn", delay: 0.1 }}
                    style={{
                      width: 1,
                      height: 52,
                      backgroundColor: "var(--accent-emerald)",
                      transformOrigin: "top center",
                    }}
                  />
                )}
              </div>

              {/* ── Center: waypoint content ── */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
                style={{
                  flex: 1,
                  paddingBottom: isLast ? 0 : "1.5rem",
                }}
              >
                {/* Stage number + name */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.2em", color: "var(--fg-subtle)", textTransform: "uppercase" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-primary)" }}>
                    {stage.name}
                  </span>
                </div>
                {/* Annotation */}
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.5, fontStyle: "italic", marginLeft: "1.8rem" }}>
                  {stage.annotation}
                </p>
              </motion.div>

              {/* ── Right: pinned discovery note (alternating) ── */}
              {discovery && isVisible && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
                  style={{
                    flexShrink: 0,
                    width: "clamp(140px, 28%, 220px)",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-subtle)",
                    borderLeft: "2px solid var(--accent-copper)",
                    borderRadius: "2px",
                    padding: "0.6rem 0.75rem",
                    alignSelf: "flex-start",
                    marginTop: "2px",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent-copper)", marginBottom: "0.3rem", opacity: 0.85 }}>
                    Discovery #{discovery.id}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--fg-secondary)", lineHeight: 1.5, fontStyle: "italic" }}>
                    {discovery.text}
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
