"use client";

import { GradientTitle } from "./GradientTitle";
import { motion } from "framer-motion";

const stack = [
  {
    name: "Frontend",
    tools: ["React", "Next.js", "Tailwind", "TypeScript", "Framer Motion"],
    stat: "05 tools",
    glow: "from-cyan-400/70 via-white/80 to-cyan-400/70",
  },
  {
    name: "Backend",
    tools: ["Node.js", "Express", "Postgres", "REST APIs", "Prisma"],
    stat: "05 tools",
    glow: "from-emerald-400/70 via-white/80 to-emerald-400/70",
  },
  {
    name: "AI",
    tools: ["OpenAI API", "LangChain", "RAG", "Prompt Design"],
    stat: "04 tools",
    glow: "from-violet-400/70 via-white/80 to-violet-400/70",
  },
];

function SignalLine({ delay = 0 }: { delay?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`signal-base-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="80%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <path
          d="M0,12 C8,12 10,7 16,7 C22,7 25,14 31,14 C37,14 40,9 46,9 C53,9 56,12 62,12 C68,12 72,5 78,5 C84,5 88,11 93,11 C97,11 99,9 100,9"
          fill="none"
          stroke={`url(#signal-base-${delay})`}
          strokeWidth="0.65"
          strokeLinecap="round"
        />
      </svg>

      <motion.div
        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/16 to-transparent blur-md"
        initial={{ x: "-20%" }}
        animate={{ x: "120%" }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </div>
  );
}

function StackLane({
  item,
  index,
}: {
  item: (typeof stack)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-white/[0.02] px-4 py-4 md:px-5"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(120,100,255,0.05),transparent_30%)] opacity-70" />
      </div>

      <SignalLine delay={index * 0.55} />

      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 md:w-44">
          <div className="flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${item.glow} shadow-[0_0_12px_rgba(255,255,255,0.25)]`} />
            <h3 className="text-sm font-medium uppercase tracking-[0.22em] text-white/42">
              {item.name}
            </h3>
          </div>

          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/24">
            {item.stat}
          </p>
        </div>

        <div className="flex flex-1 flex-wrap gap-2">
          {item.tools.map((tool, toolIndex) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.08 + toolIndex * 0.04,
              }}
              className="rounded-full border border-white/[0.08] bg-black/25 px-3 py-1.5 text-sm text-white/78 transition duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.03]"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section className="m-4 space-y-4">
      <GradientTitle>Tech Stack</GradientTitle>

      <div className="relative overflow-hidden rounded-[30px] border border-white/[0.06] bg-black/20 p-4 md:p-5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.04),transparent_20%),radial-gradient(circle_at_85%_82%,rgba(120,100,255,0.06),transparent_24%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </div>

        <div className="relative z-10 mb-4 flex items-end justify-between gap-4">
          <p className="max-w-2xl text-sm leading-7 text-white/38">
            A compact view of the tools I reach for most often — organized more
            like active lanes than a static list.
          </p>

          <div className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/28 md:block">
            Signal Board
          </div>
        </div>

        <div className="space-y-3">
          {stack.map((item, index) => (
            <StackLane key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}