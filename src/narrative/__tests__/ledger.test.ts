import { getLedgerEvents } from "../queries/ledger";
import { NARRATIVE_GRAPH } from "../registry";

function runLedgerTests() {
  console.log("=== RUNNING LABORATORY LEDGER INTEGRITY TESTS ===");
  let failures = 0;

  const events = getLedgerEvents();

  // 1. Verify we compile events
  if (events.length === 0) {
    console.error("[FAIL] Ledger resolved 0 events.");
    failures++;
  } else {
    console.log(`[PASS] Ledger compiled successfully with ${events.length} chronological events.`);
  }

  // 2. Check Event ID Uniqueness
  const eventIds = new Set<string>();
  events.forEach((event) => {
    if (eventIds.has(event.id)) {
      console.error(`[FAIL] Duplicate Ledger Event ID: ${event.id}`);
      failures++;
    }
    eventIds.add(event.id);
  });
  if (eventIds.size === events.length) {
    console.log("[PASS] All ledger event IDs are unique.");
  }

  // 3. Verify chronological sorting (newest first)
  let isSorted = true;
  for (let i = 0; i < events.length - 1; i++) {
    const timeA = new Date(events[i].date).getTime();
    const timeB = new Date(events[i + 1].date).getTime();
    if (timeA < timeB) {
      isSorted = false;
      console.error(`[FAIL] Out of order chronology: "${events[i].title}" (${events[i].date}) came before "${events[i + 1].title}" (${events[i + 1].date})`);
      failures++;
    }
  }
  if (isSorted) {
    console.log("[PASS] Ledger is sorted chronologically in descending order.");
  }

  // 4. Verify semantic graph triples target valid nodes
  let missingTriples = 0;
  events.forEach((event) => {
    const triples = event.metadata.relatedTriples || [];
    triples.forEach((triple) => {
      if (!NARRATIVE_GRAPH.nodes[triple.subject]) {
        console.error(`[FAIL] Event ${event.id} refers to non-existent subject node: ${triple.subject}`);
        missingTriples++;
        failures++;
      }
      if (!NARRATIVE_GRAPH.nodes[triple.object]) {
        console.error(`[FAIL] Event ${event.id} refers to non-existent object node: ${triple.object}`);
        missingTriples++;
        failures++;
      }
    });
  });
  if (missingTriples === 0) {
    console.log("[PASS] All semantic relationship triples reference valid graph nodes.");
  }

  // 5. Schema verification
  let schemaErrors = 0;
  events.forEach((event) => {
    if (!event.id || !event.date || !event.type || !event.title || !event.description || !event.slug || !event.route || !event.metadata) {
      console.error(`[FAIL] Event ${event.id} fails core schema verification.`);
      schemaErrors++;
      failures++;
    }
  });
  if (schemaErrors === 0) {
    console.log("[PASS] All ledger events satisfy structural schema models.");
  }

  if (failures > 0) {
    console.error(`\nLedger validation failed: ${failures} errors.`);
    process.exit(1);
  } else {
    console.log("\n[All Laboratory Ledger validation checks passed successfully]\n");
  }
}

runLedgerTests();
