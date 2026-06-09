"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

interface SectionPlaceholderProps {
  id: string;
  sectionNumber: string; // "01"
  title: string;         // "EXPERIMENTS"
  description: string;
  phase: string;
}

export default function SectionPlaceholder({
  id,
  sectionNumber,
  title,
  description,
  phase,
}: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      aria-label={title}
      style={{
        paddingBlock: "clamp(4rem, 7vw, 7rem)",
        position: "relative",
      }}
    >
      <div className="container-lab">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "3rem",
          }}
        >
          {/* Phase badge — top right */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "0.5rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <SectionHeader number={sectionNumber} title={title} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
                border: "1px solid var(--border-subtle)",
                padding: "0.3rem 0.7rem",
                borderRadius: "2px",
                flexShrink: 0,
                marginTop: "0.1rem",
              }}
            >
              {phase}
            </span>
          </div>

          {/* Placeholder area */}
          <div
            style={{
              border: "1px dashed var(--border-medium)",
              borderRadius: "3px",
              padding: "4rem 2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.2rem",
              backgroundColor: "rgba(247, 244, 239, 0.4)",
              textAlign: "center",
            }}
          >
            {/* Pencil sketch indicator */}
            <div
              aria-hidden="true"
              style={{
                display: "flex",
                gap: "0.3rem",
                alignItems: "center",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 24,
                    height: 1,
                    backgroundColor: "var(--border-medium)",
                    opacity: 1 - i * 0.15,
                  }}
                />
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "var(--fg-muted)",
                maxWidth: "38ch",
                lineHeight: 1.75,
              }}
            >
              {description}
            </p>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
              }}
            >
              Blueprints being drafted
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
