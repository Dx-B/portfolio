"use client";

import Header from "@/app/components/Header";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

type Item = {
  title: string;
  description: string;
  color: string;
  href?: string;
};

type Position = "left" | "center" | "right";

type CarouselProps = {
  left: Item;
  center: Item;
  right: Item;
  rotate: (dir: number) => void;
  onInteract: () => void;
};

type MotionCarouselProps = CarouselProps & {
  isMobile: boolean;
};

const items: Item[] = [
  { title: "AWS", description: "Cloud infrastructure & deployment", color: "from-orange-500 to-yellow-500" },
  { title: "Java", description: "Backend systems & OOP", color: "from-red-500 to-rose-500" },
  { title: "Python", description: "AI, data & automation", color: "from-blue-500 to-cyan-500" },
  { title: "Node.js", description: "Full-stack JavaScript runtime", color: "from-green-500 to-emerald-500" },
  { title: "TypeScript", description: "Strongly typed JavaScript", color: "from-indigo-500 to-blue-500" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [useMotion, setUseMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
    }, 3500); // slower rotation

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mounted, pausedUntil]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      handleInteract();
      if (e.key === "ArrowRight") rotate(1);
      if (e.key === "ArrowLeft") rotate(-1);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <main>
      <Header />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(rgba(229,231,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(229,231,235,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[clamp(30px,4vw,70px)_clamp(30px,4vw,70px)] dark:bg-size-[clamp(40px,6vw,100px)_clamp(40px,6vw,120px)]" />

        <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute -left-20 -top-3 h-80 w-80 bg-violet-600/35 blur-[120px]" />
          <div className="absolute -right-20 -bottom-12 h-80 w-80 bg-sky-500/25 blur-[120px]" />
        </div>

        <div className="flex flex-col items-center h-screen">
          <div className="flex-3" />

          <h1 className="text-3xl font-semibold text-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
            What's on your mind?
          </h1>

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

          <div className="flex-10" />

          <footer className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
          </footer>

          <div className="flex-2" />
        </div>

        <div className="flex justify-center">
          <div className="h-[80vh] bg-white/25 dark:bg-black/25 m-[4vh] p-[2vh] rounded-xl space-y-3">
            <h1 className="text-4xl font-bold">Your Dreams</h1>
            <h1 className="text-5xl font-bold">My Passion</h1>
            <p className="font-semibold">
              I'm Billy Zhang, a professional full-stack web developer. <br />
              Using cutting edge frameworks and AI systems, I turn your ideas into your accomplishments.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function StaticCarousel({ left, center, right, rotate, onInteract }: CarouselProps) {
  return (
    <div className="relative w-[90vw] max-w-[500px] h-[220px] flex items-center justify-center">
      <Card item={left} position="left" onClick={() => { onInteract(); rotate(-1); }} />
      <Card item={center} position="center" />
      <Card item={right} position="right" onClick={() => { onInteract(); rotate(1); }} />
    </div>
  );
}

function MotionCarousel({
  left,
  center,
  right,
  rotate,
  isMobile,
  onInteract,
}: MotionCarouselProps) {
  const [track, setTrack] = useState([
    { slot: "left" as Position, item: left },
    { slot: "center" as Position, item: center },
    { slot: "right" as Position, item: right },
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

    setTrack((prev) => {
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

    window.setTimeout(() => {
      rotate(dir);
      setIsAnimating(false);
    }, 400);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) rotateLocal(1);
    else if (info.offset.x > threshold) rotateLocal(-1);
  };

  return (
    <div className="relative w-[90vw] max-w-[500px] h-[220px] flex items-center justify-center overflow-hidden">
      {track.map(({ slot, item }) => (
        <motion.div
          key={item.title}
          animate={slot}
          variants={positionStyles}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute"
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
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

function Card({
  item,
  position,
  onClick,
}: {
  item: Item;
  position: Position;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="w-40 h-40 rounded-2xl text-white flex flex-col justify-center items-center text-center px-4 cursor-pointer bg-gradient-to-br backdrop-blur-lg shadow-xl overflow-hidden"
      style={{
        transform:
          position === "center"
            ? "scale(1)"
            : "scale(0.8)",
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