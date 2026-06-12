import { VisualProfile } from "../types";

export function archivedModifier(profile: VisualProfile): VisualProfile {
  return {
    ...profile,
    material: {
      ...profile.material,
      glassColor: "amber",
      liquidColor: "amber",
      liquidEmissive: "amber",
      liquidEmissiveIntensity: Math.max(0.1, profile.material.liquidEmissiveIntensity * 0.5),
    },
    motion: {
      ...profile.motion,
      baseSpeed: profile.motion.baseSpeed * 0.5,
      bobbingAmplitude: profile.motion.bobbingAmplitude * 0.6,
      breathingSpeed: profile.motion.breathingSpeed * 0.5,
    },
    particles: {
      ...profile.particles,
      count: Math.max(2, Math.round(profile.particles.count * 0.4)),
    },
  };
}
