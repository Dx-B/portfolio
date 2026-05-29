"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Scope",
    description:
      "Define what success looks like, who the end user is, and what the MVP actually needs to be.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Architecture decisions and wireframe or Figma mockup. Framework, API strategy, and state management chosen here.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Components built in isolation with unit tests written alongside the code. Architecture stays clean and composable.",
  },
  {
    step: "04",
    title: "Review & QA",
    description:
      "PR-gated self-review against the diff, end-to-end testing, manual QA across screen sizes, and edge case coverage.",
  },
  {
    step: "05",
    title: "CI/CD",
    description:
      "Automated pipeline runs lint, tests, and build validation. GitHub Actions or Vercel CI gates every deploy.",
  },
  {
    step: "06",
    title: "Ship",
    description: "Live in production. Monitor errors, gather real feedback, and iterate.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Visual mock components
// ─────────────────────────────────────────────────────────────────────────────

function ScopeVisual() {
  const criteria = [
    "User can send messages and receive AI responses",
    "Responses stream token-by-token in real time",
    "Chat history persists across page refreshes",
    "Works on mobile with a responsive layout",
  ];
  return (
    <div className="rounded-xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/6 bg-[#111] px-5 py-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
          Project Brief
        </span>
        <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] text-indigo-400/70">
          MVP
        </span>
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-white/80">AI Chat Assistant</p>
        <p className="mt-1.5 text-xs leading-5 text-white/35">
          A conversational interface backed by the Claude API — real-time streaming, persistent history.
        </p>
        <div className="mt-5 space-y-2.5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">Acceptance Criteria</p>
          {criteria.map((c) => (
            <div key={c} className="flex items-start gap-2.5">
              <div className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border border-white/15" />
              <span className="text-xs leading-5 text-white/45">{c}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
          <span className="text-[10px] text-white/20">Priority: High</span>
          <div className="h-3 w-px bg-white/10" />
          <span className="text-[10px] text-white/20">Target: this sprint</span>
        </div>
      </div>
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center border-b border-white/6 bg-[#111] px-5 py-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
          wireframe.fig
        </span>
        <span className="ml-auto text-[10px] text-white/15">Layout v2</span>
      </div>
      <div className="p-5 space-y-3">
        <div className="relative">
          <span className="absolute -top-4 left-0 text-[9px] text-white/20">Nav</span>
          <div className="flex h-7 w-full items-center rounded border border-white/10 bg-white/2 px-3">
            <div className="h-2 w-12 rounded-sm bg-white/25" />
            <div className="ml-auto flex gap-2">
              <div className="h-1.5 w-8 rounded-sm bg-white/10" />
              <div className="h-1.5 w-8 rounded-sm bg-white/10" />
              <div className="h-5 w-12 rounded-sm bg-white/15" />
            </div>
          </div>
        </div>
        <div className="relative">
          <span className="absolute -top-4 left-0 text-[9px] text-white/20">Hero</span>
          <div className="flex h-24 w-full flex-col items-center justify-center rounded border border-white/10 bg-white/2 gap-2">
            <div className="h-3.5 w-40 rounded-sm bg-white/25" />
            <div className="h-2 w-52 rounded-sm bg-white/10" />
            <div className="mt-1 h-6 w-20 rounded-sm bg-indigo-400/20" />
          </div>
        </div>
        <div className="relative pt-4">
          <span className="absolute top-0 left-0 text-[9px] text-white/20">Feature Cards</span>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex h-16 flex-col items-start justify-end rounded border border-white/8 bg-white/2 p-2 gap-1"
              >
                <div className="h-2 w-full rounded-sm bg-white/15" />
                <div className="h-1.5 w-3/4 rounded-sm bg-white/8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildVisual() {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0a0a0a] overflow-hidden font-mono text-[11px]">
      <div className="flex items-center gap-4 border-b border-white/6 bg-[#111] px-4">
        <span className="border-b border-indigo-400/70 py-2.5 text-white/65">ChatBot.tsx</span>
        <span className="py-2.5 text-white/20">api.ts</span>
        <span className="py-2.5 text-white/20">types.ts</span>
      </div>
      <div className="flex">
        <div className="select-none border-r border-white/5 px-3 py-4 text-right leading-6 text-white/12">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>
        <div className="overflow-x-auto p-4 leading-6">
          <div>
            <span className="text-purple-400">export function </span>
            <span className="text-yellow-300">ChatBot</span>
            <span className="text-white/50">() {"{"}</span>
          </div>
          <div className="pl-4">
            <span className="text-blue-400">const </span>
            <span className="text-white/50">[</span>
            <span className="text-orange-300">msgs</span>
            <span className="text-white/50">, </span>
            <span className="text-orange-300">setMsgs</span>
            <span className="text-white/50">] = </span>
            <span className="text-yellow-300">useState</span>
            <span className="text-white/40">{"<"}</span>
            <span className="text-green-300">Msg[]</span>
            <span className="text-white/40">{">"}</span>
            <span className="text-white/50">([])</span>
          </div>
          <div className="pl-4 text-green-400/55">{"// stream each token as it arrives"}</div>
          <div className="pl-4">
            <span className="text-blue-400">const </span>
            <span className="text-orange-300">send </span>
            <span className="text-white/50">= </span>
            <span className="text-purple-400">async </span>
            <span className="text-white/50">(msg: </span>
            <span className="text-green-300">string</span>
            <span className="text-white/50">) ={">"} {"{"}</span>
          </div>
          <div className="pl-8">
            <span className="text-blue-400">for await </span>
            <span className="text-white/50">(</span>
            <span className="text-blue-400">const </span>
            <span className="text-orange-300">tok </span>
            <span className="text-blue-400">of </span>
            <span className="text-yellow-300">stream</span>
            <span className="text-white/50">(msg)) {"{"}</span>
          </div>
          <div className="pl-12">
            <span className="text-yellow-300">setMsgs</span>
            <span className="text-white/50">(prev ={">"} [...prev, tok])</span>
          </div>
          <div className="pl-8 text-white/50">{"}"}</div>
          <div className="pl-4 text-white/50">{"}"}</div>
          <div className="text-white/50">{"}"}</div>
        </div>
      </div>
    </div>
  );
}

function ReviewVisual() {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
      <div className="border-b border-white/6 bg-[#111] px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400/80" />
          <span className="text-[11px] font-medium text-white/65">
            feat: streaming chat response
          </span>
        </div>
        <div className="mt-1 text-[10px] text-white/25">
          3 files changed · +47 −12 · self-review
        </div>
      </div>
      <div className="p-4 font-mono text-[11px] leading-6 space-y-0.5">
        <div className="rounded-sm bg-white/2 px-2 py-0.5 text-white/20">api.ts</div>
        <div className="rounded-sm bg-red-500/10 px-2 py-0.5 text-red-400/65">
          {"- const resp = await fetch(chatUrl)"}
        </div>
        <div className="rounded-sm bg-red-500/10 px-2 py-0.5 text-red-400/65">
          {"- return resp.json()"}
        </div>
        <div className="rounded-sm bg-green-500/10 px-2 py-0.5 text-green-400/65">
          {"+ const stream = await streamChat(chatUrl)"}
        </div>
        <div className="rounded-sm bg-green-500/10 px-2 py-0.5 text-green-400/65">
          {"+ for await (const tok of stream) yield tok"}
        </div>
      </div>
      <div className="mx-4 mb-4 rounded-lg border border-white/8 bg-white/2 p-3">
        <div className="mb-1.5 text-[10px] text-indigo-400/60">Review note</div>
        <div className="text-[11px] leading-5 text-white/40">
          Handle 429 rate-limit: add retry with backoff before yielding error token.
        </div>
      </div>
    </div>
  );
}

type PipelineStep = { name: string; time?: string; note?: string; running?: boolean };

const PIPELINE: PipelineStep[] = [
  { name: "Lint & format", time: "2s" },
  { name: "Type check", time: "4s" },
  { name: "Unit tests", note: "14 passed" },
  { name: "Build (Next.js)", time: "18s" },
  { name: "Deploy to Vercel", running: true },
];

function CICDVisual() {
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    [0, 1, 2, 3].forEach((s, i) => {
      timers.push(setTimeout(() => setDone((prev) => [...prev, s]), (i + 1) * 550));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-white/6 bg-[#111] px-5 py-3">
        <div className="h-2 w-2 rounded-full bg-yellow-400/70 animate-pulse" />
        <span className="text-[11px] text-white/50">
          CI Pipeline · push to <span className="text-white/30">main</span>
        </span>
      </div>
      <div className="p-5 space-y-3.5">
        {PIPELINE.map((step, i) => {
          const complete = done.includes(i);
          const isRunning = !complete && !!step.running;
          return (
            <div key={step.name} className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                  complete ? "bg-green-500/20" : isRunning ? "bg-yellow-500/15" : "bg-white/4"
                }`}
              >
                {complete ? (
                  <svg viewBox="0 0 10 10" className="h-3 w-3 text-green-400">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isRunning ? (
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/80 animate-pulse" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
                )}
              </div>
              <span className={`text-[11px] transition-colors duration-300 ${complete ? "text-white/60" : isRunning ? "text-yellow-300/70" : "text-white/20"}`}>
                {step.name}
              </span>
              <span className="ml-auto text-[10px]">
                {step.time && complete && <span className="text-white/20">{step.time}</span>}
                {step.note && complete && <span className="text-white/20">{step.note}</span>}
                {isRunning && <span className="text-yellow-400/40">running…</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShipVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-green-500/15 bg-green-500/4 px-4 py-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500/15">
          <svg viewBox="0 0 10 10" className="h-3.5 w-3.5 text-green-400">
            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="text-xs font-medium text-white/70">Deployment complete</div>
          <div className="mt-0.5 text-[10px] text-indigo-400/60">prod → billy-zhang.vercel.app</div>
        </div>
        <div className="ml-auto text-[10px] text-white/20">just now</div>
      </div>
      <div className="rounded-xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/6 bg-[#111] px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
          </div>
          <div className="ml-3 flex flex-1 items-center gap-1.5 rounded-md bg-white/4 px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-green-400/50" />
            <span className="text-[10px] text-white/25">billy-zhang.vercel.app</span>
          </div>
        </div>
        <div className="p-5 text-center">
          <div className="text-xs font-semibold text-white/60">AI Chat Assistant</div>
          <div className="mt-1.5 text-[10px] text-white/25">powered by Claude API</div>
          <div className="mx-auto mt-4 flex h-8 max-w-48 items-center rounded-lg border border-white/8 bg-white/2 px-3 gap-2">
            <span className="flex-1 text-left text-[10px] text-white/20">Ask me anything…</span>
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-500/25">
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-indigo-400/70">
                <path d="M2 5h6M6 3l2 2-2 2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="mt-3 text-[10px] text-white/15">Live · 0 errors · p95 latency: 42ms</div>
        </div>
      </div>
    </div>
  );
}

const VISUAL_COMPONENTS = [ScopeVisual, DesignVisual, BuildVisual, ReviewVisual, CICDVisual, ShipVisual];

function VisualMock({ index }: { index: number }) {
  const Visual = VISUAL_COMPONENTS[index];
  return <Visual />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Arrow connector (used in Flow layout)
// ─────────────────────────────────────────────────────────────────────────────

function StepArrow() {
  return (
    <div className="flex justify-center py-4">
      <div className="flex flex-col items-center gap-0.5">
        <div className="h-7 w-px bg-white/12" />
        <svg className="h-3 w-3 text-white/20" viewBox="0 0 12 8" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout variants
// ─────────────────────────────────────────────────────────────────────────────

function TimelineLayout({
  inView,
  active,
  setActive,
  stepRefs,
}: {
  inView: boolean;
  active: number;
  setActive: (i: number) => void;
  stepRefs: React.RefObject<(HTMLDivElement | null)[]>;
}) {
  return (
    <>
      {/* Mobile: plain vertical timeline */}
      <div className="relative border-l border-white/6 pl-10 xl:hidden">
        <div className="space-y-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative"
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 + i * 0.1 }}
            >
              <div className="absolute left-[-2.65rem] top-1.5 h-2 w-2 rounded-full bg-white/20" />
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
                {step.step} · {step.title}
              </p>
              <p className="mt-1 max-w-[40ch] text-sm leading-6 text-white/45">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop: timeline left + sticky visual right */}
      <div className="hidden xl:flex xl:gap-16">
        {/* Left: vertical timeline */}
        <div className="w-72 shrink-0">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <motion.button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-7 w-7 shrink-0 rounded-full border transition-colors duration-300 ${
                    active === i ? "border-white/50 bg-white/8" : "border-white/15 bg-[#0f0f0f]"
                  }`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 + i * 0.08 }}
                />
                {i < STEPS.length - 1 && (
                  <motion.div
                    className={`w-px flex-1 transition-colors duration-500 ${active > i ? "bg-white/20" : "bg-white/8"}`}
                    style={{ minHeight: "56px" }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.18 + i * 0.08 }}
                  />
                )}
              </div>
              <motion.div
                className="pb-10 pt-0.5"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 + i * 0.08 }}
              >
                <p className={`text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${active === i ? "text-indigo-400/80" : "text-white/20"}`}>
                  {step.step}
                </p>
                <p className={`mt-1.5 text-sm font-semibold transition-colors duration-300 ${active === i ? "text-white/90" : "text-white/40"}`}>
                  {step.title}
                </p>
                <p className="mt-2 max-w-[22ch] text-xs leading-5 text-white/30">{step.description}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Right: sticky visual panel */}
        <div className="flex-1">
          <div className="sticky top-[25vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <VisualMock index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

function FlowLayout() {
  return (
    <div>
      {STEPS.map((step, i) => (
        <motion.div
          key={step.step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
        >
          <div className="flex items-start gap-8 xl:gap-12">
            {/* Mock visual — fills available width */}
            <div className="flex-1 flex flex-col">
              <VisualMock index={i} />
              {i < STEPS.length - 1 && <StepArrow />}
            </div>

            {/* Description — desktop only, right side */}
            <div className="hidden xl:flex xl:w-64 xl:shrink-0 xl:flex-col xl:self-start xl:pt-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">{step.step}</p>
              <p className="mt-2 text-base font-semibold text-white/80">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/40">{step.description}</p>
            </div>
          </div>

          {/* Mobile description — below mock */}
          <div className="xl:hidden mt-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
              {step.step} · {step.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-white/40">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

type Layout = "timeline" | "flow";

export function ServicesLarge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState<Layout>("flow");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header + layout toggle */}
        <div className="mb-10 pb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-bold text-white">My Process</h2>
            <div className="flex self-start items-center rounded-full border border-white/10 bg-white/2 p-0.5">
              {(["timeline", "flow"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLayout(l)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-200 ${
                    layout === l ? "bg-white/8 text-white/80" : "text-white/25 hover:text-white/45"
                  }`}
                >
                  {l === "timeline" ? "Timeline" : "Flow"}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            className="mt-4 h-px bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        <p className="mb-12 max-w-2xl text-sm leading-7 text-white/40">
          From brief to production — how I approach every project.
        </p>

        <div ref={sectionRef}>
          <AnimatePresence mode="wait">
            {layout === "timeline" ? (
              <motion.div
                key="timeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TimelineLayout
                  inView={inView}
                  active={active}
                  setActive={setActive}
                  stepRefs={stepRefs}
                />
              </motion.div>
            ) : (
              <motion.div
                key="flow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FlowLayout />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
