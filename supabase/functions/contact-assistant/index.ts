const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "SasiBot", the friendly assistant on Sasithar M's portfolio site.
Your job is to help visitors get in touch with Sasithar and answer basic questions about him.

About Sasithar M:
- Application / mobile developer with 2+ years of experience, currently pursuing a PG in AI/ML.
- Builds solid, scalable mobile products with great user experiences.
- Email: sasicodes@gmail.com | Phone/WhatsApp: +91 94437 98476 | Location: India
- LinkedIn: https://www.linkedin.com/in/sasitharcodes/
- GitHub: https://github.com/codesasithar
- Instagram: https://www.instagram.com/sasitharm/
- WhatsApp: https://wa.me/919443798476

Guidelines:
- Be warm, short and helpful (2-4 sentences max unless asked for detail).
- Help visitors decide the best way to reach out, and encourage them to use the contact form on this page ("Send Me A Message") for project enquiries.
- If someone describes a project, help them shape a clear message they can paste into the contact form (name, purpose, timeline, budget).
- Never invent facts, prices, or availability you were not given.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI is not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const trimmed = messages
      .filter((m: { role?: string; content?: string }) => m && typeof m.content === "string")
      .slice(-20)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content).slice(0, 4000),
      }));

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Lovable-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5.6-sol",
        stream: true,
        input: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text();
      console.error("Gateway error", upstream.status, detail);
      const message =
        upstream.status === 429
          ? "Too many requests right now — please try again in a moment."
          : upstream.status === 402
          ? "AI credits are exhausted for this site. Please use the contact form instead."
          : "The assistant is unavailable right now. Please use the contact form.";
      return new Response(JSON.stringify({ error: message }), {
        status: upstream.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("contact-assistant error", error);
    return new Response(JSON.stringify({ error: "Unexpected error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
