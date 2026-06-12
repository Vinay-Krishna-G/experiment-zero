import { VisualProfile } from "../types";

export function onHoldModifier(profile: VisualProfile): VisualProfile {
  return {
    ...profile,
    material: {
      ...profile.material,
      liquidColor: "steel",
      liquidEmissive: "steel",
      liquidEmissiveIntensity: Math.min(0.2, profile.material.liquidEmissiveIntensity * 0.3),
    },
    motion: {
      ...profile.motion,
      baseSpeed: 0.15, // Near frozen
      bobbingAmplitude: 0.01,
      breathingAmplitude: 0.005,
    },
    particles: {
      ...profile.particles,
      count: Math.max(1, Math.round(profile.particles.count * 0.2)),
    },
  };
}
