"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { AnimatePresence, motion, useInView } from "framer-motion";

type Message  = { role: "user" | "assistant"; content: string };
type Provider = "claude" | "openai";

const QUICK_PROMPTS = [
  { label: "Work",     message: "What kind of work does Billy do?"                   },
  { label: "Skills",   message: "What are Billy's main technical skills?"            },
  { label: "Projects", message: "Tell me about Billy's projects."                    },
  { label: "Service",  message: "Is Billy available for freelance or full-time work?" },
];

const MD: Components = {
  p:      ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white/90">{children}</strong>,
  em:     ({ children }) => <em className="italic text-white/65">{children}</em>,
  ul:     ({ children }) => <ul className="my-2 list-disc space-y-1 pl-4">{children}</ul>,
  ol:     ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-4">{children}</ol>,
  li:     ({ children }) => <li className="leading-7">{children}</li>,
  code:   ({ children }) => <code className="rounded border border-white/10 bg-white/6 px-1.5 py-0.5 font-mono text-xs text-white/70">{children}</code>,
  pre:    ({ children }) => <pre className="my-2 overflow-x-auto rounded-xl border border-white/8 bg-[#0a0a0a] p-3 font-mono text-xs text-white/60">{children}</pre>,
};

type ChatProps = {
  messages:      Message[];
  input:         string;
  isLoading:     boolean;
  provider:      Provider;
  chatRef:       React.RefObject<HTMLDivElement | null>;
  setInput:      (v: string) => void;
  setProvider:   (p: Provider) => void;
  setMessages:   React.Dispatch<React.SetStateAction<Message[]>>;
  sendMessage:   (text: string) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
};

/* ── Variant A — card with window chrome ── */
function VariantA({ messages, input, isLoading, provider, chatRef, setInput, setProvider, setMessages, sendMessage, handleKeyDown }: ChatProps) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;
    const h = () => setShowMenu(false);
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [showMenu]);

  return (
    <motion.div
      key="A"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 border-b border-white/6 pb-6">
        <h2 className="text-[10px] uppercase tracking-[0.24em] text-white/20">What&apos;s on your Mind?</h2>
      </div>

      <div className="flex h-[65vh] flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0f0f0f]">
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8">
              <div className="h-2 w-2 rounded-full bg-white/80" />
            </div>
            <div>
              <div className="text-sm font-medium text-white/80">Billy Assistant</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                {isLoading ? "Thinking..." : "Ask me anything"}
              </div>
            </div>
          </div>

          <div className="relative hidden sm:block" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowMenu((v) => !v)}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-full border border-white/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/45 transition hover:border-white/16 hover:text-white/65 disabled:opacity-40"
            >
              {provider === "claude" ? "Claude" : "OpenAI"}
              <svg width="8" height="8" fill="currentColor" viewBox="0 0 16 16"
                className={`transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}>
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full z-50 mt-1.5 min-w-25 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
                {(["claude", "openai"] as Provider[]).map((p) => (
                  <button key={p}
                    onClick={() => { setProvider(p); setMessages([]); setShowMenu(false); }}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-[10px] uppercase tracking-[0.22em] transition hover:bg-white/4 ${provider === p ? "text-white/80" : "text-white/35"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${provider === p ? "bg-white/60" : ""}`} />
                    {p === "claude" ? "Claude" : "OpenAI"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div ref={chatRef} className="chat-scroll flex-1 overflow-y-auto px-5 py-5">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-sm text-white/30">Ask me anything about Billy.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                    msg.role === "user"
                      ? "border border-white/8 bg-white/6 text-white/85"
                      : "border border-white/6 bg-[#0d0d0d] text-white/75"
                  }`}>
                    {!msg.content ? (
                      <span className="inline-flex gap-1 text-white/30">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse [animation-delay:0.2s]">.</span>
                        <span className="animate-pulse [animation-delay:0.4s]">.</span>
                      </span>
                    ) : msg.role === "assistant" ? (
                      <ReactMarkdown components={MD}>{msg.content}</ReactMarkdown>
                    ) : msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/6 px-5 pb-5 pt-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {QUICK_PROMPTS.map((item) => (
                <button key={item.label}
                  onClick={() => sendMessage(item.message)}
                  disabled={isLoading}
                  className="rounded-xl border border-white/8 px-3 py-1.5 text-sm text-white/55 transition hover:border-white/16 hover:text-white/80 disabled:opacity-40">
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-[#0d0d0d] px-4 py-3">
              <input
                type="text" value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything."
                disabled={isLoading}
                className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/22 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-40">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Variant B — integrated, no card ── */
function VariantB({ messages, input, isLoading, provider, chatRef, setInput, setProvider, setMessages, sendMessage, handleKeyDown }: ChatProps) {
  const dotCanvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos     = useRef({ x: -9999, y: -9999 });
  const rafId        = useRef<number>(0);

  useEffect(() => {
    const canvas = dotCanvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const GRID       = 28;
    const DOT_R      = 1.2;
    const GLOW_R     = 115;
    const BASE_ALPHA = 0.03;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      const ox = (canvas.width  % GRID) / 2;
      const oy = (canvas.height % GRID) / 2;

      for (let x = ox; x <= canvas.width; x += GRID) {
        for (let y = oy; y <= canvas.height; y += GRID) {
          const d    = Math.hypot(x - mx, y - my);
          const prox = Math.max(0, 1 - d / GLOW_R);
          const a    = BASE_ALPHA + (0.2 - BASE_ALPHA) * prox;
          const r    = DOT_R + prox * 0.6;

          if (prox > 0.05) {
            ctx.shadowBlur  = 4 * prox;
            ctx.shadowColor = `rgba(255,255,255,${prox * 0.15})`;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.fill();
        }
      }

      rafId.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, []);

  function onDotMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = dotCanvasRef.current?.getBoundingClientRect();
    if (rect) mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function onDotLeave() { mousePos.current = { x: -9999, y: -9999 }; }

  return (
    <motion.div
      key="B"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Floating side lines — span the component height, inset from ends */}
      <div className="pointer-events-none absolute -left-10 top-14 bottom-14 hidden w-px bg-white/8 lg:block" />
      <div className="pointer-events-none absolute -right-10 top-14 bottom-14 hidden w-px bg-white/8 lg:block" />

      {/* Section header */}
      <div className="mb-10 flex flex-col gap-3 border-b border-white/6 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Ask me anything</h2>
          <p className="mt-1 text-sm text-white/35">
            {isLoading ? "Thinking..." : "About Billy's work and experience"}
          </p>
        </div>
        <div className="inline-flex self-start rounded-full border border-white/8 bg-white/3 p-1">
          {(["claude", "openai"] as Provider[]).map((p) => (
            <button key={p}
              onClick={() => { setProvider(p); setMessages([]); }}
              disabled={isLoading}
              className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] transition disabled:opacity-40 ${
                provider === p ? "bg-white/8 text-white/85" : "text-white/35 hover:text-white/60"
              }`}>
              {p === "claude" ? "Claude" : "OpenAI"}
            </button>
          ))}
        </div>
      </div>

      {/* Message thread — dot grid canvas behind, messages on top */}
      <style>{`
        .chat-b-scroll::-webkit-scrollbar { width: 3px; }
        .chat-b-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-b-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #818cf8, #a855f7, #ec4899);
          border-radius: 9999px;
        }
        .chat-b-scroll { scrollbar-width: thin; scrollbar-color: #a855f7 transparent; }
      `}</style>
      <div
        className="relative h-[50vh]"
        onMouseMove={onDotMove}
        onMouseLeave={onDotLeave}
      >
        <canvas
          ref={dotCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />
        <div ref={chatRef} className="chat-b-scroll relative z-10 h-full overflow-y-auto py-2">
          {messages.length === 0 ? (
            <p className="text-sm text-white/25">
              Ask about Billy&apos;s background, projects, or availability.
            </p>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] text-sm leading-7 ${
                    msg.role === "user"
                      ? "rounded-xl bg-white/5 px-4 py-2.5 text-white/80"
                      : "relative pl-4 text-white/60 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:rounded-full before:bg-linear-to-b before:from-indigo-400 before:via-purple-500 before:to-pink-500"
                  }`}>
                    {!msg.content ? (
                      <span className="inline-flex gap-1 text-white/30">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse [animation-delay:0.2s]">.</span>
                        <span className="animate-pulse [animation-delay:0.4s]">.</span>
                      </span>
                    ) : msg.role === "assistant" ? (
                      <ReactMarkdown components={MD}>{msg.content}</ReactMarkdown>
                    ) : msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick prompts + bare input */}
      <div className="mt-8 space-y-8 border-t border-white/6 pt-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {QUICK_PROMPTS.map((item) => (
            <button key={item.label}
              onClick={() => sendMessage(item.message)}
              disabled={isLoading}
              className="text-sm cursor-pointer text-white/45 transition outline-1 rounded-md py-1 px-2 hover:text-white/70 disabled:opacity-40">
              {item.label}
            </button>
          ))}
        </div>
        <div className="group relative">
          <div className="flex items-center gap-4 pb-3">
            <input
              type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a question..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/22 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="text-sm text-white/35 transition hover:text-white/70 disabled:opacity-30">
              →
            </button>
          </div>
          {/* Underline — both layers share the same 1px slot */}
          <div className="relative h-px">
            <div className="absolute inset-0 bg-white/15 transition-opacity duration-300 group-focus-within:opacity-0" />
            <div className="absolute inset-0 bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
            <div className="absolute inset-x-0 top-0 h-3 bg-linear-to-r from-indigo-400/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-sm transition-opacity duration-300 group-focus-within:opacity-100" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const DEMO_USER = "What kind of work does Billy do?";
const DEMO_TEXT =
`Billy is a full-stack developer focused on **AI-powered web experiences** — the kind that feel fast, intentional, and actually useful.

His work spans the full stack:

- **Frontend** — Next.js, React, Tailwind CSS, Framer Motion. He cares about the small details: transitions, type scale, spacing.
- **Backend** — REST APIs, server logic, Postgres, deployed on Vercel.
- **AI integration** — Claude, OpenAI. He builds assistants, streaming interfaces, and context-aware features into production apps.

He's open to full-time roles and select collaborations. Feel free to ask about a specific project or skill.`;

/* ── Root component ── */
export default function ChatBotLarge() {
  const [variant, setVariant]     = useState<"A" | "B">("B");
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider]   = useState<Provider>("openai");
  const chatRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.05 });

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!inView) return;
    const ivRef = { current: 0 as number };
    setMessages([{ role: "user", content: DEMO_USER }]);

    const t1 = setTimeout(() => {
      setIsLoading(true);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    }, 700);

    const t2 = setTimeout(() => {
      let i = 0;
      ivRef.current = window.setInterval(() => {
        i += 5;
        if (i >= DEMO_TEXT.length) {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: DEMO_TEXT };
            return copy;
          });
          setIsLoading(false);
          clearInterval(ivRef.current);
          return;
        }
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: DEMO_TEXT.slice(0, i) };
          return copy;
        });
      }, 18);
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(ivRef.current);
    };
  }, [inView]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, provider }),
      });
      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.role === "assistant") copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: "Sorry, something went wrong. Please try again." };
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  const chatProps: ChatProps = {
    messages, input, isLoading, provider,
    chatRef: chatRef as React.RefObject<HTMLDivElement | null>,
    setInput, setProvider, setMessages, sendMessage, handleKeyDown,
  };

  return (
    <motion.div
      ref={sectionRef}
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Variant toggle */}
        <div className="mb-10 flex items-center justify-between border-b border-white/6 pb-4">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/20">Preview variant</span>
          <div className="inline-flex rounded-full border border-white/8 bg-white/3 p-1">
            {(["A", "B"] as const).map((v) => (
              <button key={v} onClick={() => setVariant(v)}
                className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] transition ${
                  variant === v ? "bg-white/8 text-white/85" : "text-white/35 hover:text-white/60"
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {variant === "A"
            ? <VariantA key="A" {...chatProps} />
            : <VariantB key="B" {...chatProps} />
          }
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
