import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { PaymentButton } from './PaymentButton';
import { Check } from 'lucide-react';

export const Pricing = () => {
  const { t } = useTranslation();

  const tiers = [
    {
      name: t.pricing.freeTier,
      badge: t.pricing.freeBadge,
      price: t.pricing.freePrice,
      features: t.pricing.freeFeatures,
      cta: t.pricing.getStarted,
      href: '#termux-setup',
      highlighted: false,
      gradient: 'from-muted to-muted',
    },
    {
      name: t.pricing.proTier,
      badge: t.pricing.proBadge,
      price: t.pricing.proPrice,
      amount: 999, // $9.99 in cents
      features: t.pricing.proFeatures,
      cta: t.pricing.subscribePro,
      highlighted: true,
      gradient: 'from-primary/20 to-primary/5',
    },
    {
      name: t.pricing.enterpriseTier,
      badge: t.pricing.enterpriseBadge,
      price: t.pricing.enterprisePrice,
      amount: 4999, // $49.99 in cents
      features: t.pricing.enterpriseFeatures,
      cta: t.pricing.subscribeEnterprise,
      highlighted: false,
      gradient: 'from-secondary/20 to-primary/10',
    },
  ];

  return (
    <section id="pricing" className="py-10 md:py-16 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {t.pricing.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col transition-all duration-300 hover:shadow-xl ${
                tier.highlighted
                  ? 'border-2 border-primary shadow-xl shadow-primary/20 md:scale-105'
                  : 'border hover:border-primary/50'
              }`}
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.gradient} rounded-t-lg`} />
              
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {t.pricing.recommended}
                </div>
              )}
              
              <CardHeader className="text-center pb-6 pt-8">
                <div className="mb-3 text-2xl">{tier.badge}</div>
                <CardTitle className="text-2xl md:text-3xl mb-2">{tier.name}</CardTitle>
                <CardDescription className="text-3xl md:text-4xl font-bold text-foreground">
                  {tier.price}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow space-y-3">
                {tier.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className={`text-sm ${index === 0 && tier.name !== t.pricing.freeTier ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-6">
                {tier.amount ? (
                  <PaymentButton
                    amount={tier.amount}
                    description={`${tier.name} Subscription`}
                    label={tier.cta}
                    variant={tier.highlighted ? 'default' : 'outline'}
                  />
                ) : (
                  <Button
                    asChild
                    variant={tier.highlighted ? 'default' : 'outline'}
                    className="w-full min-h-[48px] text-base font-semibold"
                    size="lg"
                  >
                    <a href={tier.href}>{tier.cta}</a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
