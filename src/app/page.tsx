import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WelcomeBanner from "@/components/ui/WelcomeBanner";
import HeroSection from "@/components/home/HeroSection";
import LabStatusPanel from "@/components/home/LabStatusPanel";
import FieldNotesSection from "@/components/home/FieldNotesSection";
import ExperimentRack from "@/components/experiments/ExperimentRack";
import SectionPlaceholder from "@/components/ui/SectionPlaceholder";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* Entry experience */}
      <WelcomeBanner />

      {/* Fixed navigation */}
      <Navigation />

      {/* Main content */}
      <main id="main-content" role="main">
        {/* Hero — VINAY / [Title] / KRISHNA */}
        <HeroSection />

        {/* Laboratory Status — field notes panel */}
        <LabStatusPanel />

        {/* Field Notes — inventor thoughts */}
        <FieldNotesSection />

        {/* Experiment Rack — Phase 2 foundation */}
        <ExperimentRack />

        {/* Blueprints — Phase 3 */}
        <SectionPlaceholder
          id="blueprints"
          sectionNumber="02"
          title="Blueprints"
          description="Technical architecture diagrams, system designs, and the engineering maps behind each experiment."
          phase="Phase 3"
        />

        {/* Research Log — Phase 4 */}
        <SectionPlaceholder
          id="research-log"
          sectionNumber="03"
          title="Research Log"
          description="A living journal of learnings, discoveries, and notes from the workbench. Thoughts become experiments, experiments become products."
          phase="Phase 4"
        />

        {/* Laboratory Correspondence */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
