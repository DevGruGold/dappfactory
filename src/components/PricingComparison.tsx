import { useTranslation } from '@/hooks/useTranslation';
import { Check, X } from 'lucide-react';

export const PricingComparison = () => {
  const { t } = useTranslation();

  const features = [
    {
      name: t.pricing.comparison.basicScript,
      free: true,
      pro: true,
      enterprise: true,
    },
    {
      name: t.pricing.comparison.scriptLibrary,
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: t.pricing.comparison.multiChain,
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: t.pricing.comparison.defiTemplates,
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: t.pricing.comparison.nftStaking,
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: t.pricing.comparison.aiGenerator,
      free: false,
      pro: false,
      enterprise: true,
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {t.pricing.comparison.title}
          </h2>
          <p className="text-muted-foreground">
            {t.pricing.comparison.subtitle}
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 font-semibold">Feature</th>
                <th className="text-center py-4 px-6 font-semibold">{t.pricing.freeTier}</th>
                <th className="text-center py-4 px-6 font-semibold bg-primary/5 rounded-t-lg">
                  {t.pricing.proTier}
                </th>
                <th className="text-center py-4 px-6 font-semibold">{t.pricing.enterpriseTier}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-4 px-6 text-sm">{feature.name}</td>
                  <td className="py-4 px-6 text-center">
                    {feature.free ? (
                      <Check className="h-5 w-5 text-primary inline-block" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground inline-block" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center bg-primary/5">
                    {feature.pro ? (
                      <Check className="h-5 w-5 text-primary inline-block" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground inline-block" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.enterprise ? (
                      <Check className="h-5 w-5 text-primary inline-block" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground inline-block" />
                    )}
                  </td>
                </tr>
              ))}
              <tr className="border-b border-border">
                <td className="py-4 px-6 text-sm font-semibold">{t.pricing.comparison.support}</td>
                <td className="py-4 px-6 text-center text-sm text-muted-foreground">
                  {t.pricing.comparison.supportFree}
                </td>
                <td className="py-4 px-6 text-center text-sm text-foreground bg-primary/5">
                  {t.pricing.comparison.supportPro}
                </td>
                <td className="py-4 px-6 text-center text-sm text-foreground">
                  {t.pricing.comparison.supportEnterprise}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {[
            { tier: t.pricing.freeTier, features: features.map(f => f.free), support: t.pricing.comparison.supportFree },
            { tier: t.pricing.proTier, features: features.map(f => f.pro), support: t.pricing.comparison.supportPro, highlighted: true },
            { tier: t.pricing.enterpriseTier, features: features.map(f => f.enterprise), support: t.pricing.comparison.supportEnterprise },
          ].map((tier, tierIndex) => (
            <div
              key={tierIndex}
              className={`border rounded-lg p-4 ${
                tier.highlighted ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <h3 className="text-lg font-bold mb-4">{tier.tier}</h3>
              <div className="space-y-3">
                {features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    {tier.features[featureIndex] ? (
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="text-sm">{feature.name}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <span className="text-sm font-semibold">{t.pricing.comparison.support}:</span>
                  <span className="text-sm text-muted-foreground">{tier.support}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};