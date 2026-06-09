"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import FieldNoteCard, { type FieldNote } from "./FieldNoteCard";

// Initial field notes — future: load from JSON/CMS
const FIELD_NOTES: FieldNote[] = [
  {
    id: "08",
    date: "June 2026",
    tag: "AI Tooling",
    note: "Exploring ways to help developers understand large codebases without manually reading every file. The index should do the reading; the developer should do the thinking.",
  },
  {
    id: "07",
    date: "May 2026",
    tag: "Product",
    note: "Every good product is just a solved frustration. The best inventions come from spending enough time with a problem that you stop tolerating it.",
  },
];

export default function FieldNotesSection() {
  return (
    <section
      id="field-notes"
      aria-label="Field Notes"
      style={{
        paddingBlock: "clamp(3rem, 6vw, 6rem)",
        position: "relative",
      }}
    >
      <div className="container-lab">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <SectionHeader
            number="—"
            title="Field Notes"
            description="Thoughts recorded between experiments."
          />
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {FIELD_NOTES.map((note, i) => (
            <FieldNoteCard key={note.id} note={note} index={i} />
          ))}
        </div>

        {/* "More notes coming" indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{ height: 1, width: "2rem", backgroundColor: "var(--border-subtle)" }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
            }}
          >
            More notes accumulating...
          </span>
        </motion.div>
      </div>
    </section>
  );
}
