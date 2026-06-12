import { ParticlePreset } from "../types";

export const technicalLaboratoryParticles: ParticlePreset = {
  count: 16,
  baseSize: 0.03,
  hoverSize: 0.05,
  opacity: 0.7,
  driftSpeed: 0.8,
  driftPattern: "vertical",
  blending: "additive",
};

export const livingArchiveParticles: ParticlePreset = {
  count: 8,
  baseSize: 0.06,
  hoverSize: 0.1,
  opacity: 0.9,
  driftSpeed: 0.4,
  driftPattern: "spiral",
  blending: "additive",
};

export const networkIntelligenceParticles: ParticlePreset = {
  count: 32,
  baseSize: 0.04,
  hoverSize: 0.06,
  opacity: 0.8,
  driftSpeed: 1.6,
  driftPattern: "chaotic",
  blending: "additive",
};

export const editorialMotionParticles: ParticlePreset = {
  count: 6,
  baseSize: 0.05,
  hoverSize: 0.08,
  opacity: 0.5,
  driftSpeed: 0.5,
  driftPattern: "vertical",
  blending: "normal",
};
