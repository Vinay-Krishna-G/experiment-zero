import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ExperimentRack from "@/components/experiments/ExperimentRack";
import BlueprintArchive from "@/components/blueprints/BlueprintArchive";
import ResearchLogArchive from "@/components/research/ResearchLogArchive";
import HireMeSection from "@/components/home/HireMeSection";
import VisitorStats from "@/components/home/VisitorStats";

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main id="main-content" role="main">
        {/* 00 — Hero */}
        <HeroSection />

        {/* 01 — Experiments */}
        <ExperimentRack />

        {/* 02 — Blueprint Archive */}
        <BlueprintArchive />

        {/* 03 — Notes (Research Log) */}
        <ResearchLogArchive />

        {/* 04 — Hire Me */}
        <HireMeSection />

        {/* 05 — Visitor Stats */}
        <VisitorStats />
      </main>

      <Footer />
    </>
  );
}
