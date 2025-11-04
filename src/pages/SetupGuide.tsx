import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Terminal, Rocket, Copy, Check, Crown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { ScriptLibrary } from '@/components/ScriptLibrary';
import { AIScriptGenerator } from '@/components/AIScriptGenerator';

const SetupGuide = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [userTier, setUserTier] = useState<'free' | 'pro' | 'enterprise'>('free');

  useEffect(() => {
    checkPaymentAccess();
  }, []);

  const checkPaymentAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setHasAccess(true); // Allow free tier access without login
        setUserTier('free');
        setIsLoading(false);
        return;
      }

      // Check for payment and determine tier
      const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking payment:', error);
      }

      if (!payments || payments.length === 0) {
        setUserTier('free');
      } else {
        const plan = payments[0].plan?.toLowerCase();
        setUserTier(plan === 'enterprise' ? 'enterprise' : plan === 'pro' ? 'pro' : 'free');
      }

      setHasAccess(true);
    } catch (error) {
      console.error('Payment check error:', error);
      setHasAccess(true);
      setUserTier('free');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, step: number) => {
    // For script download, get actual token
    if (step === 3) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        const token = session?.access_token || 'YOUR_TOKEN';
        const finalCommand = text.replace('YOUR_TOKEN', token);
        navigator.clipboard.writeText(finalCommand);
        setCopiedStep(step);
        toast({
          title: "Copied!",
          description: "Command copied to clipboard with your auth token",
        });
        setTimeout(() => setCopiedStep(null), 2000);
      });
    } else {
      navigator.clipboard.writeText(text);
      setCopiedStep(step);
      toast({
        title: "Copied!",
        description: "Command copied to clipboard",
      });
      setTimeout(() => setCopiedStep(null), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  const steps = [
    {
      number: 1,
      title: "Download Termux",
      description: "Install Termux from the Google Play Store or F-Droid to run Linux commands on your Android device.",
      icon: Download,
      action: (
        <Button
          size="lg"
          className="w-full"
          onClick={() => window.open('https://play.google.com/store/apps/details?id=com.termux', '_blank')}
        >
          <Download className="mr-2 h-5 w-5" />
          Open Play Store
        </Button>
      ),
    },
    {
      number: 2,
      title: "Install Python",
      description: "Open Termux and run this command to install Python:",
      icon: Terminal,
      command: "pkg install python",
      action: null,
    },
    {
      number: 3,
      title: "Install MaticDapp",
      description: userTier === 'free' 
        ? "Copy and run this command to install the basic MaticDapp script:"
        : "Copy and run this command to download any template from the library below:",
      icon: Rocket,
      command: `curl -L "${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-script?template=polygon-basic" -H "Authorization: Bearer YOUR_TOKEN" -o install.py && python3 install.py`,
      action: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-24 pb-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            MaticDapp Setup Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            Follow these simple steps to get your dApp running on Android
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <Card key={step.number} className="p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold">{step.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{step.description}</p>

                  {step.command && (
                    <div className="bg-muted p-4 rounded-lg mb-4 relative">
                      <code className="text-sm break-all">{step.command}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(step.command!, step.number)}
                      >
                        {copiedStep === step.number ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}

                  {step.action}
                </div>
              </div>
            </Card>
          ))}

          {/* Free Tier Upgrade CTA */}
          {userTier === 'free' && (
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
              <div className="text-center space-y-4">
                <Crown className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">Unlock 18+ Pro Templates</h3>
                <p className="text-muted-foreground">
                  Get access to deployment scripts for Ethereum, BSC, Arbitrum, Optimism, 
                  bridge integrations, DeFi protocols, and more!
                </p>
                <Button size="lg" onClick={() => navigate('/#pricing')}>
                  View Pro Plans
                </Button>
              </div>
            </Card>
          )}

          {/* Pro Tier: Script Library */}
          {(userTier === 'pro' || userTier === 'enterprise') && (
            <div className="mt-12">
              <ScriptLibrary />
            </div>
          )}

          {/* Pro Tier Upgrade CTA */}
          {userTier === 'pro' && (
            <Card className="p-8 mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
              <div className="text-center space-y-4">
                <Crown className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">Need Custom Solutions?</h3>
                <p className="text-muted-foreground">
                  Upgrade to Enterprise for AI-powered custom script generation tailored to your unique requirements
                </p>
                <Button size="lg" onClick={() => navigate('/#pricing')}>
                  Upgrade to Enterprise
                </Button>
              </div>
            </Card>
          )}

          {/* Enterprise Tier: AI Generator */}
          {userTier === 'enterprise' && (
            <div className="mt-12">
              <AIScriptGenerator />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SetupGuide;