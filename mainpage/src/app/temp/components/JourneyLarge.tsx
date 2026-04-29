"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Stop = {
  phase: string;
  title: string;
  preview: string;
  details: string;
  side: "left" | "right";
  top: string;
  x: number;
  width: string;
  nodeSize: number;
};

const journeyItems: Stop[] = [
  {
    phase: "Origin", title: "First Code",
    preview: "Started learning programming and building small web pages.",
    details: "This was the beginning — small experiments, simple layouts, and the first feeling that code could turn vague ideas into something visible and real.",
    side: "left", top: "8%", x: 24, width: "w-[min(44rem,46vw)]", nodeSize: 14,
  },
  {
    phase: "Momentum", title: "First Projects",
    preview: "Built full-stack apps and started thinking beyond static pages.",
    details: "At this point things became more structural. I was no longer just making interfaces — I was learning how frontend, backend, data, and interaction all connect into one system.",
    side: "right", top: "30%", x: 72, width: "w-[min(42rem,44vw)]", nodeSize: 14,
  },
  {
    phase: "Shift", title: "Systems + UI",
    preview: "Started paying closer attention to interaction design, feel, and architecture.",
    details: "This phase changed how I build. I became more interested in polish, pacing, visual rhythm, and the invisible structure underneath a product that makes it feel coherent.",
    side: "left", top: "56%", x: 33, width: "w-[min(46rem,48vw)]", nodeSize: 14,
  },
  {
    phase: "Current Orbit", title: "AI Systems",
    preview: "Focused on AI-powered applications and production-grade experiences.",
    details: "Now the goal is to build products that feel cinematic, intelligent, and usable at the same time — not just technically functional, but memorable and alive.",
    side: "right", top: "80%", x: 67, width: "w-[min(44rem,46vw)]", nodeSize: 14,
  },
];

function ExpandButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="mt-4 inline-flex items-center gap-2 text-sm text-white/35 transition hover:text-white/60">
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
        <ChevronDown className="h-4 w-4" />
      </motion.span>
      {open ? "Collapse" : "Expand"}
    </button>
  );
}

function GradientCardBorder({ index, immediate = false }: { index: number; immediate?: boolean }) {
  const gradId = `jcard-grad-${index}`;
  const glowId = `jcard-glow-${index}`;
  return (
    <motion.svg
      className="pointer-events-none absolute inset-[-1px] h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.rect
        x="0.5" y="0.5"
        width="99" height="99"
        rx="4" ry="4"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        filter={`url(#${glowId})`}
        initial={{ pathLength: immediate ? 1 : 0, opacity: immediate ? 1 : 0 }}
        {...(!immediate && {
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.45 },
          transition: {
            pathLength: { duration: 1.4, ease: "easeInOut", delay: 0.15 },
            opacity: { duration: 0.01 },
          },
        })}
      />
    </motion.svg>
  );
}

function DesktopStop({ item, index }: { item: Stop; index: number }) {
  const [open, setOpen] = useState(false);
  const isLeft = item.side === "left";

  return (
    <motion.div className="absolute w-full" style={{ top: item.top }}
      initial={{ opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 28 }}
      {...(index !== 0 && {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.6, delay: index * 0.06 },
      })}
    >
      <div className={`relative ${item.width} ${isLeft ? "mr-auto pr-10 md:pr-16" : "ml-auto pl-10 md:pl-16"}`}>
        {/* Node dot */}
        <div className="pointer-events-none absolute top-6 hidden md:block"
          style={{ left: `${item.x}%`, transform: "translateX(-50%)" }}>
          <div className="relative rounded-full border border-white/10 bg-white/5"
            style={{ width: `${item.nodeSize}px`, height: `${item.nodeSize}px` }}>
            <div className="absolute inset-[24%] rounded-full bg-white/70" />
            <div className="absolute inset-[-8px] rounded-full border border-white/[0.04]" />
          </div>
        </div>

        {/* Card with gradient border */}
        <div className="relative rounded-2xl">
          <GradientCardBorder index={index} immediate={index === 0} />
          <div className="relative rounded-2xl border border-white/[0.06] bg-[#0f0f0f] px-5 py-5 md:px-6">
            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/25">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/25" />
              {item.phase}
            </div>
            <h3 className="text-lg font-medium tracking-tight text-white/80">{item.title}</h3>
            <p className="mt-3 max-w-[60ch] text-sm leading-7 text-white/45">{item.preview}</p>

            <motion.div initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, marginTop: open ? 16 : 0 }}
              className="overflow-hidden">
              <p className="max-w-[62ch] text-sm leading-7 text-white/35">{item.details}</p>
            </motion.div>
            <ExpandButton open={open} onClick={() => setOpen((v) => !v)} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopConstellation({ scrollProgress }: { scrollProgress: ReturnType<typeof useTransform> }) {
  return (
    <div className="relative min-h-[1100px] md:min-h-[1200px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          {/* Base gradient for the static dim path */}
          <linearGradient id="jl-base-lg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.00)" />
            <stop offset="12%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="48%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="82%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
          </linearGradient>

          {/* Glowing gradient for the animated path */}
          <linearGradient id="jl-glow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <filter id="jl-path-glow" x="-30%" y="-10%" width="160%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static dim base path */}
        <path
          d="M 24 8 C 38 15, 56 20, 72 30 S 51 48, 33 56 S 48 72, 67 80"
          fill="none"
          stroke="url(#jl-base-lg)"
          strokeWidth="0.18"
          strokeDasharray="0.4 0.9"
          strokeLinecap="round"
        />

        {/* Scroll-driven glowing path */}
        <motion.path
          d="M 24 8 C 38 15, 56 20, 72 30 S 51 48, 33 56 S 48 72, 67 80"
          fill="none"
          stroke="url(#jl-glow-grad)"
          strokeWidth="0.35"
          strokeLinecap="round"
          filter="url(#jl-path-glow)"
          style={{ pathLength: scrollProgress }}
        />
      </svg>

      {journeyItems.map((item, index) => (
        <DesktopStop key={item.title} item={item} index={index} />
      ))}
    </div>
  );
}

function MobileStop({ item, index }: { item: Stop; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="relative pl-8"
      initial={{ opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 22 }}
      {...(index !== 0 && {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, delay: index * 0.05 },
      })}
    >
      <div className="pointer-events-none absolute left-[9px] top-0 h-full w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0" />

      <div className="pointer-events-none absolute left-0 top-5 rounded-full border border-white/10 bg-white/[0.04]"
        style={{ width: `${item.nodeSize}px`, height: `${item.nodeSize}px` }}>
        <div className="absolute inset-[24%] rounded-full bg-white/65" />
      </div>

      <div className="relative rounded-2xl">
        <GradientCardBorder index={index + 10} immediate={index === 0} />
        <div className="relative rounded-2xl border border-white/[0.06] bg-[#0f0f0f] px-4 py-4">
          <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/25">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/25" />
            {item.phase}
          </div>
          <h3 className="text-base font-medium tracking-tight text-white/80">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/45">{item.preview}</p>

          <motion.div initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, marginTop: open ? 16 : 0 }}
            className="overflow-hidden">
            <p className="text-sm leading-7 text-white/35">{item.details}</p>
          </motion.div>
          <ExpandButton open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </div>
    </motion.div>
  );
}

export function JourneyLarge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });
  const pathProgress = useTransform(scrollYProgress, [0, 5], [0, 7]);

  return (
    <div ref={sectionRef} className="px-8 py-16 md:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 border-b border-white/[0.06] pb-6">
          <h2 className="text-3xl font-bold text-white">Journey</h2>
        </div>

        <p className="mb-10 max-w-2xl text-sm leading-7 text-white/40">
          Not really a straight timeline. More like separate points that started to connect over time.
        </p>

        <div className="md:hidden">
          <div className="relative space-y-8">
            {journeyItems.map((item, index) => (
              <MobileStop key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <DesktopConstellation scrollProgress={pathProgress} />
        </div>
      </div>
    </div>
  );
}
