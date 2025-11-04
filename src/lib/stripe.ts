import { loadStripe } from '@stripe/stripe-js';

let stripePromise: ReturnType<typeof loadStripe>;

export const getStripe = () => {
  if (!stripePromise) {
    // Get the public key from environment or use a placeholder
    const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder';
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
};
