"use client";

import Image from "next/image";
import Rotator from "@/app/about/founders/portfolios/0/components/Rotator";
import { useEffect, useState } from "react";

const COMMAND = "npm run dev";
const CHAR_DELAY = 58;

const OUTPUT_LINES = [
  { text: "> portfolio@0.1.0 dev",               className: "text-white/25",        delay: 140, gap: false },
  { text: "> next dev",                           className: "text-white/25",        delay: 50,  gap: false },
  { text: "  ▲ Next.js 15.3.1",                  className: "text-emerald-400/70",  delay: 240, gap: true  },
  { text: "  - Local:   http://localhost:3000",   className: "text-white/35",        delay: 85,  gap: false },
  { text: "  - Network: http://192.168.1.1:3000", className: "text-white/25",        delay: 60,  gap: false },
  { text: " ✓ Starting...",                       className: "text-white/40",        delay: 320, gap: true  },
  { text: " ✓ Compiled in 621ms",                 className: "text-emerald-400/55",  delay: 700, gap: false },
  { text: " ✓ Ready in 1.2s",                     className: "text-emerald-400/90",  delay: 230, gap: false },
];

function TerminalCard() {
  const [typed, setTyped]          = useState("");
  const [visibleLines, setVisible] = useState(0);
  const [showPrompt2, setPrompt2]  = useState(false);
  const [dotsHovered, setDots]     = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 550;

    for (let i = 1; i <= COMMAND.length; i++) {
      const n = i;
      timers.push(setTimeout(() => setTyped(COMMAND.slice(0, n)), t));
      t += CHAR_DELAY;
    }

    OUTPUT_LINES.forEach(({ delay }, i) => {
      t += delay;
      const idx = i + 1;
      timers.push(setTimeout(() => setVisible(idx), t));
    });

    t += 480;
    timers.push(setTimeout(() => setPrompt2(true), t));

    return () => timers.forEach(clearTimeout);
  }, []);

  const dotColors = dotsHovered
    ? ["bg-red-500", "bg-yellow-400", "bg-green-500"]
    : ["bg-white/20", "bg-white/20", "bg-white/20"];

  const typingDone = typed.length === COMMAND.length;

  return (
    <>
      <style>{`
        @keyframes term-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes line-in    { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-6 font-mono text-sm">

        {/* Traffic lights */}
        <div
          className="mb-5 flex items-center gap-2"
          onMouseEnter={() => setDots(true)}
          onMouseLeave={() => setDots(false)}
        >
          {dotColors.map((color, i) => (
            <div key={i} className={`h-3 w-3 cursor-default rounded-full transition-colors duration-150 ${color}`} />
          ))}
          <span className="ml-3 text-xs text-white/20">terminal</span>
        </div>

        {/* Terminal body */}
        <div className="space-y-1.5 text-xs leading-6">

          {/* Command line */}
          <div>
            <span className="text-white/30">$ </span>
            <span className="text-white/60">{typed}</span>
            {!typingDone && (
              <span
                className="ml-px inline-block h-3 w-0.5 align-middle bg-white/60"
                style={{ animation: "term-blink 1s step-start infinite" }}
              />
            )}
          </div>

          {/* Output lines — each fades in as it appears */}
          {OUTPUT_LINES.map((line, i) =>
            visibleLines > i ? (
              <div
                key={i}
                className={`${line.className}${line.gap ? " mt-3" : ""}`}
                style={{ animation: "line-in 0.18s ease-out" }}
              >
                {line.text}
              </div>
            ) : null
          )}

          {/* Second prompt */}
          {showPrompt2 && (
            <div className="mt-3" style={{ animation: "line-in 0.18s ease-out" }}>
              <span className="text-white/25">$ </span>
              <span
                className="ml-px inline-block h-3 w-0.5 align-middle bg-white/40"
                style={{ animation: "term-blink 1s step-start infinite" }}
              />
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-white/6" />

        {/* Status grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          {[
            { label: "Status",   value: "Building"             },
            { label: "Stack",    value: "Next.js + Claude"     },
            { label: "Focus",    value: "AI · UI · Full-Stack" },
            { label: "Open to",  value: "Work + Collab"        },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/20">{label}</div>
              <div className="mt-1 text-white/60">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function HeroLarge() {
  const scrollToContact = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-8 py-24 md:px-16">
      <div className="w-full max-w-6xl min-h-132">
        <div className="grid gap-12 xl:grid-cols-2 xl:gap-20 xl:items-start">

          {/* Left — identity + CTAs */}
          <div className="flex flex-col">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Available for opportunities
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl xl:text-7xl">
              Billy Zhang
            </h1>

            <div className="mt-3">
              <Rotator />
            </div>

            <p className="mt-5 max-w-md text-base leading-8 text-white/40">
              Building fast, modern, AI-powered web experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/resume.pdf" download
                className="rounded-xl border border-white/10 bg-white/4 px-6 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                Resume
              </a>
              <a href="#contact"
                className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90">
                Let&apos;s Chat →
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {[
                { label: "GitHub", svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.20-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.20-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg> },
                { label: "LinkedIn", svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 13.394V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/></svg> },
                { label: "LeetCode", img: "/leetcode.svg" },
                { label: "X", svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg> },
              ].map((item) => (
                <a key={item.label} href="#" aria-label={item.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-white/40 transition hover:border-white/20 hover:text-white/80">
                  {"img" in item && item.img ? (
                    <Image src={item.img} width={18} height={18} alt={item.label} className="opacity-40 invert group-hover:opacity-80" />
                  ) : (
                    item.svg
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right — terminal card (md+), top-anchored so it grows downward */}
          <div className="hidden md:block">
            <TerminalCard />
          </div>

        </div>
      </div>

      {/* Scroll chevron */}
      <button
        onClick={scrollToContact}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 transition hover:text-white/50"
        aria-label="Scroll down"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
          <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
        </svg>
      </button>
    </div>
  );
}
