import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Terminal, Rocket, Copy, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { toast } from "sonner";

export const TermuxSetup = () => {
  const { t } = useTranslation();
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = async (text: string, stepNumber: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepNumber);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const steps = [
    {
      number: 1,
      title: t.termuxSetup.step1Title,
      description: t.termuxSetup.step1Desc,
      icon: Download,
      action: (
        <div className="flex flex-col gap-2 mt-4">
          <Button variant="outline" size="sm" asChild className="w-full">
            <a href="https://play.google.com/store/apps/details?id=com.termux" target="_blank" rel="noopener noreferrer">
              Google Play Store
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild className="w-full">
            <a href="https://f-droid.org/packages/com.termux/" target="_blank" rel="noopener noreferrer">
              F-Droid (Recommended)
            </a>
          </Button>
        </div>
      ),
    },
    {
      number: 2,
      title: t.termuxSetup.step2Title,
      description: t.termuxSetup.step2Desc,
      icon: Terminal,
      command: "pkg install python",
    },
    {
      number: 3,
      title: t.termuxSetup.step3Title,
      description: t.termuxSetup.step3Desc,
      icon: Rocket,
      command: "curl -sSL https://raw.githubusercontent.com/DevGruGold/dappfactory/main/install.sh | bash",
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
          {steps.map((step) => (
            <Card key={step.number} className="p-4 md:p-6 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <step.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 flex-1">
                {step.description}
              </p>

              {step.command && (
                <div className="mt-auto">
                  <div className="bg-muted/50 rounded-md p-3 font-mono text-xs md:text-sm break-all">
                    {step.command}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => copyToClipboard(step.command!, step.number)}
                  >
                    {copiedStep === step.number ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Command
                      </>
                    )}
                  </Button>
                </div>
              )}

              {step.action && step.action}
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm md:text-base font-medium mb-3">
              {t.termuxSetup.upgradeCta}
            </p>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/#pricing'}
              className="min-h-[44px]"
            >
              {t.termuxSetup.upgradeButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};