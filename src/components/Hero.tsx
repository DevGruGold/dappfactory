import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const Hero = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    window.location.href = 'https://maticdapps.vercel.app/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 pt-16">
      <div className="container px-4 py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          📱 100% Mobile-Friendly
        </div>
        <div className="animate-float inline-block mb-6">
          <Code2 className="h-12 w-12 md:h-16 md:w-16 text-primary mx-auto" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-tight">
          Build dApps from Your Smartphone
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          No PC required. Deploy smart contracts to Polygon directly from your phone using Termux. The entire blockchain development process in your pocket.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none">
          <Button size="lg" className="group w-full sm:w-auto min-h-[48px]" onClick={handleGetStarted}>
            Start Building
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px]" onClick={() => window.location.href = 'https://github.com/DevGruGold/dappfactory/blob/main/README.md'}>
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};