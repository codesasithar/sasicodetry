import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import botAvatar from "@/assets/sasibot-android.webp";

type ChatMessage = { role: "user" | "assistant"; content: string };
type SasibotProps = { open: boolean; onClose: () => void };

const SUGGESTIONS = [
  "How can I reach Sasithar?",
  "Can he build a mobile app for me?",
  "Help me write a project enquiry",
];

const Sasibot = ({ open, onClose }: SasibotProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Sasibot 👋 I can help you get in touch with Sasithar or shape your project enquiry. What do you need?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        String(import.meta.env.VITE_SUPABASE_URL) + "/functions/v1/contact-assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
            Authorization: "Bearer " + import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
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
    <section
      id="sasibot-panel"
      role="dialog"
      aria-label="Chat with Sasibot"
      aria-modal={open || undefined}
      aria-hidden={!open}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"])'
        ));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      className={
        "sasibot-panel fixed z-[9998] flex max-h-[min(78vh,42rem)] w-[calc(100vw-1.5rem)] max-w-[25rem] origin-bottom-right flex-col overflow-hidden rounded-[1.6rem] border border-primary/20 bg-background/95 text-foreground shadow-2xl shadow-primary/10 backdrop-blur-2xl transition-all duration-300 " +
        (open ? "sasibot-panel-open pointer-events-auto" : "sasibot-panel-closed pointer-events-none")
      }
    >
      <div className="flex items-center gap-3 border-b border-border/70 bg-card/35 px-4 py-3.5">
        <img
          src={botAvatar}
          alt=""
          decoding="async"
          className="h-11 w-11 rounded-full border border-primary/40 bg-card object-cover object-center shadow-[0_0_1rem_hsl(var(--primary)/0.16)]"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight">Sasibot</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0.6rem_hsl(var(--primary)/0.9)]" />
            Here to help you reach Sasithar
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Sasibot chat"
          tabIndex={open ? 0 : -1}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                "max-w-[88%] whitespace-pre-wrap text-sm leading-relaxed " +
                (message.role === "user"
                  ? "rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-primary-foreground shadow-sm"
                  : "rounded-2xl rounded-bl-sm border border-border/70 bg-card/75 px-3.5 py-2.5 text-foreground")
              }
            >
              {message.content || (loading && index === messages.length - 1 ? "Thinking…" : "")}
            </div>
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 border-t border-border/50 px-4 pb-3 pt-3">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void send(suggestion)}
              tabIndex={open ? 0 : -1}
              className="rounded-full border border-border/80 bg-card/50 px-3 py-1.5 text-left text-xs text-muted-foreground transition hover:border-primary/35 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void send(input);
        }}
        className="flex items-center gap-2 border-t border-border/70 bg-card/30 p-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Message Sasibot…"
          aria-label="Message Sasibot"
          tabIndex={open ? 0 : -1}
          className="min-w-0 flex-1 rounded-xl border border-border/80 bg-background/70 px-3 py-2.5 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 sm:text-sm"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          tabIndex={open ? 0 : -1}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Send message to Sasibot"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
};

export default Sasibot;
