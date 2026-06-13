"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { LAB_STATUS } from "@/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Build display sections from data
function buildSections(data: typeof LAB_STATUS) {
  return [
    {
      id: "invention",
      label: "Current Invention",
      icon: "⚗",
      entries: [data.invention],
      accent: "var(--accent-emerald)",
      note: data.inventionNote,
    },
    {
      id: "destination",
      label: "Current Destination",
      icon: "◉",
      entries: [data.destination],
      accent: "var(--accent-copper)",
      note: data.destinationNote,
    },
    {
      id: "study",
      label: "Current Study",
      icon: "◈",
      entries: data.studies,
      accent: "var(--accent-emerald)",
      note: "Ongoing",
    },
    {
      id: "status",
      label: "Current Status",
      icon: "▸",
      entries: data.currentStatus,
      accent: "var(--accent-emerald)",
      note: "Daily",
    },
  ];
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function LabStatusPanel() {
  const sections = buildSections(LAB_STATUS);

  return (
    <section
      id="laboratory-status"
      aria-label="Laboratory Status"
      style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)", position: "relative" }}
    >
      <div className="container-lab">
        <SectionHeader
          number="00"
          title="Laboratory Status"
          description="Field notes updated in real time."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          whileHover={{
            y: -3,
            boxShadow: "0 24px 64px rgba(28,25,23,0.1), 0 4px 16px rgba(28,25,23,0.07)",
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "3px",
            padding: "clamp(1.5rem, 4vw, 3rem)",
            boxShadow: "0 8px 32px rgba(28,25,23,0.06), 0 2px 8px rgba(28,25,23,0.04)",
            position: "relative",
            overflow: "hidden",
          }}
          className="ruled-card"
        >
          {/* Spine */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: 0, left: 0, bottom: 0,
              width: 4, backgroundColor: "var(--accent-emerald)", opacity: 0.65,
            }}
          />
          {/* Corner fold */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: 0, right: 0, width: 0, height: 0,
              borderStyle: "solid", borderWidth: "0 28px 28px 0",
              borderColor: "transparent var(--bg-secondary) transparent transparent",
              filter: "drop-shadow(-2px 2px 3px rgba(28,25,23,0.07))",
            }}
          />

          {/* Header row */}
          <div
            style={{
              marginLeft: "1rem", marginBottom: "2.25rem",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
              Field Notes — Ongoing
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--border-subtle)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--fg-subtle)" }}>
              {LAB_STATUS.updatedAt}
            </span>
          </div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "2rem 3rem",
              marginLeft: "1rem",
            }}
          >
            {sections.map((section) => (
              <motion.div key={section.id} variants={itemVariants}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.65rem" }}>
                  <span style={{ color: section.accent, fontSize: "0.8rem", lineHeight: 1 }} aria-hidden="true">{section.icon}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
                    {section.label}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "0.6rem" }}>
                  {section.entries.map((entry) => (
                    <div key={entry} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.05rem, 2vw, 1.4rem)", fontWeight: 700, color: "var(--fg-primary)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                      {entry}
                    </div>
                  ))}
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", letterSpacing: "0", color: section.accent, opacity: 0.85, fontStyle: "italic" }}>
                  {section.note}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <div style={{ marginTop: "2.5rem", marginLeft: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--fg-subtle)", textTransform: "uppercase" }}>
              Last updated: {LAB_STATUS.updatedAt}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent-emerald)", textTransform: "uppercase" }}>
              ● Active
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
