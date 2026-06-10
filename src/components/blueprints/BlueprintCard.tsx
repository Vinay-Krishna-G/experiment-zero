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

      <div style={{ padding: "2.75rem 2.5rem 2.5rem 3rem" }}>
        {/* ── Document header ── */}
        <motion.div variants={sectionVariants} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            {/* Archive breadcrumb */}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.6rem", opacity: 0.75 }}>
              Laboratory Archive / Engineering Documents / {blueprint.id.toUpperCase()}
            </div>

            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--fg-primary)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              {blueprint.title}
            </h3>

            {/* Archive reference block — key improvement */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, max-content))", gap: "0.75rem 2rem" }}>
              <ArchiveRow label="Archive Ref" value={blueprint.id.toUpperCase()} />
              <ArchiveRow label="Recovered" value={recoveredYear} />
              <ArchiveRow label="Classification" value="Open Research" />
              <ArchiveRow label="Document" value="Engineering Plan" />
            </div>
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
          </div>

          {/* ── Right sidebar ── */}
          <motion.div variants={sectionVariants} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Technologies */}
            {blueprint.technologies.length > 0 && (
              <div>
                <SectionLabel>Technologies</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {blueprint.technologies.map((tech) => (
                    <div key={tech} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.06em",
                      color: "var(--fg-secondary)",
                      backgroundColor: "var(--bg-secondary)",
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
              </div>
            )}

            {/* All discoveries — pinned slip style in sidebar */}
            <div>
              <SectionLabel>Field Discoveries</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {blueprint.discoveries.map((disc, i) => (
                  <div
                    key={disc.id}
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--bg-secondary) 93%, #A07820 7%)",
                      border: "1px solid rgba(160, 120, 32, 0.2)",
                      borderTop: "2px solid rgba(160, 120, 32, 0.4)",
                      borderRadius: "1px",
                      padding: "0.65rem 0.75rem",
                      // Alternating slight rotations for paper-layering feel
                      transform: `rotate(${i % 2 === 0 ? "0.5deg" : "-0.4deg"})`,
                      transformOrigin: "center",
                      position: "relative",
                      boxShadow: "1px 2px 6px rgba(28,20,8,0.08)",
                    }}
                  >
                    {/* Pin */}
                    <div aria-hidden="true" style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(146, 100, 14, 0.5)", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.44rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(146, 100, 14, 0.75)", marginBottom: "0.3rem" }}>
                      #{disc.id}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "var(--fg-secondary)", lineHeight: 1.55, fontStyle: "italic", margin: 0 }}>
                      {disc.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Archive metadata block */}
            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-subtle)", lineHeight: 2.1 }}>
                <div>Archive Ref: {blueprint.id.toUpperCase()}</div>
                <div>Document: Engineering Plan</div>
                <div>Classification: Open</div>
                <div>Status: {blueprint.status}</div>
              </div>
              {/* Annotation arrows — decorative sketch marks */}
              <div aria-hidden="true" style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center", opacity: 0.3 }}>
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
