"use client";

import Image from "next/image";
import Rotator from "@/app/about/founders/portfolios/0/components/Rotator";

export default function LandingHero() {
  const scrollOneViewport = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-gradient-to-r from-indigo-500/20 via-purple-500/18 to-fuchsia-500/16 px-4 py-2.5 text-[11px] uppercase tracking-[0.26em] text-indigo-100 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_rgba(120,80,255,0.18)] backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-indigo-200 shadow-[0_0_10px_rgba(165,180,252,0.9)]" />
        Available for opportunities
      </div>

      {/* Name */}
      <h1 className="mt-6 text-5xl font-bold tracking-tight text-white/92 text-shadow-[0_0_12px_rgba(255,255,255,0.22)] md:text-7xl">
        Billy Zhang
      </h1>

      {/* Rotating role */}
      <div className="mt-4">
        <Rotator />
      </div>

      {/* Tagline */}
      <p className="mt-5 max-w-[42rem] text-base leading-8 text-white/48 md:text-lg">
        Building fast, modern, AI-powered web experiences.
      </p>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/resume.pdf"
          download
          className="rounded-xl border border-white/10 bg-black/20 px-6 py-3 text-sm font-medium text-white/80 transition duration-300 hover:border-white/18 hover:bg-white/[0.04] hover:text-white"
        >
          Resume
        </a>
        <a
          href="#contact"
          className="group rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_28px_rgba(120,80,255,0.2)]"
        >
          <span className="inline-flex items-center gap-2">
            Let&apos;s Chat
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </a>
      </div>

      {/* Social icons — update href values with real URLs before deploy */}
      <div className="mt-7 flex items-center gap-3">
        {/* GitHub */}
        <a
          href="#"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="transition duration-300 group-hover:scale-110" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.20-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.20-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="#"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
          className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="transition duration-300 group-hover:scale-110" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 13.394V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        </a>

        {/* LeetCode */}
        <a
          href="#"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LeetCode"
          className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
        >
          <Image
            src="/leetcode.svg"
            width={22}
            height={22}
            alt="LeetCode"
            className="transition duration-300 group-hover:scale-110 dark:invert opacity-70 group-hover:opacity-100"
          />
        </a>

        {/* X / Twitter */}
        <a
          href="#"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="X"
          className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="transition duration-300 group-hover:scale-110" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
          </svg>
        </a>
      </div>

      {/* Scroll chevron */}
      <button
        onClick={scrollOneViewport}
        className="mt-12 flex justify-center cursor-pointer text-white/40 hover:text-white/70 transition"
        aria-label="Scroll down"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
          <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
        </svg>
      </button>

      <div className="flex-1" />
    </div>
  );
}
