import { VisualProfile } from "../types";
import { editorialMotionMaterial } from "../materials";
import { editorialMotionMotion } from "../motion";
import { editorialMotionParticles } from "../particles";
import { editorialMotionLighting } from "../lighting";
import { editorialMotionAtmosphere } from "../atmosphere";

export const editorialMotion: VisualProfile = {
  archetype: "editorial_motion",
  material: editorialMotionMaterial,
  motion: editorialMotionMotion,
  particles: editorialMotionParticles,
  lighting: editorialMotionLighting,
  atmosphere: editorialMotionAtmosphere,
};
