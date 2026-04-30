"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const SKILLS = [
  "Next.js", "TypeScript", "React", "Claude API", "Framer Motion",
  "Python", "FastAPI", "Tailwind v4", "OpenAI SDK", "PostgreSQL",
  "Docker", "discord.py", "PyTorch", "Vercel", "Redis",
];

const SPEED_DESKTOP = 90;  // px/s
const SPEED_MOBILE  = 90; // px/s — matches the ~4s feel the user wants

export default function TextMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const singleW  = useRef(0);   // width of one copy of the track
  const speed    = useRef(SPEED_DESKTOP);
  const isPaused = useRef(false);
  const x        = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) singleW.current = trackRef.current.scrollWidth / 2;
      speed.current = window.innerWidth < 768 ? SPEED_MOBILE : SPEED_DESKTOP;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Per-frame wrap: when x reaches -singleW, jump forward by singleW.
  // Both copies are identical so the jump is invisible — no CSS reset flash.
  useAnimationFrame((_, delta) => {
    if (!singleW.current || isPaused.current) return;
    const next = x.get() - (delta / 1000) * speed.current;
    x.set(next <= -singleW.current ? next + singleW.current : next);
  });

  return (
    <div
      className="relative overflow-hidden border-y border-white/6 py-3.5"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-[#080808] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-[#080808] to-transparent" />

      <motion.div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {SKILLS.map((skill) => (
              <span key={skill} className="flex items-center">
                <span className="px-6 text-[11px] font-medium uppercase tracking-[0.22em] text-white/30 transition-colors hover:text-white/60">
                  {skill}
                </span>
                <span className="select-none text-white/12">·</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
