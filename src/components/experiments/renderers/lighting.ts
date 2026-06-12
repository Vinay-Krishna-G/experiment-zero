export type LaboratoryTheme = {
  name: "light" | "dark";
  ambientIntensity: number;
  ambientColor: string;
  keyIntensity: number;
  keyColor: string;
  rimIntensity: number;
  rimColor: string;
  particleBrightness: number;
  liquidEmissiveMultiplier: number;
  glassTransmission: number;
  glassOpacity: number;
};

export const LIGHT_THEME: LaboratoryTheme = {
  name: "light",
  ambientIntensity: 0.85,
  ambientColor: "#ffffff",
  keyIntensity: 1.2,
  keyColor: "#fdfbf7",
  rimIntensity: 0.6,
  rimColor: "#b8860b", // warm copper rim
  particleBrightness: 0.8,
  liquidEmissiveMultiplier: 0.3, // restrained liquid glow
  glassTransmission: 0.98,
  glassOpacity: 1.0,
};

export const DARK_THEME: LaboratoryTheme = {
  name: "dark",
  ambientIntensity: 0.15,
  ambientColor: "#1c1917",
  keyIntensity: 0.4,
  keyColor: "#ffffff",
  rimIntensity: 2.5,
  rimColor: "#34d399", // stronger scientific green rim light
  particleBrightness: 2.0, // more visible fireflies
  liquidEmissiveMultiplier: 1.5, // brighter emissive glow
  glassTransmission: 0.85,
  glassOpacity: 0.9,
};
