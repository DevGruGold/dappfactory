import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Terminal, Rocket, Copy, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const SetupGuide = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  useEffect(() => {
    checkPaymentAccess();
  }, []);

  const checkPaymentAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please complete payment to access the setup guide.",
          variant: "destructive",
        });
        navigate('/#pricing');
        return;
      }

      const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking payment:', error);
        toast({
          title: "Error",
          description: "Unable to verify payment status.",
          variant: "destructive",
        });
        navigate('/#pricing');
        return;
      }

      if (!payments || payments.length === 0) {
        toast({
          title: "Payment Required",
          description: "Please complete payment to access the setup guide.",
          variant: "destructive",
        });
        navigate('/#pricing');
        return;
      }

      setHasAccess(true);
    } catch (error) {
      console.error('Payment check error:', error);
      navigate('/#pricing');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
    });
    setTimeout(() => setCopiedStep(null), 2000);
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
      description: "Copy and run this command to install MaticDapp on your device:",
      icon: Rocket,
      command: "curl -L https://gist.github.com/DevGruGold/56cb10f2c66c1f48b070398051433c51/raw/ -o install_maticdapp_v2.py && python3 install_maticdapp_v2.py",
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
        </div>

      </div>
    </div>
  );
};

export default SetupGuide;