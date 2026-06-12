import { ALL_EXPERIMENTS, ALL_BLUEPRINTS, ALL_RESEARCH_LOGS } from "./index";

function isValidISODate(dateStr: string): boolean {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const parts = dateStr.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function validateContent() {
  let errors = 0;
  const warnings = 0;

  const experimentIds = new Set<string>();
  const experimentSlugs = new Set<string>();
  const blueprintIds = new Set<string>();
  const blueprintSlugs = new Set<string>();
  const researchLogIds = new Set<string>();
  const researchLogSlugs = new Set<string>();

  let publicCount = 0;
  let unlistedCount = 0;
  let draftCount = 0;

  const countVisibility = (visibility: string) => {
    if (visibility === "public") publicCount++;
    else if (visibility === "unlisted") unlistedCount++;
    else if (visibility === "draft") draftCount++;
  };

  // 1. Gather and check uniqueness of IDs/Slugs and validate Date Formats
  ALL_EXPERIMENTS.forEach((exp) => {
    countVisibility(exp.visibility);

    // ID Uniqueness
    if (experimentIds.has(exp.id)) {
      console.error(`[ERROR] Duplicate Experiment ID: ${exp.id}`);
      errors++;
    }
    experimentIds.add(exp.id);

    // Slug Uniqueness
    if (experimentSlugs.has(exp.slug)) {
      console.error(`[ERROR] Duplicate Experiment Slug: ${exp.slug}`);
      errors++;
    }
    experimentSlugs.add(exp.slug);

    // Date Format
    if (!isValidISODate(exp.publishedAt)) {
      console.error(`[ERROR] Invalid publishedAt date for Experiment (${exp.id}): ${exp.publishedAt}`);
      errors++;
    }
    if (exp.updatedAt && !isValidISODate(exp.updatedAt)) {
      console.error(`[ERROR] Invalid updatedAt date for Experiment (${exp.id}): ${exp.updatedAt}`);
      errors++;
    }
  });

  ALL_BLUEPRINTS.forEach((bp) => {
    countVisibility(bp.visibility);

    // ID Uniqueness
    if (blueprintIds.has(bp.id)) {
      console.error(`[ERROR] Duplicate Blueprint ID: ${bp.id}`);
      errors++;
    }
    blueprintIds.add(bp.id);

    // Slug Uniqueness
    if (blueprintSlugs.has(bp.slug)) {
      console.error(`[ERROR] Duplicate Blueprint Slug: ${bp.slug}`);
      errors++;
    }
    blueprintSlugs.add(bp.slug);

    // Date Format
    if (!isValidISODate(bp.publishedAt)) {
      console.error(`[ERROR] Invalid publishedAt date for Blueprint (${bp.id}): ${bp.publishedAt}`);
      errors++;
    }
    if (bp.updatedAt && !isValidISODate(bp.updatedAt)) {
      console.error(`[ERROR] Invalid updatedAt date for Blueprint (${bp.id}): ${bp.updatedAt}`);
      errors++;
    }
  });

  ALL_RESEARCH_LOGS.forEach((log) => {
    countVisibility(log.visibility);

    // ID Uniqueness
    if (researchLogIds.has(log.id)) {
      console.error(`[ERROR] Duplicate Research Log ID: ${log.id}`);
      errors++;
    }
    researchLogIds.add(log.id);

    // Slug Uniqueness
    if (researchLogSlugs.has(log.slug)) {
      console.error(`[ERROR] Duplicate Research Log Slug: ${log.slug}`);
      errors++;
    }
    researchLogSlugs.add(log.slug);

    // Date Format
    if (!isValidISODate(log.publishedAt)) {
      console.error(`[ERROR] Invalid publishedAt date for Research Log (${log.id}): ${log.publishedAt}`);
      errors++;
    }
    if (log.updatedAt && !isValidISODate(log.updatedAt)) {
      console.error(`[ERROR] Invalid updatedAt date for Research Log (${log.id}): ${log.updatedAt}`);
      errors++;
    }
  });

  // 2. Validate Cross-References / Dangling References
  ALL_EXPERIMENTS.forEach((exp) => {
    // blueprintId reference check
    if (exp.blueprintId && !blueprintIds.has(exp.blueprintId)) {
      console.error(`[ERROR] Dangling Reference in Experiment (${exp.id}): blueprintId "${exp.blueprintId}" does not exist.`);
      errors++;
    }

    // relatedIds reference checks
    if (exp.relatedIds) {
      exp.relatedIds.forEach((relId) => {
        if (!experimentIds.has(relId)) {
          console.error(`[ERROR] Dangling Reference in Experiment (${exp.id}): relatedId "${relId}" does not exist.`);
          errors++;
        }
      });
    }
  });

  ALL_RESEARCH_LOGS.forEach((log) => {
    // relatedExperimentId check
    if (log.relatedExperimentId && !experimentIds.has(log.relatedExperimentId)) {
      console.error(`[ERROR] Dangling Reference in Research Log (${log.id}): relatedExperimentId "${log.relatedExperimentId}" does not exist.`);
      errors++;
    }

    // relatedBlueprintId check
    if (log.relatedBlueprintId && !blueprintIds.has(log.relatedBlueprintId)) {
      console.error(`[ERROR] Dangling Reference in Research Log (${log.id}): relatedBlueprintId "${log.relatedBlueprintId}" does not exist.`);
      errors++;
    }
  });

  // 3. Output Summary
  console.log("\n[Content Validated]");
  console.log(`Experiments: ${ALL_EXPERIMENTS.length} | Blueprints: ${ALL_BLUEPRINTS.length} | Research Logs: ${ALL_RESEARCH_LOGS.length}`);
  console.log(`Visibility: ${publicCount} Public | ${unlistedCount} Unlisted | ${draftCount} Drafts`);
  console.log(`Sitemap Index: ${publicCount} URLs (plus base routes)`);
  
  if (errors > 0 || warnings > 0) {
    console.log(`Errors: ${errors}, Warnings: ${warnings}`);
  }

  if (errors > 0) {
    console.error("Content validation failed.");
    process.exit(1);
  }
}

validateContent();
