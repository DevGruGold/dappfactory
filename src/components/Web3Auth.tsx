import { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useSignMessage } from 'wagmi';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

export const Web3Auth = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  const { signMessage } = useSignMessage({
    onSuccess(signature) {
      setIsAuthenticated(true);
      toast({
        title: t.web3Auth.successTitle,
        description: t.web3Auth.successDesc,
      });
      // Redirect back to app
      window.location.href = '/';
    },
    onError() {
      toast({
        title: t.web3Auth.errorTitle,
        description: t.web3Auth.errorDesc,
        variant: "destructive",
      });
    }
  });

  const handleAuth = async () => {
    try {
      if (!isConnected) {
        await open();
        return;
      }

      if (!isAuthenticated) {
        signMessage({ message: 'Sign this message to verify your wallet ownership' });
      }
    } catch (error) {
      toast({
        title: t.web3Auth.errorTitle,
        description: t.web3Auth.errorDesc,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!isConnected) {
      setIsAuthenticated(false);
    }
  }, [isConnected]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <p className="text-sm md:text-base text-muted-foreground">
          {t.web3Auth.subtitle}
        </p>
      </div>
      <Button 
        onClick={handleAuth} 
        className="w-full min-h-[48px] text-base"
        size="lg"
      >
        {!isConnected ? t.web3Auth.connectWallet : !isAuthenticated ? t.web3Auth.verifyWallet : t.web3Auth.connected}
      </Button>
    </div>
  );
};