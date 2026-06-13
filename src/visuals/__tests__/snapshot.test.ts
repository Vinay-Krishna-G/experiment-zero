import type { PrimaryCategory, ExperimentStatus } from "@/types";
import { getVisualProfile } from "../getVisualProfile";

interface TestCase {
  category: PrimaryCategory;
  status: ExperimentStatus;
  archived: boolean;
  deviceTier: "low" | "medium" | "high";
  expectedArchetype: string;
  expectedGlassColor: string;
  expectedLiquidColor: string;
  expectedParticleCount: number;
}

const testCases: TestCase[] = [
  {
    category: "Developer Tool",
    status: "In Progress",
    archived: false,
    deviceTier: "high",
    expectedArchetype: "technical_laboratory",
    expectedGlassColor: "emerald",
    expectedLiquidColor: "emerald",
    expectedParticleCount: 16,
  },
  {
    category: "Research",
    status: "Completed",
    archived: true,
    deviceTier: "low",
    expectedArchetype: "living_archive",
    expectedGlassColor: "amber",
    expectedLiquidColor: "amber",
    expectedParticleCount: 0,
  },
  {
    category: "Portfolio",
    status: "Planned",
    archived: false,
    deviceTier: "high",
    expectedArchetype: "technical_laboratory",
    expectedGlassColor: "slate",
    expectedLiquidColor: "emerald",
    expectedParticleCount: 0,
  },
  {
    category: "Education",
    status: "On Hold",
    archived: false,
    deviceTier: "medium",
    expectedArchetype: "network_intelligence",
    expectedGlassColor: "steel",
    expectedLiquidColor: "steel",
    expectedParticleCount: 4,
  },
  {
    category: "Productivity",
    status: "In Progress",
    archived: false,
    deviceTier: "high",
    expectedArchetype: "editorial_motion",
    expectedGlassColor: "slate",
    expectedLiquidColor: "violet",
    expectedParticleCount: 6,
  },
];

function runTests() {
  console.log("=== RUNNING VISUAL TAXONOMY PROFILE TESTS ===");
  let failures = 0;

  testCases.forEach((tc, index) => {
    try {
      const profile = getVisualProfile(tc.category, tc.status, tc.archived, tc.deviceTier);
      
      if (profile.archetype !== tc.expectedArchetype) {
        throw new Error(`Archetype mismatch. Expected "${tc.expectedArchetype}", got "${profile.archetype}"`);
      }
      if (profile.material.glassColor !== tc.expectedGlassColor) {
        throw new Error(`Glass color mismatch. Expected "${tc.expectedGlassColor}", got "${profile.material.glassColor}"`);
      }
      if (profile.material.liquidColor !== tc.expectedLiquidColor) {
        throw new Error(`Liquid color mismatch. Expected "${tc.expectedLiquidColor}", got "${profile.material.liquidColor}"`);
      }
      if (profile.particles.count !== tc.expectedParticleCount) {
        throw new Error(`Particle count mismatch. Expected "${tc.expectedParticleCount}", got "${profile.particles.count}"`);
      }

      console.log(`[PASS] Case ${index + 1}: ${tc.category} + ${tc.status} (archived: ${tc.archived}, tier: ${tc.deviceTier}) -> ${profile.archetype}`);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`[FAIL] Case ${index + 1}: ${tc.category} + ${tc.status} (archived: ${tc.archived}, tier: ${tc.deviceTier})`);
      console.error(`       Error: ${errorMsg}`);
      failures++;
    }
  });

  if (failures > 0) {
    console.error(`\nVisual taxonomy tests failed: ${failures} errors.`);
    process.exit(1);
  } else {
    console.log("\n[All Visual Taxonomy tests passed successfully]\n");
  }
}

runTests();
