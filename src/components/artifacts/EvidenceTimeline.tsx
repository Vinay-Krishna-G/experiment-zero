"use client";

import { motion } from "framer-motion";

export default function EvidenceTimeline() {
  const steps = [
    { label: "Problem", icon: "!" },
    { label: "Decision", icon: "✓" },
    { label: "Tradeoff", icon: "▵" },
    { label: "Outcome", icon: "★" }
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem",
        backgroundColor: "rgba(16, 185, 129, 0.05)", // Verification Green tint
        border: "1px solid rgba(16, 185, 129, 0.2)",
        borderRadius: "4px",
        marginBottom: "2rem"
      }}
      aria-label="Evidence Timeline Summary"
    >
      <div style={{ display: "flex", flex: 1, justifyContent: "space-between", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "5%", right: "5%", height: "1px", borderTop: "1px dashed rgba(16, 185, 129, 0.4)", zIndex: 0 }} />

        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--bg-card)", padding: "0 0.5rem", zIndex: 1 }}
          >
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--bg-primary)", border: "1px solid rgba(16, 185, 129, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", color: "#10b981", fontSize: "0.6rem" }}>
              {step.icon}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
