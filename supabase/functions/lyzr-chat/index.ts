// The Deno standard library is provided at runtime in the edge function environment.
// Tell the TypeScript checker to ignore unresolved remote module type errors for this import.
// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Declare Deno for TypeScript type-checking in environments where Deno types are not present
declare const Deno: { env: { get(key: string): string | undefined } };

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, user_id, agent_id, session_id } = await req.json();

    const LYZR_API_KEY = Deno.env.get('LYZR_API_KEY');
    if (!LYZR_API_KEY) {
      console.error('LYZR_API_KEY is not configured');
      throw new Error('LYZR_API_KEY is not configured');
    }

    console.log('Sending message to Lyzr API:', { user_id, agent_id, session_id, message });

    // Using the correct Lyzr API v3 endpoint
    const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LYZR_API_KEY,
      },
      body: JSON.stringify({
        user_id,
        agent_id,
        message,
        session_id,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lyzr API error:', response.status, errorText);
      throw new Error(`Lyzr API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Lyzr API response:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in lyzr-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
