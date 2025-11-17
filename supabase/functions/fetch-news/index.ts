import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topics } = await req.json();
    const newsApiKey = Deno.env.get('NEWS_API_KEY');

    if (!newsApiKey) {
      throw new Error('NEWS_API_KEY not configured');
    }

    console.log('Fetching news for topics:', topics);

    // Construct search query from topics
    const query = topics.join(' OR ');
    
    // Fetch news from NewsAPI
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=12`,
      {
        headers: {
          'X-Api-Key': newsApiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NewsAPI error:', response.status, errorText);
      throw new Error(`NewsAPI returned ${response.status}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.articles?.length || 0} articles`);

    return new Response(
      JSON.stringify({ 
        articles: data.articles || [],
        totalResults: data.totalResults || 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        articles: []
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
