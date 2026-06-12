import { VisualProfile } from "../types";

export function plannedModifier(profile: VisualProfile): VisualProfile {
  return {
    ...profile,
    material: {
      ...profile.material,
      glassColor: "slate",
      glassTransmission: 0.1, // Frosted / opaque glass
      glassOpacity: 0.6,
      glassRoughness: 0.8,
      glassMetalness: 0.2,
      liquidOpacity: 0.0, // Empty
      liquidEmissiveIntensity: 0.0,
    },
    motion: {
      ...profile.motion,
      baseSpeed: 0.1, // Near static
      bobbingAmplitude: 0.005,
      breathingAmplitude: 0.0,
    },
    particles: {
      ...profile.particles,
      count: 0, // No active particles
    },
  };
}
