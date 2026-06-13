import { PROFILE, SOCIALS } from "@/content";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "5rem 0 2rem 0",
        marginTop: "auto",
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background texture */}
      <div 
        aria-hidden="true"
        style={{ 
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, var(--border-medium) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.2,
          pointerEvents: "none"
        }} 
      />

      <div className="container-lab" style={{ position: "relative", zIndex: 10 }}>
        
        {/* Top Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "4rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--fg-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Engineering & Architecture
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--fg-primary)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              {PROFILE.name}
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {SOCIALS.github && (
              <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors duration-200" style={{ textDecoration: "none" }}>
                GitHub ↗
              </a>
            )}
            {SOCIALS.linkedin && (
              <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors duration-200" style={{ textDecoration: "none" }}>
                LinkedIn ↗
              </a>
            )}
            {PROFILE.email && (
              <a href={`mailto:${PROFILE.email}`} className="text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors duration-200" style={{ textDecoration: "none" }}>
                Email ↗
              </a>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "2rem",
            borderTop: "1px dashed var(--border-subtle)"
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
            }}
          >
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
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
                fontSize: "0.6rem",
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
