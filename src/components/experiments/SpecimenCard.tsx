"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experiment } from "@/types";
import CSSBottleRenderer, { getBottleColors } from "./renderers/CSSBottleRenderer";

interface SpecimenCardProps {
  experiment: Experiment;
  isSelected: boolean;
  onClick: () => void;
}

export default function SpecimenCard({ experiment, isSelected, onClick }: SpecimenCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { modeColor, glowColor } = getBottleColors(experiment.status);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Metadata Hover Placard (P2.1) ── */}
      <AnimatePresence>
        {isHovered && !isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "calc(100% + 1rem)", // Above the bottle
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              backgroundColor: "rgba(18, 13, 11, 0.4)", // Lower opacity
              backdropFilter: "blur(2px)",
              border: `1px solid ${glowColor}`,
              borderRadius: "4px",
              padding: "0.75rem 1rem",
              whiteSpace: "nowrap",
              boxShadow: `0 4px 20px rgba(0,0,0,0.15)`, // 20% less intense
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
              minWidth: "160px", // Reduced width
              alignItems: "center",
            }}
          >
            {/* Formatted as a museum placard */}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: modeColor, fontWeight: 600 }}>
              {experiment.status}
            </div>
            {experiment.stack.length > 0 && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--fg-muted)", marginTop: "0.2rem" }}>
                {experiment.stack.join(" • ")}
              </div>
            )}
            <div style={{ marginTop: "0.5rem", paddingTop: "0.4rem", borderTop: "1px solid rgba(255,255,255,0.1)", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "var(--fg-primary)" }}>
              [OPEN ARCHIVE]
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottle Renderer ── */}
      <CSSBottleRenderer
        experiment={experiment}
        isSelected={isSelected}
        isHovered={isHovered}
        onClick={onClick}
      />

      {/* ── Permanent Museum Label (P2) ── */}
      <div
        aria-hidden="true"
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--fg-muted)" }}>
          EX-{String(experiment.id).padStart(3, '0').slice(0, 3).toUpperCase()}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "var(--fg-primary)", marginTop: "0.2rem" }}>
          {experiment.title}
        </div>
        <div style={{ width: "24px", height: "1px", backgroundColor: "#c8a15b44", margin: "0.3rem 0" }} />
        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--fg-secondary)" }}>
          {experiment.tagline}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: modeColor, marginTop: "0.4rem", textTransform: "uppercase" }}>
          {experiment.status}
        </div>
      </div>
    </div>
  );
}
