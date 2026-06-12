import { VisualProfile } from "../types";
import { networkIntelligenceMaterial } from "../materials";
import { networkIntelligenceMotion } from "../motion";
import { networkIntelligenceParticles } from "../particles";
import { networkIntelligenceLighting } from "../lighting";
import { networkIntelligenceAtmosphere } from "../atmosphere";

export const networkIntelligence: VisualProfile = {
  archetype: "network_intelligence",
  material: networkIntelligenceMaterial,
  motion: networkIntelligenceMotion,
  particles: networkIntelligenceParticles,
  lighting: networkIntelligenceLighting,
  atmosphere: networkIntelligenceAtmosphere,
};
