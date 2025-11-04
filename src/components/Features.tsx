import { Card } from "@/components/ui/card";
import { Boxes, Cloud, Code, Shield, Smartphone } from "lucide-react";

const features = [
  {
    title: "📱 Mobile-First Design",
    description: "Built specifically for smartphones. Deploy from Termux on Android - no PC required.",
    icon: Smartphone,
  },
  {
    title: "Ready-to-Deploy Templates",
    description: "Pre-built, audited smart contract templates optimized for mobile deployment",
    icon: Code,
  },
  {
    title: "One-Click Deployment",
    description: "Deploy to Polygon with a single command - all from your smartphone",
    icon: Cloud,
  },
  {
    title: "Security First",
    description: "Built-in security features and best practices for mobile developers",
    icon: Shield,
  },
  {
    title: "Modular Architecture",
    description: "Easily combine different components to build your dApp on any device",
    icon: Boxes,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Everything You Need to Build dApps
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