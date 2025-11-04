import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert blockchain developer specializing in Python deployment scripts for Termux on Android.

Your scripts MUST follow this exact structure:
1. Start with ASCII art banner matching the project/chain
2. Use tqdm for progress bars (with fallback)
3. Color-coded output: green (steps), red (errors), blue (success), yellow (warnings)
4. Helper functions: print_step, print_error, print_success, print_warning, print_info
5. Install dependencies with progress tracking
6. Configure Hardhat project
7. Create smart contracts
8. Guide wallet setup interactively
9. Deploy with proper error handling

When a user describes their dApp, ask:
- Target blockchain(s)?
- Need bridge integration?
- DeFi protocols required?
- Special features (upgradeable, governance, multi-sig)?
- Testnet or mainnet?

Generate complete, working scripts that:
- Work in Termux environment
- Handle errors gracefully
- Include security best practices
- Are mobile-optimized
- Provide clear guidance

Available chains: Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche
Available bridges: Polygon Bridge, Hop, Stargate, Synapse
Features: ERC20/721/1155, DeFi, DAO, Multi-sig, Upgradeable

Always explain what the script does and offer to refine based on feedback.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has Enterprise tier
    const { data: payment } = await supabase
      .from('payments')
      .select('plan')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!payment || payment.plan !== 'enterprise') {
      return new Response(
        JSON.stringify({ error: 'Enterprise tier required for AI script generation' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI generation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const generatedContent = aiData.choices[0].message.content;

    // Save to database
    const { error: saveError } = await supabase
      .from('ai_script_generations')
      .insert({
        user_id: user.id,
        prompt: messages[messages.length - 1].content,
        generated_script: generatedContent,
        conversation_history: messages,
      });

    if (saveError) {
      console.error('Failed to save generation:', saveError);
    }

    return new Response(
      JSON.stringify({ message: generatedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-custom-script function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
