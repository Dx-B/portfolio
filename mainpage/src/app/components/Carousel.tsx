"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

type Item = {
  title: string;
  description: string;
  color: string;
};

type Position = "left" | "center" | "right";

const items: Item[] = [
  { title: "AWS", description: "Cloud infrastructure & deployment", color: "from-orange-500 to-yellow-500" },
  { title: "Java", description: "Backend systems & OOP", color: "from-red-500 to-rose-500" },
  { title: "Python", description: "AI, data & automation", color: "from-blue-500 to-cyan-500" },
  { title: "Node.js", description: "Full-stack JavaScript runtime", color: "from-green-500 to-emerald-500" },
  { title: "TypeScript", description: "Strongly typed JavaScript", color: "from-indigo-500 to-blue-500" },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [useMotion, setUseMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const getIndex = (i: number) => (i + items.length) % items.length;

  const left = items[getIndex(current - 1)];
  const center = items[getIndex(current)];
  const right = items[getIndex(current + 1)];

  const rotate = (dir: number) => {
    setCurrent((prev) => getIndex(prev + dir));
  };

  const handleInteract = () => {
    setPausedUntil(Date.now() + 8000);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const lowEnd =
      typeof navigator !== "undefined" &&
      ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        ((navigator as any).deviceMemory ?? 8) <= 4);

    if (!shouldReduceMotion && !lowEnd) {
      setUseMotion(true);
    }
  }, [mounted, shouldReduceMotion]);

  useEffect(() => {
    if (!mounted) return;

    intervalRef.current = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      rotate(1);
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mounted, pausedUntil]);

  return (
    <div className="mt-14 flex flex-col items-center select-none">
      {useMotion ? (
        <MotionCarousel
          left={left}
          center={center}
          right={right}
          rotate={rotate}
          isMobile={isMobile}
          onInteract={handleInteract}
        />
      ) : (
        <StaticCarousel
          left={left}
          center={center}
          right={right}
          rotate={rotate}
          onInteract={handleInteract}
        />
      )}

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => {
            handleInteract();
            rotate(-1);
          }}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur transition"
        >
          ←
        </button>
        <button
          onClick={() => {
            handleInteract();
            rotate(1);
          }}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur transition"
        >
          →
        </button>
      </div>
    </div>
  );
}

function StaticCarousel({ left, center, right, rotate, onInteract }: any) {
  return (
    <div className="relative w-[90vw] max-w-[500px] h-[220px] flex items-center justify-center">
      <Card item={left} position="left" onClick={() => { onInteract(); rotate(-1); }} />
      <Card item={center} position="center" />
      <Card item={right} position="right" onClick={() => { onInteract(); rotate(1); }} />
    </div>
  );
}

function MotionCarousel({ left, center, right, rotate, isMobile, onInteract }: any) {
  const [track, setTrack] = useState([
    { slot: "left", item: left },
    { slot: "center", item: center },
    { slot: "right", item: right },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) {
      setTrack([
        { slot: "left", item: left },
        { slot: "center", item: center },
        { slot: "right", item: right },
      ]);
    }
  }, [left, center, right, isAnimating]);

  const positionStyles = {
    left: { x: -160, scale: 0.8, opacity: 0.5, zIndex: 1 },
    center: { x: 0, scale: 1, opacity: 1, zIndex: 10 },
    right: { x: 160, scale: 0.8, opacity: 0.5, zIndex: 1 },
  };

  const rotateLocal = (dir: number) => {
    if (isAnimating) return;

    onInteract();
    setIsAnimating(true);

    setTrack((prev: any) => {
      if (dir === 1) {
        return [
          { ...prev[0], slot: "center" },
          { ...prev[1], slot: "right" },
          { ...prev[2], slot: "left" },
        ];
      }
      return [
        { ...prev[0], slot: "right" },
        { ...prev[1], slot: "left" },
        { ...prev[2], slot: "center" },
      ];
    });

    setTimeout(() => {
      rotate(dir);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="relative w-[90vw] max-w-[500px] h-[220px] flex items-center justify-center overflow-hidden">
      {track.map(({ slot, item }: any) => (
        <motion.div
          key={item.title}
          animate={slot}
          variants={positionStyles}
          transition={{ duration: 0.4 }}
          className="absolute"
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          onClick={
            slot === "left"
              ? () => rotateLocal(-1)
              : slot === "right"
              ? () => rotateLocal(1)
              : undefined
          }
        >
          <Card item={item} position={slot} />
        </motion.div>
      ))}
    </div>
  );
}

function Card({ item, position, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="w-40 h-40 rounded-2xl text-white flex flex-col justify-center items-center text-center px-4 cursor-pointer bg-gradient-to-br backdrop-blur-lg shadow-xl overflow-hidden"
      style={{
        transform: position === "center" ? "scale(1)" : "scale(0.8)",
        opacity: position === "center" ? 1 : 0.6,
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
      <div className="relative z-10">
        <h2 className="font-semibold text-lg">{item.title}</h2>
        <p className="text-xs opacity-90 mt-1">{item.description}</p>
      </div>
    </div>
  );
}
