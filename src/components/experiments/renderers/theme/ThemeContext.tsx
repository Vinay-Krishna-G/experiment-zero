"use client";

import React, { createContext, useContext, useState } from "react";
import { LIGHT_THEME, DARK_THEME, type LaboratoryTheme } from "../lighting";

type ThemeContextType = {
  theme: LaboratoryTheme;
  setTheme: (theme: LaboratoryTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function LaboratoryThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<LaboratoryTheme>(LIGHT_THEME);

  const toggleTheme = () => setTheme((t) => (t.name === "light" ? DARK_THEME : LIGHT_THEME));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useLaboratoryTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useLaboratoryTheme must be used within a LaboratoryThemeProvider");
  }
  return context;
}
