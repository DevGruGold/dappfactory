import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Terminal, Rocket, Lock } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const TermuxSetup = () => {
  const { t } = useTranslation();

  const features = [
    {
      number: 1,
      title: t.termuxSetup.step1Title,
      description: "Get access to a full Linux terminal environment on your Android device",
      icon: Download,
    },
    {
      number: 2,
      title: t.termuxSetup.step2Title,
      description: "Set up the development environment with our automated installation scripts",
      icon: Terminal,
    },
    {
      number: 3,
      title: t.termuxSetup.step3Title,
      description: "Deploy smart contracts directly from your smartphone to the Polygon network",
      icon: Rocket,
    },
  ];

  return (
    <section id="termux-setup" className="py-8 md:py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            {t.termuxSetup.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.termuxSetup.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-10">
          {features.map((feature) => (
            <Card key={feature.number} className="p-4 md:p-6 hover:shadow-lg transition-shadow flex flex-col relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {feature.number}
                </div>
                <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground flex-1">
                {feature.description}
              </p>

              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-center p-4">
                  <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Unlock Premium</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 max-w-2xl">
            <Lock className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              {t.termuxSetup.upgradeCta}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Get the complete step-by-step installation guide with copy-paste commands, troubleshooting tips, and priority support.
            </p>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/#pricing'}
              className="min-h-[48px] text-base"
            >
              {t.termuxSetup.upgradeButton}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};