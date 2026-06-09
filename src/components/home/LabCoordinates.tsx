"use client";

import { motion } from "framer-motion";

export default function LabCoordinates() {
  return (
    <motion.div
      id="lab-coordinates"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 3.6 }}
      aria-label="Laboratory location metadata"
      style={{
        position: "absolute",
        top: "calc(var(--nav-height) + 2rem)",
        right: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
        opacity: 0.45,
        textAlign: "right",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* Top rule */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "currentColor",
          opacity: 0.3,
          marginBottom: "0.5rem",
        }}
      />

      <CoordLine>RESEARCH STATION 07</CoordLine>
      <CoordLine isGap />
      <CoordLine>VIJAYAWADA</CoordLine>
      <CoordLine>INDIA</CoordLine>
      <CoordLine isGap />
      <CoordLine>2026</CoordLine>
      <CoordLine isGap />
      <CoordLine isAccent>● ACTIVE</CoordLine>

      {/* Bottom rule */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "currentColor",
          opacity: 0.3,
          marginTop: "0.5rem",
        }}
      />
    </motion.div>
  );
}

function CoordLine({
  children,
  isGap,
  isAccent,
}: {
  children?: React.ReactNode;
  isGap?: boolean;
  isAccent?: boolean;
}) {
  if (isGap) return <div style={{ height: "0.3rem" }} />;
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.58rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: isAccent ? "var(--accent-emerald)" : "var(--fg-secondary)",
        lineHeight: 1.4,
        display: "block",
      }}
    >
      {children}
    </span>
  );
}
