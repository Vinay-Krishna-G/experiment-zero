"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import LaboratoryShelf from "./LaboratoryShelf";
import SpecimenCard from "./SpecimenCard";
import ExperimentModal from "./ExperimentModal";
import {
  EXPERIMENTS,
  groupByRack,
  getInventoryCounts,
  type Experiment,
  type RackSlot,
} from "@/content";
import { LaboratoryThemeProvider } from "./renderers/theme/ThemeContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const RACK_CONFIG: Record<RackSlot, { label: string; caption: string; maxCapacity: number }> = {
  active: {
    label: "Rack A — Active Inventions",
    caption: "Currently in progress",
    maxCapacity: 12,
  },
  completed: {
    label: "Rack B — Completed Experiments",
    caption: "Preserved and archived",
    maxCapacity: 12,
  },
  future: {
    label: "Rack C — Future Concepts",
    caption: "Concepts being gathered",
    maxCapacity: 12,
  },
};

const RACK_ORDER: RackSlot[] = ["active", "completed", "future"];

const LEGACY_ID_MAP: Record<string, string> = {
  "001": "promptvault",
  "002": "codemelt",
  "003": "experiment-zero",
  "004": "studyspark",
};



function URLSync({ onSync }: { onSync: (id: string | null) => void }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("exp");
  useEffect(() => {
    if (id) {
      const rawId = id.startsWith("exp-") ? id.replace("exp-", "") : id;
      const canonicalId = LEGACY_ID_MAP[rawId] || rawId;
      const exists = EXPERIMENTS.some(e => e.id === canonicalId);
      if (exists) {
        onSync(canonicalId);
      } else {
        onSync(null);
      }
    } else {
      onSync(null);
    }
  }, [id, onSync]);
  return null;
}

export default function ExperimentRack() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedExperiment: Experiment | null =
    EXPERIMENTS.find((e) => e.id === selectedId) ?? null;

  const racks = groupByRack(EXPERIMENTS);
  const counts = getInventoryCounts(EXPERIMENTS);

  const router = useRouter();
  const pathname = usePathname();

  const handleBottleClick = (id: string) => {
    const newId = selectedId === id ? null : id;
    const params = new URLSearchParams(window.location.search);
    if (newId) {
      params.set("exp", `exp-${newId}`);
    } else {
      params.delete("exp");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <LaboratoryThemeProvider>
      <section
        id="experiments"
        aria-label="Experiments"
        style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)", position: "relative" }}
      >
      <Suspense fallback={null}><URLSync onSync={setSelectedId} /></Suspense>
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

        {/* ── Multi-Rack Cabinet (Full Width Vault) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            background: "linear-gradient(to bottom, var(--bg-primary) 0%, #1a1a1a 10%, #111111 100%)",
            padding: "8rem 0 4rem",
            marginTop: "2rem",
          }}
        >
          {/* Back panel grain - Darker for archive feel */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 18px, rgba(0,0,0,0.15) 18px, rgba(0,0,0,0.15) 19px)", pointerEvents: "none" }} />
          
          {/* Ambient dust particles */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")", mixBlendMode: "overlay", pointerEvents: "none" }} />

          <div className="container-lab" style={{ position: "relative", zIndex: 1 }}>
            


            {/* Render each rack only if it has experiments */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {RACK_ORDER.map((slot) => {
                const exps = racks[slot];
                if (exps.length === 0) return null;
                const cfg = RACK_CONFIG[slot];
                const capacity = cfg.maxCapacity;
                const rackLabel = `${cfg.label}  ·  ${exps.length} / ${capacity} specimens`;
                return (
                  <LaboratoryShelf key={slot} label={rackLabel}>
                    {exps.map((exp) => (
                      <SpecimenCard
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
          
          {/* Cabinet base with metadata stamp */}
          <div className="container-lab" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ background: "#060403", padding: "0.55rem 3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4rem" }}>
              <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: "0.42rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(184, 134, 11, 0.4)" }}>
                Lab Cabinet No. 1
              </span>
              <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: "0.42rem", letterSpacing: "0.18em", color: "rgba(184, 134, 11, 0.3)" }}>
                {EXPERIMENTS.length} specimens catalogued
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Preview modal ── */}
        <ExperimentModal
          experiment={selectedExperiment}
          onClose={() => handleBottleClick(selectedId!)}
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
    </LaboratoryThemeProvider>
  );
}
