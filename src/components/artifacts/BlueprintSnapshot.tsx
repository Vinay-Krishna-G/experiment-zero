"use client";

import { motion } from "framer-motion";

export default function BlueprintSnapshot() {
  const steps = [
    { label: "INPUT", icon: "↓" },
    { label: "PROCESS", icon: "◈" },
    { label: "STORE", icon: "▤" },
    { label: "OUTPUT", icon: "↑" }
  ];

  return (
    <div
      style={{
        margin: "2.5rem 0",
        padding: "1.5rem",
        backgroundColor: "rgba(15, 23, 42, 0.02)", // extremely faint navy tint
        border: "1px solid #1e3a8a",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}
      aria-label="Blueprint Process Snapshot"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: "6px", height: "6px", backgroundColor: "#1e3a8a" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#1e3a8a", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>
          System Data Flow
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        {/* Connecting Line */}
        <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: "1px", backgroundColor: "#1e3a8a", zIndex: 0, opacity: 0.3 }} />

        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", position: "relative", zIndex: 1, backgroundColor: "transparent", padding: "0 0.5rem" }}
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px dashed #1e3a8a", display: "flex", justifyContent: "center", alignItems: "center", color: "#1e3a8a", fontSize: "0.8rem", backgroundColor: "var(--bg-primary)" }}>
              {step.icon}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
