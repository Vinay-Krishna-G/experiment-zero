import React from 'react';
import SectionHeader from "@/components/ui/SectionHeader";
import { PROFILE, SOCIALS } from "@/content";

export default function HireMeSection() {
  return (
    <section id="hire-me" style={{ padding: "8rem 0", position: "relative", overflow: "hidden", backgroundColor: "var(--bg-primary)" }}>
      {/* Grid Background */}
      <div 
        aria-hidden="true"
        style={{ 
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
          pointerEvents: "none"
        }} 
      />
      
      <div className="container-lab" style={{ position: "relative", zIndex: 10 }}>
        <SectionHeader 
          number="04"
          title="LET'S BUILD SOMETHING USEFUL" 
          description="Available for select opportunities" 
        />

        <div style={{ maxWidth: "800px", margin: "4rem auto 0", border: "1px solid var(--border-medium)", backgroundColor: "var(--bg-card)", padding: "4rem 3rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem" }}>
            
            {/* Interests */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--fg-muted)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                I&apos;m interested in:
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {["Frontend Engineering", "Full Stack Development", "Developer Tools", "AI-Powered Applications"].map(role => (
                  <li key={role} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "var(--accent-emerald)", marginTop: "0.2rem", fontSize: "0.8rem" }}>•</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--fg-primary)", fontWeight: 500 }}>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--fg-muted)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Available for:
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  PROFILE.availability.fullTime && "Full Time",
                  PROFILE.availability.freelance && "Freelance",
                  PROFILE.availability.remote && "Remote Opportunities"
                ].filter(Boolean).map(role => (
                  <li key={String(role)} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "var(--accent-emerald)", marginTop: "0.2rem", fontSize: "0.8rem" }}>•</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--fg-primary)", fontWeight: 500 }}>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Actions */}
          <div style={{ marginTop: "5rem", display: "flex", gap: "1.5rem", justifyContent: "flex-start", flexWrap: "wrap", borderTop: "1px dashed var(--border-subtle)", paddingTop: "2.5rem" }}>
            <a 
              href={SOCIALS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:brightness-110"
              style={{
                display: "inline-block",
                padding: "0.8rem 1.6rem",
                backgroundColor: "var(--accent-emerald)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "filter 0.2s ease",
              }}
            >
              [LinkedIn]
            </a>
            <a 
              href={SOCIALS.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:border-[var(--fg-primary)] hover:bg-[var(--bg-secondary)]"
              style={{
                display: "inline-block",
                padding: "0.8rem 1.6rem",
                backgroundColor: "transparent",
                border: "1px solid var(--border-medium)",
                color: "var(--fg-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              [GitHub]
            </a>
            <a 
              href={`mailto:${PROFILE.email}`} 
              className="hover:border-[var(--fg-primary)] hover:bg-[var(--bg-secondary)]"
              style={{
                display: "inline-block",
                padding: "0.8rem 1.6rem",
                backgroundColor: "transparent",
                border: "1px solid var(--border-medium)",
                color: "var(--fg-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              [Email]
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
