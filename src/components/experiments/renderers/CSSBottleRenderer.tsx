"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experiment } from "@/types";
import { getVisualProfile } from "@/visuals/getVisualProfile";

export function getBottleColors(status: string) {
  let mode: "firefly" | "liquid" | "smoke" | "energy" = "liquid";
  let modeColor = "rgba(59, 130, 246, 0.6)"; // Sapphire default
  let glowColor = "rgba(59, 130, 246, 0.4)";
  
  if (status === "Planned" || status === "On Hold") {
    mode = "energy";
    modeColor = "rgba(139, 92, 246, 0.6)"; // Violet
    glowColor = "rgba(139, 92, 246, 0.4)";
  } else if (status === "Research") {
    mode = "smoke";
    modeColor = "rgba(245, 158, 11, 0.6)"; // Amber
    glowColor = "rgba(245, 158, 11, 0.4)";
  } else if (status === "Completed") {
    mode = "liquid";
    modeColor = "rgba(59, 130, 246, 0.6)"; // Sapphire
    glowColor = "rgba(59, 130, 246, 0.4)";
  } else {
    // Active / In Progress / Beta
    mode = "firefly";
    modeColor = "rgba(16, 185, 129, 0.6)"; // Emerald
    glowColor = "rgba(16, 185, 129, 0.4)";
  }
  return { mode, modeColor, glowColor };
}

interface ExperimentBottleProps {
  experiment: Experiment;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
}

export default function CSSBottleRenderer({
  experiment,
  isSelected,
  isHovered,
  onClick,
}: ExperimentBottleProps) {

  const profile = getVisualProfile(
    experiment.primaryCategory,
    experiment.status,
    experiment.archived,
    "high"
  );
  
  const { mode, modeColor, glowColor } = getBottleColors(experiment.status);

  const liquidHeight = `${Math.round(experiment.bottle.fillLevel * 78)}%`;
  const isPlanned = experiment.status === "Planned";

  return (
    <>
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
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -30 - Math.random() * 20, 0],
                        x: [0, (Math.random() - 0.5) * 20, 0],
                        opacity: [0.1, 0.8, 0.1]
                      }}
                      transition={{
                        duration: 5 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 3
                      }}
                      style={{
                        position: "absolute",
                        bottom: 30 + Math.random() * 20,
                        left: 30 + Math.random() * 30,
                        width: 3,
                        height: 3,
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        boxShadow: `0 0 12px 3px ${modeColor}`
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
                    overflow: "hidden",
                    borderTop: `2px solid rgba(255,255,255,0.4)`, // Meniscus
                    boxShadow: `inset 0 10px 20px ${glowColor}` // Internal glow
                  }}
                >
                  {/* Potion Bubbles */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={`bubble-${i}`}
                      initial={{ y: "100%", x: Math.random() * 60, opacity: 0 }}
                      animate={{ y: "-10%", opacity: [0, 0.6, 0] }}
                      transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: 2 + Math.random() * 2,
                        height: 2 + Math.random() * 2,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.6)",
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* CATEGORY C: Smoke / Mist Specimen */}
              {mode === "smoke" && (
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", mixBlendMode: "screen" }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={`smoke-${i}`}
                      animate={{
                        y: ["100%", "-50%"],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 8 + i * 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 3
                      }}
                      style={{
                        position: "absolute",
                        left: -10 + i * 15,
                        width: "80%",
                        height: "100%",
                        background: `linear-gradient(to top, transparent, ${modeColor}, transparent)`,
                        filter: "blur(8px)",
                        borderRadius: "50%"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* CATEGORY D: Energy Core (Classified) */}
              {mode === "energy" && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div
                    animate={{ scale: isHovered ? [1, 1.2, 1] : [1, 1.05, 1], opacity: isHovered ? [0.6, 1, 0.6] : [0.4, 0.6, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      boxShadow: `0 0 40px 20px ${modeColor}`,
                      filter: "blur(2px)"
                    }}
                  />
                  {/* Faint Electrical Distortion */}
                  <div style={{
                    position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.3,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                  }} />
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
    </>
  );
}
