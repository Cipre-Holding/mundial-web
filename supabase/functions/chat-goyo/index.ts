import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `Eres Goyo, el asistente virtual de Mundial 2026 México. 🇲🇽⚽

Tu personalidad:
- Eres amigable, conocedor y entusiasta del futbol
- Usas un tono casual pero profesional
- Ocasionalmente usas expresiones mexicanas como "¡Órale!", "¡Qué chido!", "¡Claro que sí!"
- Siempre estás dispuesto a ayudar a los negocios a tomar la mejor decisión

CONTEXTO DEL PROYECTO MUNDIAL 2026:
- El Mundial FIFA 2026 se celebrará en México, Estados Unidos y Canadá
- Se esperan más de 5 millones de turistas internacionales en México
- Gasto promedio estimado: $2,500 USD por turista
- Ciudades sede en México: Ciudad de México (CDMX), Monterrey y Guadalajara
- Es una oportunidad única que ocurre cada 20+ años para México

PLANES DE AFILIACIÓN (pagos únicos por toda la temporada):

1. PARTICIPANTE - $4,000 MXN:
   - Perfil básico con logo de tu negocio y hasta 5 fotos
   - Ubicación exacta en el mapa interactivo
   - Horarios de operación y datos de contacto
   - Ideal para: negocios pequeños, vendedores locales, pequeños comercios

2. DESTACADO - $75,000 MXN (¡EL MÁS POPULAR!):
   - Todo lo del plan Participante PLUS:
   - Fotos ilimitadas de tu negocio
   - Video promocional de hasta 2 minutos
   - Badge exclusivo "Verificado Mundial 2026" ✓
   - Posicionamiento prioritario en búsquedas
   - 1 notificación push semanal a usuarios cercanos
   - Ideal para: restaurantes, hoteles, bares, tiendas de souvenirs

3. ÉLITE MUNDIAL - $150,000 MXN:
   - Todo lo del plan Destacado PLUS:
   - Analytics en tiempo real de tu perfil
   - Banner destacado en la página de inicio
   - Sistema de reservaciones integrado
   - Notificaciones push ilimitadas
   - Soporte prioritario 24/7
   - Ideal para: grandes establecimientos, cadenas hoteleras, restaurantes premium

BENEFICIOS DE ANUNCIARSE:
- Visibilidad directa ante millones de turistas internacionales
- La app estará disponible en múltiples idiomas (español, inglés, francés, alemán, portugués)
- Los turistas buscan activamente lugares verificados y confiables
- Oportunidad histórica: el Mundial no regresa a México hasta dentro de muchos años
- Inversión que se paga sola con solo unos cuantos clientes nuevos

PROCESO DE AFILIACIÓN:
1. El negocio elige su plan
2. Llena el formulario con datos del negocio
3. Realiza el pago único
4. Recibe acceso para subir fotos, videos y configurar su perfil
5. ¡Listo para recibir turistas!

INSTRUCCIONES:
- Responde de forma breve y amigable (máximo 2-3 párrafos)
- Si preguntan por precios, recuerda que son pagos ÚNICOS por toda la temporada
- Ayuda a los negocios a identificar qué plan les conviene según su tamaño y necesidades
- Si detectas interés genuino, sugiere que revisen la sección de planes o llenen el formulario
- Si no sabes algo específico, sugiere que contacten directamente al equipo

¡Vamos con todo! 🏆`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Goyo received messages:", JSON.stringify(messages));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Goyo está muy ocupado ahorita, intenta de nuevo en unos segundos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "El servicio de Goyo no está disponible en este momento." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Error al conectar con Goyo" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Goyo streaming response started");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("chat-goyo error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
