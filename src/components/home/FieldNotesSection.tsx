"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import FieldNoteCard from "./FieldNoteCard";
import { FIELD_NOTES } from "@/content";

export default function FieldNotesSection() {
  return (
    <section
      id="field-notes"
      aria-label="Field Notes"
      style={{ paddingBlock: "clamp(2rem, 4vw, 4rem)", position: "relative" }}
    >
      <div className="container-lab">
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

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {FIELD_NOTES.map((note, i) => (
            <FieldNoteCard key={note.id} note={note} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <div style={{ height: 1, width: "2rem", backgroundColor: "var(--border-subtle)" }} aria-hidden="true" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
            More notes accumulating...
          </span>
        </motion.div>
      </div>
    </section>
  );
}
