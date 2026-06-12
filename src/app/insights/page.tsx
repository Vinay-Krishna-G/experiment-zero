import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { getKnowledgeArtifacts } from "@/insights/resolvers/artifacts";
import { getKnowledgeClusters } from "@/insights/resolvers/clusters";
import { InsightCard } from "@/components/insights";

export const metadata = {
  title: "Engineering Insights | Experiment Zero",
  description: "Curated research findings, technical articles, and validated engineering patterns extracted from Experiment Zero's laboratory logs.",
};

export default function InsightsPage() {
  const artifacts = getKnowledgeArtifacts();
  const clusters = getKnowledgeClusters();

  // Structured Data schemas
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Laboratory",
        "item": "https://experiment-zero.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": "https://experiment-zero.vercel.app/insights",
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Engineering Insights Directory",
    "description": "Chronological index of technical takeaways, system design decisions, and GPU/WebGL optimization findings.",
    "url": "https://experiment-zero.vercel.app/insights",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": artifacts.map((art, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `https://experiment-zero.vercel.app/insights/${art.slug}`,
        "name": art.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Navigation />

      <main
        id="main-content"
        role="main"
        className="container-lab"
        style={{
          minHeight: "75vh",
          paddingBlock: "5rem 4rem",
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: "3rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "var(--accent-emerald)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            05 / Intelligence Hub
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--fg-primary)",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
          >
            Engineering Insights
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              color: "var(--fg-secondary)",
              maxWidth: "680px",
              lineHeight: 1.5,
            }}
          >
            Deep dive summaries, technical solutions, and verified design patterns compiled
            dynamically from laboratory logs and architectural blueprints.
          </p>
        </div>

        {/* Section: Category Clusters */}
        <section
          aria-labelledby="clusters-heading"
          style={{ marginBottom: "4rem" }}
        >
          <h2
            id="clusters-heading"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "0.5rem",
            }}
          >
            Knowledge Clusters
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {clusters.map((cluster) => (
              <div
                key={cluster.id}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(28, 25, 23, 0.01)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                      color: "var(--fg-primary)",
                    }}
                  >
                    {cluster.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "var(--fg-secondary)",
                      lineHeight: 1.45,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {cluster.description}
                  </p>
                </div>
                <Link
                  href={`/insights/category/${cluster.category}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--accent-emerald)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                  className="ink-underline"
                >
                  Explore Category &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section: All Articles */}
        <section aria-labelledby="articles-heading">
          <h2
            id="articles-heading"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "0.5rem",
            }}
          >
            All Technical Articles
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {artifacts.map((artifact, index) => (
              <div key={artifact.id}>
                <InsightCard artifact={artifact} index={index} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
