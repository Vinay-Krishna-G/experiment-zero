"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experiment } from "@/types";
import { getVisualProfile } from "@/visuals/getVisualProfile";
import { COLORS } from "@/visuals/colors";
import EquipmentTag from "@/components/ui/EquipmentTag";

interface ExperimentBottleProps {
  experiment: Experiment;
  isSelected: boolean;
  onClick: () => void;
}

export default function ExperimentBottle({
  experiment,
  isSelected,
  onClick,
}: ExperimentBottleProps) {
  const [isHovered, setIsHovered] = useState(false);

  const profile = getVisualProfile(
    experiment.primaryCategory,
    experiment.status,
    experiment.archived,
    "high"
  );
  
  // Define modes based on user direction
  let mode: "firefly" | "liquid" | "smoke" | "energy" = "liquid";
  let modeColor = "rgba(59, 130, 246, 0.6)"; // Sapphire default
  let glowColor = "rgba(59, 130, 246, 0.4)";
  
  if (experiment.id === "experiment-zero") {
    mode = "energy";
    modeColor = "rgba(245, 158, 11, 0.6)"; // Amber
    glowColor = "rgba(245, 158, 11, 0.4)";
  } else if (experiment.id === "promptvault" || experiment.primaryCategory?.toLowerCase().includes("ux")) {
    mode = "firefly";
    modeColor = "rgba(16, 185, 129, 0.6)"; // Emerald
    glowColor = "rgba(16, 185, 129, 0.4)";
  } else if (experiment.primaryCategory?.toLowerCase().includes("research") || experiment.status === "Planned") {
    mode = "smoke";
    modeColor = "rgba(139, 92, 246, 0.5)"; // Violet
    glowColor = "rgba(139, 92, 246, 0.4)";
  } else {
    mode = "liquid";
    modeColor = "rgba(59, 130, 246, 0.6)"; // Sapphire
    glowColor = "rgba(59, 130, 246, 0.4)";
  }

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
              left: "calc(100% + 1rem)",
              top: "10%",
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
                backgroundColor: glowColor,
                marginBottom: "0.5rem",
                opacity: 0.8,
              }}
            />
            {[
              { k: "Specimen", v: `#${experiment.id}` },
              { k: "Status", v: experiment.status },
              { k: "Category", v: experiment.primaryCategory },
            ].map(({ k, v }) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  gap: "0.8rem",
                  alignItems: "baseline",
                  marginBottom: "0.3rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
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
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "var(--fg-secondary)",
                    fontWeight: 600,
                  }}
                >
                  {k === "Category" ? <EquipmentTag label={v} /> : v}
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
          gap: "1rem",
        }}
      >
        {/* Environment Illumination (Glow hits shelf on hover) */}
        <motion.div
          animate={{ opacity: isHovered || isSelected ? 1 : 0.2, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: -10,
            width: 100,
            height: 20,
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(8px)",
            zIndex: 0,
            pointerEvents: "none"
          }}
        />

        {/* Bottle silhouette */}
        <div
          style={{
            position: "relative",
            width: 76,
            height: 160,
            filter: isSelected
              ? `drop-shadow(0 0 20px ${glowColor}) drop-shadow(0 12px 30px rgba(28,25,23,0.3))`
              : isHovered
              ? `drop-shadow(0 0 12px ${glowColor}) drop-shadow(0 8px 24px rgba(28,25,23,0.2))`
              : `drop-shadow(0 4px 16px rgba(28,25,23,0.15))`,
            transition: "filter 0.4s ease",
            zIndex: 1,
          }}
        >
          {/* Cork */}
          <motion.div
            aria-hidden="true"
            animate={{ rotate: isHovered ? 4 : 0, y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              x: "-50%",
              width: 22,
              height: 16,
              background: "linear-gradient(to bottom, #8f6e2b 0%, #594418 100%)",
              borderRadius: "4px 4px 1px 1px",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2), 0 4px 6px rgba(0,0,0,0.4)",
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
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: 24,
              height: 28,
              background: "linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 100%)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderBottom: "none",
              borderRadius: "3px 3px 0 0",
              boxShadow: "inset 0 0 8px rgba(255,255,255,0.2)",
              backdropFilter: "blur(2px)",
              zIndex: 2,
              overflow: "hidden",
            }}
          >
             <div
              style={{
                position: "absolute",
                top: 0,
                left: "20%",
                width: "20%",
                height: "100%",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Thick Glass Body */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 38,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)",
              border: `1.5px solid rgba(255,255,255,0.4)`,
              borderRadius: "8px 8px 12px 12px",
              boxShadow: `
                inset 0 0 15px rgba(255,255,255,0.3),
                inset 0 -20px 30px rgba(0,0,0,0.15),
                inset 0 10px 20px rgba(255,255,255,0.2)
              `,
              backdropFilter: "blur(6px)",
              overflow: "hidden",
            }}
          >
            {/* SPECIMEN RENDERERS */}
            <div style={{ position: "absolute", inset: 4, borderRadius: "4px 4px 8px 8px", overflow: "hidden" }}>
              
              {/* CATEGORY A: Firefly (PromptVault) */}
              {mode === "firefly" && (
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${glowColor}, transparent 60%)` }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -40 - Math.random() * 40, 0],
                        x: [0, (Math.random() - 0.5) * 30, 0],
                        opacity: [0.2, 1, 0.2]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                      }}
                      style={{
                        position: "absolute",
                        bottom: 20 + Math.random() * 20,
                        left: 20 + Math.random() * 30,
                        width: 4,
                        height: 4,
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        boxShadow: `0 0 8px 3px ${modeColor}`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* CATEGORY B: Liquid Specimen */}
              {mode === "liquid" && !isPlanned && (
                <motion.div
                  animate={{ height: liquidHeight }}
                  initial={{ height: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: `linear-gradient(to top, ${modeColor} 0%, transparent 100%)`,
                    filter: "blur(2px)",
                  }}
                >
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: -20,
                      right: -20,
                      height: 8,
                      background: `linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)`,
                      animation: "liquid-shimmer 4s ease-in-out infinite",
                    }}
                  />
                </motion.div>
              )}

              {/* CATEGORY C: Smoke / Mist Specimen */}
              {mode === "smoke" && (
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: isHovered ? 0.8 : 0.5 }}
                  transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
                  style={{
                    position: "absolute",
                    bottom: -20,
                    left: -20,
                    right: -20,
                    height: "120%",
                    background: `radial-gradient(circle at center, ${modeColor} 0%, transparent 60%)`,
                    filter: "blur(12px)",
                    transformOrigin: "center center",
                  }}
                />
              )}

              {/* CATEGORY D: Energy Core */}
              {mode === "energy" && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: isHovered ? [0.8, 1, 0.8] : [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      boxShadow: `0 0 20px 10px ${modeColor}, inset 0 0 10px #fff`,
                      filter: "blur(2px)"
                    }}
                  />
                  {/* Energy rings */}
                  <motion.div
                    animate={{ rotate: 360, scale: isHovered ? [1, 1.2, 1] : 1 }}
                    transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" } }}
                    style={{
                      position: "absolute",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: `2px dashed ${modeColor}`,
                      opacity: 0.6
                    }}
                  />
                </div>
              )}
            </div>

            {/* Left thick glass highlight overlay */}
            <div
              style={{
                position: "absolute",
                top: "5%",
                left: "8%",
                width: "15%",
                height: "90%",
                background: "linear-gradient(to right, rgba(255,255,255,0.8), transparent)",
                borderRadius: "4px",
                pointerEvents: "none",
                filter: "blur(1px)"
              }}
            />

            {/* Inner bottle shadow for depth */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset -10px 0 20px rgba(0,0,0,0.2)",
                pointerEvents: "none",
                borderRadius: "inherit"
              }}
            />
          </div>

        </div>

        {/* Label beneath bottle */}
        <div style={{ textAlign: "center", maxWidth: 100 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
              marginBottom: "0.3rem",
            }}
          >
            #{experiment.id}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.9rem",
              fontWeight: 800,
              color: isSelected ? "var(--fg-primary)" : "var(--fg-secondary)",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              transition: "color 0.2s ease",
            }}
          >
            {experiment.title}
          </div>
        </div>
      </motion.button>

      <style>{`
        @keyframes liquid-shimmer {
          0%, 100% { opacity: 0.4; transform: translateX(-10px); }
          50%       { opacity: 1;   transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
