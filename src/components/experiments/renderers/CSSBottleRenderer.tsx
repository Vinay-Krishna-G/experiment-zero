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
    ["#34d399", "#22d3ee"], // Emerald + Cyan
    ["#22d3ee", "#c084fc"], // Cyan + Violet
    ["#60a5fa", "#f472b6"], // Blue + Pink
    ["#34d399", "#fbbf24"], // Emerald + Gold
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
                    y: [20, -35 - i * 5, -30 - i * 5, -40 - i * 5, -25],
                    x: [0, (i % 2 === 0 ? 15 : -15), (i % 2 === 0 ? -10 : 10), (i % 2 === 0 ? 5 : -5), 0],
                    opacity: [0, 1, 0.7, 1, 0]
                  }}
                  transition={{
                    duration: 3.5 + i,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: 3 + (i % 2),
                    height: 3 + (i % 2),
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    boxShadow: `0 0 12px 3px ${activePalette[i % 2]}`,
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
                y: [20, -30, -60],
                x: [0, 5, -5],
                opacity: [0, 0.4, 0],
                scale: [0.5, 1.5, 2.5]
              }}
              transition={{
                duration: 4,
                ease: "easeOut",
                repeat: Infinity
              }}
              style={{
                position: "absolute",
                top: 0,
                left: "40%",
                width: 20,
                height: 20,
                background: `radial-gradient(circle, ${modeColor} 0%, transparent 70%)`,
                filter: "blur(10px)",
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
                  {Array.from({ length: 20 }).map((_, i) => {
                    // Size variation: mostly tiny, some medium, 1 hero
                    const size = i === 0 ? 7 : (i < 5 ? 4 : 2);
                    return (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -40 - (i % 5) * 20, 0],
                          x: [0, (i % 2 === 0 ? 1 : -1) * (15 + (i % 5) * 10), 0],
                          opacity: [0.2, i === 0 ? 1 : 0.8, 0.2]
                        }}
                        transition={{
                          duration: 4 + (i % 5) * 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (i % 5) * 0.5
                        }}
                        style={{
                          position: "absolute",
                          bottom: 10 + (i % 10) * 15,
                          left: 15 + (i % 8) * 10,
                          width: size,
                          height: size,
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                          boxShadow: `0 0 ${i === 0 ? 20 : 12}px ${i === 0 ? 6 : 3}px ${activePalette[i % 2]}`,
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
                    rotateZ: isHovered ? [0, 4, -2, 1, 0] : 0,
                    scale: isHovered ? 1.03 : 1
                  }}
                  initial={{ height: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  style={{
                    position: "absolute",
                    bottom: -5,
                    left: -5,
                    right: -5,
                    background: `linear-gradient(to top, ${modeColor} 0%, rgba(20,20,20,0.4) 100%)`,
                    borderTop: `5px solid rgba(255,255,255,0.85)`, // Strong Meniscus
                    boxShadow: `inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -40px 40px rgba(0,0,0,0.5), inset 0 -20px 20px rgba(0,0,0,0.8)`, // Internal depth
                    transformOrigin: "bottom center",
                    overflow: "hidden"
                  }}
                >
                  {/* Refraction highlight */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 15%, transparent 30%)",
                    pointerEvents: "none"
                  }} />
                  
                  {/* Preserved Liquid Bubbles */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`bubble-${i}`}
                      initial={{ y: "120%", x: 10 + (i % 5) * 15, opacity: 0 }}
                      animate={{ y: "-20%", opacity: [0, 0.8, 0] }}
                      transition={{ duration: 6 + (i % 4) * 2, repeat: Infinity, delay: (i % 5), ease: "linear" }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: 2 + (i % 3) * 1.5,
                        height: 2 + (i % 3) * 1.5,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.8)",
                        backgroundColor: "rgba(255,255,255,0.3)"
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
                        opacity: [0, 0.6 - i * 0.1, 0],
                        scale: [1, 1.5 + i * 0.2, 2 + i * 0.5]
                      }}
                      transition={{
                        y: { duration: 12 + (i % 3) * 4, repeat: Infinity, ease: "linear", delay: i * 2 },
                        x: { duration: 6 + (i % 2) * 2, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 12 + (i % 3) * 4, repeat: Infinity, ease: "linear", delay: i * 2 },
                        scale: { duration: 12 + (i % 3) * 4, repeat: Infinity, ease: "linear", delay: i * 2 }
                      }}
                      style={{
                        position: "absolute",
                        left: -20 + i * 20,
                        width: "120%",
                        height: "80%",
                        background: `radial-gradient(ellipse at center, ${modeColor} 0%, transparent 60%)`,
                        transformOrigin: i % 2 === 0 ? "top left" : "bottom right",
                        filter: `blur(${12 + i * 2}px)`,
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
                      ? `inset 0 0 50px ${glowColor}, 0 -15px 40px ${glowColor}` 
                      : `inset 0 0 20px ${glowColor}`,
                    transition: "box-shadow 0.4s ease"
                  }}
                >
                  {/* Vapor Layer */}
                  <motion.div
                    animate={{ opacity: isHovered ? 0.7 : 0.3 }}
                    style={{
                      position: "absolute",
                      top: -15,
                      left: 0,
                      right: 0,
                      height: 30,
                      background: `radial-gradient(ellipse, ${glowColor} 0%, transparent 70%)`,
                      filter: "blur(8px)",
                      pointerEvents: "none",
                      mixBlendMode: "screen"
                    }}
                  />
                  {/* Boiling Bubbles */}
                  {Array.from({ length: isHovered ? 15 : 8 }).map((_, i) => {
                    const sizes = [4, 6, 10, 16]; // Larger bubbles
                    const bubbleSize = sizes[i % sizes.length];
                    const burstScale = 1.5;
                    return (
                    <motion.div
                      key={`potion-bubble-${i}`}
                      initial={{ y: "100%", x: (i * 12) % 80, opacity: 0, scale: 1 }}
                      animate={{ 
                        y: ["100%", "-5%", "-10%"], 
                        opacity: [0, 1, 0],
                        scale: [1, 1, burstScale] 
                      }}
                      transition={{ 
                        duration: 1.5 + (i % 3), 
                        repeat: Infinity, 
                        delay: (i % 4) * 0.5, 
                        ease: "easeIn" 
                      }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: bubbleSize,
                        height: bubbleSize,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        boxShadow: `0 0 10px 3px ${modeColor}`
                      }}
                    />
                    );
                  })}
                  {/* Thick Base Liquid Glow */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background: `linear-gradient(to top, ${glowColor}, transparent)`,
                    filter: "blur(4px)"
                  }} />
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
