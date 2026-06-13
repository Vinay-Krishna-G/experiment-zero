import React from 'react';

export default function VisitorStats() {
  return (
    <section style={{ backgroundColor: "var(--bg-primary)", padding: "4rem 0 6rem", position: "relative" }}>
      <div className="container-lab" style={{ display: "flex", justifyContent: "center" }}>
        
        <div style={{ 
          border: "1px solid var(--border-subtle)", 
          padding: "2rem 2.5rem",
          display: "inline-block",
          minWidth: "min(400px, 100%)",
          backgroundColor: "rgba(28,20,8,0.02)"
        }}>
          
          <div style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "0.85rem", 
            letterSpacing: "0.25em", 
            color: "var(--fg-primary)", 
            textTransform: "uppercase", 
            marginBottom: "2rem",
            textAlign: "center",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "1rem"
          }}>
            Laboratory Records
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-secondary)", letterSpacing: "0.05em" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Archive Visits <span style={{ color: "var(--fg-subtle)" }}>............</span></span>
              <span style={{ color: "var(--fg-primary)", fontSize: "0.85rem", fontWeight: 500 }}>1,284</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Recovered Artifacts <span style={{ color: "var(--fg-subtle)" }}>.......</span></span>
              <span style={{ color: "var(--fg-primary)", fontSize: "0.85rem", fontWeight: 500 }}>12</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Published Notes <span style={{ color: "var(--fg-subtle)" }}>...........</span></span>
              <span style={{ color: "var(--fg-primary)", fontSize: "0.85rem", fontWeight: 500 }}>37</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Research Entries <span style={{ color: "var(--fg-subtle)" }}>..........</span></span>
              <span style={{ color: "var(--fg-primary)", fontSize: "0.85rem", fontWeight: 500 }}>14</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
