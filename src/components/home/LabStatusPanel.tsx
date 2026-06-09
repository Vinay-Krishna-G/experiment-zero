"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATUS_SECTIONS = [
  {
    id: "invention",
    label: "Current Invention",
    icon: "⚗",
    entries: ["AI Codebase Analyzer"],
    accent: "var(--accent-emerald)",
    note: "In progress",
  },
  {
    id: "destination",
    label: "Current Destination",
    icon: "◉",
    entries: ["Launch First SaaS"],
    accent: "var(--accent-copper)",
    note: "Active quest",
  },
  {
    id: "study",
    label: "Current Study",
    icon: "◈",
    entries: ["System Design", "Three.js", "AI Retrieval Systems"],
    accent: "var(--accent-emerald)",
    note: "Ongoing",
  },
  {
    id: "status",
    label: "Current Status",
    icon: "▸",
    entries: ["Building", "Learning", "Experimenting"],
    accent: "var(--accent-emerald)",
    note: "Daily",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export default function LabStatusPanel() {
  return (
    <section
      id="laboratory-status"
      aria-label="Laboratory Status"
      style={{
        paddingBlock: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
      }}
    >
      <div className="container-lab">
        <SectionHeader
          number="00"
          title="Laboratory Status"
          description="Field notes updated in real time."
        />

        {/* Notebook card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          whileHover={{
            y: -3,
            boxShadow:
              "0 24px 64px rgba(28, 25, 23, 0.1), 0 4px 16px rgba(28, 25, 23, 0.07)",
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "3px",
            padding: "clamp(1.5rem, 4vw, 3rem)",
            boxShadow:
              "0 8px 32px rgba(28, 25, 23, 0.06), 0 2px 8px rgba(28, 25, 23, 0.04)",
            position: "relative",
            overflow: "hidden",
          }}
          className="ruled-card"
        >
          {/* Notebook spine */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 4,
              backgroundColor: "var(--accent-emerald)",
              opacity: 0.65,
            }}
          />

          {/* Corner fold */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 28px 28px 0",
              borderColor: `transparent var(--bg-secondary) transparent transparent`,
              filter: "drop-shadow(-2px 2px 3px rgba(28,25,23,0.07))",
            }}
          />

          {/* Card header row */}
          <div
            style={{
              marginLeft: "1rem",
              marginBottom: "2.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
              }}
            >
              Field Notes — Ongoing
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "var(--border-subtle)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                color: "var(--fg-subtle)",
              }}
            >
              June 2026
            </span>
          </div>

          {/* Status grid */}
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
            {STATUS_SECTIONS.map((section) => (
              <motion.div key={section.id} variants={itemVariants}>
                {/* Label row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    marginBottom: "0.7rem",
                  }}
                >
                  <span
                    style={{
                      color: section.accent,
                      fontSize: "0.65rem",
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {section.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      fontWeight: 500,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--fg-muted)",
                    }}
                  >
                    {section.label}
                  </span>
                </div>

                {/* Values */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  {section.entries.map((entry) => (
                    <div
                      key={entry}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
                        fontWeight: 700,
                        color: "var(--fg-primary)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {entry}
                    </div>
                  ))}
                </div>

                {/* Note tag */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: section.accent,
                    opacity: 0.7,
                  }}
                >
                  {section.note}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Card footer */}
          <div
            style={{
              marginTop: "2.5rem",
              marginLeft: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "var(--fg-subtle)",
                textTransform: "uppercase",
              }}
            >
              Last updated: June 2026
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "var(--accent-emerald)",
                textTransform: "uppercase",
              }}
            >
              ● Active
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
