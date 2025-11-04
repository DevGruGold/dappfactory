import { Card } from "@/components/ui/card";
import { Smartphone, Terminal, Zap, Globe } from "lucide-react";

const highlights = [
  {
    icon: Smartphone,
    text: "Works entirely on Android smartphones via Termux",
  },
  {
    icon: Zap,
    text: "No expensive computer or laptop needed",
  },
  {
    icon: Terminal,
    text: "Deploy smart contracts from anywhere",
  },
  {
    icon: Globe,
    text: "Perfect for developers on the go",
  },
];

export const MobileCallout = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block p-4 md:p-6 rounded-full bg-primary/10 mb-4 md:mb-6">
            <Smartphone className="h-12 w-12 md:h-16 md:w-16 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Blockchain Development. In Your Pocket.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Build and deploy powerful dApps using nothing but your smartphone. No desktop required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {highlights.map((highlight, index) => (
            <Card 
              key={index} 
              className="p-4 md:p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow min-h-[120px]"
            >
              <highlight.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />
              <p className="text-sm md:text-base font-medium leading-relaxed">
                {highlight.text}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <a 
            href="https://github.com/DevGruGold/dappfactory/blob/main/README.md"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm md:text-base font-medium min-h-[44px]"
          >
            Learn How to Set Up Termux →
          </a>
        </div>
      </div>
    </section>
  );
};
