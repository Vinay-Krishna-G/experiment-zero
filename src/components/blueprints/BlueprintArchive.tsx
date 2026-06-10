"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import BlueprintCard from "./BlueprintCard";
import { BLUEPRINTS, type Blueprint } from "@/data/blueprints";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function URLSync({ onSync }: { onSync: (id: string) => void }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("bp");
  useEffect(() => {
    if (id) onSync(id);
  }, [id, onSync]);
  return null;
}

export default function BlueprintArchive() {
  const [selectedId, setSelectedId] = useState<string>(BLUEPRINTS[0].id);

  const selected: Blueprint =
    BLUEPRINTS.find((b) => b.id === selectedId) ?? BLUEPRINTS[0];

  return (
    <section
      id="blueprints"
      aria-label="Blueprint Archive"
      style={{ paddingBlock: "clamp(2rem, 4vw, 4rem)", position: "relative" }}
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
          <SectionHeader
            number="02"
            title="Blueprint Archive"
            description="Recovered engineering plans documenting the design of laboratory experiments."
          />
        </motion.div>

        {/* ── Blueprint selector ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          role="tablist"
          aria-label="Select blueprint"
          style={{
            display: "flex",
            gap: "0",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
            border: "1px solid var(--border-subtle)",
            borderRadius: "3px",
            overflow: "hidden",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          {BLUEPRINTS.map((bp, i) => {
            const isActive = bp.id === selectedId;
            return (
              <button
                key={bp.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`blueprint-panel-${bp.id}`}
                id={`blueprint-tab-${bp.id}`}
                onClick={() => setSelectedId(bp.id)}
                style={{
                  background: isActive ? "var(--bg-card)" : "transparent",
                  border: "none",
                  borderRight: i < BLUEPRINTS.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  cursor: "pointer",
                  padding: "0.75rem 1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  position: "relative",
                  flex: "1 1 auto",
                  textAlign: "left",
                  transition: "background-color 0.2s ease",
                  borderBottom: isActive ? "2px solid var(--accent-emerald)" : "2px solid transparent",
                }}
              >
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="blueprint-tab-indicator"
                    style={{
                      position: "absolute",
                      bottom: -1,
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: "var(--accent-emerald)",
                    }}
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
                  {String(bp.projectId).padStart(3, "0")}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: isActive ? 600 : 400, color: isActive ? "var(--fg-primary)" : "var(--fg-muted)", transition: "color 0.2s ease, font-weight 0.2s ease", letterSpacing: "-0.01em" }}>
                  {bp.title}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Blueprint document ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            id={`blueprint-panel-${selected.id}`}
            role="tabpanel"
            aria-labelledby={`blueprint-tab-${selected.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <BlueprintCard blueprint={selected} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
