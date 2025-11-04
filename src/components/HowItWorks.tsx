import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCode2, Settings, Zap, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Choose Your Template",
    description: "Select from pre-built, audited smart contract templates including ERC20 tokens, NFTs, DAOs, and more.",
    icon: FileCode2,
  },
  {
    number: 2,
    title: "Configure & Customize",
    description: "Set up your wallet, connect Alchemy API, and customize your contract parameters with our intuitive interface.",
    icon: Settings,
  },
  {
    number: 3,
    title: "Automated Setup",
    description: "Our system automatically installs dependencies, configures Hardhat, and prepares your development environment.",
    icon: Zap,
  },
  {
    number: 4,
    title: "Deploy to Polygon",
    description: "One-click deployment to Polygon Mumbai testnet or mainnet. Your dApp is live in minutes, not hours.",
    icon: Rocket,
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment in four simple steps. No complex setup, no headaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="group"
            onClick={() => window.location.href = 'https://maticdapps.vercel.app/'}
          >
            Start Building Your dApp
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
