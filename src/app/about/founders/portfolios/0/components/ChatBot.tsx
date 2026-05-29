"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };
type Provider = "claude" | "openai";

const QUICK_PROMPTS: { label: string; message: string }[] = [
  { label: "Work", message: "What kind of work does Billy do?" },
  { label: "Skills", message: "What are Billy's main technical skills?" },
  { label: "Projects", message: "Tell me about Billy's projects." },
  { label: "Service", message: "Is Billy available for freelance or full-time work?" },
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<Provider>("openai");
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll the message list container — not the page
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Close provider menu on outside click
  useEffect(() => {
    if (!showProviderMenu) return;
    const handler = () => setShowProviderMenu(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showProviderMenu]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, provider }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.role === "assistant") {
            copy[copy.length - 1] = { ...last, content: last.content + chunk };
          }
          return copy;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        };
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex justify-center px-4 my-4">
      <div className="relative h-[95vh] w-full max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl dark:bg-black/25 md:p-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(99,102,241,0.14),transparent_24%),radial-gradient(circle_at_72%_82%,rgba(168,85,247,0.12),transparent_24%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.12]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          {/* Section header */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-gradient-to-r from-indigo-500/18 via-purple-500/14 to-pink-500/14 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-indigo-100/85 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_10px_30px_rgba(120,80,255,0.14)]">
              <span className="h-2 w-2 rounded-full bg-indigo-200 shadow-[0_0_10px_rgba(165,180,252,0.85)]" />
              AI Chat
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white/92 text-shadow-[0_0_12px_rgba(255,255,255,0.18)] md:text-5xl">
              What&apos;s up?
            </h1>
          </div>

          {/* Chat window */}
          <div className="relative flex-1 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-md dark:bg-black/20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(120,100,255,0.05),transparent_28%)]" />
            </div>

            <div className="relative flex h-full flex-col">
              {/* Window header bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4 md:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/25 via-purple-500/15 to-pink-500/10 shadow-[0_0_24px_rgba(120,80,255,0.12)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/84">Billy Assistant</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/26">
                      {isLoading ? "Thinking..." : "Ask me anything"}
                    </div>
                  </div>
                </div>

                {/* Provider dropdown */}
                <div className="relative hidden sm:block" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setShowProviderMenu((v) => !v)}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/50 transition duration-300 hover:border-white/20 hover:text-white/70 disabled:opacity-40"
                  >
                    {provider === "claude" ? "Claude" : "OpenAI"}
                    <svg
                      width="8" height="8" fill="currentColor" viewBox="0 0 16 16"
                      className={`transition-transform duration-200 ${showProviderMenu ? "rotate-180" : ""}`}
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </button>

                  {showProviderMenu && (
                    <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[100px] overflow-hidden rounded-xl border border-white/[0.08] bg-black/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                      {(["claude", "openai"] as Provider[]).map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setProvider(p);
                            setMessages([]);
                            setShowProviderMenu(false);
                          }}
                          className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-[10px] uppercase tracking-[0.22em] transition hover:bg-white/[0.06] ${
                            provider === p ? "text-indigo-300" : "text-white/40"
                          }`}
                        >
                          {provider === p && (
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                          )}
                          {provider !== p && <span className="h-1.5 w-1.5" />}
                          {p === "claude" ? "Claude" : "OpenAI"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Message list — scrolls internally, not the page */}
              <div ref={chatContainerRef} className="chat-scroll flex-1 overflow-y-auto px-4 py-5 md:px-5">
                {messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-center text-sm font-medium text-white/34">
                      Ask me anything about Billy. I&apos;ll be happy to help.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-indigo-500/30 via-purple-500/25 to-pink-500/20 text-white/90 border border-indigo-300/20"
                            : "bg-white/[0.04] text-white/80 border border-white/[0.06]"
                        }`}>
                          {!msg.content ? (
                            <span className="inline-flex gap-1 text-white/30">
                              <span className="animate-pulse">.</span>
                              <span className="animate-pulse [animation-delay:0.2s]">.</span>
                              <span className="animate-pulse [animation-delay:0.4s]">.</span>
                            </span>
                          ) : msg.role === "assistant" ? (
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                strong: ({ children }) => <strong className="font-semibold text-white/95">{children}</strong>,
                                em: ({ children }) => <em className="italic text-white/70">{children}</em>,
                                ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-4">{children}</ul>,
                                ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-4">{children}</ol>,
                                li: ({ children }) => <li className="leading-7">{children}</li>,
                                code: ({ children }) => <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-indigo-200">{children}</code>,
                                pre: ({ children }) => <pre className="my-2 overflow-x-auto rounded-xl bg-black/40 p-3 font-mono text-xs text-indigo-100">{children}</pre>,
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          ) : (
                            msg.content
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="px-4 pb-4 pt-2 md:px-5">
                <div className="space-y-3">
                  {/* Quick prompts — always visible */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {QUICK_PROMPTS.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => sendMessage(item.message)}
                        disabled={isLoading}
                        className="rounded-xl border border-white/[0.08] bg-black/40 px-3 py-1 text-sm text-white/70 transition duration-300 hover:border-white/[0.16] hover:bg-white/[0.05] hover:text-white disabled:opacity-40"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-[20px] border border-white/[0.08] bg-black/40 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] backdrop-blur-md">
                    <div className="flex items-center gap-2 rounded-[16px] bg-white/[0.03] px-3 py-2.5">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything."
                        disabled={isLoading}
                        className="w-full bg-transparent text-sm text-white/84 placeholder:text-white/24 focus:outline-none disabled:opacity-50"
                      />
                      <button
                        onClick={() => sendMessage(input)}
                        disabled={isLoading || !input.trim()}
                        className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:shadow-[0_0_24px_rgba(120,80,255,0.18)] disabled:opacity-40"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
