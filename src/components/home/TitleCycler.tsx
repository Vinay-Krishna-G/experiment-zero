"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TITLES = [
  "Web Developer",
  "UI/UX Designer",
  "3D Web Developer",
  "Product Builder",
  "AI Explorer",
  "Systems Thinker",
];

const HOLD_DURATION = 3000; // ms between transitions
const SWEEP_DURATION = 0.75; // seconds

export default function TitleCycler() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [showNext, setShowNext] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const startTransition = () => {
    setIsTransitioning(true);

    // Midpoint: swap title
    setTimeout(() => {
      setShowNext(true);
    }, (SWEEP_DURATION * 1000 * 0.48)); // slightly before midpoint

    // After sweep: settle
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % TITLES.length);
      setNextIndex((prev) => (prev + 1) % TITLES.length);
      setIsTransitioning(false);
      setShowNext(false);
      setDirection((d) => (d === "ltr" ? "rtl" : "ltr"));
    }, SWEEP_DURATION * 1000 + 80);
  };

  useEffect(() => {
    // Don't cycle titles when reduced motion is preferred
    if (prefersReducedMotion) return;
    const schedule = () => {
      intervalRef.current = setTimeout(() => {
        startTransition();
        schedule();
      }, HOLD_DURATION);
    };
    schedule();
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [prefersReducedMotion]);

  const sweepInitial =
    direction === "ltr" ? { x: "-102%" } : { x: "102%" };
  const sweepAnimate = { x: "0%" };
  const sweepExit =
    direction === "ltr" ? { x: "102%" } : { x: "-102%" };

  // Reduced motion: render a single static title, no sweep
  if (prefersReducedMotion) {
    return (
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "clamp(1.1rem, 3vw, 2.2rem)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-secondary)",
        }}
      >
        {TITLES[currentIndex]}
      </span>
    );
  }

  return (
    <div
      id="title-cycler"
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        lineHeight: 1.3,
      }}
    >
      {/* Current title */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "clamp(1.1rem, 3vw, 2.2rem)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-secondary)",
          display: "block",
          opacity: showNext ? 0 : 1,
          transition: "opacity 0.12s ease",
          userSelect: "none",
        }}
        aria-hidden={showNext}
      >
        {TITLES[currentIndex]}
      </span>

      {/* Next title — fades in as sweep passes */}
      {isTransitioning && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "clamp(1.1rem, 3vw, 2.2rem)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-secondary)",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            opacity: showNext ? 1 : 0,
            transition: "opacity 0.15s ease",
            userSelect: "none",
          }}
        >
          {TITLES[nextIndex]}
        </span>
      )}

      {/* Sweep line */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={`sweep-${currentIndex}-${direction}`}
            initial={sweepInitial}
            animate={sweepAnimate}
            exit={sweepExit}
            transition={{
              duration: SWEEP_DURATION,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              pointerEvents: "none",
            }}
          >
            {/* The actual sweep line — thin emerald rule */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 2,
                height: "140%",
                backgroundColor: "var(--accent-emerald)",
                opacity: 0.75,
                borderRadius: 1,
                boxShadow: "0 0 8px var(--accent-emerald-light)",
              }}
            />
            {/* Frosted wipe block */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "var(--bg-primary)",
                opacity: 0.92,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
