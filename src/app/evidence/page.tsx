import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { getSkillMatrix } from "@/evidence/resolvers";
import SkillMatrix from "@/components/narrative/SkillMatrix";

export const metadata = {
  title: "Engineering Skill Matrix | Experiment Zero",
  description: "Dynamic competency mapping matching core engineering capabilities directly to verified software assets, case studies, and insights.",
};

export default function EvidencePage() {
  const matrix = getSkillMatrix();

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
        "name": "Evidence Matrix",
        "item": "https://experiment-zero.vercel.app/evidence",
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Engineering Skill & Evidence Matrix",
    "description": "Proof-driven matrix mapping senior-level developer competencies to physical experiments, architectural blueprints, and dynamic insights.",
    "url": "https://experiment-zero.vercel.app/evidence",
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
        {/* Header Block */}
        <div style={{ marginBottom: "3rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "var(--accent-copper)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            Candidate Portfolio Proof
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
            Skill & Evidence Matrix
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              color: "var(--fg-secondary)",
              maxWidth: "720px",
              lineHeight: 1.5,
            }}
          >
            A dynamic quick-scan dashboard built for recruiters and engineering hiring managers.
            Matches specific senior-level competencies directly to the supporting case studies,
            design verifications, and performance audits in this repository.
          </p>
        </div>

        {/* Matrix Grid */}
        <SkillMatrix matrix={matrix} />
      </main>

      <Footer />
    </>
  );
}
