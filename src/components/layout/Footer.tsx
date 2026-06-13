import { PROFILE, SOCIALS } from "@/content";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        padding: "4rem 0 6rem 0",
        marginTop: "auto",
        backgroundColor: "var(--bg-primary)",
        position: "relative",
      }}
    >
      <div className="container-lab" style={{ position: "relative", zIndex: 10, maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
        
        {/* Subtle brass divider */}
        <div style={{
          width: "100%",
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--border-medium), transparent)",
          marginBottom: "3rem"
        }} />

        {/* Name / Mark */}
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--fg-primary)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          VK •
        </div>

        {/* Taglines */}
        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--fg-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          Building useful software,<br />
          one experiment at a time.
        </div>

        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "2.5rem" }}>
          Built with curiosity, TypeScript,<br />
          and too much coffee.
        </div>

        {/* Location */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "2rem" }}>
          Guntur, Andhra Pradesh
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {SOCIALS.github && (
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors duration-200" style={{ textDecoration: "none" }}>
              GitHub
            </a>
          )}
          <span style={{ color: "var(--border-medium)" }}>·</span>
          {SOCIALS.linkedin && (
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors duration-200" style={{ textDecoration: "none" }}>
              LinkedIn
            </a>
          )}
          <span style={{ color: "var(--border-medium)" }}>·</span>
          {PROFILE.email && (
            <a href={`mailto:${PROFILE.email}`} className="text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors duration-200" style={{ textDecoration: "none" }}>
              Email
            </a>
          )}
        </div>

      </div>
    </footer>
  );
}
