"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import TitleCycler from "./TitleCycler";
import LabCoordinates from "./LabCoordinates";
import { EXPERIMENTS } from "@/content";
import { BLUEPRINTS } from "@/content";
import { RESEARCH_LOGS } from "@/content";

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

  // Parallax transforms — always called unconditionally (Rules of Hooks)
  const nameYTransform = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const coordY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const prefersReducedMotion = useReducedMotion();
  // Disable parallax for users who prefer reduced motion
  const nameY = prefersReducedMotion ? "0%" : nameYTransform;
  const activeCoordY = prefersReducedMotion ? "0%" : coordY;

  const connections = 
    EXPERIMENTS.filter(e => e.blueprintId).length + 
    RESEARCH_LOGS.filter(r => r.relatedBlueprintId).length + 
    RESEARCH_LOGS.filter(r => r.relatedExperimentId).length;

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
        style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", overflow: "clip" }}
      >
        {/* ── Lab Coordinates (top-right, parallax drift) ── */}
        <motion.div className="hidden md:block" style={{ y: activeCoordY, position: "absolute", top: 0, right: 0, bottom: 0, left: 0, pointerEvents: "none" }}>
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
            style={{ paddingLeft: "clamp(0rem, 2vw, 1.5rem)" }}
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
                className="hidden md:flex"
                style={{
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

            {/* NAME */}
            <h1 style={{ margin: 0, padding: 0, border: 0 }}>
              <motion.span
                variants={lineVariants}
                className="text-hero"
                style={{
                  display: "block",
                  lineHeight: 0.88,
                  marginBottom: "0.15em",
                }}
              >
                VINAY
              </motion.span>

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

              <motion.span
                variants={lineVariants}
                className="text-hero"
                style={{
                  display: "block",
                  lineHeight: 0.88,
                  marginTop: "0.1em",
                }}
              >
                KRISHNA
              </motion.span>
            </h1>

            {/* Positioning Statement */}
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
                Positioning
              </span>

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
                  Full Stack Engineer focused on AI tooling,
                  <br />
                  developer platforms, and highly scalable
                  <br />
                  knowledge systems.
                </p>
              </div>
            </motion.div>

            {/* Archive Status block */}
            <motion.div
              variants={fadeVariants}
              style={{
                marginTop: "2.5rem",
                display: "inline-flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "0.8rem 1.25rem",
                backgroundColor: "rgba(28,20,8,0.02)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "2px",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.25rem" }}>
                Platform Scale
              </span>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-secondary)" }}>
                <span>Production Projects: {EXPERIMENTS.length}</span>
                <span>Architecture Blueprints: {BLUEPRINTS.length}</span>
                <span style={{ color: "var(--accent-emerald)" }}>Engineering Notes: {RESEARCH_LOGS.length}</span>
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
                id="hero-view-projects"
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
                View Projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-resume"
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
                Download Resume
              </a>
              <div style={{ display: "flex", gap: "0.75rem", marginLeft: "0.5rem" }}>
                <a
                  href="https://github.com/vinaykrishna"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  style={{
                    color: "var(--fg-muted)",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-primary)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a
                  href="https://linkedin.com/in/vinaykrishna"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  style={{
                    color: "var(--fg-muted)",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-primary)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden md:flex"
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
