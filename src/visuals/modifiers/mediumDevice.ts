import { VisualProfile } from "../types";

export function mediumDeviceModifier(profile: VisualProfile): VisualProfile {
  return {
    ...profile,
    material: {
      ...profile.material,
      glassThickness: profile.material.glassThickness * 0.5,
      glassClearcoat: profile.material.glassClearcoat * 0.7,
    },
    particles: {
      ...profile.particles,
      count: Math.max(4, Math.round(profile.particles.count * 0.5)),
    },
  };
}
