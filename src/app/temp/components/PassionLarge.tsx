"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const socialIcons = [
  {
    label: "GitHub",
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.20-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.20-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" /></svg>,
  },
  {
    label: "LinkedIn",
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 13.394V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" /></svg>,
  },
  {
    label: "X",
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" /></svg>,
  },
];

const stats = [
  { label: "4+ Years",   desc: "Building and shipping" },
  { label: "Full-Stack", desc: "Frontend + Backend"    },
  { label: "AI-Native",  desc: "Claude · OpenAI"       },
  { label: "Production", desc: "Live applications"     },
];

function VariantA() {
  return (
    <motion.div
      key="A"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center text-center"
    >
      {/* Headline */}
      <div className="space-y-2">
        <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-none tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Your Dreams
          </span>
        </h1>
        <div className="mx-auto h-px w-full max-w-xl bg-white/15" />
        <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-none tracking-tight text-white">
          My Passion
        </h1>
      </div>

      {/* Bio */}
      <p className="mt-8 max-w-[42ch] text-base leading-8 text-white/45">
        I&apos;m Billy Zhang, a professional full-stack web developer. Using modern frameworks,
        thoughtful design, and AI systems, I turn ideas into polished digital experiences.
      </p>

      {/* Social + CTA */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {socialIcons.map((item) => (
          <a key={item.label} href="#" aria-label={item.label}
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/40 transition hover:border-white/20 hover:text-white/80">
            {item.svg}
          </a>
        ))}
        <a href="#" aria-label="LeetCode"
          className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-white/20">
          <Image src="/leetcode.svg" width={18} height={18} alt="LeetCode" className="opacity-40 invert group-hover:opacity-80" />
        </a>
        <div className="ml-2 h-4 w-px bg-white/10" />
        <a href="#contact"
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90">
          Let&apos;s Chat →
        </a>
        <a href="/resume.pdf" download
          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white">
          Resume
        </a>
      </div>
    </motion.div>
  );
}

function VariantB() {
  return (
    <motion.div
      key="B"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top row: slogan left, CTA right */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent block">
              Your Dreams
            </span>
            <span className="text-white">My Passion</span>
          </h1>
          <p className="mt-4 max-w-[44ch] text-base leading-8 text-white/45">
            I&apos;m Billy Zhang, a professional full-stack web developer. Using modern frameworks,
            thoughtful design, and AI systems, I turn ideas into polished digital experiences.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <a href="#contact"
            className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90">
            Let&apos;s Chat →
          </a>
          <a href="/resume.pdf" download
            className="rounded-xl border border-white/10 px-5 py-3 text-center text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white">
            Resume
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mt-10 grid grid-cols-2 divide-x divide-white/[0.06] border-t border-white/[0.06] pt-8 md:grid-cols-4">
        {stats.map(({ label, desc }) => (
          <div key={label} className="px-6 first:pl-0 last:pr-0">
            <p className="text-xl font-semibold tracking-tight text-white/90 md:text-2xl">{label}</p>
            <p className="mt-1 text-sm text-white/35">{desc}</p>
          </div>
        ))}
      </div>

      {/* Social icons */}
      <div className="mt-8 flex items-center gap-3 border-t border-white/[0.04] pt-6">
        {socialIcons.map((item) => (
          <a key={item.label} href="#" aria-label={item.label}
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/40 transition hover:border-white/20 hover:text-white/80">
            {item.svg}
          </a>
        ))}
        <a href="#" aria-label="LeetCode"
          className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-white/20">
          <Image src="/leetcode.svg" width={18} height={18} alt="LeetCode" className="opacity-40 invert group-hover:opacity-80" />
        </a>
      </div>
    </motion.div>
  );
}

function VariantC() {
  return (
    <motion.div
      key="C"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center text-center"
    >
      {/* Centered statement */}
      <div className="space-y-2">
        <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-none tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Your Dreams
          </span>
        </h1>
        <div className="mx-auto h-px w-full max-w-xl bg-white/15" />
        <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-none tracking-tight text-white text-shadow-[0_0_12px_rgba(255,255,255,0.16)]">
          My Passion
        </h1>
      </div>

      {/* Stats strip */}
      <div className="mt-12 grid w-full grid-cols-2 divide-x divide-white/[0.06] border-t border-white/[0.06] pt-8 md:grid-cols-4">
        {stats.map(({ label, desc }) => (
          <div key={label} className="px-6 first:pl-0 last:pr-0">
            <p className="text-xl font-semibold tracking-tight text-white/90 md:text-2xl">{label}</p>
            <p className="mt-1 text-sm text-white/35">{desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function PassionLarge() {
  const [variant, setVariant] = useState<"A" | "B" | "C">("C");

  return (
    <motion.div
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Toggle */}
        <div className="mb-10 flex items-center justify-between border-b border-white/[0.06] pb-4">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/20">Preview variant</span>
          <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
            {(["A", "B", "C"] as const).map((v) => (
              <button key={v} onClick={() => setVariant(v)}
                className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] transition ${
                  variant === v ? "bg-white/[0.08] text-white/85" : "text-white/35 hover:text-white/60"
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {variant === "A" ? <VariantA key="A" /> : variant === "B" ? <VariantB key="B" /> : <VariantC key="C" />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
