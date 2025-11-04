import { useTranslation } from '@/hooks/useTranslation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Sparkles, Library, Zap } from 'lucide-react';

export const WhatYouGet = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {t.pricing.whatYouGet.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {/* Free Tier */}
          <AccordionItem value="free" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{t.pricing.whatYouGet.freeTitle}</div>
                  <div className="text-sm text-muted-foreground">{t.pricing.freePrice}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.pricing.freeFeatures.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
                <strong>Perfect for:</strong> Beginners exploring mobile dApp development and testing the Termux workflow
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Pro Tier */}
          <AccordionItem value="pro" className="border-2 border-primary rounded-lg px-6 bg-card">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Library className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{t.pricing.whatYouGet.proTitle}</span>
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {t.pricing.recommended}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t.pricing.proPrice}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.pricing.proFeatures.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-primary/10 rounded-md text-sm">
                <strong>Perfect for:</strong> Professional developers building production dApps across multiple blockchains with ready-made templates
              </div>
              <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm">
                <strong>Script Categories Include:</strong>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>• Ethereum, BSC, Arbitrum</div>
                  <div>• Bridge Integrations</div>
                  <div>• Uniswap, Aave, Compound</div>
                  <div>• NFT Minting & Staking</div>
                  <div>• Multi-sig Wallets</div>
                  <div>• DAO Governance</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Enterprise Tier */}
          <AccordionItem value="enterprise" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{t.pricing.whatYouGet.enterpriseTitle}</div>
                  <div className="text-sm text-muted-foreground">{t.pricing.enterprisePrice}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.pricing.enterpriseFeatures.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-md text-sm">
                <strong>Perfect for:</strong> Teams and agencies needing custom blockchain solutions with AI-powered script generation and dedicated support
              </div>
              <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm">
                <strong>AI Generator Example:</strong>
                <div className="mt-2 italic text-muted-foreground">
                  "Create a staking contract for my NFT collection on Arbitrum with 10% APY and 30-day lock period"
                </div>
                <div className="mt-2">
                  → AI generates custom script optimized for mobile deployment
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Join 500+ mobile developers building dApps on the go
        </div>
      </div>
    </section>
  );
};