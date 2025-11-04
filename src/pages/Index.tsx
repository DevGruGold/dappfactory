import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MobileCallout } from "@/components/MobileCallout";
import { Web3Auth } from "@/components/Web3Auth";
import { Pricing } from "@/components/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <MobileCallout />
      <Features />
      <HowItWorks />
      <Pricing />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Web3Auth />
      </div>
    </div>
  );
};

export default Index;