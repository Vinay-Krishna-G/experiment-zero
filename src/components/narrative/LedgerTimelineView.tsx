"use client";

import React, { useState, useMemo, useRef } from "react";
import LedgerCard from "./LedgerCard";
import type { LedgerEvent } from "./types";

export default function LedgerTimelineView({ 
  initialEvents, 
  title = "Archival Ledger" 
}: { 
  initialEvents: LedgerEvent[];
  title?: string;
}) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const timelineRef = useRef<HTMLDivElement>(null);

  // Filter and search logic
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const matchesType = selectedType === "all" || event.type === selectedType;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        query === "" ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.metadata.projectName.toLowerCase().includes(query) ||
        event.metadata.semanticTags.some(tag => tag.toLowerCase().includes(query));

      return matchesType && matchesSearch;
    });
  }, [initialEvents, selectedType, searchQuery]);

  // Group events by Year + Month chronologically
  const groupedEvents = useMemo(() => {
    const groups: Record<string, LedgerEvent[]> = {};
    
    filteredEvents.forEach((event) => {
      const date = new Date(event.date);
      const year = date.getFullYear();
      const month = date.toLocaleString("en-US", { month: "long" });
      const groupKey = `${year}-${month}`;
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(event);
    });

    return groups;
  }, [filteredEvents]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    
    // Shift focus back to top of timeline for accessibility
    if (timelineRef.current) {
      timelineRef.current.focus();
    }
  };

  return (
    <div className="relative">
      {/* Skip Link for Keyboard Navigation */}
      <a 
        href="#ledger-end-anchor" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-500 text-neutral-950 font-mono text-xs font-bold rounded shadow-lg transition"
      >
        Skip Timeline Content
      </a>

      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-serif text-white font-medium">{title}</h2>
          <p className="text-sm text-white/50 font-mono mt-1" aria-live="polite">
            Viewing {filteredEvents.length} ledger nodes
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64">
          <input
            type="search"
            placeholder="Search ledger..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm text-white bg-white/5 border border-white/10 rounded focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 font-mono"
            aria-label="Search ledger items"
          />
        </div>
      </header>

      {/* Filter Toolbar */}
      <nav className="flex flex-wrap gap-2 mb-10" aria-label="Timeline node filter controls">
        {[
          { label: "All Nodes", value: "all" },
          { label: "Research Logs", value: "research_log" },
          { label: "Milestones", value: "milestone" },
          { label: "Status Changes", value: "status_change" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => handleTypeChange(btn.value)}
            className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase border transition duration-250 cursor-pointer ${
              selectedType === btn.value
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                : "bg-white/5 border-white/10 hover:border-white/20 text-white/70 hover:text-white"
            }`}
            aria-pressed={selectedType === btn.value}
          >
            {btn.label}
          </button>
        ))}
      </nav>

      {/* Screen Reader Announcement Region */}
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        Filtered timeline showing {filteredEvents.length} events matching {selectedType === "all" ? "all types" : selectedType.replace("_", " ")}
      </div>

      {/* Timeline Stream */}
      <div 
        ref={timelineRef}
        tabIndex={-1} 
        className="focus:outline-none space-y-12"
      >
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center font-mono italic text-sm text-white/40 border border-dashed border-white/5 rounded">
            No chronological ledger items match selected query filters.
          </div>
        ) : (
          Object.entries(groupedEvents).map(([groupKey, events]) => {
            const [year, month] = groupKey.split("-");

            return (
              <section 
                key={groupKey} 
                aria-labelledby={`heading-${groupKey}`}
                className="relative border-l border-white/10 pl-6 ml-3 space-y-6"
              >
                {/* Visual grouping node */}
                <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-neutral-950" />

                <h3 
                  id={`heading-${groupKey}`} 
                  className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-4"
                >
                  {month} {year}
                </h3>

                <ol className="space-y-6" role="list">
                  {events.map((event) => (
                    <li key={event.id}>
                      <LedgerCard event={event} />
                    </li>
                  ))}
                </ol>
              </section>
            );
          })
        )}
      </div>

      {/* Skip Link Anchor */}
      <div id="ledger-end-anchor" tabIndex={-1} className="sr-only">
        End of Laboratory Ledger timeline stream.
      </div>
    </div>
  );
}
