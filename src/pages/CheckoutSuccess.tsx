import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          onClick={() => navigate('/')}
          size="lg"
          className="w-full min-h-[48px] text-base font-semibold"
        >
          {t.checkoutSuccess.ctaButton}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
