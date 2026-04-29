"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GradientTitle } from "./GradientTitle";

const philosophy = [
  {
    title: "Clarity",
    short: "Readable, calm, intentional interfaces.",
    text: "I try to make interfaces feel understandable at a glance. Good design should guide attention naturally instead of asking the user to work for it.",
  },
  {
    title: "Structure",
    short: "Strong systems beneath the surface.",
    text: "A polished product matters more when the architecture underneath is reliable. I care about reusable patterns, maintainability, and real product logic.",
  },
  {
    title: "Motion",
    short: "Movement that adds meaning.",
    text: "Animation should not be noise. Small transitions, pacing, and feedback help a product feel alive and make interaction feel smoother.",
  },
  {
    title: "Purpose",
    short: "Build what actually matters.",
    text: "I like features that solve something real. The goal is not to add more, but to make the right things feel useful, focused, and well-resolved.",
  },
  {
    title: "Refinement",
    short: "Polish is part of usability.",
    text: "Spacing, rhythm, responsiveness, and visual consistency are not extras. They are what turn something functional into something memorable.",
  },
];

const AUTO_MS = 3200;

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % philosophy.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = philosophy[activeIndex];

  const desktopNodes = useMemo(() => {
    const radius = 38;
    const center = 50;
    return philosophy.map((item, index) => {
      const angle = -Math.PI / 2 + (index / philosophy.length) * Math.PI * 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { ...item, index, x, y };
    });
  }, []);

  return (
    <section className="m-4 space-y-4">
      <GradientTitle>How I Work</GradientTitle>

      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-black/20 p-5 md:p-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.04),transparent_20%),radial-gradient(circle_at_82%_78%,rgba(120,100,255,0.07),transparent_24%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.12]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm leading-7 text-white/38">
              A small system map of the ideas I keep coming back to when I design
              and build. It rotates on its own, but you can hover or tap any
              point to focus it.
            </p>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
            {/* Desktop / large layout */}
            <div
              className="relative hidden aspect-square w-full max-w-[640px] place-self-center xl:block"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 36,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[14%] rounded-full border border-white/[0.05]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[24%] rounded-full border border-white/[0.04]"
              />
              <div className="absolute inset-[34%] rounded-full border border-white/[0.04] bg-white/[0.015] shadow-[0_0_60px_rgba(120,100,255,0.08)]" />

              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {desktopNodes.map((node, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <g key={node.title}>
                      <line
                        x1="50"
                        y1="50"
                        x2={node.x}
                        y2={node.y}
                        stroke={isActive ? "rgba(190,180,255,0.55)" : "rgba(255,255,255,0.12)"}
                        strokeWidth={isActive ? "0.28" : "0.16"}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute inset-[34%] flex items-center justify-center">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(120,100,255,0.08)",
                      "0 0 50px rgba(120,100,255,0.14)",
                      "0 0 30px rgba(120,100,255,0.08)",
                    ],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/[0.06] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),rgba(255,255,255,0.01)_55%,transparent_75%)] px-8 text-center"
                >
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/28">
                    Design Philosophy
                  </div>
                  <div className="mt-3 text-2xl font-medium tracking-tight text-white/88">
                    {active.title}
                  </div>
                  <div className="mt-3 max-w-[20ch] text-sm leading-6 text-white/38">
                    {active.short}
                  </div>
                </motion.div>
              </div>

              {desktopNodes.map((node, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.button
                    key={node.title}
                    type="button"
                    onMouseEnter={() => {
                      setPaused(true);
                      setActiveIndex(index);
                    }}
                    onFocus={() => {
                      setPaused(true);
                      setActiveIndex(index);
                    }}
                    onClick={() => setActiveIndex(index)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                    }}
                    animate={{
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        isActive
                          ? "border-indigo-300/25 bg-gradient-to-r from-indigo-500/18 via-purple-500/16 to-fuchsia-500/14 text-white shadow-[0_0_28px_rgba(120,100,255,0.18)]"
                          : "border-white/[0.08] bg-black/35 text-white/68"
                      }`}
                    >
                      {node.title}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile / tablet layout */}
            <div
              className="xl:hidden"
              onTouchStart={() => setPaused(true)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 42,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-[12%] rounded-full border border-white/[0.05]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-[24%] rounded-full border border-white/[0.04]"
                />

                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {philosophy.map((item, index) => {
                    const angle =
                      -Math.PI / 2 + (index / philosophy.length) * Math.PI * 2;
                    const radius = 38;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    const isActive = activeIndex === index;

                    return (
                      <line
                        key={item.title}
                        x1="50"
                        y1="50"
                        x2={x}
                        y2={y}
                        stroke={isActive ? "rgba(190,180,255,0.5)" : "rgba(255,255,255,0.1)"}
                        strokeWidth={isActive ? "0.34" : "0.18"}
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>

                <div className="absolute inset-[30%] flex items-center justify-center">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] px-5 text-center shadow-[0_0_40px_rgba(120,100,255,0.08)]">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-white/26">
                      How I Work
                    </div>
                    <div className="mt-2 text-lg font-medium text-white/88">
                      {active.title}
                    </div>
                    <div className="mt-2 text-xs leading-5 text-white/38">
                      {active.short}
                    </div>
                  </div>
                </div>

                {philosophy.map((item, index) => {
                  const angle =
                    -Math.PI / 2 + (index / philosophy.length) * Math.PI * 2;
                  const radius = 38;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                      <div
                        className={`min-w-[84px] rounded-full border px-3 py-2 text-xs transition ${
                          isActive
                            ? "border-indigo-300/25 bg-gradient-to-r from-indigo-500/18 via-purple-500/16 to-fuchsia-500/14 text-white shadow-[0_0_22px_rgba(120,100,255,0.16)]"
                            : "border-white/[0.08] bg-black/35 text-white/62"
                        }`}
                      >
                        {item.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {philosophy.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        isActive
                          ? "border-indigo-300/20 bg-white/[0.06] text-white"
                          : "border-white/[0.08] bg-white/[0.02] text-white/42"
                      }`}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description panel */}
            <div className="xl:pl-4">
              <div className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(120,100,255,0.06),transparent_32%)]" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                    className="relative"
                  >
                    <div className="text-[10px] uppercase tracking-[0.24em] text-white/26">
                      Active Principle
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-300 to-purple-300 shadow-[0_0_12px_rgba(180,170,255,0.55)]" />
                      <h3 className="text-xl font-medium tracking-tight text-white/88 md:text-2xl">
                        {active.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-white/42 md:text-[0.97rem]">
                      {active.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 hidden xl:grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {philosophy.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onMouseEnter={() => {
                        setPaused(true);
                        setActiveIndex(index);
                      }}
                      onMouseLeave={() => setPaused(false)}
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-[20px] border p-4 text-left transition ${
                        isActive
                          ? "border-indigo-300/18 bg-white/[0.04] shadow-[0_0_24px_rgba(120,100,255,0.08)]"
                          : "border-white/[0.06] bg-white/[0.015]"
                      }`}
                    >
                      <div className="text-sm font-medium text-white/82">
                        {item.title}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-white/36">
                        {item.short}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}