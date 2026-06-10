import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WelcomeBanner from "@/components/ui/WelcomeBanner";
import HeroSection from "@/components/home/HeroSection";
import LabStatusPanel from "@/components/home/LabStatusPanel";
import FieldNotesSection from "@/components/home/FieldNotesSection";
import ExperimentRack from "@/components/experiments/ExperimentRack";
import BlueprintArchive from "@/components/blueprints/BlueprintArchive";
import SectionPlaceholder from "@/components/ui/SectionPlaceholder";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <WelcomeBanner />
      <Navigation />

      <main id="main-content" role="main">
        {/* 00 — Hero */}
        <HeroSection />

        {/* 00 — Laboratory Status */}
        <LabStatusPanel />

        {/* — Field Notes */}
        <FieldNotesSection />

        {/* 01 — Experiments */}
        <ExperimentRack />

        {/* 02 — Blueprint Archive */}
        <BlueprintArchive />

        {/* 03 — Research Log (Phase 4) */}
        <SectionPlaceholder
          id="research-log"
          sectionNumber="03"
          title="Research Log"
          description="A living journal of learnings, discoveries, and notes from the workbench. Thoughts become experiments, experiments become products."
          phase="Phase 4"
        />

        {/* 04 — Laboratory Correspondence */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
