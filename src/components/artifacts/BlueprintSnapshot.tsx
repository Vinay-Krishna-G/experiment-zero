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
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-medium)",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}
      aria-label="Blueprint Process Snapshot"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: "6px", height: "6px", backgroundColor: "var(--accent-emerald)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--fg-secondary)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>
          System Data Flow
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        {/* Connecting Line */}
        <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: "1px", backgroundColor: "var(--border-subtle)", zIndex: 0 }} />

        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", position: "relative", zIndex: 1, backgroundColor: "var(--bg-card)", padding: "0 0.5rem" }}
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px dashed var(--accent-emerald)", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--accent-emerald)", fontSize: "0.8rem", backgroundColor: "var(--bg-card)" }}>
              {step.icon}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--fg-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
