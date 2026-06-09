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
          gap: "2rem 3rem",
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
              #6B4C2A 0%,
              #5A3D1F 30%,
              #4A3018 70%,
              #3D2710 100%
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
              repeating-linear-gradient(
                to right,
                transparent 0px,
                transparent 12px,
                rgba(255,255,255,0.025) 12px,
                rgba(255,255,255,0.025) 13px
              ),
              repeating-linear-gradient(
                to right,
                transparent 0px,
                transparent 28px,
                rgba(0,0,0,0.05) 28px,
                rgba(0,0,0,0.05) 30px
              )
            `,
            borderRadius: "2px",
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
            background: "linear-gradient(to right, #B8860B, #8B6914)",
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
            background: "linear-gradient(to left, #B8860B, #8B6914)",
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
        background: "linear-gradient(to bottom, #8B6914, #6B4F0C)",
        borderRadius: "0 0 3px 3px",
        opacity: 0.65,
        boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.1)",
      }}
    />
  );
}
