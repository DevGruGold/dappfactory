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
      price: t.pricing.freePrice,
      features: [
        t.pricing.freeFeature1,
        t.pricing.freeFeature2,
      ],
      cta: t.pricing.getStarted,
      href: '#how-it-works',
      highlighted: false,
    },
    {
      name: t.pricing.proTier,
      price: t.pricing.proPrice,
      amount: 999, // $9.99 in cents
      features: [
        t.pricing.proFeature1,
        t.pricing.proFeature2,
        t.pricing.proFeature3,
      ],
      cta: t.pricing.subscribePro,
      highlighted: true,
    },
    {
      name: t.pricing.enterpriseTier,
      price: t.pricing.enterprisePrice,
      amount: 4999, // $49.99 in cents
      features: [
        t.pricing.enterpriseFeature1,
        t.pricing.enterpriseFeature2,
        t.pricing.enterpriseFeature3,
      ],
      cta: t.pricing.subscribeEnterprise,
      highlighted: false,
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
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
              className={`relative flex flex-col ${
                tier.highlighted
                  ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                  : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  {t.pricing.recommended || 'Recommended'}
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl md:text-3xl mb-2">{tier.name}</CardTitle>
                <CardDescription className="text-3xl md:text-4xl font-bold text-foreground">
                  {tier.price}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow space-y-3 md:space-y-4">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 md:gap-3">
                    <Check className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
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
