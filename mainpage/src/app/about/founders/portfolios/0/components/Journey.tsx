"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GradientTitle } from "./GradientTitle";

type Stop = {
  phase: string;
  title: string;
  preview: string;
  details: string;
  side: "left" | "right";
  top: string;
  x: number;
  width: string;
  nodeSize: number;
};

const journeyItems: Stop[] = [
  {
    phase: "Origin",
    title: "First Code",
    preview: "Started learning programming and building small web pages.",
    details:
      "This was the beginning — small experiments, simple layouts, and the first feeling that code could turn vague ideas into something visible and real.",
    side: "left",
    top: "8%",
    x: 24,
    width: "w-[min(44rem,46vw)]",
    nodeSize: 18,
  },
  {
    phase: "Momentum",
    title: "First Projects",
    preview: "Built full-stack apps and started thinking beyond static pages.",
    details:
      "At this point things became more structural. I was no longer just making interfaces — I was learning how frontend, backend, data, and interaction all connect into one system.",
    side: "right",
    top: "30%",
    x: 72,
    width: "w-[min(42rem,44vw)]",
    nodeSize: 18,
  },
  {
    phase: "Shift",
    title: "Systems + UI",
    preview:
      "Started paying closer attention to interaction design, feel, and architecture.",
    details:
      "This phase changed how I build. I became more interested in polish, pacing, visual rhythm, and the invisible structure underneath a product that makes it feel coherent.",
    side: "left",
    top: "56%",
    x: 33,
    width: "w-[min(46rem,48vw)]",
    nodeSize: 18,
  },
  {
    phase: "Current Orbit",
    title: "AI Systems",
    preview:
      "Focused on AI-powered applications and production-grade experiences.",
    details:
      "Now the goal is to build products that feel cinematic, intelligent, and usable at the same time — not just technically functional, but memorable and alive.",
    side: "right",
    top: "80%",
    x: 67,
    width: "w-[min(44rem,46vw)]",
    nodeSize: 18,
  },
];

function ExpandButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-2 text-sm text-white/36 transition hover:text-white/62"
    >
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <ChevronDown className="h-4 w-4" />
      </motion.span>
      {open ? "Collapse" : "Expand"}
    </button>
  );
}

function DesktopJourneyStop({
  item,
  index,
}: {
  item: Stop;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const isLeft = item.side === "left";

  return (
    <motion.div
      className="absolute w-full"
      style={{ top: item.top }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
    >
      <div
        className={`relative ${item.width} ${
          isLeft ? "mr-auto pr-10 md:pr-16" : "ml-auto pl-10 md:pl-16"
        }`}
      >
        <motion.div
          className="pointer-events-none absolute top-7 hidden md:block"
          style={{
            left: `${item.x}%`,
            transform: "translateX(-50%)",
          }}
          initial={{
            scale: 1,
            opacity: 0.9,
          }}
          whileInView={{
            scale: 1.03,
            opacity: 1,
          }}
          viewport={{ once: false, amount: 0.6, margin: "-12% 0px -18% 0px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div
            className="relative rounded-full border border-white/10 bg-white/5"
            style={{
              width: `${item.nodeSize}px`,
              height: `${item.nodeSize}px`,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.04) inset,
                  0 0 14px rgba(255,255,255,0.05)
                `,
              }}
              whileInView={{
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.06) inset,
                  0 0 16px rgba(255,255,255,0.06),
                  0 0 30px rgba(160,180,255,0.04)
                `,
              }}
              viewport={{ once: false, amount: 0.6, margin: "-12% 0px -18% 0px" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
            <div className="absolute inset-[22%] rounded-full bg-white/75" />
            <div className="absolute inset-[-9px] rounded-full border border-white/[0.05]" />
          </div>
        </motion.div>

        <motion.div
          initial={{
            backgroundColor: "rgba(255,255,255,0.012)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.14)",
          }}
          whileInView={{
            backgroundColor: "rgba(255,255,255,0.015)",
            boxShadow: `
              0 18px 50px rgba(0,0,0,0.14),
              0 0 16px rgba(255,255,255,0.035),
              0 0 28px rgba(160,180,255,0.025)
            `,
          }}
          viewport={{ once: false, amount: 0.55, margin: "-12% 0px -18% 0px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative rounded-[24px] px-[1px] py-[1px]"
        >
          <motion.div
            className="absolute inset-0 rounded-[24px]"
            initial={{
              opacity: 0.45,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02) 38%, rgba(160,180,255,0.035) 72%, rgba(255,255,255,0.045))",
            }}
            whileInView={{
              opacity: 0.95,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06) 34%, rgba(175,190,255,0.09) 70%, rgba(255,255,255,0.14))",
            }}
            viewport={{ once: false, amount: 0.55, margin: "-12% 0px -18% 0px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          <div className="relative rounded-[24px] bg-black/20 px-5 py-5 backdrop-blur-[1px] md:px-6">
            <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.032),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(160,180,255,0.02),transparent_30%)] opacity-40" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/24">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/28" />
                {item.phase}
              </div>

              <h3 className="text-lg font-medium tracking-tight text-white/82 md:text-[1.15rem]">
                {item.title}
              </h3>

              <p className="mt-3 max-w-[60ch] text-sm leading-7 text-white/42 md:text-[0.97rem]">
                {item.preview}
              </p>

              <motion.div
                initial={false}
                animate={{
                  height: open ? "auto" : 0,
                  opacity: open ? 1 : 0,
                  marginTop: open ? 16 : 0,
                }}
                className="overflow-hidden"
              >
                <p className="max-w-[62ch] text-sm leading-7 text-white/34 md:text-[0.95rem]">
                  {item.details}
                </p>
              </motion.div>

              <ExpandButton open={open} onClick={() => setOpen((v) => !v)} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function JourneyDesktopConstellation() {
  return (
    <div className="relative min-h-[1180px] md:min-h-[1280px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.022),transparent_22%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.018),transparent_24%)]" />
        <div className="absolute left-[10%] top-[11%] h-[2px] w-[2px] rounded-full bg-white/20" />
        <div className="absolute left-[18%] top-[17%] h-1 w-1 rounded-full bg-white/14" />
        <div className="absolute left-[78%] top-[24%] h-[2px] w-[2px] rounded-full bg-white/20" />
        <div className="absolute left-[84%] top-[39%] h-1 w-1 rounded-full bg-white/12" />
        <div className="absolute left-[14%] top-[52%] h-[2px] w-[2px] rounded-full bg-white/15" />
        <div className="absolute left-[74%] top-[63%] h-1 w-1 rounded-full bg-white/14" />
        <div className="absolute left-[22%] top-[82%] h-[2px] w-[2px] rounded-full bg-white/18" />
        <div className="absolute left-[86%] top-[88%] h-[2px] w-[2px] rounded-full bg-white/16" />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="journey-base" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.00)" />
            <stop offset="12%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="48%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="82%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
          </linearGradient>

          <filter
            id="journey-soft-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="1.35" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M 24 8 C 38 15, 56 20, 72 30 S 51 48, 33 56 S 48 72, 67 80"
          fill="none"
          stroke="url(#journey-base)"
          strokeWidth="0.23"
          strokeLinecap="round"
          filter="url(#journey-soft-glow)"
        />

        <path
          d="M 24 8 C 38 15, 56 20, 72 30 S 51 48, 33 56 S 48 72, 67 80"
          fill="none"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="0.08"
          strokeDasharray="0.45 1.05"
          strokeLinecap="round"
        />
      </svg>

      {journeyItems.map((item, index) => (
        <DesktopJourneyStop key={item.title} item={item} index={index} />
      ))}
    </div>
  );
}

function MobileJourneyStop({
  item,
  index,
}: {
  item: Stop;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="relative pl-8"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
    >
      <div className="pointer-events-none absolute left-[9px] top-0 h-full w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0" />

      <motion.div
        className="pointer-events-none absolute left-0 top-5 rounded-full border border-white/10 bg-white/5"
        initial={{
          scale: 1,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 0 12px rgba(255,255,255,0.04)
          `,
        }}
        whileInView={{
          scale: 1.03,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.06) inset,
            0 0 14px rgba(255,255,255,0.05),
            0 0 26px rgba(160,180,255,0.035)
          `,
        }}
        viewport={{ once: false, amount: 0.6, margin: "-10% 0px -20% 0px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          width: `${item.nodeSize}px`,
          height: `${item.nodeSize}px`,
        }}
      >
        <div className="absolute inset-[24%] rounded-full bg-white/72" />
      </motion.div>

      <motion.div
        initial={{
          backgroundColor: "rgba(255,255,255,0.01)",
          boxShadow: "0 14px 30px rgba(0,0,0,0.12)",
        }}
        whileInView={{
          backgroundColor: "rgba(255,255,255,0.014)",
          boxShadow: `
            0 14px 30px rgba(0,0,0,0.12),
            0 0 14px rgba(255,255,255,0.03),
            0 0 24px rgba(160,180,255,0.02)
          `,
        }}
        viewport={{ once: false, amount: 0.55, margin: "-10% 0px -20% 0px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative rounded-[22px] px-[1px] py-[1px]"
      >
        <motion.div
          className="absolute inset-0 rounded-[22px]"
          initial={{
            opacity: 0.45,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02) 38%, rgba(160,180,255,0.03) 72%, rgba(255,255,255,0.04))",
          }}
          whileInView={{
            opacity: 0.92,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05) 34%, rgba(175,190,255,0.08) 70%, rgba(255,255,255,0.12))",
          }}
          viewport={{ once: false, amount: 0.55, margin: "-10% 0px -20% 0px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="relative rounded-[22px] bg-black/20 px-4 py-4 backdrop-blur-[1px]">
          <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/24">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/28" />
            {item.phase}
          </div>

          <h3 className="text-base font-medium tracking-tight text-white/84">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/42">{item.preview}</p>

          <motion.div
            initial={false}
            animate={{
              height: open ? "auto" : 0,
              opacity: open ? 1 : 0,
              marginTop: open ? 16 : 0,
            }}
            className="overflow-hidden"
          >
            <p className="text-sm leading-7 text-white/34">{item.details}</p>
          </motion.div>

          <ExpandButton open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function JourneyMobileRail() {
  return (
    <div className="relative space-y-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.02),transparent_22%),radial-gradient(circle_at_80%_72%,rgba(160,180,255,0.018),transparent_28%)]" />
        <div className="absolute left-[14%] top-[6%] h-[2px] w-[2px] rounded-full bg-white/20" />
        <div className="absolute left-[82%] top-[18%] h-1 w-1 rounded-full bg-white/10" />
        <div className="absolute left-[70%] top-[42%] h-[2px] w-[2px] rounded-full bg-white/14" />
        <div className="absolute left-[20%] top-[64%] h-1 w-1 rounded-full bg-white/12" />
        <div className="absolute left-[88%] top-[86%] h-[2px] w-[2px] rounded-full bg-white/14" />
      </div>

      {journeyItems.map((item, index) => (
        <MobileJourneyStop key={item.title} item={item} index={index} />
      ))}
    </div>
  );
}

export function Journey() {
  return (
    <section className="relative mx-4 overflow-hidden rounded-4xl border border-white/3 bg-black/20 outline outline-white/10 px-5 py-8 md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(255,255,255,0.024),transparent_18%),radial-gradient(circle_at_84%_80%,rgba(150,170,255,0.02),transparent_22%)]" />
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/10 to-transparent" />
      </div>

      <div className="relative z-10 mb-10 md:mb-12">
        <GradientTitle>Journey</GradientTitle>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/34 md:text-[0.96rem]">
          Not really a straight timeline. More like separate points that started
          to connect over time.
        </p>
      </div>

      <div className="relative z-10 md:hidden">
        <JourneyMobileRail />
      </div>

      <div className="relative z-10 hidden md:block">
        <JourneyDesktopConstellation />
      </div>
    </section>
  );
}