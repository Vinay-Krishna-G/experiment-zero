"use client";

import { motion } from "framer-motion";

interface EquipmentTagProps {
  label: string;
}

export default function EquipmentTag({ label }: EquipmentTagProps) {
  // Simple deterministic color map for a few key technologies to add subtle monochrome depth
  let stencilTint = "var(--fg-secondary)";
  const l = label.toLowerCase();
  
  if (l.includes("react") || l.includes("next")) stencilTint = "var(--fg-primary)";
  else if (l.includes("mongo") || l.includes("redis")) stencilTint = "var(--accent-emerald)";
  else if (l.includes("typescript") || l.includes("python")) stencilTint = "var(--accent-copper)";
  
  return (
    <motion.div
      whileHover={{ y: -1, backgroundColor: "rgba(28,25,23,0.08)" }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.25rem 0.5rem",
        border: "1px solid var(--border-medium)",
        borderRadius: "2px",
        backgroundColor: "rgba(28,25,23,0.03)",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.05)",
        cursor: "default"
      }}
      title={`Equipment Spec: ${label}`}
    >
      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: "var(--border-medium)",
          boxShadow: "inset 0 1px 1px rgba(0,0,0,0.3)",
          marginRight: "0.4rem"
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: stencilTint,
          opacity: 0.85
        }}
      >
        {label}
      </span>
      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: "var(--border-medium)",
          boxShadow: "inset 0 1px 1px rgba(0,0,0,0.3)",
          marginLeft: "0.4rem"
        }}
      />
    </motion.div>
  );
}
