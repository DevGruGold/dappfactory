import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Terminal, Wallet, Rocket, Smartphone } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const HowItWorks = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      number: 1,
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      icon: Download,
      mobileIcon: Smartphone,
    },
    {
      number: 2,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      icon: Terminal,
      mobileIcon: Smartphone,
    },
    {
      number: 3,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      icon: Wallet,
      mobileIcon: Smartphone,
    },
    {
      number: 4,
      title: t.howItWorks.step4Title,
      description: t.howItWorks.step4Desc,
      icon: Rocket,
      mobileIcon: Smartphone,
    },
  ];
  return (
    <section id="how-it-works" className="py-8 md:py-12 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
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
            onClick={() => window.location.href = '/#pricing'}
          >
            {t.howItWorks.ctaButton}
            <Smartphone className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          </Button>
          <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
            {t.howItWorks.ctaSubtext}
          </p>
        </div>
      </div>
    </section>
  );
};
