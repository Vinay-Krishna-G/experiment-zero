import React from 'react';
import { EXPERIMENTS, BLUEPRINTS, RESEARCH_LOGS, FIELD_NOTES } from '@/content';

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
            Laboratory Registry
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-secondary)", letterSpacing: "0.05em" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Archived Experiments <span style={{ color: "var(--fg-subtle)" }}>.......</span></span>
              <span style={{ color: "var(--fg-primary)", fontSize: "0.85rem", fontWeight: 500 }}>{EXPERIMENTS.length.toString().padStart(2, '0')}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Engineering Blueprints <span style={{ color: "var(--fg-subtle)" }}>.....</span></span>
              <span style={{ color: "var(--fg-primary)", fontSize: "0.85rem", fontWeight: 500 }}>{BLUEPRINTS.length.toString().padStart(2, '0')}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Research Entries <span style={{ color: "var(--fg-subtle)" }}>...........</span></span>
              <span style={{ color: "var(--fg-primary)", fontSize: "0.85rem", fontWeight: 500 }}>{RESEARCH_LOGS.length.toString().padStart(2, '0')}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Field Notes <span style={{ color: "var(--fg-subtle)" }}>................</span></span>
              <span style={{ color: "var(--fg-primary)", fontSize: "0.85rem", fontWeight: 500 }}>{FIELD_NOTES.length.toString().padStart(2, '0')}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
