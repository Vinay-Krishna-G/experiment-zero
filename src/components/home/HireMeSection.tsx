import React from 'react';
import SectionHeader from "@/components/ui/SectionHeader";

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
          title="Hire Me" 
          description="Available for select opportunities" 
        />

        <div style={{ maxWidth: "800px", margin: "4rem auto 0", border: "1px solid var(--border-medium)", backgroundColor: "var(--bg-card)", padding: "4rem 3rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem" }}>
            
            {/* Roles */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--fg-muted)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Available For
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {["Frontend Engineering", "Full Stack Development", "Technical Product Development", "AI Powered Applications"].map(role => (
                  <li key={role} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "var(--accent-emerald)", marginTop: "0.2rem", fontSize: "0.8rem" }}>•</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--fg-primary)", fontWeight: 500 }}>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--fg-muted)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Logistics
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--fg-secondary)" }}>
                {[
                  { label: "Location", value: "India" },
                  { label: "Remote", value: "Yes" },
                  { label: "Freelance", value: "Open" },
                  { label: "Full Time", value: "Open" }
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "0.5rem" }}>
                    <span>{item.label}</span>
                    <span style={{ color: "var(--fg-primary)", fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Actions */}
          <div style={{ marginTop: "5rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a 
              href="https://cal.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                backgroundColor: "var(--fg-primary)",
                color: "var(--bg-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "background-color 0.2s ease",
              }}
            >
              [Schedule a Conversation]
            </a>
            <a 
              href="mailto:contact@example.com" 
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                backgroundColor: "transparent",
                border: "1px solid var(--border-medium)",
                color: "var(--fg-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              [Email Me]
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
