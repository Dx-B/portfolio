"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type EffectType = "chat" | "discord" | "cnn";
type Breakdown  = { label: string; description: string; stack: string[] };

type FeaturedProject = {
  title: string;
  tagline: string;
  description: string;
  category: string;
  year: string;
  effect: EffectType;
  breakdown: Breakdown[];
  link?: string;
};

type Project = {
  title: string;
  description: string;
  stack: string[];
  category: "AI" | "UI" | "Backend" | "Systems";
};

// ── Data ──────────────────────────────────────────────────────────────────────
const FEATURED: FeaturedProject[] = [
  {
    title: "AI Chat Platform",
    tagline: "Real-time streaming AI chat",
    description: "Production-grade chat with streaming responses, memory persistence, and low-latency AI workloads.",
    category: "AI", year: "2025", effect: "chat", link: "#",
    breakdown: [
      { label: "Frontend",   description: "Streaming UI with optimistic updates and real-time token rendering.",       stack: ["Next.js", "React", "Tailwind"] },
      { label: "Middleware", description: "Auth layer, rate limiting, and session token management.",                   stack: ["Next.js API", "JWT", "Redis"] },
      { label: "Backend",    description: "OpenAI streaming pipeline with conversation memory and context windowing.", stack: ["OpenAI SDK", "Vercel AI", "Postgres"] },
    ],
  },
  {
    title: "CNN Classifier",
    tagline: "Image recognition · PyTorch",
    description: "Convolutional neural network trained on CIFAR-10. Multi-class image classification with 92% test accuracy.",
    category: "AI", year: "2024", effect: "cnn", link: "#",
    breakdown: [
      { label: "Model",     description: "5-layer CNN with batch normalization, dropout regularization, and ReLU activations.",  stack: ["PyTorch", "CUDA", "Python"] },
      { label: "Training",  description: "Trained on CIFAR-10 with data augmentation and cosine annealing scheduler.",           stack: ["Weights & Biases", "NumPy", "Matplotlib"] },
      { label: "Inference", description: "Exported to ONNX for cross-platform deployment with sub-10ms CPU inference.",          stack: ["ONNX", "FastAPI", "Docker"] },
    ],
  },
  {
    title: "Discord Music Bot",
    tagline: "Serving 200+ concurrent users",
    description: "Python Discord bot with real-time audio streaming, Spotify/YouTube queue management, and slash commands.",
    category: "Backend", year: "2023", effect: "discord", link: "#",
    breakdown: [
      { label: "Bot Core", description: "discord.py async command framework with voice channel and event handling.",    stack: ["Python", "discord.py", "asyncio"] },
      { label: "Audio",    description: "Source extraction, FFmpeg transcoding, and a queue state machine.",            stack: ["yt-dlp", "FFmpeg", "Lavalink"] },
      { label: "Infra",    description: "Self-hosted on VPS with process supervision, health checks, and monitoring.", stack: ["Docker", "systemd", "Linux"] },
    ],
  },
];

const PROJECTS: Project[] = [
  { title: "AI Chat Platform",  description: "Real-time streaming AI chat with memory.",        stack: ["Next.js", "OpenAI"],       category: "AI"      },
  { title: "CNN Classifier",    description: "PyTorch image classifier, 92% test accuracy.",    stack: ["PyTorch", "Python"],       category: "AI"      },
  { title: "Discord Music Bot", description: "Python bot serving 200+ concurrent users.",       stack: ["Python", "discord.py"],    category: "Backend" },
  { title: "Task Manager",      description: "Offline-first productivity tool.",                stack: ["TypeScript", "IndexedDB"], category: "Systems" },
  { title: "E-commerce UI",     description: "High-performance storefront interface.",          stack: ["Next.js", "Stripe"],       category: "Backend" },
];

const GRADIENT: Record<string, string> = {
  AI:      "from-indigo-400 to-purple-500",
  UI:      "from-purple-400 to-pink-500",
  Backend: "from-sky-400 to-indigo-500",
  Systems: "from-emerald-400 to-sky-500",
};

// ── Shared: thinking dots ─────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-white/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22 }}
        />
      ))}
    </span>
  );
}

// ── Effect: AI Chat ───────────────────────────────────────────────────────────
type ChatMsg = { role: "user" | "ai"; text: string; typing: boolean };

const CHAT_CONV = [
  { user: "What can you build?",
    ai:   "Full-stack apps, AI tools, and Discord bots — fast, precise, production-ready." },
  { user: "Best project so far?",
    ai:   "This portfolio. Every card runs a live demo — chat, CNN propagation, Discord UI." },
  { user: "Favorite stack?",
    ai:   "Next.js, Tailwind v4, Framer Motion, and Claude API for the AI layer." },
];

function ChatEffect({ isCenter }: { isCenter: boolean }) {
  const [cycleKey, setCycleKey] = useState(0);
  const [messages, setMessages] = useState<ChatMsg[]>([]);

  useEffect(() => {
    const timers:    number[] = [];
    const intervals: number[] = [];

    timers.push(window.setTimeout(() => setMessages([]), 0));

    let t = 600;
    const CHARS = 4;
    const TICK  = 34;

    CHAT_CONV.forEach(({ user, ai }) => {
      timers.push(window.setTimeout(() => {
        setMessages((prev) => [...prev, { role: "user", text: user, typing: false }]);
      }, t));
      t += 900;

      timers.push(window.setTimeout(() => {
        setMessages((prev) => [...prev, { role: "ai", text: "", typing: true }]);
      }, t));
      t += 1100;

      const typingMs = Math.ceil(ai.length / CHARS) * TICK;
      timers.push(window.setTimeout(() => {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "ai", text: "", typing: false };
          return copy;
        });
        let i = 0;
        const iv = window.setInterval(() => {
          i += CHARS;
          if (i >= ai.length) {
            setMessages((prev) => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: "ai", text: ai, typing: false };
              return copy;
            });
            clearInterval(iv);
          } else {
            setMessages((prev) => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: "ai", text: ai.slice(0, i), typing: false };
              return copy;
            });
          }
        }, TICK);
        intervals.push(iv);
      }, t));
      t += typingMs + 1000;
    });

    timers.push(window.setTimeout(() => setCycleKey((k) => k + 1), t + 1800));

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [cycleKey]);

  const restart = useCallback(() => setCycleKey((k) => k + 1), []);

  return (
    <div
      className="relative h-full overflow-hidden bg-[#080808]"
      onMouseEnter={() => { if (isCenter) restart(); }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[28px_28px]" />

      {/* Messages build from bottom; overflow clips oldest at top */}
      <div className="absolute inset-0 flex flex-col justify-end gap-3 overflow-hidden px-4 py-4">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex shrink-0 justify-end"
            >
              <div className="max-w-[78%] rounded-xl rounded-br-sm bg-white/8 px-3 py-2 text-xs leading-5 text-white/65">
                {msg.text}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22 }}
              className="flex shrink-0 items-start gap-2.5"
            >
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 opacity-80" />
              <div className="relative min-h-[1.25rem] max-w-[82%] pl-3">
                <div className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-linear-to-b from-indigo-400 via-purple-500 to-pink-500" />
                <span className="text-xs leading-5 text-white/55">
                  {msg.typing ? <ThinkingDots /> : msg.text}
                </span>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

// ── Effect: Discord Music Bot ─────────────────────────────────────────────────
type DiscordMsg =
  | { kind: "user";  avatar: string; avatarBg: string; name: string; nameColor: string; text: string }
  | { kind: "embed"; borderColor: string; title: string; songTitle: string; fields: { label: string; value: string }[] };

const DISCORD_FEED: DiscordMsg[] = [
  { kind: "user",  avatar: "B", avatarBg: "#5865F2", name: "DxB", nameColor: "#c9b4f8", text: "!play Still D.R.E." },
  { kind: "embed", borderColor: "#5865F2", title: "Added to Queue", songTitle: "Still D.R.E. — Dr. Dre",
    fields: [{ label: "Duration", value: "4:01" }, { label: "Position", value: "#1" }] },
    { kind: "user",  avatar: "T", avatarBg: "#586542", name: "TRS", nameColor: "#586542", text: "Now Playing Still D.R.E.!" },
  { kind: "embed", borderColor: "#5865F2", title: "Added to Queue", songTitle: "Still D.R.E. — Dr. Dre",
    fields: [{ label: "Duration", value: "4:01" }, { label: "Position", value: "#1" }] },
  { kind: "user",  avatar: "K", avatarBg: "#ED4245", name: "Kal", nameColor: "#f8a97f", text: "!nowplaying" },
  { kind: "embed", borderColor: "#57F287", title: "Now Playing", songTitle: "Still D.R.E. — Dr. Dre",
    fields: [{ label: "Progress", value: "1:23 / 4:01" }, { label: "Queue", value: "3 left" }] },
];

function DiscordEffect({ isCenter }: { isCenter: boolean }) {
  const [cycleKey, setCycleKey] = useState(0);
  const [visible,  setVisible]  = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setVisible(0), 0));
    DISCORD_FEED.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisible(i + 1), 500 + i * 1200));
    });
    timers.push(window.setTimeout(
      () => setCycleKey((k) => k + 1),
      500 + DISCORD_FEED.length * 1200 + 1800
    ));
    return () => timers.forEach(clearTimeout);
  }, [cycleKey]);

  const restart = useCallback(() => setCycleKey((k) => k + 1), []);

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ background: "#313338" }}
      onMouseEnter={() => { if (isCenter) restart(); }}
    >
      {/* ── Left sidebar: voice channels (~20%) ── */}
      <div className="flex w-22 shrink-0 flex-col overflow-hidden" style={{ background: "#2B2D31" }}>
        <div className="px-2 pt-3 pb-1">
          <p className="text-[8px] font-bold uppercase tracking-[0.07em]" style={{ color: "#82878D" }}>
            Voice Channels
          </p>
        </div>

        {/* General channel row */}
        <div className="px-1.5">
          <div className="flex items-center gap-1 rounded px-1 py-0.5" style={{ background: "rgba(255,255,255,0.07)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" style={{ fill: "#8B9297", flexShrink: 0 }}>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <span className="truncate text-[10px] font-semibold" style={{ color: "#DBDEE1" }}>General</span>
          </div>

          {/* Connected users */}
          <div className="mt-2 space-y-2 pl-2">
            {/* billyzhang — speaking (pulsing green ring) */}
            <div className="flex items-center gap-1.5">
              <div className="relative h-4 w-4 shrink-0">
                <div className="flex h-full w-full items-center justify-center rounded-full text-[7px] font-bold text-white"
                  style={{ background: "#5865F2" }}>
                  B
                </div>
                <motion.div
                  className="absolute rounded-full"
                  style={{ inset: "-2px", border: "1.5px solid #23A559" }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <span className="truncate text-[9px]" style={{ color: "#B5BAC1" }}>DxB</span>
            </div>

            {/* Octave BOT */}
            <div className="flex items-center gap-1.5">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[7px] font-bold text-white"
                style={{ background: "#586542" }}>
                O
              </div>
              <span className="truncate text-[9px]" style={{ color: "#B5BAC1" }}>TRS</span>
              <span className="ml-auto shrink-0 rounded px-0.5 py-px text-[6px] font-bold uppercase text-white"
                style={{ background: "#5865F2" }}>
                BOT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Column divider */}
      <div className="w-px shrink-0" style={{ background: "rgba(0,0,0,0.35)" }} />

      {/* ── Right: text channel ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Channel header */}
        <div className="flex shrink-0 items-center gap-1.5 px-2.5 py-2"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
          <span className="text-sm font-bold leading-none" style={{ color: "#80848E" }}>#</span>
          <span className="text-[11px] font-semibold" style={{ color: "#DBDEE1" }}>bot-commands</span>
        </div>

        {/* Messages */}
        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6"
            style={{ background: "linear-gradient(to bottom, #313338, transparent)" }} />
          <div className="absolute inset-0 flex flex-col justify-end gap-1.5 overflow-hidden px-2 py-2">
            {DISCORD_FEED.slice(0, visible).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {msg.kind === "user" ? (
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                      style={{ background: msg.avatarBg }}>
                      {msg.avatar}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold" style={{ color: msg.nameColor }}>
                        {msg.name}
                      </span>
                      <p className="mt-0.5 text-[10px] leading-snug" style={{ color: "#DBDEE1" }}>
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Bot embed card */
                  <div className="ml-8 overflow-hidden rounded"
                    style={{ background: "#2B2D31", borderLeft: `3px solid ${msg.borderColor}` }}>
                    <div className="flex gap-2 px-2 py-1.5">
                      <div className="min-w-0 flex-1">
                        {/* Bot name row */}
                        <div className="mb-1 flex items-center gap-1">
                          <span className="rounded px-0.5 py-px text-[7px] font-bold uppercase text-white"
                            style={{ background: "#5865F2" }}>
                            BOT
                          </span>
                          <span className="text-[9px] font-semibold" style={{ color: "#DBDEE1" }}>Octave</span>
                        </div>
                        {/* Embed title */}
                        <p className="text-[10px] font-semibold leading-none" style={{ color: msg.borderColor }}>
                          {msg.title}
                        </p>
                        {/* Song link */}
                        <p className="mt-0.5 text-[9px]" style={{ color: "#00AFF4" }}>
                          {msg.songTitle}
                        </p>
                        {/* Fields grid */}
                        <div className="mt-1 flex gap-3">
                          {msg.fields.map((f) => (
                            <div key={f.label}>
                              <p className="text-[8px] font-semibold" style={{ color: "#DBDEE1" }}>{f.label}</p>
                              <p className="text-[8px]" style={{ color: "#B5BAC1" }}>{f.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Thumbnail */}
                      <div className="h-9 w-9 shrink-0 rounded"
                        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #5865F2 100%)" }} />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Effect: CNN Forward Pass ──────────────────────────────────────────────────
const CNN_Y = [
  [22, 50, 78],
  [14, 35, 57, 78],
  [14, 35, 57, 78],
  [35, 65],
];
const CNN_X = [26, 68, 110, 152];

const CNN_PALETTE = [
  "rgba(129,140,248,0.55)",
  "rgba(167,139,250,0.55)",
  "rgba(236,72,153,0.55)",
  "rgba(56,189,248,0.55)",
  "rgba(52,211,153,0.55)",
];

function CNNEffect({ isCenter }: { isCenter: boolean }) {
  const [cycleKey, setCycleKey] = useState(0);
  const [phase,    setPhase]    = useState(-1);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(-1), 0));
    for (let p = 0; p <= 3; p++) {
      timers.push(window.setTimeout(() => setPhase(p), 200 + p * 750));
    }
    timers.push(window.setTimeout(() => setCycleKey((k) => k + 1), 200 + 3 * 750 + 1300));
    return () => timers.forEach((id) => clearTimeout(id));
  }, [cycleKey]);

  const restart = useCallback(() => setCycleKey((k) => k + 1), []);

  return (
    <div
      className="relative h-full overflow-hidden bg-[#080808]"
      onMouseEnter={() => { if (isCenter) restart(); }}
    >
      <svg className="h-full w-full" viewBox="0 0 178 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* Connections */}
        {CNN_Y.slice(0, -1).map((fromY, li) =>
          fromY.map((fy, fi) =>
            CNN_Y[li + 1].map((ty, ti) => {
              const color = CNN_PALETTE[(li * 13 + fi * 7 + ti * 3) % CNN_PALETTE.length];
              return (
                <line
                  key={`c${li}${fi}${ti}`}
                  x1={CNN_X[li]} y1={fy}
                  x2={CNN_X[li + 1]} y2={ty}
                  style={{
                    stroke: phase >= li + 1 ? color : "rgba(255,255,255,0.05)",
                    strokeWidth: 0.35,
                    transition: "stroke 0.55s ease",
                  }}
                />
              );
            })
          )
        )}

        {/* Nodes */}
        {CNN_Y.map((nodes, li) =>
          nodes.map((y, ni) => {
            const active = phase >= li;
            return (
              <circle
                key={`n${li}${ni}`}
                cx={CNN_X[li]} cy={y} r="3"
                style={{
                  fill: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.07)",
                  opacity: active ? 1 : 0.45,
                  transition: "fill 0.5s ease, opacity 0.5s ease",
                }}
              />
            );
          })
        )}

        {/* Layer labels */}
        {["Input", "Hidden", "Hidden", "Output"].map((lbl, i) => (
          <text key={lbl + i} x={CNN_X[i]} y={95} textAnchor="middle" fontSize="4.2"
            style={{ fill: "rgba(255,255,255,0.18)", fontFamily: "inherit" }}>
            {lbl}
          </text>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-transparent to-[#0f0f0f]" />
    </div>
  );
}

// ── Gradient card border ──────────────────────────────────────────────────────
function FeaturedBorder({ uid }: { uid: string }) {
  const gId  = `fg-${uid}`;
  const blId = `fb-${uid}`;
  return (
    <svg
      className="pointer-events-none absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible"
      preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true"
    >
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#818cf8" />
          <stop offset="50%"  stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id={blId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.rect
        x="0.5" y="0.5" width="99" height="99" rx="14" ry="14"
        fill="none" stroke={`url(#${gId})`} strokeWidth="1.5"
        vectorEffect="non-scaling-stroke" filter={`url(#${blId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: 1.0, ease: "easeInOut" }, opacity: { duration: 0.01 } }}
      />
    </svg>
  );
}

// ── Shared card renderer ──────────────────────────────────────────────────────
function CarouselCard({
  p, isCenter, onClick,
}: {
  p: FeaturedProject; isCenter: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group w-full text-left"
      aria-label={isCenter ? `View ${p.title} breakdown` : `Go to ${p.title}`}>
      <div className="relative">
        <AnimatePresence>
          {isCenter && (
            <motion.div key="border"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <FeaturedBorder uid={p.title.replace(/\s+/g, "")} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={`relative flex h-96 flex-col overflow-hidden rounded-2xl border bg-[#0f0f0f] md:h-104 ${
          isCenter ? "border-white/6" : "border-white/4"
        }`}>
          <div className="relative h-52 shrink-0 overflow-hidden md:h-60">
            {p.effect === "chat"    && <ChatEffect    isCenter={isCenter} />}
            {p.effect === "cnn"     && <CNNEffect     isCenter={isCenter} />}
            {p.effect === "discord" && <DiscordEffect isCenter={isCenter} />}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-b from-transparent to-[#0f0f0f]" />
          </div>
          <div className="flex flex-1 flex-col px-5 pb-5 md:px-6 md:pb-6">
            <p className={`mb-2 text-[10px] uppercase tracking-[0.22em] bg-linear-to-r ${GRADIENT[p.category] ?? "from-white/30 to-white/15"} bg-clip-text text-transparent`}>
              {p.category}
            </p>
            <h3 className={`font-semibold text-white/90 ${isCenter ? "text-lg md:text-xl" : "text-base"}`}>
              {p.title}
            </h3>
            <p className={`mt-1 text-[11px] uppercase tracking-[0.18em] ${isCenter ? "text-white/30" : "text-white/20"}`}>
              {p.tagline}
            </p>
            {isCenter && (
              <p className="mt-2 text-sm leading-6 text-white/40 line-clamp-2">{p.description}</p>
            )}
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/20">{p.year}</span>
              {isCenter && (
                <span className="text-xs text-white/25 transition-colors group-hover:text-white/60">
                  View breakdown →
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────
function Carousel({
  active, onPrev, onNext, onSelect, onGoTo,
}: {
  active: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: () => void;
  onGoTo: (i: number) => void;
}) {
  // ── Mobile: measure container to drive pixel-exact peek translation ──
  const mobileRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);

  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCw(el.clientWidth));
    ro.observe(el);
    setCw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const PEEK = 0.07;   // fraction visible on each side
  const GAP  = 12;     // px between cards
  const cardW = cw * (1 - PEEK * 2);
  const trackX = (i: number) => cw * PEEK - i * (cardW + GAP);

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) onNext();
    else if (dx > 40) onPrev();
  };

  // ── Desktop: reordered [prev, center, next] ──
  const ordered = [
    FEATURED[(active - 1 + 3) % 3],
    FEATURED[active],
    FEATURED[(active + 1) % 3],
  ];

  return (
    <div>
      {/* ════════════════════════════════════════
          MOBILE — single-card peek carousel
          ════════════════════════════════════════ */}
      <div className="md:hidden">
        <div
          ref={mobileRef}
          className="relative overflow-hidden"
          style={{ touchAction: "pan-y" }}
        >
          {/* Sliding track */}
          <div
            className="flex"
            style={{
              transform: cw > 0 ? `translateX(${trackX(active)}px)` : undefined,
              transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)",
              gap: `${GAP}px`,
              willChange: "transform",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {FEATURED.map((p, idx) => {
              const isCenter = idx === active;
              return (
                <div
                  key={p.title}
                  className="shrink-0"
                  style={{ width: cw > 0 ? `${cardW}px` : "86%" }}
                >
                  <CarouselCard
                    p={p}
                    isCenter={isCenter}
                    onClick={() => isCenter ? onSelect() : onGoTo(idx)}
                  />
                </div>
              );
            })}
          </div>

          {/* Left arrow — sits in the peek gap, large and blatant */}
          <button
            onClick={onPrev}
            className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/90 backdrop-blur-sm transition-colors active:bg-black/90"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={onNext}
            className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/90 backdrop-blur-sm transition-colors active:bg-black/90"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {FEATURED.map((_, i) => (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? "h-1.5 w-6 bg-white/60" : "h-1.5 w-1.5 bg-white/25"
              }`}
              aria-label={`Go to ${FEATURED[i].title}`}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          DESKTOP — 3-column scale carousel
          ════════════════════════════════════════ */}
      <div className="relative hidden md:block">
        <div className="grid grid-cols-3 items-center gap-5">
          {ordered.map((p, slotIdx) => {
            const isCenter = slotIdx === 1;
            return (
              <motion.div
                key={p.title}
                layout
                animate={{ scale: isCenter ? 1 : 0.82, opacity: isCenter ? 1 : 0.38 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                className="origin-center"
              >
                <CarouselCard
                  p={p}
                  isCenter={isCenter}
                  onClick={() => {
                    if (isCenter)           onSelect();
                    else if (slotIdx === 2) onNext();
                    else                   onPrev();
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Desktop arrows */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="flex w-1/3 justify-end pr-3">
            <button onClick={onPrev}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-white/40 transition hover:border-white/25 hover:text-white/70"
              aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
          <div className="w-1/3" />
          <div className="flex w-1/3 justify-start pl-3">
            <button onClick={onNext}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-white/40 transition hover:border-white/25 hover:text-white/70"
              aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Desktop dots */}
        <div className="mt-5 flex justify-center gap-2">
          {FEATURED.map((_, i) => (
            <button key={i}
              onClick={() => onGoTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-white/50" : "w-1 bg-white/20"
              }`}
              aria-label={`Go to ${FEATURED[i].title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Breakdown ─────────────────────────────────────────────────────────────────
function BreakdownCards({ project }: { project: FeaturedProject }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}   transition={{ duration: 0.3 }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.24em] text-white/20">Breakdown</span>
        <span className="h-px flex-1 bg-white/6" />
        <span className={`text-[10px] uppercase tracking-[0.2em] bg-linear-to-r ${GRADIENT[project.category] ?? "from-white/30 to-white/15"} bg-clip-text text-transparent`}>
          {project.title}
        </span>
      </div>

      <div ref={ref} className="grid gap-4 md:grid-cols-3">
        {project.breakdown.map((item, i) => (
          <motion.div key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.1 }}
            className="rounded-2xl border border-white/6 bg-[#0f0f0f] p-5"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/25">{item.label}</p>
            <p className="text-sm leading-6 text-white/55">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.stack.map((t) => (
                <span key={t} className="rounded-md border border-white/8 bg-white/4 px-2 py-0.5 text-xs text-white/35">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {project.link && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.4 }}
        >
          <div className="group relative inline-flex rounded-xl p-px">
            {/* Gradient border — dim at rest, vivid on hover */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-15 transition-opacity duration-300 group-hover:opacity-100" />
            {/* Ambient glow */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />
            {/* Button */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex items-center gap-3 rounded-[11px] bg-[#0f0f0f] px-8 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50 transition-colors duration-200 group-hover:text-white/95"
            >
              View project
              <ChevronRight className="h-3.5 w-3.5 -rotate-45 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Project list ──────────────────────────────────────────────────────────────
function ProjectList() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="divide-y divide-white/5">
      {PROJECTS.map((p, i) => (
        <motion.div key={p.title}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 * i }}
          className="group cursor-pointer flex items-center gap-6 py-5 transition-colors hover:bg-white/1.5 md:gap-10"
        >
          <span className="w-7 shrink-0 text-right font-mono text-xs text-white/15">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white/80 transition-colors group-hover:text-white/95">{p.title}</h3>
            <p className="mt-0.5 text-xs leading-5 text-white/30">{p.description}</p>
          </div>
          <div className="hidden w-44 shrink-0 flex-col gap-2 md:flex">
            <p className={`text-[10px] uppercase tracking-[0.22em] bg-linear-to-r ${GRADIENT[p.category] ?? "from-white/30 to-white/15"} bg-clip-text text-transparent`}>
              {p.category}
            </p>
            <div className="flex flex-wrap gap-1">
              {p.stack.map((t) => (
                <span key={t} className="rounded border border-white/8 bg-white/3 px-1.5 py-0.5 text-[10px] text-white/30">{t}</span>
              ))}
            </div>
          </div>
          <ChevronRight className="mr-3 h-5 w-5 shrink-0 text-white/15 transition-colors group-hover:text-white/50 md:mr-5" />
        </motion.div>
      ))}
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
export function ProjectsLarge() {
  const [active, setActive] = useState(1); // CNN is index 1 — default center
  const breakdownRef        = useRef<HTMLDivElement>(null);

  const prev  = () => setActive((a) => (a - 1 + 3) % 3);
  const next  = () => setActive((a) => (a + 1) % 3);
  const goTo  = (i: number) => setActive(i);

  const handleSelect = () => {
    requestAnimationFrame(() => {
      breakdownRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <motion.div
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex items-center justify-between border-b border-white/6 pb-6">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-white/20">{PROJECTS.length} total</span>
        </div>

        <Carousel active={active} onPrev={prev} onNext={next} onSelect={handleSelect} onGoTo={goTo} />

        <div ref={breakdownRef}>
          <AnimatePresence mode="wait">
            <BreakdownCards key={active} project={FEATURED[active]} />
          </AnimatePresence>
        </div>

        <div className="border-t border-white/6" />

        <ProjectList />
      </div>
    </motion.div>
  );
}
