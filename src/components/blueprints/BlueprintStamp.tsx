"use client";

import { motion } from "framer-motion";
import type { BlueprintStatus } from "@/content";

interface BlueprintStampProps {
  status: BlueprintStatus;
}

const STAMP_CONFIG: Record<BlueprintStatus, { text: string; color: string; borderColor: string }> = {
  Verified: {
    text: "VERIFIED",
    color: "rgba(45, 106, 79, 0.75)",
    borderColor: "rgba(45, 106, 79, 0.6)",
  },
  "In Development": {
    text: "IN DEVELOPMENT",
    color: "rgba(146, 64, 14, 0.7)",
    borderColor: "rgba(146, 64, 14, 0.55)",
  },
};

export default function BlueprintStamp({ status }: BlueprintStampProps) {
  const cfg = STAMP_CONFIG[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      aria-label={`Blueprint status: ${status}`}
      style={{
        display: "inline-block",
        border: `3px solid ${cfg.borderColor}`,
        borderRadius: "3px",
        padding: "0.35rem 0.75rem",
        color: cfg.color,
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        fontWeight: 700,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        transform: "rotate(-12deg)",
        transformOrigin: "center",
        userSelect: "none",
        pointerEvents: "none",
        lineHeight: 1.4,
        textAlign: "center",
        // Paper texture overlay via box-shadow
        boxShadow: `inset 0 0 12px rgba(0,0,0,0.06), 0 0 0 1px ${cfg.borderColor}22`,
        // Aged effect — slight roughness
        filter: "contrast(1.1)",
        position: "relative",
      }}
    >
      {cfg.text}
    </motion.div>
  );
}
