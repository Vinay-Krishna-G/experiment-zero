export type VisualArchetype =
  | "technical_laboratory"
  | "living_archive"
  | "network_intelligence"
  | "editorial_motion";

export type BlendMode = "normal" | "additive" | "multiply";

export type ColorToken =
  | "emerald"
  | "amber"
  | "violet"
  | "slate"
  | "crimson"
  | "steel";

// Special global or fallback color keywords
export type ExtraColorToken =
  | "white"
  | "warmWhite"
  | "darkGrey"
  | "black"
  | "neutralDark";

export interface MaterialPreset {
  // Glass properties
  glassColor: ColorToken;
  glassTransmission: number;
  glassOpacity: number;
  glassRoughness: number;
  glassMetalness: number;
  glassIor: number;
  glassThickness: number;
  glassClearcoat: number;
  glassClearcoatRoughness: number;
  glassSpecularIntensity: number;
  glassSpecularColor: ColorToken | "white";
  
  // Liquid properties
  liquidColor: ColorToken;
  liquidEmissive: ColorToken;
  liquidEmissiveIntensity: number;
  liquidOpacity: number;
  liquidRoughness: number;
}

export interface MotionPreset {
  baseSpeed: number;
  bobbingAmplitude: number;
  bobbingFrequency: number;
  breathingSpeed: number;
  breathingAmplitude: number;
  rotationScale: number;
  hoverScale: number;
  noiseIntensity: number;
}

export interface ParticlePreset {
  count: number;
  baseSize: number;
  hoverSize: number;
  opacity: number;
  driftSpeed: number;
  driftPattern: "vertical" | "spiral" | "chaotic";
  blending: BlendMode;
}

export interface LightingPreset {
  ambientColor: ColorToken | ExtraColorToken;
  ambientIntensity: number;
  keyColor: ColorToken | ExtraColorToken;
  keyIntensity: number;
  keyPosition: [number, number, number];
  rimColor: ColorToken;
  rimIntensity: number;
  rimPosition: [number, number, number];
  spotColor: ColorToken | ExtraColorToken;
  spotIntensity: number;
}

export interface AtmospherePreset {
  environmentMap: "warehouse" | "sunset" | "studio" | "apartment";
  fogColor: ColorToken | ExtraColorToken;
  fogDensity: number;
  cameraDistance: number;
  cameraFov: number;
}

export interface VisualProfile {
  archetype: VisualArchetype;
  material: MaterialPreset;
  motion: MotionPreset;
  particles: ParticlePreset;
  lighting: LightingPreset;
  atmosphere: AtmospherePreset;
}
