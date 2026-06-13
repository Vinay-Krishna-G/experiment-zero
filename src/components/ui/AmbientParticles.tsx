"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AmbientParticles() {
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, duration: number, delay: number, size: number, glow: string }[]>([]);

  useEffect(() => {
    // Generate 15 fireflies scattered across the viewport
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100, // vh
      duration: 15 + Math.random() * 20, // 15 to 35 seconds
      delay: Math.random() * 5,
      size: 2 + Math.random() * 3, // 2 to 5 px
      glow: Math.random() > 0.5 ? "rgba(16, 185, 129, 0.4)" : "rgba(245, 158, 11, 0.4)" // Emerald or Amber tint
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div 
      aria-hidden="true" 
      style={{ 
        position: "fixed", 
        inset: 0, 
        pointerEvents: "none", 
        zIndex: 0, 
        overflow: "hidden",
        opacity: 0.6 
      }}
    >
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
          animate={{
            opacity: [0, 0.6, 0.2, 0.8, 0],
            x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`],
            y: [`${p.y}vh`, `${p.y - 15 - Math.random() * 15}vh`]
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: "#fff",
            boxShadow: `0 0 12px 4px ${p.glow}`,
            filter: "blur(1px)"
          }}
        />
      ))}
    </div>
  );
}
