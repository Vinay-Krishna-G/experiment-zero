"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/vinaykrishna",
    desc: "Open source experiments",
    id: "correspondence-github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/vinaykrishna",
    desc: "Professional journal",
    id: "correspondence-linkedin",
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/vinaykrishna",
    desc: "Dispatches from the lab",
    id: "correspondence-twitter",
  },
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
            {/* Message / email */}
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
                Whether you have a project in mind, want to collaborate on an experiment, or simply wish to correspond with the laboratory.
              </p>
              <a
                href="mailto:hello@vinaykrishna.dev"
                id="correspondence-email"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.05rem, 2.2vw, 1.4rem)",
                  fontWeight: 700,
                  color: "var(--fg-primary)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  borderBottom: "2px solid var(--accent-emerald)",
                  paddingBottom: "2px",
                  transition: "color 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent-emerald)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--fg-primary)";
                }}
              >
                hello@vinaykrishna.dev
              </a>
            </div>

            {/* Social cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  id={social.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "2px",
                    textDecoration: "none",
                    backgroundColor: "var(--bg-card)",
                    transition:
                      "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                    gap: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--accent-emerald)";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 4px 16px rgba(28,25,23,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border-subtle)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        color: "var(--fg-primary)",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {social.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.12em",
                        color: "var(--fg-subtle)",
                        textTransform: "uppercase",
                      }}
                    >
                      {social.desc}
                    </div>
                  </div>
                  <span
                    style={{ color: "var(--fg-subtle)", fontSize: "0.75rem" }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
