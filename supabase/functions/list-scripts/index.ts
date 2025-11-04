import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // Get optional category filter
    const url = new URL(req.url);
    const category = url.searchParams.get('category');

    // Fetch available scripts (RLS will filter by user's tier)
    let query = supabase
      .from('script_templates')
      .select('id, name, description, category, tier, chain, tags, version');

    if (category) {
      query = query.eq('category', category);
    }

    const { data: scripts, error: scriptsError } = await query.order('category', { ascending: true });

    if (scriptsError) {
      console.error('Scripts fetch error:', scriptsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch scripts' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build curl commands for each script
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const scriptsWithCommands = scripts.map(script => ({
      ...script,
      curl_command: `curl -L "${supabaseUrl}/functions/v1/get-script?template=${script.name}" -H "Authorization: Bearer YOUR_TOKEN" -o ${script.name}.py && python3 ${script.name}.py`
    }));

    return new Response(
      JSON.stringify({ scripts: scriptsWithCommands }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in list-scripts function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
