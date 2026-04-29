"use client";

import Rotator from "@/app/about/founders/portfolios/0/components/Rotator";
import { motion } from "framer-motion";

export function AboutLarge() {
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
          <h2 className="text-3xl font-bold text-white">About</h2>
        </div>

        {/* Rotator */}
        <Rotator />

        {/* Bio */}
        <p className="mt-5 text-base leading-8 text-white/45">
          I&apos;m a full-stack developer focused on building fast, modern, and intelligent web experiences.
          I work with React, Next.js, and AI systems to turn ideas into real products — things that feel
          polished, load quickly, and are actually useful.
        </p>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-3 divide-x divide-white/[0.06]">
          {[
            { label: "Focus", value: "Full-Stack" },
            { label: "Specialty", value: "AI + UI" },
            { label: "Stack", value: "Next.js" },
          ].map(({ label, value }) => (
            <div key={label} className="px-6 first:pl-0 last:pr-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">{label}</p>
              <p className="mt-2 text-base font-semibold text-white/92 text-shadow-[0_0_12px_rgba(255,255,255,0.16)]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
