"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import CSSBottleRenderer from "./CSSBottleRenderer";
import { USE_3D_RENDERER } from "./constants";
import type { BottleRendererProps } from "./types";

// Dynamic import setup: GLBBottleRenderer must be loaded with ssr: false.
// Never import Three.js directly into ExperimentRack to keep WebGL isolated.
const GLBBottleRenderer = dynamic(() => import("./GLBBottleRenderer"), {
  ssr: false,
});

export default function BottleRenderer(props: BottleRendererProps) {
  const prefersReducedMotion = useReducedMotion();

  // Reduced Motion Verification:
  // When prefers-reduced-motion is active:
  // * CSS renderer only
  // * No WebGL initialization
  // * No floating animations
  // * No particle systems
  if (!USE_3D_RENDERER || prefersReducedMotion) {
    return <CSSBottleRenderer {...props} />;
  }

  return <GLBBottleRenderer {...props} />;
}
