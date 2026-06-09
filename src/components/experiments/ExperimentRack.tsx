"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import LaboratoryShelf from "./LaboratoryShelf";
import ExperimentBottle from "./ExperimentBottle";
import ExperimentPreview from "./ExperimentPreview";
import { EXPERIMENTS, type Experiment } from "@/data/experiments";

export default function ExperimentRack() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedExperiment: Experiment | null =
    EXPERIMENTS.find((e) => e.id === selectedId) ?? null;

  const handleBottleClick = (id: string) => {
    // Toggle — click same bottle to close
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleClose = () => setSelectedId(null);

  return (
    <section
      id="experiments"
      aria-label="Experiments"
      style={{
        paddingBlock: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
      }}
    >
      <div className="container-lab">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "3rem" }}
        >
          <SectionHeader
            number="01"
            title="Experiments"
            description="Artifacts recovered from the laboratory. Each experiment represents a completed or ongoing invention."
          />
        </motion.div>

        {/* ── Shelf instruction hint ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--fg-subtle)",
            marginBottom: "3rem",
          }}
          aria-label="Interaction hint"
        >
          ↑ Select a bottle to open its journal
        </motion.p>

        {/* ── Laboratory shelf with bottles ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          {/* Background surface — recessed cabinet feel */}
          <div
            aria-hidden="true"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "4px 4px 0 0",
              padding: "2.5rem 2rem 0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Cabinet back panel — subtle wood texture */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 18px,
                    rgba(28,20,8,0.025) 18px,
                    rgba(28,20,8,0.025) 19px
                  )
                `,
                pointerEvents: "none",
              }}
            />

            {/* Cabinet border top highlight */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(to right, #B8860B44, #8B691422, #B8860B44)",
              }}
            />

            <LaboratoryShelf label="Rack A — Active Experiments">
              {EXPERIMENTS.map((exp) => (
                <ExperimentBottle
                  key={exp.id}
                  experiment={exp}
                  isSelected={selectedId === exp.id}
                  onClick={() => handleBottleClick(exp.id)}
                />
              ))}
            </LaboratoryShelf>
          </div>

          {/* Cabinet base */}
          <div
            aria-hidden="true"
            style={{
              height: 12,
              backgroundColor: "#3D2710",
              borderRadius: "0 0 4px 4px",
              background: "linear-gradient(to bottom, #3D2710, #2D1C08)",
              boxShadow: "0 6px 20px rgba(28,20,8,0.3)",
            }}
          />
        </motion.div>

        {/* ── Experiment preview panel ── */}
        <ExperimentPreview
          experiment={selectedExperiment}
          onClose={handleClose}
        />

        {/* ── Placeholder note when nothing selected ── */}
        {!selectedExperiment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              border: "1px dashed var(--border-subtle)",
              borderRadius: "3px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                color: "var(--fg-subtle)",
                fontStyle: "italic",
                lineHeight: 1.7,
              }}
            >
              Each bottle holds a preserved experiment.
              <br />
              Select one to open its laboratory journal.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
