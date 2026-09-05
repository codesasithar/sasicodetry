import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import botAvatar from "@/assets/profile-hero-cartoon.png";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How can I reach Sasithar?",
  "Can he build a mobile app for me?",
  "Help me write a project enquiry",
];

const ContactBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm SasiBot 👋 I can help you get in touch with Sasithar or shape your project enquiry. What do you need?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: next }),
        }
      );

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const evt = JSON.parse(payload);
            const delta =
              evt?.type === "response.output_text.delta"
                ? evt.delta
                : evt?.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) {
              answer += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: answer };
                return copy;
              });
            }
          } catch {
            /* ignore partial frames */
          }
        }
      }

      if (!answer) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "I couldn't reply just now. You can email sasicodes@gmail.com directly.",
          };
          return copy;
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: message };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact assistant" : "Open contact assistant"}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[9998] h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden border border-primary/50 bg-primary/10 shadow-[0_0_24px_hsl(var(--primary)/0.45)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        ) : (
          <img
            src={botAvatar}
            alt="SasiBot assistant"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        )}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-20 sm:bottom-24 right-3 sm:right-4 z-[9998] w-[calc(100vw-1.5rem)] sm:w-[min(22rem,calc(100vw-2rem))] max-h-[75vh] flex flex-col origin-bottom-right rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <img
            src={botAvatar}
            alt="SasiBot"
            loading="lazy"
            decoding="async"
            className="h-9 w-9 rounded-full object-cover object-center border border-primary/50"
          />
          <div>
            <p className="font-semibold leading-tight">SasiBot</p>
            <p className="text-xs text-muted-foreground">Here to help you reach Sasithar</p>
          </div>
        </div>

        <div ref={scrollRef} className="h-[45vh] sm:h-72 flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                {m.content || (loading && i === messages.length - 1 ? "Thinking…" : "")}
              </div>
            </div>
          ))}
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs rounded-full border border-border px-3 py-1.5 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything…"
            className="flex-1 min-w-0 rounded-lg border border-border bg-input px-3 py-2 text-base sm:text-sm focus:ring-2 focus:ring-primary outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-9 w-9 shrink-0 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactBot;
