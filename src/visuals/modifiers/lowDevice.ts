import { VisualProfile } from "../types";

export function lowDeviceModifier(profile: VisualProfile): VisualProfile {
  return {
    ...profile,
    material: {
      ...profile.material,
      glassTransmission: 0.0, // Disable physical transmission
      glassClearcoat: 0.0, // Disable clearcoat layers
      glassThickness: 0.0,
      liquidOpacity: 0.7, // Solid fallback opacity
    },
    particles: {
      ...profile.particles,
      count: 0, // No particles on low end
    },
    atmosphere: {
      ...profile.atmosphere,
      fogDensity: 0.0, // Disable fog
    },
  };
}
