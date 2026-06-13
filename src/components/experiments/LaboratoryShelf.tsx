"use client";

import React from "react";

interface LaboratoryShelfProps {
  children: React.ReactNode;
  /** Shelf label — e.g. "Shelf A — Completed" */
  label?: string;
}

/**
 * CSS-only dark walnut laboratory shelf.
 * Bottles sit on top of the shelf surface.
 * Designed to be replaced with a Three.js scene in Phase 6
 * by wrapping this in a conditional renderer.
 */
export default function LaboratoryShelf({ children, label }: LaboratoryShelfProps) {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "1.5rem",
      }}
    >
      {/* Optional shelf label */}
      {label && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.52rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--fg-subtle)",
            marginBottom: "1.25rem",
            opacity: 0.7,
          }}
        >
          {label}
        </div>
      )}

      {/* Bottle row — sitting on shelf */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2.5rem 5rem",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          paddingBottom: "0.5rem",
          paddingInline: "0.5rem",
          minHeight: 220,
        }}
      >
        {children}
      </div>

      {/* ── Shelf surface ── */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          height: 14,
          borderRadius: "2px",
          background: `
            linear-gradient(
              to bottom,
              #5C3A1E 0%,
              #4C2E14 30%,
              #3D240D 70%,
              #311B09 100%
            )
          `,
          boxShadow:
            "0 4px 16px rgba(28, 20, 8, 0.35), 0 1px 0 rgba(255,255,255,0.08) inset",
        }}
      >
        {/* Wood grain texture — CSS lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 400 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01 0.4' numOctaves='3' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0' in='noise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood)'/%3E%3C/svg%3E"),
              linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.3) 100%)
            `,
            borderRadius: "2px",
            mixBlendMode: "overlay",
          }}
        />

        {/* Brass edge strip — left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 6,
            height: "100%",
            background: "linear-gradient(to right, #C8A15B, #A87C38)",
            borderRadius: "2px 0 0 2px",
            opacity: 0.7,
          }}
        />

        {/* Brass edge strip — right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 6,
            height: "100%",
            background: "linear-gradient(to left, #C8A15B, #A87C38)",
            borderRadius: "0 2px 2px 0",
            opacity: 0.7,
          }}
        />
      </div>

      {/* ── Shelf shadow / depth ── */}
      <div
        aria-hidden="true"
        style={{
          height: 8,
          background:
            "linear-gradient(to bottom, rgba(28,20,8,0.2), rgba(28,20,8,0.05), transparent)",
          borderRadius: "0 0 4px 4px",
          marginTop: 0,
        }}
      />

      {/* ── Shelf bracket marks — decorative ── */}
      <ShelfBracket side="left" />
      <ShelfBracket side="right" />
    </div>
  );
}

function ShelfBracket({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        [side]: "1.5rem",
        width: 10,
        height: 24,
        background: "linear-gradient(to bottom, #A87C38, #825E21)",
        borderRadius: "0 0 3px 3px",
        opacity: 0.65,
        boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.1)",
      }}
    />
  );
}
