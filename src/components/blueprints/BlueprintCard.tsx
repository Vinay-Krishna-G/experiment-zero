"use client";

import { motion, type Variants } from "framer-motion";
import type { Blueprint } from "@/data/blueprints";
import BlueprintMap from "./BlueprintMap";
import BlueprintStamp from "./BlueprintStamp";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.5rem",
      letterSpacing: "0.26em",
      textTransform: "uppercase",
      color: "var(--fg-subtle)",
      marginBottom: "0.8rem",
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
    }}>
      <span aria-hidden="true" style={{ opacity: 0.6 }}>◈</span>
      <span>{children}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: "var(--border-subtle)", opacity: 0.5, maxWidth: 40 }} />
    </div>
  );
}

// Archive metadata row
function ArchiveRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "0.5rem", marginBottom: "0.4rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", letterSpacing: "0.08em", color: "var(--fg-secondary)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

interface BlueprintCardProps {
  blueprint: Blueprint;
}

export default function BlueprintCard({ blueprint }: BlueprintCardProps) {
  const recoveredYear = "2026";

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
        boxShadow: "0 8px 40px rgba(28,25,23,0.09), 0 2px 10px rgba(28,25,23,0.05)",
      }}
    >
      {/* ── Paper aging — corner vignettes ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 0% 0%, rgba(28,20,8,0.055) 0%, transparent 45%)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 100% 100%, rgba(28,20,8,0.05) 0%, transparent 40%)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 100% 0%, rgba(28,20,8,0.03) 0%, transparent 35%)", pointerEvents: "none" }} />

      {/* ── Paper aging — edge darkening ── */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(to bottom, rgba(28,20,8,0.06), transparent)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "linear-gradient(to top, rgba(28,20,8,0.05), transparent)", pointerEvents: "none" }} />

      {/* ── Document imperfections — top measurement ticks ── */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "3rem", right: "3rem", height: 8, display: "flex", alignItems: "flex-end", gap: 0, overflow: "hidden", opacity: 0.3, pointerEvents: "none" }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} style={{ flexShrink: 0, width: "calc(100% / 60)", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 1, height: i % 5 === 0 ? 7 : 3, backgroundColor: "rgba(28,20,8,0.5)" }} />
          </div>
        ))}
      </div>

      {/* ── Document imperfections — right edge marks ── */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 12, display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "2rem 0", opacity: 0.2, pointerEvents: "none" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ width: i % 3 === 0 ? 8 : 5, height: 1, backgroundColor: "rgba(28,20,8,0.7)", alignSelf: "flex-end" }} />
        ))}
      </div>

      {/* ── Left spine ── */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: "linear-gradient(to right, rgba(45,106,79,0.45), rgba(45,106,79,0.2))" }} />

      {/* ── Sketch marks — corner annotation lines ── */}
      <div aria-hidden="true" style={{ position: "absolute", top: 28, right: 48, width: 16, height: 1, backgroundColor: "rgba(28,20,8,0.12)", transform: "rotate(-15deg)" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: 32, right: 50, width: 10, height: 1, backgroundColor: "rgba(28,20,8,0.08)", transform: "rotate(-18deg)" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 32, left: 20, width: 12, height: 1, backgroundColor: "rgba(28,20,8,0.08)", transform: "rotate(8deg)" }} />

      {/* ── Dedicated Archive Metadata Strip ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 1.25rem",
        backgroundColor: "var(--fg-primary)", color: "var(--bg-primary)",
        fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.2em", textTransform: "uppercase",
        borderBottom: "1px solid var(--border-medium)"
      }}>
        <div style={{ display: "flex", gap: "2.5rem" }}>
           <span>ENGINEERING RECORD :: RECOVERED</span>
           <span style={{ opacity: 0.7 }}>{"// DO NOT DESTROY"}</span>
        </div>
        <div style={{ display: "flex", gap: "2.5rem" }}>
           <span>AUTHORIZATION: LEVEL 4</span>
           <span>ARCHIVE REF: {blueprint.id.toUpperCase()}</span>
        </div>
      </div>

      <div style={{ padding: "2rem 2.5rem 2.5rem 3rem" }}>
        {/* ── Document header ── */}
        <motion.div variants={sectionVariants} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            {/* Archive breadcrumb */}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.6rem", opacity: 0.75 }}>
              Laboratory Archive / Engineering Documents / {blueprint.id.toUpperCase()}
            </div>

            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--fg-primary)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {blueprint.title}
            </h3>
          </div>

          {/* Stamp */}
          <div style={{ flexShrink: 0, paddingTop: "0.25rem" }}>
            <BlueprintStamp status={blueprint.status} />
          </div>
        </motion.div>

        {/* Rule — double line for document authenticity */}
        <motion.div variants={sectionVariants} aria-hidden="true">
          <div style={{ height: 1, backgroundColor: "var(--border-subtle)", marginBottom: "2px" }} />
          <div style={{ height: 1, backgroundColor: "var(--border-subtle)", opacity: 0.3, marginBottom: "2rem" }} />
        </motion.div>

        {/* ── Main grid: content + sidebar ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr clamp(180px, 28%, 250px)", gap: "3.5rem", alignItems: "start" }}>
          {/* ── Left: main document body ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Objective */}
            <motion.div variants={sectionVariants}>
              <SectionLabel>Objective</SectionLabel>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.88rem, 1.4vw, 0.98rem)",
                color: "var(--fg-secondary)",
                lineHeight: 1.9,
                maxWidth: "58ch",
                borderLeft: "2px solid rgba(45,106,79,0.4)",
                paddingLeft: "1rem",
                paddingBlock: "0.25rem",
                // Slight background tint on the objective block — paper feel
                background: "linear-gradient(to right, rgba(45,106,79,0.03), transparent 60%)",
              }}>
                {blueprint.objective}
              </p>
            </motion.div>

            {/* Expedition route map */}
            <motion.div variants={sectionVariants}>
              <BlueprintMap stages={blueprint.stages} discoveries={blueprint.discoveries} />
            </motion.div>

            {/* Lessons Learned */}
            <motion.div variants={sectionVariants}>
              <SectionLabel>Lessons Learned</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {blueprint.lessons.map((lesson, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--fg-subtle)", flexShrink: 0, marginTop: "0.22rem", letterSpacing: "0.08em" }}>
                      {String(i + 1).padStart(2, "0")} /
                    </span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--fg-secondary)", lineHeight: 1.75, margin: 0 }}>
                      {lesson}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            {blueprint.technologies.length > 0 && (
              <motion.div variants={sectionVariants}>
                <SectionLabel>Technologies Utilized</SectionLabel>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {blueprint.technologies.map((tech) => (
                    <div key={tech} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.06em",
                      color: "var(--fg-secondary)",
                      backgroundColor: "rgba(28,20,8,0.03)",
                      border: "1px solid var(--border-subtle)",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.45rem",
                    }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent-emerald)", display: "inline-block", opacity: 0.65, flexShrink: 0 }} aria-hidden="true" />
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <motion.div variants={sectionVariants} style={{ display: "flex", flexDirection: "column", gap: "1.75rem", position: "sticky", top: "2rem" }}>

            {/* Archive Registry Panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <SectionLabel>Document Registry</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <ArchiveRow label="Archive Ref" value={blueprint.id.toUpperCase()} />
                  <ArchiveRow label="Recovered" value={recoveredYear} />
                  <ArchiveRow label="Classification" value="Open Research" />
                  <ArchiveRow label="Status" value={blueprint.status} />
                  <ArchiveRow label="Revision" value="03" />
                  <ArchiveRow label="Indexed By" value="VK-07" />
                  <ArchiveRow label="Document Integrity" value="Verified" />
                </div>
              </div>

              {/* Annotation arrows — decorative sketch marks */}
              <div aria-hidden="true" style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", alignItems: "center", opacity: 0.3 }}>
                <div style={{ width: 20, height: 1, backgroundColor: "var(--fg-subtle)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", color: "var(--fg-subtle)" }}>verified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
