"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { InsightArticleViewData } from "@/insights/types";
import RecruiterPanel from "./RecruiterPanel";
import RelatedGraphPanel from "./RelatedGraphPanel";
import { ImpactPanel } from "@/components/narrative";

interface InsightArticleProps {
  data: InsightArticleViewData;
}

export default function InsightArticle({ data }: InsightArticleProps) {
  const { artifact, connectedNodes, relatedInsights } = data;

  const categoryLabel = artifact.knowledgeCategory
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2.5rem",
        alignItems: "flex-start",
      }}
      className="insight-article-layout"
    >
      {/* Article content block */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        
        {/* Header Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "var(--accent-emerald)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {categoryLabel}
            </span>
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "var(--fg-subtle)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 500,
                color: "var(--fg-muted)",
                backgroundColor: "var(--bg-secondary)",
                padding: "0.15rem 0.5rem",
                borderRadius: "4px",
                textTransform: "uppercase",
              }}
            >
              Tier: {artifact.knowledgeTier.replace(/_/g, " ")}
            </span>
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "var(--fg-subtle)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 500,
                color: "var(--accent-copper)",
                border: "1px dashed rgba(146, 64, 14, 0.4)",
                padding: "0.15rem 0.5rem",
                borderRadius: "4px",
                textTransform: "uppercase",
              }}
            >
              Status: {artifact.lifecycleStatus}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "var(--fg-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            {artifact.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              lineHeight: 1.5,
              color: "var(--fg-secondary)",
              maxWidth: "700px",
            }}
          >
            {artifact.summary}
          </p>
        </motion.div>

        {/* Section 1: Takeaway */}
        <section
          aria-labelledby="takeaway-heading"
          style={{
            padding: "1.5rem",
            backgroundColor: "rgba(45, 106, 79, 0.03)",
            border: "1px solid var(--accent-emerald-dim)",
            borderLeft: "4px solid var(--accent-emerald)",
            borderRadius: "4px",
          }}
        >
          <h2
            id="takeaway-heading"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--accent-emerald)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.5rem",
            }}
          >
            Key Engineering Takeaway
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              fontWeight: 500,
              lineHeight: 1.5,
              color: "var(--fg-primary)",
            }}
          >
            &ldquo;{artifact.takeaway}&rdquo;
          </p>
        </section>

        {/* Section 2: Problem Context */}
        <section
          aria-labelledby="problem-heading"
          style={{
            borderBottom: "1px dashed var(--border-subtle)",
            paddingBottom: "2rem",
          }}
        >
          <h2
            id="problem-heading"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            01 / Problem Context
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--fg-secondary)",
            }}
          >
            {artifact.problemContext}
          </p>
        </section>

        {/* Section 3: Discovery */}
        <section
          aria-labelledby="discovery-heading"
          style={{
            borderBottom: "1px dashed var(--border-subtle)",
            paddingBottom: "2rem",
          }}
        >
          <h2
            id="discovery-heading"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            02 / Discovery & Analytics
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--fg-secondary)",
            }}
          >
            {artifact.discoveryContext}
          </p>
        </section>

        {/* Section 4: Engineering Actions (Change) */}
        <section
          aria-labelledby="change-heading"
          style={{
            borderBottom: "1px dashed var(--border-subtle)",
            paddingBottom: "2rem",
          }}
        >
          <h2
            id="change-heading"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            03 / Implementation Details
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--fg-secondary)",
            }}
          >
            {artifact.changeContext}
          </p>
        </section>

        {/* Section 5: Impact */}
        <section aria-labelledby="impact-heading">
          <h2
            id="impact-heading"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            04 / Quantitative & UX Impact
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--fg-secondary)",
            }}
          >
            {artifact.impactContext}
          </p>
        </section>
        {artifact.evidence && <ImpactPanel evidence={artifact.evidence} />}
      </div>

      {/* Sidebar block */}
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
        className="insight-sidebar"
      >
        <RecruiterPanel
          careerSignal={artifact.careerSignal}
          importanceScore={artifact.importanceScore}
          confidenceScore={artifact.confidenceScore}
          takeaway={artifact.takeaway}
          impactContext={artifact.importanceContext}
        />

        <RelatedGraphPanel connectedNodes={connectedNodes} />

        {/* Sibling articles list */}
        {relatedInsights.length > 0 && (
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px",
              boxShadow: "0 2px 12px rgba(28, 25, 23, 0.02)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--fg-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "0.5rem",
              }}
            >
              Related Insights
            </h3>

            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {relatedInsights.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/insights/${link.slug}`}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: "0.15rem",
                    }}
                    className="ink-underline"
                  >
                    {link.title}
                  </Link>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      color: "var(--fg-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.category.replace(/_/g, " ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
