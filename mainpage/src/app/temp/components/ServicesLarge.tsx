"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

export function ServicesLarge() {
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
    <motion.div
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 border-b border-white/[0.06] pb-6">
          <h2 className="text-3xl font-bold text-white">How I Work</h2>
        </div>

        <p className="mb-8 max-w-2xl text-sm leading-7 text-white/40">
            A small system map of the ideas I keep coming back to when I design and build.
            It rotates on its own, but you can hover or tap any point to focus it.
          </p>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
            {/* Desktop wheel */}
            <div
              className="relative hidden aspect-square w-full max-w-[560px] place-self-center xl:block"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[14%] rounded-full border border-white/[0.05]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[24%] rounded-full border border-white/[0.04]"
              />
              <div className="absolute inset-[34%] rounded-full border border-white/[0.06] bg-white/[0.015]" />

              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {desktopNodes.map((node, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <g key={node.title}>
                      <line x1="50" y1="50" x2={node.x} y2={node.y}
                        stroke={isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.10)"}
                        strokeWidth={isActive ? "0.28" : "0.16"}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute inset-[34%] flex items-center justify-center">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full px-8 text-center">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/25">Design Philosophy</div>
                  <div className="mt-3 text-xl font-medium tracking-tight text-white/85">{active.title}</div>
                  <div className="mt-2 max-w-[18ch] text-xs leading-5 text-white/40">{active.short}</div>
                </div>
              </div>

              {desktopNodes.map((node, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.button
                    key={node.title}
                    type="button"
                    onMouseEnter={() => { setPaused(true); setActiveIndex(index); }}
                    onFocus={() => { setPaused(true); setActiveIndex(index); }}
                    onClick={() => setActiveIndex(index)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={`rounded-full border px-4 py-2 text-sm transition ${
                      isActive
                        ? "border-white/20 bg-white/[0.08] text-white"
                        : "border-white/[0.08] bg-[#0f0f0f] text-white/50"
                    }`}>
                      {node.title}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile wheel */}
            <div className="xl:hidden" onTouchStart={() => setPaused(true)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <div className="relative mx-auto aspect-square w-full max-w-[380px]">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[12%] rounded-full border border-white/[0.05]" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[24%] rounded-full border border-white/[0.04]" />

                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {philosophy.map((item, index) => {
                    const angle = -Math.PI / 2 + (index / philosophy.length) * Math.PI * 2;
                    const r = 38;
                    const x = 50 + r * Math.cos(angle);
                    const y = 50 + r * Math.sin(angle);
                    const isActive = activeIndex === index;
                    return (
                      <line key={item.title} x1="50" y1="50" x2={x} y2={y}
                        stroke={isActive ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.08)"}
                        strokeWidth={isActive ? "0.34" : "0.18"} strokeLinecap="round" />
                    );
                  })}
                </svg>

                <div className="absolute inset-[30%] flex items-center justify-center">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] px-5 text-center">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/25">How I Work</div>
                    <div className="mt-2 text-base font-medium text-white/85">{active.title}</div>
                    <div className="mt-1 text-xs leading-5 text-white/40">{active.short}</div>
                  </div>
                </div>

                {philosophy.map((item, index) => {
                  const angle = -Math.PI / 2 + (index / philosophy.length) * Math.PI * 2;
                  const r = 38;
                  const x = 50 + r * Math.cos(angle);
                  const y = 50 + r * Math.sin(angle);
                  const isActive = activeIndex === index;
                  return (
                    <button key={item.title} type="button" onClick={() => setActiveIndex(index)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}>
                      <div className={`min-w-[80px] rounded-full border px-3 py-2 text-xs transition ${
                        isActive ? "border-white/20 bg-white/[0.08] text-white" : "border-white/[0.08] bg-[#0f0f0f] text-white/50"
                      }`}>
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
                    <button key={item.title} type="button" onClick={() => setActiveIndex(index)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        isActive ? "border-white/20 bg-white/[0.06] text-white" : "border-white/[0.08] text-white/40"
                      }`}>
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description panel */}
            <div className="xl:pl-4">
              <div className="rounded-xl border border-white/[0.08] bg-[#0d0d0d] p-5 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div key={active.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.24em] text-white/25">Active Principle</div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-white/50" />
                      <h3 className="text-xl font-medium tracking-tight text-white/85 md:text-2xl">{active.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-white/45">{active.text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 hidden gap-2 xl:grid">
                {philosophy.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button key={item.title} type="button"
                      onMouseEnter={() => { setPaused(true); setActiveIndex(index); }}
                      onMouseLeave={() => setPaused(false)}
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-xl border p-4 text-left transition ${
                        isActive ? "border-white/12 bg-white/[0.04]" : "border-white/[0.06]"
                      }`}
                    >
                      <div className="text-sm font-medium text-white/80">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/35">{item.short}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
      </div>
    </motion.div>
  );
}
