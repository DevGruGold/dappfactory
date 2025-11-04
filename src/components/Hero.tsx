import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const Hero = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    const subject = encodeURIComponent("Demo Request for The dApp Factory");
    const body = encodeURIComponent("Hi Joe,\n\nI'd like to request a demo of The dApp Factory.\n\nBest regards");
    window.location.href = `mailto:xmrtsolutions@gmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Demo Request Initiated",
      description: "Opening your email client to send a demo request.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 pt-16">
      <div className="container px-4 py-16 text-center">
        <div className="animate-float inline-block mb-8">
          <Code2 className="h-16 w-16 text-primary mx-auto" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Build Your dApp in Minutes
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          The easiest way to create, deploy, and manage decentralized applications. No complex setup required.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" className="group" onClick={handleGetStarted}>
            Start Building
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.location.href = 'https://github.com/DevGruGold/dappfactory/blob/main/README.md'}>
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};