"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Developer.", "Builder.", "Problem Solver."];

export default function Rotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // change speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <h3 className="text-2xl font-bold flex items-center gap-2">
      
      <span className="text-white/92 text-shadow-[0_0_12px_rgba(255,255,255,0.16)]">I am a</span>

      <span className="relative inline-block min-w-55">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 10, filter: "blur(1px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(1px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>

    </h3>
  );
}
