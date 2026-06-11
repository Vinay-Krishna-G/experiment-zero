"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RESEARCH_LOGS, getResearchLogById } from "@/data/researchLogs";
import ResearchEntry from "./ResearchEntry";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function URLSync({ onSync }: { onSync: (id: string) => void }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("rl");
  useEffect(() => {
    if (id) onSync(id);
  }, [id, onSync]);
  return null;
}

export default function ResearchLogArchive() {
  const [selectedId, setSelectedId] = useState<string>(RESEARCH_LOGS[0].id);

  const selectedLog = getResearchLogById(selectedId) || RESEARCH_LOGS[0];

  return (
    <section
      id="research-log"
      aria-label="Research Log Archive"
      style={{ paddingBlock: "clamp(2rem, 4vw, 4rem)", position: "relative" }}
    >
      <Suspense fallback={null}><URLSync onSync={setSelectedId} /></Suspense>
      <div className="container-lab">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "3rem", marginBottom: "4rem" }}
        >
          <SectionHeader
            number="03"
            title="Research Log"
            description="Field notes, system design thoughts, and lessons learned from the laboratory. A living document of the engineering and decision-making process."
          />
        </motion.div>

        {/* ── Split Pane Layout ── */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(2rem, 5vw, 4rem)",
          alignItems: "flex-start"
        }}>
          
          {/* Left Pane: Index */}
          <motion.nav
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            aria-label="Research Log Index"
            role="tablist"
            className="research-log-pane"
            style={{
              position: "sticky",
              top: "calc(var(--nav-height) + 2rem)",
              flex: "1 1 300px",
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              backgroundColor: "var(--border-subtle)", // Creates 1px borders between items
              border: "1px solid var(--border-subtle)",
              borderRadius: "3px",
              overflow: "hidden"
            }}
          >
            <div style={{
              backgroundColor: "var(--bg-secondary)", padding: "0.75rem 1rem",
              fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)",
              display: "flex", justifyContent: "space-between"
            }}>
              <span>Index Registry</span>
              <span>{RESEARCH_LOGS.length} ENTRIES</span>
            </div>
            
            {RESEARCH_LOGS.map((log) => {
              const isActive = log.id === selectedId;
              return (
                <button
                  key={log.id}
                  onClick={() => setSelectedId(log.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="research-log-viewer"
                  style={{
                    backgroundColor: isActive ? "var(--bg-card)" : "var(--bg-primary)",
                    border: "none",
                    padding: "1.25rem 1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    cursor: "pointer",
                    textAlign: "left",
                    position: "relative",
                    transition: "background-color 0.2s ease"
                  }}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-log-indicator"
                      style={{
                        position: "absolute",
                        left: 0, top: 0, bottom: 0, width: 3,
                        backgroundColor: "var(--accent-copper)"
                      }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}

                  {/* Top row: ID and Date */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    color: isActive ? "var(--accent-copper)" : "var(--fg-subtle)",
                    transition: "color 0.2s ease"
                  }}>
                    <span>{log.id.toUpperCase()}</span>
                    <span>{log.date}</span>
                  </div>

                  {/* Title */}
                  <div style={{
                    fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--fg-primary)" : "var(--fg-secondary)",
                    lineHeight: 1.4, transition: "color 0.2s ease",
                    paddingLeft: isActive ? "0.25rem" : "0",
                  }}>
                    {log.title}
                  </div>

                  {/* Category */}
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.45rem", letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "var(--fg-muted)", marginTop: "0.25rem",
                    paddingLeft: isActive ? "0.25rem" : "0",
                  }}>
                    {log.category}
                  </div>
                </button>
              );
            })}
          </motion.nav>

          {/* Right Pane: Entry Viewer */}
          <div 
            id="research-log-viewer" 
            aria-live="polite"
            style={{ flex: "2 1 500px", minWidth: 0 }}
          >
            <AnimatePresence mode="wait">
              <ResearchEntry key={selectedLog.id} log={selectedLog} />
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
