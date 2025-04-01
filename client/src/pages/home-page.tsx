import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturedApps } from "@/components/featured-apps";
import { HowItWorks } from "@/components/how-it-works";
import { TopTesters } from "@/components/top-testers";
import { CTASection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedApps />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <TopTesters />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
