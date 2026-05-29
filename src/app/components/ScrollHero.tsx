"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
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

const PATH_D = "M 24 8 C 38 15, 56 20, 72 30 S 51 48, 33 56 S 48 72, 67 80";

// Pre-sampled points along the three cubic bezier segments.
// Seg 1: (24,8)→(72,30) CP (38,15),(56,20)
// Seg 2: (72,30)→(33,56) CP (88,40),(51,48)
// Seg 3: (33,56)→(67,80) CP (15,64),(48,72)
const DOT_SCROLL = [0,    0.083, 0.167, 0.25,  0.333, 0.5,   0.667, 0.835, 1.0];
const DOT_X_PTS  = [24,   35.2,  47.25, 59.72, 72,    65.25, 33,    36.1,  67 ];
const DOT_Y_PTS  = [8,    13.0,  17.9,  23.3,  30,    43.75, 56,    68,    80 ];

function ScrollCard({ item, index, isActive }: { item: Stop; index: number; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const isLeft = item.side === "left";

  return (
    <motion.div
      className="absolute w-full"
      style={{ top: item.top }}
      animate={{ opacity: isActive ? 1 : 0.18 }}
      transition={{ duration: 0.45 }}
    >
      <div className={`relative ${item.width} ${isLeft ? "mr-auto pr-10 md:pr-16" : "ml-auto pl-10 md:pl-16"}`}>
        {/* Node dot */}
        <div
          className="pointer-events-none absolute top-6 hidden md:block"
          style={{ left: `${item.x}%`, transform: "translateX(-50%)" }}
        >
          <motion.div
            className="relative rounded-full bg-white/5"
            style={{ width: item.nodeSize, height: item.nodeSize }}
            animate={{
              boxShadow: isActive
                ? "0 0 0 1px rgba(129,140,248,0.65), 0 0 12px rgba(129,140,248,0.45)"
                : "0 0 0 1px rgba(255,255,255,0.10)",
            }}
            transition={{ duration: 0.45 }}
          >
            <div className="absolute inset-[24%] rounded-full bg-white/70" />
            <div className="absolute -inset-2 rounded-full border border-white/4" />
          </motion.div>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl">
          <motion.svg
            className="pointer-events-none absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            aria-hidden="true"
            animate={{ opacity: isActive ? 1 : 0.12 }}
            transition={{ duration: 0.45 }}
          >
            <defs>
              <linearGradient id={`sh-cg-${index}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#818cf8" />
                <stop offset="50%"  stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <filter id={`sh-cf-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect
              x="0.5" y="0.5" width="99" height="99" rx="4" ry="4"
              fill="none"
              stroke={`url(#sh-cg-${index})`}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              filter={`url(#sh-cf-${index})`}
            />
          </motion.svg>

          <div className="relative rounded-2xl border border-white/6 bg-[#0f0f0f] px-5 py-5 md:px-6">
            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/25">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/25" />
              {item.phase}
            </div>
            <h3 className="text-lg font-medium tracking-tight text-white/80">{item.title}</h3>
            <p className="mt-3 max-w-[60ch] text-sm leading-7 text-white/45">{item.preview}</p>
            <motion.div
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, marginTop: open ? 16 : 0 }}
              className="overflow-hidden"
            >
              <p className="max-w-[62ch] text-sm leading-7 text-white/35">{item.details}</p>
            </motion.div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/35 transition hover:text-white/60"
            >
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
              {open ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeCard, setActiveCard] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.167) setActiveCard(0);
    else if (v < 0.5) setActiveCard(1);
    else if (v < 0.833) setActiveCard(2);
    else setActiveCard(3);
  });

  const pathDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const dotXVal = useTransform(scrollYProgress, DOT_SCROLL, DOT_X_PTS);
  const dotYVal = useTransform(scrollYProgress, DOT_SCROLL, DOT_Y_PTS);
  const dotLeft = useTransform(dotXVal, (v) => `${v}%`);
  const dotTop  = useTransform(dotYVal, (v) => `${v}%`);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#080808]">
        <div className="flex h-full flex-col px-8 py-12 md:px-16">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">

            {/* Header */}
            <div className="mb-6 shrink-0 border-b border-white/6 pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Journey</h2>
                <motion.span
                  key={activeCard}
                  className="text-sm uppercase tracking-[0.2em] text-white/30"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {journeyItems[activeCard].phase}
                </motion.span>
              </div>
            </div>

            {/* Constellation */}
            <div className="relative flex-1">

              {/* SVG path */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="sh-base-lg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="rgba(255,255,255,0.00)" />
                    <stop offset="12%"  stopColor="rgba(255,255,255,0.06)" />
                    <stop offset="48%"  stopColor="rgba(255,255,255,0.10)" />
                    <stop offset="82%"  stopColor="rgba(255,255,255,0.06)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
                  </linearGradient>
                  <linearGradient id="sh-glow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#818cf8" />
                    <stop offset="50%"  stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <filter id="sh-path-glow" x="-30%" y="-10%" width="160%" height="120%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Dim static base */}
                <path
                  d={PATH_D}
                  fill="none"
                  stroke="url(#sh-base-lg)"
                  strokeWidth="0.18"
                  strokeDasharray="0.4 0.9"
                  strokeLinecap="round"
                />

                {/* Scroll-driven glowing trail */}
                <motion.path
                  d={PATH_D}
                  fill="none"
                  stroke="url(#sh-glow-grad)"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  filter="url(#sh-path-glow)"
                  style={{ pathLength: pathDraw }}
                />
              </svg>

              {/* Traveling glow dot — % coords match the SVG viewBox since preserveAspectRatio="none" */}
              <motion.div
                className="pointer-events-none absolute z-20"
                style={{ left: dotLeft, top: dotTop, x: "-50%", y: "-50%" }}
              >
                <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_8px_3px_rgba(168,85,247,0.85),0_0_18px_7px_rgba(129,140,248,0.45)]" />
                <div className="absolute -inset-2.5 rounded-full border border-purple-400/25" />
              </motion.div>

              {/* Cards */}
              {journeyItems.map((item, index) => (
                <ScrollCard
                  key={item.title}
                  item={item}
                  index={index}
                  isActive={activeCard === index}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
