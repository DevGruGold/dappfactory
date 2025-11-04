import { useState } from 'react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  amount: number; // in cents
  description: string;
  label: string;
  variant?: 'default' | 'outline' | 'secondary';
}

export const PaymentButton = ({ amount, description, label, variant = 'default' }: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Extract plan from description ("Pro Subscription" -> "pro")
      const plan = description.toLowerCase().includes('enterprise') ? 'enterprise' 
        : description.toLowerCase().includes('pro') ? 'pro' 
        : 'free';

      const successUrl = `${window.location.origin}/checkout/success`;
      const cancelUrl = `${window.location.origin}/checkout/cancel`;

      console.log('Initiating payment:', { amount, description, plan });

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          amount,
          description,
          plan,
          successUrl,
          cancelUrl,
        },
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: t.pricing.errorTitle || 'Payment Error',
        description: t.pricing.errorDesc || 'Failed to initiate payment. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      variant={variant}
      className="w-full min-h-[48px] text-base font-semibold"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          {t.pricing.processing}
        </>
      ) : (
        label
      )}
    </Button>
  );
};
