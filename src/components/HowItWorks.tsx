import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Terminal, Wallet, Rocket, Smartphone } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Install Termux & Get Started",
    description: "Download Termux from F-Droid or Google Play on your Android smartphone. No PC needed.",
    icon: Download,
    mobileIcon: Smartphone,
  },
  {
    number: 2,
    title: "Run the Setup Script",
    description: "Copy and paste one simple command into Termux. Our automated script handles everything.",
    icon: Terminal,
    mobileIcon: Smartphone,
  },
  {
    number: 3,
    title: "Configure Your Wallet",
    description: "Set up MetaMask mobile, get test MATIC, and connect your Alchemy API - all from your phone.",
    icon: Wallet,
    mobileIcon: Smartphone,
  },
  {
    number: 4,
    title: "Deploy to Polygon",
    description: "One command deploys your smart contract to Polygon. All from your smartphone - no PC needed.",
    icon: Rocket,
    mobileIcon: Smartphone,
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            How It Works (On Your Phone!)
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Deploy smart contracts to Polygon in 4 simple steps - all from your smartphone via Termux
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow h-full flex flex-col min-h-[220px]">
                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg md:text-xl">
                    {step.number}
                  </div>
                  <div className="flex gap-2">
                    <step.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    <step.mobileIcon className="h-6 w-6 md:h-8 md:w-8 text-primary/60" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                  {step.description}
                </p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="group w-full sm:w-auto min-h-[48px] text-base"
            onClick={() => window.location.href = 'https://maticdapps.vercel.app/'}
          >
            Start Building Your dApp
            <Smartphone className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          </Button>
          <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
            Works on any Android smartphone with Termux
          </p>
        </div>
      </div>
    </section>
  );
};
