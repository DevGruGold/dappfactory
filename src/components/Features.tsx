import { Card } from "@/components/ui/card";
import { Boxes, Cloud, Code, Shield, Smartphone } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t.features.feature1Title,
      description: t.features.feature1Desc,
      icon: Smartphone,
    },
    {
      title: t.features.feature2Title,
      description: t.features.feature2Desc,
      icon: Code,
    },
    {
      title: t.features.feature3Title,
      description: t.features.feature3Desc,
      icon: Cloud,
    },
    {
      title: t.features.feature4Title,
      description: t.features.feature4Desc,
      icon: Shield,
    },
    {
      title: t.features.feature5Title,
      description: t.features.feature5Desc,
      icon: Boxes,
    },
  ];
  return (
    <section id="features" className="py-8 md:py-12 bg-background">
      <div className="container px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          {t.features.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-4 md:p-6 hover:shadow-lg transition-shadow min-h-[180px] flex flex-col">
              <feature.icon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground flex-1">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};