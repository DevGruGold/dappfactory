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

    // Get template name from query params
    const url = new URL(req.url);
    const templateName = url.searchParams.get('template');

    if (!templateName) {
      return new Response(
        JSON.stringify({ error: 'Template name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch script template (RLS will handle tier verification)
    const { data: script, error: scriptError } = await supabase
      .from('script_templates')
      .select('*')
      .eq('name', templateName)
      .single();

    if (scriptError || !script) {
      console.error('Script fetch error:', scriptError);
      return new Response(
        JSON.stringify({ error: 'Script not found or access denied' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return script content
    return new Response(
      script.script_content,
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/x-python',
          'Content-Disposition': `attachment; filename="${templateName}.py"`,
        },
      }
    );
  } catch (error) {
    console.error('Error in get-script function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
