"use client";

import { motion, type Variants } from "framer-motion";
import type { Blueprint } from "@/data/blueprints";
import BlueprintMap from "./BlueprintMap";
import BlueprintStamp from "./BlueprintStamp";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <span>◈</span>
      <span>{children}</span>
    </div>
  );
}

interface BlueprintCardProps {
  blueprint: Blueprint;
}

export default function BlueprintCard({ blueprint }: BlueprintCardProps) {
  return (
    <motion.div
      key={blueprint.id}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "3px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(28,25,23,0.08), 0 2px 10px rgba(28,25,23,0.05)",
      }}
    >
      {/* Left spine — blueprint blue-green */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, backgroundColor: "var(--accent-emerald)", opacity: 0.5 }} />

      {/* Marginalia — top edge tick marks */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundImage: "repeating-linear-gradient(to right, transparent 0px, transparent 15px, rgba(28,25,23,0.08) 15px, rgba(28,25,23,0.08) 16px)", opacity: 0.6 }} />

      {/* Marginalia — right edge measurement marks */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 3, backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 22px, rgba(28,25,23,0.06) 22px, rgba(28,25,23,0.06) 23px)", opacity: 0.6 }} />

      <div style={{ padding: "2.5rem 2.5rem 2.5rem 3rem" }}>
        {/* ── Document header ── */}
        <motion.div variants={sectionVariants} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            {/* Archive label */}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.5rem" }}>
              Blueprint Archive — Document #{blueprint.projectId}
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--fg-primary)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.25rem" }}>
              {blueprint.title}
            </h3>
            {/* Subtitle annotation — marginalia style */}
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--fg-subtle)", letterSpacing: "0.12em", fontStyle: "italic" }}>
              Engineering plans recovered from Laboratory Archive
            </p>
          </div>

          {/* Stamp — rotated, top right */}
          <div style={{ flexShrink: 0, paddingTop: "0.5rem" }}>
            <BlueprintStamp status={blueprint.status} />
          </div>
        </motion.div>

        {/* Rule */}
        <motion.div variants={sectionVariants} style={{ height: 1, backgroundColor: "var(--border-subtle)", marginBottom: "2rem" }} aria-hidden="true" />

        {/* ── Grid layout: main content + sidebar ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr clamp(180px, 30%, 260px)", gap: "3rem", alignItems: "start" }}>
          {/* ── Left: main document ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
            {/* Objective */}
            <motion.div variants={sectionVariants}>
              <SectionLabel>Objective</SectionLabel>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.88rem, 1.5vw, 1rem)", color: "var(--fg-secondary)", lineHeight: 1.85, maxWidth: "60ch", borderLeft: "2px solid var(--accent-emerald)", paddingLeft: "1rem" }}>
                {blueprint.objective}
              </p>
            </motion.div>

            {/* Blueprint Map — expedition route */}
            <motion.div variants={sectionVariants}>
              <BlueprintMap stages={blueprint.stages} discoveries={blueprint.discoveries} />
            </motion.div>

            {/* Lessons Learned */}
            <motion.div variants={sectionVariants}>
              <SectionLabel>Lessons Learned</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {blueprint.lessons.map((lesson, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "var(--fg-subtle)", flexShrink: 0, marginTop: "0.15rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--fg-secondary)", lineHeight: 1.7 }}>
                      {lesson}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: sidebar / marginalia ── */}
          <motion.div variants={sectionVariants} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Technologies */}
            {blueprint.technologies.length > 0 && (
              <div>
                <SectionLabel>Technologies</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {blueprint.technologies.map((tech) => (
                    <div key={tech} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--fg-secondary)", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", padding: "0.3rem 0.6rem", borderRadius: "2px", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent-emerald)", display: "inline-block", opacity: 0.7, flexShrink: 0 }} aria-hidden="true" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All discoveries */}
            <div>
              <SectionLabel>All Discoveries</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {blueprint.discoveries.map((disc) => (
                  <div key={disc.id} style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderLeft: "2px solid var(--accent-copper)", borderRadius: "2px", padding: "0.6rem 0.75rem" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-copper)", marginBottom: "0.3rem", opacity: 0.85 }}>
                      #{disc.id}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--fg-secondary)", lineHeight: 1.55, fontStyle: "italic" }}>
                      {disc.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Archive metadata */}
            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", lineHeight: 2 }}>
                <div>Archive Ref: {blueprint.id.toUpperCase()}</div>
                <div>Document: Engineering Plan</div>
                <div>Classification: Open</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
