-- Create payments table to track user purchases
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  plan TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_session_id TEXT UNIQUE,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own payments
CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Allow inserting payment records (for checkout success handler)
CREATE POLICY "Allow inserting payment records"
  ON public.payments FOR INSERT
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_stripe_session_id ON public.payments(stripe_session_id);