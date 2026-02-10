import { useState, useRef, useEffect } from "react";
import { Send, User, Sparkles, MessageCircle } from "lucide-react";

// Avatar personalizado de Goyo con temática de futbol mexicano
const GoyoAvatar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    {/* Sombrero charro dorado */}
    <ellipse cx="20" cy="6" rx="14" ry="4" fill="#D4AF37" />
    <rect x="10" y="3" width="20" height="5" rx="2" fill="#B8960C" />
    <ellipse cx="20" cy="3" rx="8" ry="2" fill="#D4AF37" />
    
    {/* Cabeza - Balón estilizado */}
    <circle cx="20" cy="22" r="16" fill="#1a472a" />
    <circle cx="20" cy="22" r="13" fill="#FEFEFE" />
    
    {/* Patrón del balón */}
    <path d="M20 9 L20 14" stroke="#1a472a" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 30 L20 35" stroke="#1a472a" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 22 L12 22" stroke="#1a472a" strokeWidth="2" strokeLinecap="round"/>
    <path d="M28 22 L33 22" stroke="#1a472a" strokeWidth="2" strokeLinecap="round"/>
    
    {/* Ojos expresivos */}
    <ellipse cx="14" cy="19" rx="3" ry="3.5" fill="#1a472a" />
    <ellipse cx="26" cy="19" rx="3" ry="3.5" fill="#1a472a" />
    <circle cx="14.8" cy="18" r="1.2" fill="white" />
    <circle cx="26.8" cy="18" r="1.2" fill="white" />
    
    {/* Bigote mexicano */}
    <path d="M11 25 Q14 27 20 25 Q26 27 29 25" stroke="#1a472a" strokeWidth="2" strokeLinecap="round" fill="none"/>
    
    {/* Sonrisa amigable */}
    <path d="M14 29 Q20 33 26 29" stroke="#1a472a" strokeWidth="2" strokeLinecap="round" fill="none"/>
    
    {/* Detalles dorados en sombrero */}
    <path d="M8 6 Q20 9 32 6" stroke="#B8960C" strokeWidth="1" fill="none"/>
  </svg>
);
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-goyo`;

const quickQuestions = [
  "¿Qué plan me conviene para mi negocio?",
  "¿Cuántos turistas se esperan?",
  "¿Por qué debería anunciarme?",
  "¿Cómo funciona la afiliación?",
];

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      onError(errorData.error || "Error al conectar con Goyo");
      return;
    }

    if (!resp.body) {
      onError("No se pudo iniciar la respuesta");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          /* ignore */
        }
      }
    }

    onDone();
  } catch (error) {
    onError("Error de conexión con Goyo");
  }
}

const AIChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy Goyo 👋⚽ Tu asistente del Mundial de 2026. ¿En qué te puedo ayudar hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      onDelta: (chunk) => upsertAssistant(chunk),
      onDone: () => setIsLoading(false),
      onError: (error) => {
        toast.error(error);
        setIsLoading(false);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden" >

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Asistente con IA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pregúntale a <span className="text-primary">Goyo</span> ⚽
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Nuestro asistente virtual está listo para resolver todas tus dudas sobre el proyecto,
            los planes de afiliación y cómo aprovechar el Mundial 2026.
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-0">
              {/* Messages Area */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    {msg.role === "user" ? (
                      <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                        <User className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-10 h-10">
                        <GoyoAvatar className="w-full h-full drop-shadow-md" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-md"
                          : "bg-muted text-foreground rounded-tl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10">
                      <GoyoAvatar className="w-full h-full drop-shadow-md" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="px-4 pb-3 border-t border-border/50">
                <div className="flex flex-wrap gap-2 pt-3">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    disabled={isLoading}
                    className="flex-1 bg-background/50"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Helper text */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            <MessageCircle className="w-3 h-3 inline mr-1" />
            Goyo está impulsado por inteligencia artificial para ayudarte 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIChatSection;
