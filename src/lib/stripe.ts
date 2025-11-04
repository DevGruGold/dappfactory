import { loadStripe } from '@stripe/stripe-js';

let stripePromise: ReturnType<typeof loadStripe>;

export const getStripe = () => {
  if (!stripePromise) {
    // Get the public key from environment
    // In Vercel and Lovable, this will use VITE_STRIPE_PUBLIC_KEY
    const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    
    if (!publicKey) {
      console.error('VITE_STRIPE_PUBLIC_KEY is not configured');
      throw new Error('Stripe configuration error: Missing public key');
    }
    
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
};
