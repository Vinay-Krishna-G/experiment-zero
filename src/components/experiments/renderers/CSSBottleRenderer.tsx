"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experiment } from "@/types";
import { getVisualProfile } from "@/visuals/getVisualProfile";

export function getBottleColors(status: string) {
  let mode: "firefly" | "liquid" | "smoke" | "potion" = "liquid";
  let modeColor = "rgba(59, 130, 246, 0.6)"; // Sapphire default
  let glowColor = "rgba(59, 130, 246, 0.4)";
  
  if (status === "Planned" || status === "On Hold") {
    mode = "potion";
    modeColor = "rgba(16, 185, 129, 0.8)"; // Toxic Green
    glowColor = "rgba(16, 185, 129, 0.5)";
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
    modeColor = "rgba(6, 182, 212, 0.8)"; // Cyan
    glowColor = "rgba(6, 182, 212, 0.5)";
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

  // Palette logic for Fireflies
  const fireflyPalettes = [
    ["#34d399", "#60a5fa"], // Emerald + Blue
    ["#60a5fa", "#f472b6"], // Blue + Pink
    ["#c084fc", "#22d3ee"], // Violet + Cyan
  ];
  const charCode = experiment.title.charCodeAt(0) || 0;
  const paletteIndex = (experiment.id.length + charCode) % fireflyPalettes.length;
  const activePalette = fireflyPalettes[paletteIndex];

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
            animate={{ 
              y: isHovered ? (mode === "firefly" || mode === "smoke" ? -25 : -8) : 0, 
              rotate: isHovered ? 8 : 0,
              x: isHovered ? "-40%" : "-50%" 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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

          {/* Escaping Fireflies */}
          {mode === "firefly" && isHovered && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`escape-${i}`}
                  initial={{ y: 20, x: 0, opacity: 0 }}
                  animate={{
                    y: [20, -50 - Math.random() * 30, -60, -40, -50],
                    x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, 0],
                    opacity: [0, 1, 0.8, 1, 0]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: 3 + Math.random() * 2,
                    height: 3 + Math.random() * 2,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    boxShadow: `0 0 12px 4px ${activePalette[i % 2]}`,
                    zIndex: 10,
                    pointerEvents: "none"
                  }}
                />
              ))}
            </>
          )}

          {/* Escaping Smoke Wisp */}
          {mode === "smoke" && isHovered && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{
                y: [20, -40, -80],
                x: [0, 10, -10],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 2]
              }}
              transition={{
                duration: 3,
                ease: "easeOut"
              }}
              style={{
                position: "absolute",
                top: 0,
                left: "40%",
                width: 20,
                height: 20,
                background: `radial-gradient(circle, ${modeColor} 0%, transparent 70%)`,
                filter: "blur(8px)",
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
              background: "linear-gradient(to right, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 20%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.05) 80%, rgba(255,255,255,0.25) 100%)",
              border: `2px solid rgba(255,255,255,0.3)`,
              borderLeft: `2.5px solid rgba(255,255,255,0.5)`,
              borderRight: `2px solid rgba(255,255,255,0.4)`,
              borderRadius: "8px 8px 12px 12px",
              boxShadow: `
                inset 0 0 20px rgba(255,255,255,0.15),
                inset 0 -20px 30px rgba(0,0,0,0.5),
                inset 20px 0 20px rgba(0,0,0,0.35),
                inset -20px 0 20px rgba(0,0,0,0.35),
                0 4px 20px rgba(0,0,0,0.5)
              `,
              backdropFilter: "blur(8px) brightness(0.85)",
              overflow: "hidden",
            }}
          >
            {/* SPECIMEN RENDERERS */}
            <div style={{ position: "absolute", inset: 4, borderRadius: "4px 4px 8px 8px", overflow: "hidden" }}>
              
              {/* CATEGORY A: Firefly (Active) */}
              {mode === "firefly" && (
                <div style={{ position: "absolute", inset: 0 }}>
                  {Array.from({ length: 12 }).map((_, i) => {
                    const size = 2 + Math.random() * 4;
                    return (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -40 - Math.random() * 100, 0],
                          x: [0, (Math.random() - 0.5) * 60, 0],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 4 + Math.random() * 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 5
                        }}
                        style={{
                          position: "absolute",
                          bottom: 10 + Math.random() * 40,
                          left: 10 + Math.random() * 60,
                          width: size,
                          height: size,
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                          boxShadow: `0 0 15px 5px ${activePalette[i % 2]}`,
                          filter: "blur(0.5px)"
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* CATEGORY B: Liquid Specimen */}
              {mode === "liquid" && !isPlanned && (
                <motion.div
                  animate={{ 
                    height: liquidHeight,
                    rotateZ: isHovered ? [0, 2, -1, 0] : 0,
                    scale: isHovered ? 1.02 : 1
                  }}
                  initial={{ height: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  style={{
                    position: "absolute",
                    bottom: -5,
                    left: -5,
                    right: -5,
                    background: `linear-gradient(to top, ${modeColor} 0%, rgba(20,20,20,0.5) 100%)`,
                    borderTop: `4px solid rgba(255,255,255,0.75)`, // Meniscus
                    boxShadow: `inset 0 10px 20px rgba(255,255,255,0.15), inset 0 -40px 40px rgba(0,0,0,0.4), inset 0 -20px 20px rgba(0,0,0,0.8)`, // Internal depth
                    transformOrigin: "bottom center"
                  }}
                >
                  {/* Preserved Liquid Bubbles */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`bubble-${i}`}
                      initial={{ y: "120%", x: 10 + Math.random() * 70, opacity: 0 }}
                      animate={{ y: "-20%", opacity: [0, 0.8, 0] }}
                      transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: 2 + Math.random() * 3,
                        height: 2 + Math.random() * 3,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.7)",
                        backgroundColor: "rgba(255,255,255,0.2)"
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* CATEGORY C: Smoke / Mist Specimen */}
              {mode === "smoke" && (
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", mixBlendMode: "screen" }}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={`smoke-${i}`}
                      animate={{
                        y: ["120%", "-40%"],
                        x: [0, (i % 2 === 0 ? 15 : -15), 0],
                        opacity: [0, 0.6, 0],
                        scale: [1, 1.5, 2]
                      }}
                      transition={{
                        y: { duration: 12 + i * 4, repeat: Infinity, ease: "linear", delay: i * 3 },
                        x: { duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 12 + i * 4, repeat: Infinity, ease: "linear", delay: i * 3 },
                        scale: { duration: 12 + i * 4, repeat: Infinity, ease: "linear", delay: i * 3 }
                      }}
                      style={{
                        position: "absolute",
                        left: -20 + i * 20,
                        width: "120%",
                        height: "80%",
                        background: `radial-gradient(ellipse at center, ${modeColor} 0%, transparent 60%)`,
                        backgroundPosition: `${(i * 30) % 100}% ${(i * 40) % 100}%`,
                        transformOrigin: i % 2 === 0 ? "top left" : "bottom right",
                        filter: "blur(12px)",
                        borderRadius: "50%"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* CATEGORY D: Potion (Active/Planned) */}
              {mode === "potion" && (
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
                    borderTop: `2px solid rgba(255,255,255,0.6)`,
                    boxShadow: isHovered 
                      ? `inset 0 0 40px ${glowColor}, 0 -10px 30px ${glowColor}` 
                      : `inset 0 0 20px ${glowColor}`,
                    transition: "box-shadow 0.4s ease"
                  }}
                >
                  {/* Boiling Bubbles */}
                  {Array.from({ length: isHovered ? 15 : 8 }).map((_, i) => {
                    const sizes = [3, 5, 8, 12];
                    const bubbleSize = sizes[i % sizes.length];
                    return (
                    <motion.div
                      key={`potion-bubble-${i}`}
                      initial={{ y: "100%", x: Math.random() * 80, opacity: 0 }}
                      animate={{ y: "-10%", opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeIn" }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: bubbleSize,
                        height: bubbleSize,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        boxShadow: `0 0 8px 2px ${modeColor}`
                      }}
                    />
                    );
                  })}
                  {/* Tiny Smoke Traces */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={`potion-smoke-${i}`}
                      initial={{ y: "100%", x: Math.random() * 80, opacity: 0 }}
                      animate={{ y: "-50%", opacity: [0, 0.4, 0], scale: [1, 1.5] }}
                      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: 15,
                        height: 25,
                        background: `radial-gradient(ellipse, ${modeColor} 0%, transparent 60%)`,
                        filter: "blur(4px)",
                      }}
                    />
                  ))}
                </motion.div>
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
