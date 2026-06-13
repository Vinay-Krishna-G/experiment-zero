"use client";

import React, { useState } from 'react';
import { SITE_SETTINGS } from '@/content';

export default function VisitorStats() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={{ backgroundColor: "var(--bg-primary)", padding: "4rem 0 6rem", position: "relative" }}>
      <div className="container-lab" style={{ display: "flex", justifyContent: "center" }}>
        
        <div style={{ 
          border: "1px solid var(--border-subtle)", 
          padding: "2rem 2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          minWidth: "min(400px, 100%)",
          backgroundColor: "rgba(28,20,8,0.02)"
        }}>
          
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "0.85rem", 
              letterSpacing: "0.25em", 
              color: "var(--fg-primary)", 
              textTransform: "uppercase", 
              marginBottom: "1rem",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "0.5rem"
            }}>
              EXPLORER LOG
            </div>
            
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-secondary)", letterSpacing: "0.05em", lineHeight: 1.8 }}>
              <div style={{ color: "var(--fg-primary)", fontWeight: 600 }}>Explorer #{SITE_SETTINGS.explorerNumber}</div>
              <div style={{ color: "var(--accent-emerald)" }}>Archive Access Granted</div>
              <div>Welcome to the laboratory.</div>
            </div>
          </div>

          <div 
            style={{ position: "relative", cursor: "pointer", width: "64px", height: "64px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Hover Tooltip */}
            {isHovered && (
              <div style={{
                position: "absolute",
                top: "-35px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--accent-emerald)",
                color: "var(--accent-emerald)",
                padding: "4px 8px",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10
              }}>
                👋 Hello Explorer!
              </div>
            )}
            
            {/* SVG Explorer Character */}
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              {/* Face */}
              <circle cx="50" cy="50" r="30" fill="#fcd34d" />
              {/* Hat base */}
              <path d="M 15 35 Q 50 15 85 35 L 75 25 Q 50 5 25 25 Z" fill="#b45309" />
              {/* Hat brim */}
              <ellipse cx="50" cy="35" rx="40" ry="8" fill="#92400e" />
              {/* Goggles */}
              <rect x="25" y="40" width="50" height="15" rx="4" fill="#1e293b" />
              <circle cx="35" cy="47.5" r="5" fill="#38bdf8" />
              <circle cx="65" cy="47.5" r="5" fill="#38bdf8" />
              <line x1="40" y1="47.5" x2="60" y2="47.5" stroke="#94a3b8" strokeWidth="2" />
              {/* Smile */}
              <path d="M 40 65 Q 50 75 60 65" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
