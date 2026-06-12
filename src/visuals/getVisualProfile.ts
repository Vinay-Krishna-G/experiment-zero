import { technicalLaboratory } from "./profiles/technicalLaboratory";
import { livingArchive } from "./profiles/livingArchive";
import { networkIntelligence } from "./profiles/networkIntelligence";
import { editorialMotion } from "./profiles/editorialMotion";

import { archivedModifier } from "./modifiers/archived";
import { plannedModifier } from "./modifiers/planned";
import { onHoldModifier } from "./modifiers/onHold";

import { lowDeviceModifier } from "./modifiers/lowDevice";
import { mediumDeviceModifier } from "./modifiers/mediumDevice";
import { highDeviceModifier } from "./modifiers/highDevice";

import type { VisualProfile, VisualArchetype } from "./types";
import type { PrimaryCategory, ExperimentStatus } from "@/types";

const ARCHETYPE_PROFILES: Record<VisualArchetype, VisualProfile> = {
  technical_laboratory: technicalLaboratory,
  living_archive: livingArchive,
  network_intelligence: networkIntelligence,
  editorial_motion: editorialMotion,
};

const profileCache = new Map<string, VisualProfile>();

export function getArchetype(category: PrimaryCategory): VisualArchetype {
  switch (category) {
    case "Backend":
    case "Developer Tool":
    case "AI":
      return "technical_laboratory";
    case "Research":
    case "Unknown":
      return "living_archive";
    case "Infrastructure":
      return "network_intelligence";
    case "Frontend":
    case "Design":
    case "Productivity":
      return "editorial_motion";
    default:
      return "living_archive";
  }
}

export function getVisualProfile(
  category: PrimaryCategory,
  status: ExperimentStatus,
  archived: boolean,
  deviceTier: "low" | "medium" | "high"
): VisualProfile {
  const cacheKey = `${category}_${status}_${archived}_${deviceTier}`;
  if (profileCache.has(cacheKey)) {
    return profileCache.get(cacheKey)!;
  }

  const archetype = getArchetype(category);
  // Deep clone to keep base profile pure
  let profile = JSON.parse(JSON.stringify(ARCHETYPE_PROFILES[archetype])) as VisualProfile;

  // 1. Apply Status Modifiers
  if (archived) {
    profile = archivedModifier(profile);
  }
  if (status === "Planned") {
    profile = plannedModifier(profile);
  } else if (status === "On Hold") {
    profile = onHoldModifier(profile);
  }

  // 2. Apply Device Tier Modifiers
  if (deviceTier === "low") {
    profile = lowDeviceModifier(profile);
  } else if (deviceTier === "medium") {
    profile = mediumDeviceModifier(profile);
  } else {
    profile = highDeviceModifier(profile);
  }

  profileCache.set(cacheKey, profile);
  return profile;
}
