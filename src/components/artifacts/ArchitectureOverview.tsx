"use client";

import { motion } from "framer-motion";

export default function ArchitectureOverview() {
  const nodes = [
    { id: "content", label: "Content Registry" },
    { id: "validation", label: "Validation Pipeline" },
    { id: "graph", label: "Narrative Graph" },
    { id: "evidence", label: "Evidence Platform" },
    { id: "blueprint", label: "Blueprint System" },
    { id: "rendering", label: "Rendering Layer" },
    { id: "ssg", label: "Static Site Generation" }
  ];

  return (
    <div
      style={{
        margin: "3rem 0",
        padding: "2rem",
        backgroundColor: "rgba(28,25,23,0.02)",
        border: "1px solid var(--border-medium)",
        borderRadius: "2px",
        position: "relative",
        overflow: "hidden"
      }}
      aria-label="Experiment Zero Architecture Overview"
    >
      {/* Drafting lines background */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "linear-gradient(to right, #1e3a8a 1px, transparent 1px), linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      
      {/* Archive Stamp */}
      <div aria-hidden="true" style={{ position: "absolute", top: "1rem", right: "1rem", opacity: 0.4 }}>
        <div style={{ border: "2px solid #1e3a8a", padding: "0.25rem 0.5rem", transform: "rotate(12deg)", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#1e3a8a", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
          Arch. Spec 01
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#1e3a8a", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "#1e3a8a" }} />
          System Architecture Sequence
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "600px", margin: "0 auto" }}>
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  border: "1px solid #1e3a8a",
                  backgroundColor: "var(--bg-card)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "4px 4px 0 rgba(30,58,138,0.1)"
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#1e3a8a", opacity: 0.6 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, color: "#1e3a8a", letterSpacing: "0.05em", textTransform: "uppercase" }}>{node.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#1e3a8a", opacity: 0.6 }}>SYS</span>
              </div>
              
              {/* Connector */}
              {i < nodes.length - 1 && (
                <div style={{ height: "1.5rem", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg width="2" height="100%" preserveAspectRatio="none">
                    <line x1="1" y1="0" x2="1" y2="100%" stroke="#1e3a8a" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
