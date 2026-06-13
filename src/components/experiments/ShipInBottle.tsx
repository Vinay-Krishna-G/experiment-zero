"use client";

import { motion } from "framer-motion";

export default function ShipInBottle() {
  return (
    <section 
      aria-label="Architecture Vessel"
      style={{
        paddingBlock: "6rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderTop: "1px solid var(--border-subtle)",
        overflow: "hidden"
      }}
    >
      <div className="container-lab" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        


        {/* The Ship in a Bottle Rendering */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            position: "relative",
            width: "500px",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Wooden Base */}
          <div style={{
            position: "absolute",
            bottom: "-25px",
            width: "320px",
            height: "28px",
            background: "linear-gradient(to bottom, #4a2d16, #2a1608)",
            borderRadius: "4px",
            boxShadow: "0 12px 24px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {/* Brass Nameplate */}
            <div style={{
              width: "120px",
              height: "14px",
              background: "linear-gradient(to right, #b48c36, #eadd81, #b48c36)",
              borderRadius: "1px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <span style={{ fontSize: "7px", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "#4a3300", fontWeight: "bold" }}>
                ARCHITECTURE VESSEL
              </span>
            </div>
            {/* Base Supports */}
            <div style={{ position: "absolute", left: "50px", top: "-12px", width: "18px", height: "18px", background: "#3a2210", borderRadius: "2px", transform: "skewX(-15deg)" }} />
            <div style={{ position: "absolute", right: "50px", top: "-12px", width: "18px", height: "18px", background: "#3a2210", borderRadius: "2px", transform: "skewX(15deg)" }} />
          </div>

          {/* Bottle Body (Long cylinder, narrow on right) */}
          <div style={{
            position: "absolute",
            left: "10px",
            width: "420px",
            height: "160px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 25%, rgba(0,0,0,0.15) 75%, rgba(255,255,255,0.12) 100%)",
            border: "2px solid rgba(255,255,255,0.25)",
            borderRight: "none",
            borderRadius: "15px 120px 120px 15px",
            boxShadow: "inset 0 0 40px rgba(255,255,255,0.08), inset 0 -20px 30px rgba(0,0,0,0.25), 0 15px 40px rgba(0,0,0,0.4)",
            backdropFilter: "blur(2px)",
            overflow: "hidden",
            zIndex: 2,
          }}>
            {/* Museum Glass Highlights */}
            <div style={{ position: "absolute", top: "8px", left: "20px", right: "80px", height: "25px", background: "linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)", borderRadius: "15px", filter: "blur(3px)", transform: "skewX(-10deg)" }} />
            <div style={{ position: "absolute", bottom: "10px", left: "30px", right: "60px", height: "18px", background: "linear-gradient(to top, rgba(255,255,255,0.2), transparent)", borderRadius: "10px", filter: "blur(2px)" }} />
            <div style={{ position: "absolute", top: "20px", bottom: "20px", left: "8px", width: "20px", background: "linear-gradient(to right, rgba(255,255,255,0.4), transparent)", borderRadius: "50%", filter: "blur(4px)" }} />

            {/* Inner Environment (Water & Ship) */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end"
            }}>
              
              {/* Physics: Ship + Water moving together */}
              <motion.div
                animate={{ rotateZ: [-1, 1, -1], y: [0, 2, 0] }}
                transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  bottom: 0,
                  transformOrigin: "bottom center"
                }}
              >
                {/* 3-Mast Ship */}
                <div style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "20px",
                  width: "360px",
                  height: "160px",
                  zIndex: 2
                }}>

                  <svg viewBox="0 0 200 140" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                    <defs>
                      <linearGradient id="hullGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2b1810" />
                        <stop offset="100%" stopColor="#3b2416" />
                      </linearGradient>
                    </defs>

                    <line x1="50" y1="20" x2="50" y2="100" stroke="#2a180b" strokeWidth="3" />
                    <line x1="100" y1="10" x2="100" y2="100" stroke="#2a180b" strokeWidth="4" />
                    <line x1="150" y1="25" x2="150" y2="100" stroke="#2a180b" strokeWidth="3" />

                    <path d="M 10 100 L 50 20 L 100 10 L 150 25 L 225 70" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                    <line x1="50" y1="45" x2="100" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <line x1="100" y1="45" x2="150" y2="25" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <line x1="100" y1="80" x2="50" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <line x1="150" y1="80" x2="100" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />

                    <path d="M 100 15 Q 60 30 100 45 Q 120 30 100 15 Z" fill="#ffffff" opacity="0.95" />
                    <path d="M 100 50 Q 50 65 100 85 Q 130 65 100 50 Z" fill="#ffffff" opacity="0.95" />
                    
                    <path d="M 150 30 Q 120 40 150 55 Q 165 40 150 30 Z" fill="#ffffff" opacity="0.95" />
                    <path d="M 150 60 Q 110 70 150 85 Q 170 70 150 60 Z" fill="#ffffff" opacity="0.95" />
                    
                    <path d="M 50 25 Q 30 35 50 45 Q 60 35 50 25 Z" fill="#ffffff" opacity="0.95" />
                    <path d="M 50 50 Q 20 60 50 80 Q 70 60 50 50 Z" fill="#ffffff" opacity="0.95" />
                    
                    <path d="M 150 30 Q 180 50 225 70 L 150 80 Z" fill="#ffffff" opacity="0.9" />

                    {/* Hull */}
                    <path d="M 15 120 L 180 120 Q 200 120 205 95 L 5 95 Q 10 120 15 120 Z" fill="url(#hullGradient)" />
                    {/* Bowsprit */}
                    <line x1="200" y1="98" x2="225" y2="70" stroke="#2a180b" strokeWidth="3" />
                  </svg>
                </div>

                {/* Multi-layer Animated Water */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "25px",
                  overflow: "hidden"
                }}>
                  {/* Layer 1: Deep water */}
                  <div style={{ position: "absolute", inset: 0, background: "#0f3b66" }} />
                  
                  {/* Layer 2: Surface gradient */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #38bdf8 0%, transparent 60%)", opacity: 0.8 }} />
                  
                  {/* Layer 3: Secondary Wave */}
                  <motion.div
                    animate={{ x: ["-25%", "-75%"] }}
                    transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: 0,
                      width: "200%",
                      height: "15px",
                      backgroundRepeat: "repeat-x",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 15'%3E%3Cpath d='M 0 7.5 Q 12.5 0 25 7.5 T 50 7.5 T 75 7.5 T 100 7.5 L 100 15 L 0 15 Z' fill='%230f3b66' opacity='0.6'/%3E%3C/svg%3E")`,
                      backgroundSize: "120px 15px"
                    }}
                  />

                  {/* Layer 4: Primary Wave with Crest Highlights */}
                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "200%",
                      height: "15px",
                      backgroundRepeat: "repeat-x",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 15'%3E%3Cpath d='M 0 7.5 Q 12.5 0 25 7.5 T 50 7.5 T 75 7.5 T 100 7.5 L 100 15 L 0 15 Z' fill='%2338bdf8' opacity='0.9'/%3E%3Cpath d='M 0 7.5 Q 12.5 0 25 7.5 T 50 7.5 T 75 7.5 T 100 7.5' fill='none' stroke='rgba(255,255,255,0.12)' stroke-width='1.5'/%3E%3C/svg%3E")`,
                      backgroundSize: "100px 15px"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottle Neck & Cork (Narrow on right side) */}
          <div style={{
            position: "absolute",
            right: "26px", // Attach to right side of the bottle body
            top: "55px",
            width: "44px",
            height: "50px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 20%, rgba(0,0,0,0.3) 80%, rgba(255,255,255,0.2) 100%)",
            border: "2px solid rgba(255,255,255,0.35)",
            borderLeft: "none",
            borderRadius: "0 4px 4px 0",
            zIndex: 1,
            boxShadow: "inset 0 10px 15px rgba(255,255,255,0.1), inset 0 -10px 15px rgba(0,0,0,0.3), 5px 5px 15px rgba(0,0,0,0.4)",
            backdropFilter: "blur(2px)",
          }}>
            {/* Neck Highlights */}
            <div style={{ position: "absolute", top: "4px", left: 0, right: "4px", height: "8px", background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
            
            {/* Cork */}
            <div style={{
              position: "absolute",
              right: "-14px", // protrudes to the right
              top: "6px",
              width: "25px",
              height: "34px",
              background: "linear-gradient(to bottom, #a17c43, #594418)",
              borderRadius: "0 3px 3px 0",
              boxShadow: "inset -2px 0 5px rgba(0,0,0,0.5), -2px 2px 4px rgba(0,0,0,0.3)",
              zIndex: 0
            }}>
              <div style={{ position: "absolute", top: "8px", right: "2px", width: "10px", height: "1px", background: "rgba(0,0,0,0.3)" }} />
              <div style={{ position: "absolute", top: "22px", right: "5px", width: "12px", height: "1px", background: "rgba(0,0,0,0.3)" }} />
            </div>
            
            {/* Bottle Lip */}
            <div style={{
              position: "absolute",
              right: "-4px",
              top: "-2px",
              width: "10px",
              height: "50px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(0,0,0,0.3))",
              borderRadius: "3px",
              border: "1px solid rgba(255,255,255,0.4)",
              zIndex: 2,
              boxShadow: "2px 0 5px rgba(0,0,0,0.4)"
            }} />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
