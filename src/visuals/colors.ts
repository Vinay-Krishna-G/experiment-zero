import { ColorToken, ExtraColorToken } from "./types";

export interface ColorValue {
  hex: string;
  css: {
    base: string;
    highlight: string;
    glow: string;
  };
}

export const COLORS: Record<ColorToken | ExtraColorToken, ColorValue> = {
  emerald: {
    hex: "#10b981",
    css: {
      base: "rgba(16, 185, 129, 0.72)",
      highlight: "rgba(52, 211, 153, 0.45)",
      glow: "rgba(16, 185, 129, 0.2)",
    },
  },
  amber: {
    hex: "#f59e0b",
    css: {
      base: "rgba(245, 158, 11, 0.72)",
      highlight: "rgba(251, 191, 36, 0.45)",
      glow: "rgba(245, 158, 11, 0.2)",
    },
  },
  violet: {
    hex: "#8b5cf6",
    css: {
      base: "rgba(139, 92, 246, 0.72)",
      highlight: "rgba(167, 139, 250, 0.45)",
      glow: "rgba(139, 92, 246, 0.2)",
    },
  },
  slate: {
    hex: "#64748b",
    css: {
      base: "rgba(100, 116, 139, 0.72)",
      highlight: "rgba(148, 163, 184, 0.45)",
      glow: "rgba(100, 116, 139, 0.2)",
    },
  },
  crimson: {
    hex: "#ef4444",
    css: {
      base: "rgba(239, 68, 68, 0.72)",
      highlight: "rgba(248, 113, 113, 0.45)",
      glow: "rgba(239, 68, 68, 0.2)",
    },
  },
  steel: {
    hex: "#94a3b8",
    css: {
      base: "rgba(148, 163, 184, 0.72)",
      highlight: "rgba(203, 213, 225, 0.45)",
      glow: "rgba(148, 163, 184, 0.15)",
    },
  },
  white: {
    hex: "#ffffff",
    css: {
      base: "#ffffff",
      highlight: "#ffffff",
      glow: "transparent",
    },
  },
  warmWhite: {
    hex: "#fffcf5",
    css: {
      base: "#fffcf5",
      highlight: "#fffcf5",
      glow: "transparent",
    },
  },
  darkGrey: {
    hex: "#1c1917",
    css: {
      base: "#1c1917",
      highlight: "#1c1917",
      glow: "transparent",
    },
  },
  black: {
    hex: "#000000",
    css: {
      base: "#000000",
      highlight: "#000000",
      glow: "transparent",
    },
  },
  neutralDark: {
    hex: "#1c1917",
    css: {
      base: "#1c1917",
      highlight: "#1c1917",
      glow: "transparent",
    },
  },
};
