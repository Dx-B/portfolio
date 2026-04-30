"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SHORT_BIO =
  `I'm Billy Zhang, a Computer Science & Software Engineering student at Rutgers University. ` +
  `I build full-stack web apps and AI-powered tools — from game mods to production Next.js apps. ` +
  `8+ years of hands-on engineering and community leadership across frontend, backend, and systems.`;

const BIO_WORK =
  `I've shipped a Python Discord music bot serving 200+ concurrent users, led development on a ` +
  `Minecraft Fabric mod startup, and contributed QA to the open-source SPT-AKI TypeScript server. ` +
  `Today I focus on full-stack web development and AI integration — building fast, modern experiences ` +
  `with Next.js, React, and the Claude and OpenAI APIs.`;

const STATS = [
  { label: "Study",      value: "CS + SWE" },
  { label: "Experience", value: "8+ Years" },
  { label: "Stack",      value: "Next.js"  },
];

const MILESTONES = [
  { year: "2018", event: "Started leading online communities — grew to 60,000+ members."     },
  { year: "2022", event: "Lead developer on a Minecraft Fabric mod startup."                  },
  { year: "2023", event: "Shipped a Python Discord bot; QA on SPT-AKI TypeScript server."    },
  { year: "2025", event: "Full-stack + AI focus. Building with Next.js, Claude, and OpenAI." },
];

// Gradient bar: delay 0.2, duration 0.9 → done ~1.1s. Columns start just after.
const COLUMN_BASE = 0.3;
const STAGGER     = 0.1;

const timelineDelay = (i: number) => COLUMN_BASE + i * STAGGER;
const statsDelay    = (i: number) => COLUMN_BASE + MILESTONES.length * STAGGER + i * STAGGER;

export function AboutLarge() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header with animated gradient rule */}
        <div className="mb-10 pb-6">
          <h2 className="text-3xl font-bold text-white">Who am I?</h2>
          <motion.div
            className="mt-4 h-px bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        <div ref={gridRef} className="grid gap-10 md:grid-cols-[1fr_auto_auto]">
          {/* Bio */}
          <div className="max-w-xl">
            <div className="mb-5 flex flex-wrap items-center gap-4">
              <p className="text-sm font-bold uppercase tracking-[0.22em] bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI&nbsp;·&nbsp;Full-Stack
              </p>
              <div className="h-3 w-px bg-white/15" />
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-indigo-400 to-pink-500" />
                Rutgers University · Class of 2027
              </div>
            </div>
            <p className="text-base leading-8 text-white/45">{SHORT_BIO}</p>
            <p className="mt-4 hidden text-base leading-8 text-white/45 md:block">{BIO_WORK}</p>
          </div>

          {/* Timeline */}
          <div className="relative border-t border-white/6 pt-6 md:border-l md:border-t-0 md:min-w-52 md:pl-10 md:pt-0">
            <div className="space-y-7">
              {MILESTONES.map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  className="relative"
                  initial={{ opacity: 0, x: -14 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease: "easeOut", delay: timelineDelay(i) }}
                >
                  <div className="absolute left-[-2.65rem] top-1 hidden h-1.5 w-1.5 rounded-full bg-white/20 md:block" />
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">{year}</p>
                  <p className="mt-1 max-w-[22ch] text-sm leading-6 text-white/50">{event}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/6 pt-6 md:flex md:min-w-36 md:flex-col md:justify-center md:gap-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            {STATS.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease: "easeOut", delay: statsDelay(i) }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">{label}</p>
                <p className="mt-1.5 text-base font-semibold text-white/90">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
