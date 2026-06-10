"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import LaboratoryShelf from "./LaboratoryShelf";
import BottleRenderer from "./BottleRenderer";
import ExperimentPreview from "./ExperimentPreview";
import {
  EXPERIMENTS,
  groupByRack,
  getInventoryCounts,
  type Experiment,
  type RackSlot,
} from "@/data/experiments";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const RACK_CONFIG: Record<RackSlot, { label: string; emptyNote: string }> = {
  active: {
    label: "Rack A — Active Experiments",
    emptyNote: "No active experiments",
  },
  completed: {
    label: "Rack B — Completed Experiments",
    emptyNote: "No completed experiments yet",
  },
  future: {
    label: "Rack C — Future Concepts",
    emptyNote: "Concepts being gathered",
  },
};

const RACK_ORDER: RackSlot[] = ["active", "completed", "future"];

export default function ExperimentRack() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedExperiment: Experiment | null =
    EXPERIMENTS.find((e) => e.id === selectedId) ?? null;

  const racks = groupByRack(EXPERIMENTS);
  const counts = getInventoryCounts(EXPERIMENTS);

  const handleBottleClick = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

  return (
    <section
      id="experiments"
      aria-label="Experiments"
      style={{ paddingBlock: "clamp(4rem, 8vw, 8rem)", position: "relative" }}
    >
      <div className="container-lab">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "3rem" }}
        >
          {/* Header + Inventory side-by-side */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <SectionHeader
                number="01"
                title="Experiments"
                description="Artifacts recovered from the laboratory."
              />
            </div>

            {/* ── Lab Inventory Panel ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                border: "1px solid var(--border-subtle)",
                borderRadius: "3px",
                padding: "1rem 1.25rem",
                backgroundColor: "var(--bg-card)",
                minWidth: 160,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Spine */}
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, backgroundColor: "var(--accent-copper)", opacity: 0.5 }} />

              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.75rem", paddingLeft: "0.5rem" }}>
                Lab Inventory
              </div>
              <div style={{ paddingLeft: "0.5rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {[
                  { label: "Completed", value: counts.completed },
                  { label: "Active", value: counts.active },
                  { label: "Planned", value: counts.planned },
                  { label: "On Hold", value: counts.onHold },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: "1.5rem", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-muted)" }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-primary)", letterSpacing: "0.05em" }}>
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Hint ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "2.5rem" }}
        >
          ↑ Select a bottle to open its journal
        </motion.p>

        {/* ── Multi-Rack Cabinet ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "4px 4px 0 0",
              padding: "2rem 2rem 0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Back panel grain */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 18px, rgba(28,20,8,0.025) 18px, rgba(28,20,8,0.025) 19px)", pointerEvents: "none" }} />
            {/* Brass top edge */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #B8860B44, #8B691422, #B8860B44)" }} />

            {/* Render each rack only if it has experiments */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {RACK_ORDER.map((slot) => {
                const exps = racks[slot];
                if (exps.length === 0) return null;
                return (
                  <LaboratoryShelf key={slot} label={RACK_CONFIG[slot].label}>
                    {exps.map((exp) => (
                      <BottleRenderer
                        key={exp.id}
                        experiment={exp}
                        isSelected={selectedId === exp.id}
                        onClick={() => handleBottleClick(exp.id)}
                      />
                    ))}
                  </LaboratoryShelf>
                );
              })}
            </div>
          </div>

          {/* Cabinet base */}
          <div aria-hidden="true" style={{ height: 12, borderRadius: "0 0 4px 4px", background: "linear-gradient(to bottom, #3D2710, #2D1C08)", boxShadow: "0 6px 20px rgba(28,20,8,0.3)" }} />
        </motion.div>

        {/* ── Preview panel ── */}
        <ExperimentPreview
          experiment={selectedExperiment}
          onClose={() => setSelectedId(null)}
        />

        {/* ── Empty state ── */}
        <AnimatePresence>
          {!selectedExperiment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              style={{ marginTop: "2rem", padding: "1.5rem", border: "1px dashed var(--border-subtle)", borderRadius: "3px", textAlign: "center" }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "var(--fg-subtle)", fontStyle: "italic", lineHeight: 1.7 }}>
                Each bottle holds a preserved experiment.
                <br />
                Select one to open its laboratory journal.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
