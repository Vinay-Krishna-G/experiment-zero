import { VisualProfile } from "../types";
import { livingArchiveMaterial } from "../materials";
import { livingArchiveMotion } from "../motion";
import { livingArchiveParticles } from "../particles";
import { livingArchiveLighting } from "../lighting";
import { livingArchiveAtmosphere } from "../atmosphere";

export const livingArchive: VisualProfile = {
  archetype: "living_archive",
  material: livingArchiveMaterial,
  motion: livingArchiveMotion,
  particles: livingArchiveParticles,
  lighting: livingArchiveLighting,
  atmosphere: livingArchiveAtmosphere,
};
