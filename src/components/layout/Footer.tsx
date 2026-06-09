"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        paddingBlock: "2.5rem",
        marginTop: "auto",
      }}
    >
      <div className="container-lab">
        {/* Explorer counter — placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
            }}
          >
            Explorer Count
          </span>
          <div
            style={{
              height: 1,
              width: "3rem",
              backgroundColor: "var(--border-subtle)",
            }}
            aria-hidden="true"
          />
          <span
            id="explorer-counter"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent-emerald)",
              opacity: 0.7,
            }}
            aria-label="Explorer counter — initializing"
          >
            Initializing...
          </span>
        </motion.div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
            }}
          >
            © 2026 Vinay Krishna — Experiment Zero
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
              }}
            >
              Phase 1.5 of ∞
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
              }}
            >
              Built in the Lab ◆
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
