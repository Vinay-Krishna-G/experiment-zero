"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Each log line appears in sequence
const LOG_LINES = [
  { id: "lab", text: "VINAY KRISHNA LABORATORY", delay: 0.1, isHeader: true },
  { id: "divider", text: null, delay: 0.5, isDivider: true },
  { id: "log", text: "EXPLORER ENTRY LOGGED", delay: 0.75, isAccent: true },
  { id: "date", text: "__DATE__", delay: 1.1 },
  { id: "time", text: "__TIME__", delay: 1.4 },
  { id: "divider2", text: null, delay: 1.75, isDivider: true },
  { id: "enter", text: "Entering Laboratory...", delay: 2.05, isMuted: true },
];

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase();
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

interface LogLine {
  id: string;
  text: string | null;
  delay: number;
  isHeader?: boolean;
  isAccent?: boolean;
  isMuted?: boolean;
  isDivider?: boolean;
}

function LogEntry({ line, now }: { line: LogLine; now: Date }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), line.delay * 1000);
    return () => clearTimeout(t);
  }, [line.delay]);

  if (!visible) return null;

  if (line.isDivider) {
    return (
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "var(--border-medium)",
          transformOrigin: "left center",
          marginBlock: "0.5rem",
        }}
      />
    );
  }

  let text = line.text ?? "";
  if (text === "__DATE__") text = formatDate(now);
  if (text === "__TIME__") text = formatTime(now);

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: line.isHeader ? "0.75rem" : "0.65rem",
        fontWeight: line.isHeader ? 500 : 400,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: line.isHeader
          ? "var(--fg-primary)"
          : line.isAccent
          ? "var(--accent-emerald)"
          : line.isMuted
          ? "var(--fg-subtle)"
          : "var(--fg-muted)",
        lineHeight: 1.6,
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }}
    >
      {/* Cursor blink marker */}
      {!line.isHeader && !line.isDivider && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: line.isAccent
              ? "var(--accent-emerald)"
              : "var(--fg-subtle)",
            flexShrink: 0,
          }}
        />
      )}
      {text}
    </motion.div>
  );
}

export default function WelcomeBanner() {
  const [visible, setVisible] = useState(true);
  const [now] = useState(() => new Date());
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred or user has already seen it this session, skip the banner immediately
    const hasSeen = sessionStorage.getItem("welcome-seen");
    if (hasSeen === "true" || prefersReducedMotion) {
      // Avoid synchronous setState in effect to satisfy linter
      setTimeout(() => setVisible(false), 0);
      return;
    }

    sessionStorage.setItem("welcome-seen", "true");

    const timer = setTimeout(() => setVisible(false), 3400);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="welcome-banner"
          role="status"
          aria-live="polite"
          aria-label="Laboratory entry log"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          transition={{ duration: 0.4, ease: "easeIn" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--bg-primary)",
            backgroundImage: `radial-gradient(circle, rgba(28, 25, 23, 0.065) 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        >
          {/* Logbook card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{
              width: "min(340px, 88vw)",
              border: "1px solid var(--border-medium)",
              borderRadius: "3px",
              padding: "2rem 1.75rem",
              backgroundColor: "var(--bg-card)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Left spine */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: 3,
                backgroundColor: "var(--accent-emerald)",
                opacity: 0.6,
              }}
            />

            {/* Log line label */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
                marginBottom: "1.25rem",
                paddingLeft: "0.25rem",
              }}
            >
              Access Log / Entry Record
            </div>

            {/* Lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {LOG_LINES.map((line) => (
                <LogEntry key={line.id} line={line} now={now} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
