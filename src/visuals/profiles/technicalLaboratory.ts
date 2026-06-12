import { VisualProfile } from "../types";
import { technicalLaboratoryMaterial } from "../materials";
import { technicalLaboratoryMotion } from "../motion";
import { technicalLaboratoryParticles } from "../particles";
import { technicalLaboratoryLighting } from "../lighting";
import { technicalLaboratoryAtmosphere } from "../atmosphere";

export const technicalLaboratory: VisualProfile = {
  archetype: "technical_laboratory",
  material: technicalLaboratoryMaterial,
  motion: technicalLaboratoryMotion,
  particles: technicalLaboratoryParticles,
  lighting: technicalLaboratoryLighting,
  atmosphere: technicalLaboratoryAtmosphere,
};
