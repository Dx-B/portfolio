"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Breakdown = { label: string; description: string; stack: string[] };

type FeaturedProject = {
  title: string;
  tagline: string;
  description: string;
  category: string;
  year: string;
  breakdown: Breakdown[];
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
    category: "AI",
    year: "2025",
    breakdown: [
      { label: "Frontend",   description: "Streaming UI with optimistic updates and real-time token rendering.",         stack: ["Next.js", "React", "Tailwind"] },
      { label: "Middleware", description: "Auth layer, rate limiting, and session token management.",                     stack: ["Next.js API", "JWT", "Redis"] },
      { label: "Backend",    description: "OpenAI streaming pipeline with conversation memory and context windowing.",   stack: ["OpenAI SDK", "Vercel AI", "Postgres"] },
    ],
  },
  {
    title: "Portfolio System",
    tagline: "Editorial UI · AI integration",
    description: "This site — component-driven design with scroll animations, an embedded AI chatbot, and Vercel edge delivery.",
    category: "UI",
    year: "2025",
    breakdown: [
      { label: "Frontend",  description: "Framer Motion scroll animations, responsive layouts, and animated primitives.", stack: ["React", "Framer Motion", "Tailwind v4"] },
      { label: "AI Layer",  description: "Embedded Claude chatbot with demo typing and live streaming responses.",        stack: ["Claude API", "Next.js", "Vercel AI SDK"] },
      { label: "Infra",     description: "Static export with edge caching, image optimization, and CI/CD via Vercel.",   stack: ["Next.js", "Vercel", "Speed Insights"] },
    ],
  },
  {
    title: "Discord Music Bot",
    tagline: "Serving 200+ concurrent users",
    description: "Python Discord bot with real-time audio streaming, Spotify/YouTube queue management, and slash commands.",
    category: "Backend",
    year: "2023",
    breakdown: [
      { label: "Bot Core", description: "discord.py async command framework with voice channel and event handling.",    stack: ["Python", "discord.py", "asyncio"] },
      { label: "Audio",    description: "Source extraction, FFmpeg transcoding, and a queue state machine.",            stack: ["yt-dlp", "FFmpeg", "Lavalink"] },
      { label: "Infra",    description: "Self-hosted on VPS with process supervision, health checks, and monitoring.", stack: ["Docker", "systemd", "Linux"] },
    ],
  },
];

const PROJECTS: Project[] = [
  { title: "AI Chat Platform",  description: "Real-time streaming AI chat with memory.",          stack: ["Next.js", "OpenAI"],       category: "AI"      },
  { title: "Portfolio System",  description: "Modular UI system powering this site.",             stack: ["React", "Tailwind"],       category: "UI"      },
  { title: "Discord Music Bot", description: "Python bot serving 200+ concurrent users.",         stack: ["Python", "discord.py"],    category: "Backend" },
  { title: "Task Manager",      description: "Offline-first productivity tool.",                  stack: ["TypeScript", "IndexedDB"], category: "Systems" },
  { title: "E-commerce UI",     description: "High-performance storefront interface.",            stack: ["Next.js", "Stripe"],       category: "Backend" },
];

const GRADIENT: Record<string, string> = {
  AI:      "from-indigo-400 to-purple-500",
  UI:      "from-purple-400 to-pink-500",
  Backend: "from-sky-400 to-indigo-500",
  Systems: "from-emerald-400 to-sky-500",
};

// ── Gradient card border ──────────────────────────────────────────────────────
function FeaturedBorder({ uid }: { uid: string }) {
  const gId  = `fg-${uid}`;
  const blId = `fb-${uid}`;
  return (
    <svg
      className="pointer-events-none absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      aria-hidden="true"
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
        fill="none"
        stroke={`url(#${gId})`}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        filter={`url(#${blId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: 1.0, ease: "easeInOut" }, opacity: { duration: 0.01 } }}
      />
    </svg>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────
function Carousel({
  active,
  onPrev,
  onNext,
  onSelect,
}: {
  active: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: () => void;
}) {
  const ordered = [
    FEATURED[(active - 1 + 3) % 3],
    FEATURED[active],
    FEATURED[(active + 1) % 3],
  ];

  return (
    <div className="relative">
      {/* Cards */}
      <div className="grid grid-cols-3 items-center gap-3 md:gap-5">
        {ordered.map((p, slotIdx) => {
          const isCenter = slotIdx === 1;
          return (
            <motion.div
              key={p.title}
              layout
              animate={{
                scale:   isCenter ? 1 : 0.82,
                opacity: isCenter ? 1 : 0.38,
              }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="origin-center"
            >
              <button
                onClick={() => {
                  if (isCenter)       onSelect();
                  else if (slotIdx === 2) onNext();
                  else                onPrev();
                }}
                className="group w-full text-left"
                aria-label={isCenter ? `View ${p.title} breakdown` : `Go to ${p.title}`}
              >
                <div className="relative">
                  {/* Gradient border — only on center card */}
                  <AnimatePresence>
                    {isCenter && (
                      <motion.div
                        key="border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FeaturedBorder uid={p.title.replace(/\s+/g, "")} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card body */}
                  <div
                    className={`relative flex h-72 flex-col overflow-hidden rounded-2xl border bg-[#0f0f0f] md:h-80 ${
                      isCenter ? "border-white/6" : "border-white/4"
                    }`}
                  >
                    {/* Image strip — gradient placeholder, fades into card bg */}
                    <div className="relative h-20 shrink-0 md:h-24">
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${GRADIENT[p.category] ?? "from-white/5 to-white/2"} opacity-20`}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-b from-transparent to-[#0f0f0f]" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col px-5 pb-5 md:px-6 md:pb-6">
                      {/* Category */}
                      <p
                        className={`mb-3 text-[10px] uppercase tracking-[0.22em] bg-linear-to-r ${GRADIENT[p.category] ?? "from-white/30 to-white/15"} bg-clip-text text-transparent`}
                      >
                        {p.category}
                      </p>

                      {/* Title */}
                      <h3
                        className={`font-semibold text-white/90 ${isCenter ? "text-lg md:text-xl" : "text-base"}`}
                      >
                        {p.title}
                      </h3>

                      {/* Tagline */}
                      <p
                        className={`mt-1 text-[11px] uppercase tracking-[0.18em] ${isCenter ? "text-white/30" : "text-white/20"}`}
                      >
                        {p.tagline}
                      </p>

                      {/* Description — center only */}
                      {isCenter && (
                        <p className="mt-3 text-sm leading-6 text-white/45 line-clamp-3">
                          {p.description}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-white/20">
                          {p.year}
                        </span>
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
            </motion.div>
          );
        })}
      </div>

      {/* Arrows — centered at the column boundaries via overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="flex w-1/3 justify-end pr-3">
          <button
            onClick={onPrev}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-white/40 transition hover:border-white/25 hover:text-white/70"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
        <div className="w-1/3" />
        <div className="flex w-1/3 justify-start pl-3">
          <button
            onClick={onNext}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-white/40 transition hover:border-white/25 hover:text-white/70"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex justify-center gap-2">
        {FEATURED.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === active) return;
              const diff = (i - active + 3) % 3;
              if (diff === 1) onNext();
              else onPrev();
            }}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-white/50" : "w-1 bg-white/20"
            }`}
            aria-label={`Go to ${FEATURED[i].title}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Breakdown section ─────────────────────────────────────────────────────────
function BreakdownCards({ project }: { project: FeaturedProject }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Label row */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.24em] text-white/20">Breakdown</span>
        <span className="h-px flex-1 bg-white/6" />
        <span
          className={`text-[10px] uppercase tracking-[0.2em] bg-linear-to-r ${GRADIENT[project.category] ?? "from-white/30 to-white/15"} bg-clip-text text-transparent`}
        >
          {project.title}
        </span>
      </div>

      {/* Component cards */}
      <div ref={ref} className="grid gap-4 md:grid-cols-3">
        {project.breakdown.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.1 }}
            className="rounded-2xl border border-white/6 bg-[#0f0f0f] p-5"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/25">{item.label}</p>
            <p className="text-sm leading-6 text-white/55">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/8 bg-white/4 px-2 py-0.5 text-xs text-white/35"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
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
        <motion.div
          key={p.title}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 * i }}
          className="group flex items-center gap-6 py-5 transition-colors hover:bg-white/1.5 md:gap-10"
        >
          <span className="w-7 shrink-0 text-right font-mono text-xs text-white/15">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white/80 transition-colors group-hover:text-white/95">
              {p.title}
            </h3>
            <p className="mt-0.5 text-xs leading-5 text-white/30">{p.description}</p>
          </div>

          {/* Category + stack stacked in a fixed-width column */}
          <div className="hidden w-44 shrink-0 flex-col gap-2 md:flex">
            <p
              className={`text-[10px] uppercase tracking-[0.22em] bg-linear-to-r ${GRADIENT[p.category] ?? "from-white/30 to-white/15"} bg-clip-text text-transparent`}
            >
              {p.category}
            </p>
            <div className="flex flex-wrap gap-1">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded border border-white/8 bg-white/3 px-1.5 py-0.5 text-[10px] text-white/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <ChevronRight className="mr-3 h-5 w-5 shrink-0 -rotate-45 text-white/15 transition-colors group-hover:text-white/50 md:mr-5" />
        </motion.div>
      ))}
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
export function ProjectsLarge() {
  const [active, setActive] = useState(0);
  const breakdownRef        = useRef<HTMLDivElement>(null);

  const prev = () => setActive((a) => (a - 1 + 3) % 3);
  const next = () => setActive((a) => (a + 1) % 3);

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
        {/* Section header — gray rule (not gradient) */}
        <div className="flex items-center justify-between border-b border-white/6 pb-6">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-white/20">
            {PROJECTS.length} total
          </span>
        </div>

        {/* Carousel */}
        <Carousel active={active} onPrev={prev} onNext={next} onSelect={handleSelect} />

        {/* Breakdown */}
        <div ref={breakdownRef}>
          <AnimatePresence mode="wait">
            <BreakdownCards key={active} project={FEATURED[active]} />
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="border-t border-white/6" />

        {/* Full project list */}
        <ProjectList />
      </div>
    </motion.div>
  );
}
