import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import VideoPreviewSection from "@/components/VideoPreviewSection";
import LineBenefitsSection from "@/components/LineBenefitsSection";
import StepsSection from "@/components/StepsSection";
import RecommendedSection from "@/components/RecommendedSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";
import StickyLineCta from "@/components/StickyLineCta";

export default function Home() {
  return (
    <>
      <Header />
      {/* has-sticky-cta：追従ボタン分の余白を確保し、最下部が隠れないようにする */}
      <main className="has-sticky-cta">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <VideoPreviewSection />
        <LineBenefitsSection />
        <StepsSection />
        <RecommendedSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
        <Footer />
      </main>
      <StickyLineCta />
    </>
  );
}
