"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import TitleCycler from "./TitleCycler";
import LabCoordinates from "./LabCoordinates";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 3.2, // after welcome banner (~3.4s exit)
      staggerChildren: 0.16,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.15 },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax — name moves slightly slower than scroll
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  // Coordinates drift very gently
  const coordY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "var(--nav-height)",
        paddingBottom: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(28,25,23,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(28,25,23,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Notebook margin rule — copper */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "clamp(1.5rem, 5vw, 4rem)",
          width: 1,
          backgroundColor: "rgba(146, 64, 14, 0.13)",
          zIndex: 0,
        }}
      />

      <div
        className="container-lab"
        style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}
      >
        {/* ── Lab Coordinates (top-right, parallax drift) ── */}
        <motion.div style={{ y: coordY }}>
          <LabCoordinates />
        </motion.div>

        {/* ── Main hero content (name, title, mission) ── */}
        <motion.div
          style={{ y: nameY }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ paddingLeft: "1.5rem" }}
          >
            {/* Experiment identifier */}
            <motion.div
              variants={lineVariants}
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "baseline",
                gap: "1.5rem",
              }}
            >
              <span className="text-lab-label">◆ Experiment Zero</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--fg-subtle)",
                    lineHeight: 1,
                  }}
                >
                  Experiment
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: "var(--fg-muted)",
                    lineHeight: 1.2,
                  }}
                >
                  #000
                </span>
              </div>
            </motion.div>

            {/* VINAY */}
            <motion.h1
              variants={lineVariants}
              className="text-hero"
              style={{
                display: "block",
                lineHeight: 0.88,
                marginBottom: "0.15em",
              }}
            >
              VINAY
            </motion.h1>

            {/* Changing title row */}
            <motion.div
              variants={lineVariants}
              style={{
                paddingBlock: "0.6rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 32,
                  height: 1,
                  backgroundColor: "var(--accent-emerald)",
                  flexShrink: 0,
                  opacity: 0.6,
                }}
              />
              <TitleCycler />
            </motion.div>

            {/* KRISHNA */}
            <motion.span
              variants={lineVariants}
              className="text-hero"
              style={{
                display: "block",
                lineHeight: 0.88,
                marginTop: "0.1em",
              }}
              aria-label="KRISHNA"
            >
              KRISHNA
            </motion.span>

            {/* Mission block */}
            <motion.div
              variants={fadeVariants}
              style={{
                marginTop: "2.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                maxWidth: "44ch",
              }}
            >
              {/* MISSION label */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--accent-emerald)",
                  opacity: 0.8,
                }}
              >
                Mission
              </span>

              {/* Primary tagline — left-rule notebook style */}
              <div
                style={{
                  borderLeft: "2px solid var(--accent-emerald)",
                  paddingLeft: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                    color: "var(--fg-secondary)",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    letterSpacing: "0.01em",
                  }}
                >
                  Building useful software,
                  <br />
                  one experiment at a time.
                </p>

                {/* Secondary — what Vinay builds */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.78rem, 1.15vw, 0.88rem)",
                    color: "var(--fg-muted)",
                    fontWeight: 300,
                    lineHeight: 1.75,
                    letterSpacing: "0.01em",
                  }}
                >
                  AI-powered tools, interactive experiences,
                  <br />
                  and software experiments that ship.
                </p>
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              variants={fadeVariants}
              style={{
                marginTop: "2.5rem",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="#experiments"
                id="hero-view-experiments"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--bg-card)",
                  backgroundColor: "var(--fg-primary)",
                  padding: "0.7rem 1.6rem",
                  textDecoration: "none",
                  borderRadius: "2px",
                  transition: "background-color 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-emerald)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--fg-primary)";
                }}
              >
                View Experiments
              </a>
              <a
                href="#contact"
                id="hero-contact"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--fg-secondary)",
                  border: "1px solid var(--border-medium)",
                  padding: "0.7rem 1.6rem",
                  textDecoration: "none",
                  borderRadius: "2px",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent-emerald)";
                  el.style.color = "var(--accent-emerald)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-medium)";
                  el.style.color = "var(--fg-secondary)";
                }}
              >
                Open Lab
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            color: "var(--fg-subtle)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 48,
            backgroundColor: "var(--fg-subtle)",
            animation: "scroll-line 2s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes scroll-line {
            0%   { opacity: 0.15; transform: scaleY(0.3) translateY(-60%); }
            50%  { opacity: 0.55; transform: scaleY(1) translateY(0); }
            100% { opacity: 0.15; transform: scaleY(0.3) translateY(60%); }
          }
        `}</style>
      </motion.div>
    </section>
  );
}
