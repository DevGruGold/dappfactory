import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MobileCallout } from "@/components/MobileCallout";
import { TermuxSetup } from "@/components/TermuxSetup";
import { Web3Auth } from "@/components/Web3Auth";
import { Pricing } from "@/components/Pricing";
import { PricingComparison } from "@/components/PricingComparison";
import { WhatYouGet } from "@/components/WhatYouGet";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <MobileCallout />
      <Features />
      <HowItWorks />
      <TermuxSetup />
      <Pricing />
      <PricingComparison />
      <WhatYouGet />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Web3Auth />
      </div>
    </div>
  );
};

export default Index;