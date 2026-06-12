import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { getKnowledgeArtifacts, getInsightArticleData } from "@/insights/resolvers/artifacts";
import { InsightArticle } from "@/components/insights";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const artifacts = getKnowledgeArtifacts();
  return artifacts.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: InsightPageProps) {
  const { slug } = await params;
  const data = getInsightArticleData(slug);
  if (!data) {
    return { title: "Insight Not Found" };
  }

  return {
    title: `${data.artifact.title} | Engineering Insights`,
    description: data.artifact.summary,
    alternates: {
      canonical: `/insights/${data.artifact.slug}`,
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const data = getInsightArticleData(slug);

  if (!data) {
    notFound();
  }

  const { artifact } = data;

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
        "name": artifact.title,
        "item": `https://experiment-zero.vercel.app/insights/${artifact.slug}`,
      },
    ],
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": artifact.title,
    "description": artifact.summary,
    "inLanguage": "en",
    "about": artifact.metadata.semanticTags.map((tag) => ({
      "@type": "Thing",
      "name": tag,
    })),
    "author": {
      "@type": "Person",
      "name": "Vinay Krishna",
      "url": "https://vinaykrishna.dev",
    },
    "publisher": {
      "@type": "Person",
      "name": "Vinay Krishna",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://experiment-zero.vercel.app/insights/${artifact.slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
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

        <InsightArticle data={data} />
      </main>

      <Footer />
    </>
  );
}
