import Navbar from "@/components/layout/Navbar";
import GridBackground from "@/components/layout/GridBackground";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import ParticleField from "@/components/layout/ParticleField";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoadSequence from "@/components/animations/PageLoadSequence";
import HeroSection from "@/components/sections/HeroSection";
import PainSection from "@/components/sections/PainSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import WaitlistSection from "@/components/sections/WaitlistSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <PageLoadSequence />
      <ScrollProgressBar />
      <CustomCursor />
      <NoiseOverlay />
      <ParticleField />
      <GridBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <PainSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SocialProofSection />
        <WaitlistSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
