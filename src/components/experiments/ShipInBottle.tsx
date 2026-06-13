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
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--fg-subtle)", textTransform: "uppercase", marginBottom: "1rem" }}>
            [ Specimen Vault ]
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--fg-primary)", marginBottom: "1.5rem" }}>
            ARCHITECTURE VESSEL
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--fg-secondary)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
            Every project begins as an idea. <br/>
            Architecture is how the idea survives the storm.
          </p>
        </motion.div>

        {/* The Ship in a Bottle Rendering */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            position: "relative",
            width: "400px",
            height: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Wooden Base */}
          <div style={{
            position: "absolute",
            bottom: "-20px",
            width: "280px",
            height: "24px",
            background: "linear-gradient(to bottom, #452a14, #2a1608)",
            borderRadius: "4px",
            boxShadow: "0 12px 24px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {/* Brass Nameplate */}
            <div style={{
              width: "80px",
              height: "12px",
              background: "linear-gradient(to right, #b48c36, #eadd81, #b48c36)",
              borderRadius: "1px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <span style={{ fontSize: "5px", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "#4a3300", fontWeight: "bold" }}>
                VESSEL 01
              </span>
            </div>
            {/* Base Supports */}
            <div style={{ position: "absolute", left: "40px", top: "-10px", width: "16px", height: "16px", background: "#3a2210", borderRadius: "2px", transform: "skewX(-15deg)" }} />
            <div style={{ position: "absolute", right: "40px", top: "-10px", width: "16px", height: "16px", background: "#3a2210", borderRadius: "2px", transform: "skewX(15deg)" }} />
          </div>

          {/* Glass Bottle (Horizontal) */}
          <div style={{
            position: "absolute",
            width: "360px",
            height: "140px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 20%, rgba(0,0,0,0.2) 80%, rgba(255,255,255,0.15) 100%)",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRight: "4px solid rgba(255,255,255,0.5)",
            borderLeft: "none",
            borderRadius: "20px 70px 70px 20px",
            boxShadow: "inset 0 0 20px rgba(255,255,255,0.1), inset 0 -15px 30px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
            overflow: "hidden",
            zIndex: 2
          }}>
            {/* Glass Highlights */}
            <div style={{ position: "absolute", top: "10px", left: "20px", right: "40px", height: "20px", background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)", borderRadius: "10px", filter: "blur(2px)" }} />
            <div style={{ position: "absolute", bottom: "10px", left: "20px", right: "40px", height: "15px", background: "linear-gradient(to top, rgba(255,255,255,0.2), transparent)", borderRadius: "10px", filter: "blur(2px)" }} />

            {/* Inner Environment (Waves & Ship) */}
            <motion.div 
              animate={{ rotateZ: [-1, 1, -1] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              {/* The Ship */}
              <motion.div
                animate={{ rotateZ: [-2, 2, -2], y: [0, -3, 0] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: "35px",
                  left: "100px",
                  width: "120px",
                  height: "80px",
                  zIndex: 2
                }}
              >
                {/* Sails */}
                <svg viewBox="0 0 100 100" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                  {/* Masts */}
                  <line x1="30" y1="20" x2="30" y2="70" stroke="#452a14" strokeWidth="2" />
                  <line x1="60" y1="10" x2="60" y2="70" stroke="#452a14" strokeWidth="2" />
                  <line x1="85" y1="30" x2="85" y2="70" stroke="#452a14" strokeWidth="1.5" />
                  
                  {/* White Sails */}
                  <path d="M 30 25 Q 15 40 30 60 Q 40 45 30 25" fill="rgba(248, 250, 252, 0.9)" />
                  <path d="M 60 15 Q 40 35 60 65 Q 75 40 60 15" fill="rgba(248, 250, 252, 0.95)" />
                  <path d="M 85 35 Q 75 50 85 65 Q 95 50 85 35" fill="rgba(248, 250, 252, 0.85)" />
                  
                  {/* Rigging Lines */}
                  <line x1="10" y1="60" x2="30" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                  <line x1="30" y1="20" x2="60" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                  <line x1="60" y1="10" x2="85" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                  <line x1="85" y1="30" x2="100" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                </svg>
                {/* Black Hull */}
                <div style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  width: "90px",
                  height: "20px",
                  backgroundColor: "#0f172a",
                  borderRadius: "2px 2px 10px 10px",
                  clipPath: "polygon(0 0, 100% 0, 90% 100%, 15% 100%)",
                  boxShadow: "inset 0 4px 6px rgba(255,255,255,0.1)"
                }} />
              </motion.div>

              {/* Water / Waves */}
              <motion.div
                animate={{ x: ["0%", "-5%", "0%"] }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                style={{
                  width: "120%",
                  height: "45px",
                  background: "linear-gradient(to bottom, rgba(14, 165, 233, 0.6), rgba(3, 105, 161, 0.8))",
                  borderTop: "2px solid rgba(125, 211, 252, 0.5)",
                  boxShadow: "inset 0 10px 20px rgba(0,0,0,0.2)",
                  transform: "translateX(-5%)"
                }}
              />
            </motion.div>
          </div>

          {/* Bottle Neck & Cork */}
          <div style={{
            position: "absolute",
            left: "-40px",
            top: "50px",
            width: "40px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.2))",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRight: "none",
            borderRadius: "5px 0 0 5px",
            zIndex: 1
          }}>
            {/* Cork */}
            <div style={{
              position: "absolute",
              left: "-15px",
              top: "2px",
              width: "15px",
              height: "32px",
              background: "linear-gradient(to bottom, #8f6e2b, #594418)",
              borderRadius: "3px 0 0 3px",
              boxShadow: "inset 2px 0 4px rgba(0,0,0,0.4)"
            }} />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
