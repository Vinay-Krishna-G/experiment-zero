import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { getKnowledgeClusters, getKnowledgeClusterByCategory } from "@/insights/resolvers/clusters";
import { CategoryHeader, ClusterRelatedList, InsightCard } from "@/components/insights";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const clusters = getKnowledgeClusters();
  return clusters.map((c) => ({
    category: c.category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const data = getKnowledgeClusterByCategory(category);
  if (!data) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${data.cluster.title} | Knowledge Clusters`,
    description: data.cluster.description,
    alternates: {
      canonical: `/insights/category/${data.cluster.category}`,
    },
  };
}

export default async function CategoryClusterPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const data = getKnowledgeClusterByCategory(category);

  if (!data) {
    notFound();
  }

  const { cluster, artifacts, relatedClusters } = data;

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
      {
        "@type": "ListItem",
        "position": 3,
        "name": cluster.title,
        "item": `https://experiment-zero.vercel.app/insights/category/${cluster.category}`,
      },
    ],
  };

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": cluster.title,
    "description": cluster.description,
    "inDefinedTermSet": "https://experiment-zero.vercel.app/ledger",
    "url": `https://experiment-zero.vercel.app/insights/category/${cluster.category}`,
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${cluster.title} Knowledge Hub`,
    "description": cluster.description,
    "url": `https://experiment-zero.vercel.app/insights/category/${cluster.category}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
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
        {/* Back Link */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/insights"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--fg-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="ink-underline"
          >
            &larr; Back to Insights
          </Link>
        </div>

        {/* Category Header with Recruiter Profile Capabilities */}
        <CategoryHeader cluster={cluster} />

        {/* Content Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            alignItems: "flex-start",
          }}
          className="category-cluster-layout"
        >
          {/* Main List */}
          <section aria-labelledby="cluster-articles-heading">
            <h2
              id="cluster-articles-heading"
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
              Cluster Articles ({artifacts.length})
            </h2>

            {artifacts.length === 0 ? (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "var(--fg-muted)",
                  fontStyle: "italic",
                }}
              >
                No public insights in this category cluster yet.
              </p>
            ) : (
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
            )}
          </section>

          {/* Sidebar */}
          <aside className="category-sidebar">
            <ClusterRelatedList
              relatedClusters={relatedClusters}
              currentClusterId={cluster.id}
            />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
