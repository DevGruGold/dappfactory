import { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useSignMessage } from 'wagmi';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export const Web3Auth = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { signMessage } = useSignMessage({
    onSuccess(signature) {
      setIsAuthenticated(true);
      toast({
        title: "Successfully authenticated!",
        description: "You are now signed in with your wallet.",
      });
      // Redirect back to app
      window.location.href = '/';
    },
    onError() {
      toast({
        title: "Authentication failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

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
        title: "Authentication failed",
        description: "Please try again.",
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
          Or connect your wallet to try features
        </p>
      </div>
      <Button 
        onClick={handleAuth} 
        className="w-full min-h-[48px] text-base"
        size="lg"
      >
        {!isConnected ? 'Connect Wallet' : !isAuthenticated ? 'Verify Wallet' : 'Connected'}
      </Button>
    </div>
  );
};