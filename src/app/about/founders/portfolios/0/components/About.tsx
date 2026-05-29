"use client";

import { useState } from "react";
import Rotator from "./Rotator";

export default function About() {
  const [open, setOpen] = useState(true);

  return (
    <div id="about" className="flex justify-center">
      <div className="w-full m-4">

        {/* HEADER BUTTON */}
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between bg-white/20 dark:bg-black/10 outline outline-white/20 dark:outline-white/10 backdrop-blur-sm rounded-xl p-4">
          <h2 className="text-lg font-semibold text-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
            About Me
          </h2>

          <span className="text-gray-300 text-sm">
            {open ? "Hide" : "Show"}
          </span>
        </button>

        {/* DROPDOWN CONTENT */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[400px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
          <div className="p-5 rounded-xl bg-white/25 dark:bg-black/20 backdrop-blur-md outline outline-white/20 dark:outline-white/10">

            {/* TITLE */}
            <Rotator/>

            {/* BODY */}
            <p className="mt-3 text-sm text-gray-400 font-medium leading-relaxed">
              I&apos;m a full-stack developer focused on building fast, modern, and intelligent web experiences.
              I enjoy working with React, Next.js, and AI systems to turn ideas into real products.
            </p>

            {/* MINI STATS GRID */}
            <div className="grid grid-cols-3 gap-3 mt-5">

              <div className="bg-black/30 rounded-lg p-3 text-center outline outline-white/10">
                <p className="text-xs text-gray-400">Focus</p>
                <p className="text-sm font-semibold text-white">Full-Stack</p>
              </div>

              <div className="bg-black/30 rounded-lg p-3 text-center outline outline-white/10">
                <p className="text-xs text-gray-400">Specialty</p>
                <p className="text-sm font-semibold text-white">AI + UI</p>
              </div>

              <div className="bg-black/30 rounded-lg p-3 text-center outline outline-white/10">
                <p className="text-xs text-gray-400">Stack</p>
                <p className="text-sm font-semibold text-white">Next.js</p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
