import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const CheckoutSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    savePaymentRecord();
  }, []);

  const savePaymentRecord = async () => {
    try {
      const sessionId = searchParams.get('session_id');
      const plan = searchParams.get('plan') || 'unknown';

      if (!sessionId) {
        console.error('No session ID found');
        setIsProcessing(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      // Check if payment already recorded
      const { data: existingPayment } = await supabase
        .from('payments')
        .select('id')
        .eq('stripe_session_id', sessionId)
        .single();

      if (existingPayment) {
        console.log('Payment already recorded');
        setIsProcessing(false);
        return;
      }

      // Save payment record
      const { error } = await supabase.from('payments').insert({
        user_id: session?.user?.id || null,
        email: session?.user?.email || 'guest@example.com',
        plan: plan,
        stripe_session_id: sessionId,
        payment_date: new Date().toISOString(),
      });

      if (error) {
        console.error('Error saving payment:', error);
        toast({
          title: "Warning",
          description: "Payment successful but record could not be saved. Please contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Payment record error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-md w-full text-center space-y-6 md:space-y-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4 md:p-6">
            <CheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-600" />
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.checkoutSuccess.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {t.checkoutSuccess.subtitle}
          </p>
        </div>

        <Button
          onClick={() => navigate('/setup')}
          size="lg"
          className="w-full min-h-[48px] text-base font-semibold"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Go to Setup Guide'}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
