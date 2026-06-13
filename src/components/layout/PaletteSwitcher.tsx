"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PALETTES = [
  { id: "palette-archive-paper", name: "1. Archive Paper" },
  { id: "palette-midnight-laboratory", name: "2. Midnight Lab" },
  { id: "palette-emerald-vault", name: "3. Emerald Vault" },
  { id: "palette-navy-blueprint", name: "4. Navy Blueprint" },
  { id: "palette-obsidian-gold", name: "5. Obsidian Gold" },
  { id: "palette-industrial-slate", name: "6. Industrial Slate" },
  { id: "palette-arctic-research", name: "7. Arctic Research" },
  { id: "palette-forest-expedition", name: "8. Forest Expedition" },
  { id: "palette-copper-journal", name: "9. Copper Journal" },
  { id: "palette-museum-noir", name: "10. Museum Noir" },
];

export default function PaletteSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePalette, setActivePalette] = useState("palette-archive-paper");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("antigravity-palette");
    if (saved && PALETTES.some((p) => p.id === saved)) {
      setActivePalette(saved);
      document.documentElement.className = saved;
    } else {
      document.documentElement.className = "palette-archive-paper";
    }
  }, []);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  if (!mounted) return null;

  const handleSelect = (id: string) => {
    setActivePalette(id);
    document.documentElement.className = id;
    localStorage.setItem("antigravity-palette", id);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 0.75rem)",
              right: 0,
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "6px",
              padding: "0.5rem",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              minWidth: "220px",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-muted)", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "0.25rem" }}>
              Palette Laboratory
            </div>
            {PALETTES.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                style={{
                  textAlign: "left",
                  padding: "0.5rem 0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: activePalette === p.id ? "var(--bg-primary)" : "var(--fg-secondary)",
                  backgroundColor: activePalette === p.id ? "var(--fg-primary)" : "transparent",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (activePalette !== p.id) e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                }}
                onMouseLeave={(e) => {
                  if (activePalette !== p.id) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {p.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "var(--fg-primary)",
          color: "var(--bg-primary)",
          border: "none",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          fontFamily: "var(--font-mono)",
          fontSize: "1.2rem",
          transition: "transform 0.2s",
          transform: isOpen ? "scale(0.9)" : "scale(1)",
        }}
        aria-label="Toggle Palette Switcher"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      </button>
    </div>
  );
}
