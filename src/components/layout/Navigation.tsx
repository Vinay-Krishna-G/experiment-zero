"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Mission", href: "#mission" },
  { label: "Experiments", href: "#experiments" },
  { label: "Blueprints", href: "#blueprints" },
  { label: "Research Log", href: "#research-log" },
  { label: "Laboratory", href: "#laboratory" },
  { label: "Correspondence", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      id="main-navigation"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: 3.6, // after welcome banner
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--nav-height)",
        transition:
          "background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        backgroundColor: isScrolled ? "rgba(247, 244, 239, 0.88)" : "transparent",
        borderBottom: isScrolled
          ? "1px solid var(--border-subtle)"
          : "1px solid transparent",
        backdropFilter: isScrolled ? "blur(14px) saturate(1.15)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(14px) saturate(1.15)" : "none",
      }}
    >
      <div
        className="container-lab"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          gap: "2rem",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="Vinay Krishna Laboratory — home"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--fg-primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          VK
          <span style={{ color: "var(--accent-emerald)", fontSize: "0.5rem" }}>◆</span>
        </a>

        {/* Nav links */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          style={{ display: "flex", gap: "1.75rem", alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              onMouseEnter={() => setActiveItem(item.href)}
              onMouseLeave={() => setActiveItem(null)}
              className="ink-underline nav-link"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color:
                  activeItem === item.href
                    ? "var(--fg-primary)"
                    : "var(--fg-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
                display: "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Lab status indicator — upgraded */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "1px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.25em",
              color: "var(--fg-subtle)",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Lab Status
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "var(--accent-emerald)",
                animation: "pulse-dot 2.8s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "var(--accent-emerald)",
                textTransform: "uppercase",
              }}
            >
              Online
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(45,106,79,0.4); }
          50%       { opacity: 0.7; transform: scale(0.85); box-shadow: 0 0 0 3px rgba(45,106,79,0); }
        }
        @media (min-width: 768px) {
          .nav-link { display: block !important; }
        }
      `}</style>
    </motion.header>
  );
}
