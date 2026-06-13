"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ARCHIVE_INDEX = [
  { number: "00", label: "Home", href: "#hero" },
  { number: "01", label: "Projects", href: "#experiments" },
  { number: "02", label: "Architecture", href: "#blueprints" },
  { number: "03", label: "Notes", href: "#research-log" },
  { number: "04", label: "Insights", href: "/insights" },
  { number: "05", label: "Skill Matrix", href: "/evidence" },
  { number: "06", label: "Contact", href: "#contact" },
];

const NAV_ITEMS = [
  { label: "Projects", href: "#experiments" },
  { label: "Architecture", href: "#blueprints" },
  { label: "Insights", href: "/insights" },
  { label: "Skill Matrix", href: "/evidence" },
  { label: "Notes", href: "#research-log" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape key, trap focus inside drawer
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isDrawerOpen) return;
    if (e.key === "Escape") {
      setIsDrawerOpen(false);
      triggerRef.current?.focus();
    }
    if (e.key === "Tab" && drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex="0"]'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      // Focus first item in drawer
      setTimeout(() => {
        drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  const handleNavClick = (href: string) => {
    setIsDrawerOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => {
        const id = href.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <motion.header
        id="main-navigation"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: EASE,
          delay: 3.6,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "var(--nav-height)",
          transition: "background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
          backgroundColor: isScrolled ? "rgba(247, 244, 239, 0.88)" : "transparent",
          borderBottom: isScrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
          backdropFilter: isScrolled ? "blur(14px) saturate(1.15)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(14px) saturate(1.15)" : "none",
        }}
      >
        <div
          className="container-lab"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%", gap: "2rem" }}
        >
          {/* Logo */}
          <Link
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
          </Link>

          {/* Desktop Nav links */}
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
                  color: activeItem === item.href ? "var(--fg-primary)" : "var(--fg-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  display: "none",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side: Lab status (desktop) + Archive Index trigger (mobile) */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
            {/* Resume CTA (desktop) */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--bg-card)",
                backgroundColor: "var(--fg-primary)",
                padding: "0.4rem 0.8rem",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "background-color 0.2s ease",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-emerald)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--fg-primary)";
              }}
            >
              Resume
            </a>

            {/* Lab status indicator */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--fg-subtle)", textTransform: "uppercase", lineHeight: 1 }}>
                Lab Status
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span
                  aria-hidden="true"
                  style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--accent-emerald)", animation: "pulse-dot 2.8s ease-in-out infinite", flexShrink: 0 }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", color: "var(--accent-emerald)", textTransform: "uppercase" }}>
                  Online
                </span>
              </div>
            </div>

            {/* Mobile Archive Index trigger */}
            <button
              ref={triggerRef}
              id="archive-index-trigger"
              onClick={() => setIsDrawerOpen(true)}
              aria-expanded={isDrawerOpen}
              aria-controls="archive-index-drawer"
              aria-label="Open archive index"
              className="archive-index-trigger"
              style={{
                background: "none",
                border: "1px solid var(--border-medium)",
                borderRadius: "2px",
                cursor: "pointer",
                padding: "0.4rem 0.65rem",
                display: "none",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
            >
              <span aria-hidden="true" style={{ fontSize: "0.75rem" }}>☰</span>
              INDEX
            </button>
          </div>
        </div>

        <style>{`
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(45,106,79,0.4); }
            50%       { opacity: 0.7; transform: scale(0.85); box-shadow: 0 0 0 3px rgba(45,106,79,0); }
          }
          @media (min-width: 768px) {
            .nav-link { display: block !important; }
            .archive-index-trigger { display: none !important; }
          }
          @media (max-width: 767px) {
            .archive-index-trigger { display: flex !important; }
          }
        `}</style>
      </motion.header>

      {/* ── Mobile Archive Index Drawer ── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                backgroundColor: "rgba(28,20,8,0.45)",
              }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer-panel"
              ref={drawerRef}
              id="archive-index-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Archive Index"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: EASE }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 201,
                width: "min(320px, 88vw)",
                backgroundColor: "var(--bg-card)",
                borderLeft: "1px solid var(--border-medium)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Ruled paper texture */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "repeating-linear-gradient(transparent calc(2.2rem - 1px), rgba(28,25,23,0.06) calc(2.2rem - 1px), rgba(28,25,23,0.06) 2.2rem, transparent 2.2rem)",
                  backgroundSize: "100% 2.2rem",
                  pointerEvents: "none",
                }}
              />
              {/* Copper spine */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 3,
                  background: "linear-gradient(to bottom, var(--accent-copper), rgba(146,64,14,0.3))",
                }}
              />

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.25rem 1.25rem 1rem 1.5rem",
                  borderBottom: "1px solid var(--border-medium)",
                  backgroundColor: "rgba(28,20,8,0.02)",
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "0.2rem" }}>
                      Laboratory Registry
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--fg-primary)", letterSpacing: "-0.02em" }}>
                      Archive Index
                    </div>
                  </div>
                  <button
                    onClick={() => { setIsDrawerOpen(false); triggerRef.current?.focus(); }}
                    aria-label="Close archive index"
                    style={{
                      background: "none",
                      border: "1px solid var(--border-medium)",
                      borderRadius: "2px",
                      cursor: "pointer",
                      padding: "0.35rem 0.6rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                      color: "var(--fg-muted)",
                      transition: "border-color 0.2s ease, color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--fg-primary)"; e.currentTarget.style.color = "var(--fg-primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-medium)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
                  >
                    Close ×
                  </button>
                </div>

                {/* Index entries */}
                <nav aria-label="Archive sections" style={{ flex: 1, overflowY: "auto", paddingBlock: "1rem" }}>
                  {ARCHIVE_INDEX.map((item, i) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "1rem",
                        padding: "1.1rem 1.25rem 1.1rem 1.5rem",
                        textDecoration: "none",
                        borderBottom: i < ARCHIVE_INDEX.length - 1 ? "1px solid var(--border-subtle)" : "none",
                        transition: "background-color 0.15s ease",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(28,20,8,0.03)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--accent-copper)", flexShrink: 0, minWidth: "2.5rem" }}>
                        {item.number}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "0.04em", color: "var(--fg-primary)", fontWeight: 500 }}>
                        {item.label}
                      </span>
                      <span aria-hidden="true" style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--fg-subtle)" }}>→</span>
                    </a>
                  ))}
                </nav>

                {/* Footer stamp */}
                <div style={{
                  padding: "1rem 1.5rem",
                  borderTop: "1px solid var(--border-subtle)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.45rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--fg-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                  <span>Experiment Zero</span>
                  <span>Archive v1.0</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
