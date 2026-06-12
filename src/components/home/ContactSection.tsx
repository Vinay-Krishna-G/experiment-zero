"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const CONTACT_RECORDS = [
  { label: "EMAIL", value: "vinay@example.com", href: "mailto:vinay@example.com" },
  { label: "GITHUB", value: "github.com/username", href: "https://github.com/username" },
  { label: "LINKEDIN", value: "linkedin.com/in/username", href: "https://linkedin.com/in/username" },
  { label: "LOCATION", value: "Vijayawada, India" },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Laboratory Correspondence"
      style={{
        paddingBlock: "clamp(2rem, 4vw, 4rem)",
        position: "relative",
      }}
    >
      <div className="container-lab">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "3rem",
          }}
        >
          <SectionHeader number="05" title="Laboratory Correspondence" description="The lab door is always open." />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
            }}
          >
            {/* Left Column */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.92rem",
                  color: "var(--fg-muted)",
                  lineHeight: 1.85,
                  marginBottom: "2rem",
                  maxWidth: "40ch",
                }}
              >
                If an experiment resonates with you, feel free to reach out. I enjoy discussing software architecture, AI systems, product design, and ambitious engineering projects.
              </p>
            </div>

            {/* Right Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {CONTACT_RECORDS.map((record) => (
                <div
                  key={record.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: "1rem",
                    padding: "0.85rem 1rem",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "2px",
                    backgroundColor: "var(--bg-card)",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      color: "var(--fg-subtle)",
                      textTransform: "uppercase",
                    }}
                  >
                    {record.label}
                  </div>
                  {record.href ? (
                    <a
                      href={record.href}
                      target={record.href.startsWith("http") ? "_blank" : undefined}
                      rel={record.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        color: "var(--fg-primary)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--accent-emerald)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--fg-primary)";
                      }}
                    >
                      {record.value}
                    </a>
                  ) : (
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        color: "var(--fg-primary)",
                      }}
                    >
                      {record.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border-subtle)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--fg-subtle)",
                letterSpacing: "0.05em",
              }}
            >
              Currently available for software engineering opportunities, freelance collaborations, and research discussions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
