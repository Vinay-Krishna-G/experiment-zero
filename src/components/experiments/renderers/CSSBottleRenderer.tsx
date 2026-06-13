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
  
  if (experiment.status === "Planned" || experiment.status === "On Hold") {
    mode = "energy";
    modeColor = "rgba(139, 92, 246, 0.6)"; // Violet
    glowColor = "rgba(139, 92, 246, 0.4)";
  } else if (experiment.status === "Research") {
    mode = "smoke";
    modeColor = "rgba(245, 158, 11, 0.6)"; // Amber
    glowColor = "rgba(245, 158, 11, 0.4)";
  } else if (experiment.status === "Completed") {
    mode = "liquid";
    modeColor = "rgba(59, 130, 246, 0.6)"; // Sapphire
    glowColor = "rgba(59, 130, 246, 0.4)";
  } else {
    // Active / In Progress / Beta
    mode = "firefly";
    modeColor = "rgba(16, 185, 129, 0.6)"; // Emerald
    glowColor = "rgba(16, 185, 129, 0.4)";
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
              left: "calc(100% + 1.5rem)",
              top: "20%",
              zIndex: 50,
              backgroundColor: "rgba(18, 13, 11, 0.8)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${glowColor}`,
              borderRadius: "4px",
              padding: "1rem 1.25rem",
              whiteSpace: "nowrap",
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${glowColor}`,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              minWidth: "220px",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.6rem" }}>
              #{experiment.id.toUpperCase()}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: modeColor, fontWeight: 600 }}>
              {experiment.status}
            </div>
            {experiment.stack.length > 0 && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--fg-muted)", marginTop: "0.4rem" }}>
                {experiment.stack.join(" • ")}
              </div>
            )}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--fg-subtle)", marginTop: "0.2rem" }}>
              {experiment.year}
            </div>
            
            <div style={{ marginTop: "1rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--fg-primary)", textAlign: "center" }}>
              [OPEN ARCHIVE]
            </div>
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
            width: 95,
            height: 250,
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
            animate={{ rotate: isHovered ? 6 : 0, y: isHovered ? -12 : 0, x: isHovered ? "-45%" : "-50%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              x: "-50%",
              width: 32,
              height: 24,
              background: "linear-gradient(to bottom, #8f6e2b 0%, #594418 100%)",
              borderRadius: "4px 4px 1px 1px",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2), 0 4px 6px rgba(0,0,0,0.4)",
              zIndex: 3,
              originX: "50%",
              originY: "100%",
            }}
          />

          {/* Escaping Firefly (only for Active mode) */}
          {mode === "firefly" && isHovered && (
            <motion.div
              initial={{ y: 20, x: 0, opacity: 0 }}
              animate={{
                y: [20, -60, -50, -70, -40],
                x: [0, 15, -10, 5, 20],
                opacity: [0, 1, 1, 1, 0]
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 4,
                height: 4,
                backgroundColor: "#fff",
                borderRadius: "50%",
                boxShadow: `0 0 10px 4px ${modeColor}`,
                zIndex: 10,
                pointerEvents: "none"
              }}
            />
          )}

          {/* Neck */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 22,
              left: "50%",
              transform: "translateX(-50%)",
              width: 36,
              height: 42,
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
              top: 58,
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
              
              {/* CATEGORY A: Firefly (Active) */}
              {mode === "firefly" && (
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${glowColor}, transparent 80%)` }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -60 - Math.random() * 40, 0],
                        x: [0, (Math.random() - 0.5) * 40, 0],
                        opacity: [0.2, 1, 0.2]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 3
                      }}
                      style={{
                        position: "absolute",
                        bottom: 30 + Math.random() * 30,
                        left: 20 + Math.random() * 50,
                        width: 4,
                        height: 4,
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        boxShadow: `0 0 10px 4px ${modeColor}`
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
                    overflow: "hidden"
                  }}
                >
                  {/* Wavy surface layer */}
                  <div style={{
                    position: "absolute",
                    top: -10, left: "-50%", width: "200%", height: 30,
                    background: `linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)`,
                    borderRadius: "50%",
                    animation: isHovered ? "liquid-wave 3s ease-in-out infinite" : "liquid-wave 6s ease-in-out infinite",
                    opacity: 0.6
                  }} />
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                    style={{
                      position: "absolute",
                      top: 10,
                      left: -20,
                      right: -20,
                      height: 8,
                      background: `linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)`,
                      animation: isHovered ? "liquid-shimmer 2s ease-in-out infinite" : "liquid-shimmer 5s ease-in-out infinite",
                    }}
                  />
                </motion.div>
              )}

              {/* CATEGORY C: Smoke / Mist Specimen */}
              {mode === "smoke" && (
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: ["100%", "-100%"],
                        x: [0, (i % 2 === 0 ? 10 : -10), 0],
                        opacity: [0, isHovered ? 0.6 : 0.3, 0]
                      }}
                      transition={{
                        y: { duration: 15 + i * 5, repeat: Infinity, ease: "linear", delay: i * 2 },
                        x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 15 + i * 5, repeat: Infinity, ease: "linear", delay: i * 2 }
                      }}
                      style={{
                        position: "absolute",
                        left: -20, right: -20, height: "150%",
                        background: `radial-gradient(ellipse at center, ${modeColor} 0%, transparent 60%)`,
                        filter: "blur(16px)",
                        mixBlendMode: "screen"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* CATEGORY D: Energy Core (Classified) */}
              {mode === "energy" && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div
                    animate={{ opacity: isHovered ? [0.4, 0.9, 0.4] : [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      boxShadow: `0 0 30px 15px ${modeColor}`,
                      filter: "blur(4px)"
                    }}
                  />
                  {/* Occasional Crackle */}
                  <motion.div
                    animate={{ opacity: isHovered ? [0, 0.8, 0, 0, 0.4, 0] : [0, 0.3, 0] }}
                    transition={{ duration: 6, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 0.55, 0.6] }}
                    style={{
                      position: "absolute",
                      width: 2, height: 40,
                      background: "#fff",
                      filter: "blur(1px)",
                      transform: "rotate(45deg)",
                      mixBlendMode: "overlay"
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
