import { Features } from "@/components/Features";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Web3Auth } from "@/components/Web3Auth";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <div className="container mx-auto px-4 py-8">
        <Web3Auth />
      </div>
    </div>
  );
};

export default Index;