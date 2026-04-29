"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GradientTitle } from "./GradientTitle";
import {
  BsBootstrap,
  BsBoxes,
  BsCodeSlash,
  BsDatabase,
  BsLightningCharge,
} from "react-icons/bs";

type Mode = "frontend" | "backend";

const frontendCallouts = [
  {
    label: "Next.js",
    desc: "Routing, app structure, and rendering",
    className: "left-[2%] top-[10%]",
    lineClassName: "left-[18%] top-[20%] w-[10%]",
  },
  {
    label: "Tailwind CSS",
    desc: "Layout, spacing, styling, and responsive design",
    className: "right-[3%] top-[10%]",
    lineClassName: "right-[19%] top-[20%] w-[12%]",
  },
  {
    label: "React",
    desc: "Composable UI and reusable interface logic",
    className: "left-[6%] bottom-[18%]",
    lineClassName: "left-[19%] bottom-[29%] w-[10%]",
  },
  {
    label: "Bootstrap Icons",
    desc: "Iconography and visual utility details",
    className: "right-[4%] bottom-[21%]",
    lineClassName: "right-[20%] bottom-[31%] w-[11%]",
  },
  {
    label: "Framer Motion",
    desc: "Transitions, motion, and interaction polish",
    className: "left-1/2 bottom-[2%] -translate-x-1/2",
    lineClassName:
      "left-1/2 bottom-[14%] h-[10%] w-px -translate-x-1/2",
  },
];

const frontendCards = [
  {
    label: "Next.js",
    desc: "Routing, app structure, and rendering",
  },
  {
    label: "Tailwind CSS",
    desc: "Layout, spacing, styling, and responsive design",
  },
  {
    label: "React",
    desc: "Composable UI and reusable interface logic",
  },
  {
    label: "Bootstrap Icons",
    desc: "Iconography and visual utility details",
  },
  {
    label: "Framer Motion",
    desc: "Transitions, motion, and interaction polish",
  },
];

const backendLayers = [
  {
    label: "REST APIs",
    desc: "Endpoints and route handlers for app actions and queries.",
    icon: BsCodeSlash,
  },
  {
    label: "Server Logic",
    desc: "Validation, orchestration, and backend workflows.",
    icon: BsBoxes,
  },
  {
    label: "Postgres",
    desc: "Persistent storage and structured application data.",
    icon: BsDatabase,
  },
  {
    label: "OpenAI / AI",
    desc: "Model calls, assistants, and intelligent system features.",
    icon: BsLightningCharge,
  },
];

function Toggle({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
      <button
        onClick={() => setMode("frontend")}
        className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
          mode === "frontend"
            ? "bg-white/[0.08] text-white/86"
            : "text-white/34 hover:text-white/60"
        }`}
      >
        Frontend
      </button>
      <button
        onClick={() => setMode("backend")}
        className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
          mode === "backend"
            ? "bg-white/[0.08] text-white/86"
            : "text-white/34 hover:text-white/60"
        }`}
      >
        Backend
      </button>
    </div>
  );
}

function InfoPill({
  label,
  desc,
  className,
  lineClassName,
}: {
  label: string;
  desc: string;
  className: string;
  lineClassName: string;
}) {
  return (
    <>
      <div
        className={`pointer-events-none absolute ${lineClassName} bg-gradient-to-r from-white/0 via-white/24 to-white/0`}
      />
      <div
        className={`absolute z-20 w-[168px] rounded-2xl border border-white/[0.08] bg-black/50 p-3 backdrop-blur-md ${className}`}
      >
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/24">
          Layer
        </div>
        <div className="mt-1 text-sm font-medium text-white/84">{label}</div>
        <div className="mt-1 text-xs leading-5 text-white/38">{desc}</div>
      </div>
    </>
  );
}

function FrontendMockSite() {
  return (
    <div className="rounded-[28px] border border-white/[0.08] bg-[#0b0d13]/85 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-4 md:p-5">
      <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="h-2 w-20 rounded-full bg-gradient-to-r from-white/20 via-white/8 to-white/0" />
          <div className="flex gap-2">
            {backendLayers.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/56"
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[20px] border border-white/[0.06] bg-black/20 p-4 sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-indigo-100/80">
              Interface
            </div>

            <h3 className="mt-4 max-w-[13ch] text-xl font-semibold leading-tight text-white/88 sm:text-2xl md:text-3xl">
              Polished surfaces with system thinking underneath.
            </h3>

            <p className="mt-3 max-w-[48ch] text-sm leading-7 text-white/40">
              A fake product frame used to show what builds the front-end layer.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/[0.08] px-4 py-2 text-sm text-white/82">
                Primary CTA
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-2 text-sm text-white/56">
                Secondary
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[20px] border border-white/[0.06] bg-black/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-white/72">Metrics</span>
                <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] text-white/34">
                  UI
                </span>
              </div>
              <div className="h-20 rounded-2xl bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:18px_18px]" />
            </div>

            <div className="rounded-[20px] border border-white/[0.06] bg-black/20 p-4">
              <div className="mb-3 flex items-center gap-2 text-white/70">
                <BsBootstrap className="h-4 w-4" />
                <span className="text-sm">Utility Layer</span>
              </div>
              <div className="flex gap-2">
                <div className="h-9 w-9 rounded-xl border border-white/[0.08] bg-white/[0.03]" />
                <div className="h-9 w-9 rounded-xl border border-white/[0.08] bg-white/[0.03]" />
                <div className="h-9 w-9 rounded-xl border border-white/[0.08] bg-white/[0.03]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FrontendDesktop() {
  return (
    <div className="relative hidden min-h-[720px] xl:block">
      {frontendCallouts.map((item) => (
        <InfoPill key={item.label} {...item} />
      ))}

      <div className="absolute left-1/2 top-1/2 z-10 w-[86%] max-w-[760px] -translate-x-1/2 -translate-y-1/2">
        <FrontendMockSite />
      </div>
    </div>
  );
}

function FrontendMobile() {
  return (
    <div className="space-y-4 xl:hidden">
      <FrontendMockSite />

      <div className="grid gap-3 sm:grid-cols-2">
        {frontendCards.map((item) => (
          <div
            key={item.label}
            className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-4"
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/24">
              Layer
            </div>
            <div className="mt-1 text-sm font-medium text-white/84">
              {item.label}
            </div>
            <div className="mt-1 text-sm leading-6 text-white/38">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrontendView() {
  return (
    <motion.div
      key="frontend"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <FrontendDesktop />
      <FrontendMobile />
    </motion.div>
  );
}

function BackendCodeWindow() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0b12] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_28px_80px_rgba(0,0,0,0.34)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_24%)]" />
      </div>

      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.55)]" />
          <div className="h-3.5 w-3.5 rounded-full bg-violet-300/55" />
          <div className="h-3.5 w-3.5 rounded-full bg-white/18" />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <div className="h-2 w-2 rounded-full bg-violet-300/70" />
          <span>backend.ts</span>
        </div>
      </div>

      <div className="relative px-4 py-5 font-mono text-[13px] leading-8 sm:px-6 sm:py-6 sm:text-sm">
        <div className="grid grid-cols-[28px_1fr] gap-x-4 text-slate-500 sm:grid-cols-[30px_1fr]">
          <span>01</span>
          <div>
            <span className="text-violet-300">const</span>{" "}
            <span className="text-white">system</span>{" "}
            <span className="text-slate-400">=</span>{" "}
            <span className="text-indigo-200">{"{"}</span>
          </div>

          <span>02</span>
          <div className="text-white">
            <span className="text-slate-300">api</span>
            <span className="text-slate-400">:</span>{" "}
            <span className="text-indigo-200">'REST routes'</span>
            <span className="text-slate-400">,</span>
          </div>

          <span>03</span>
          <div className="text-white">
            <span className="text-slate-300">logic</span>
            <span className="text-slate-400">:</span>{" "}
            <span className="text-violet-200">'validation + orchestration'</span>
            <span className="text-slate-400">,</span>
          </div>

          <span>04</span>
          <div className="text-white">
            <span className="text-slate-300">data</span>
            <span className="text-slate-400">:</span>{" "}
            <span className="text-indigo-200">'Postgres'</span>
            <span className="text-slate-400">,</span>
          </div>

          <span>05</span>
          <div className="text-white">
            <span className="text-slate-300">ai</span>
            <span className="text-slate-400">:</span>{" "}
            <span className="text-violet-200">'OpenAI workflows'</span>
            <span className="text-slate-400">,</span>
          </div>

          <span>06</span>
          <div className="text-white">
            <span className="text-slate-300">deploy</span>
            <span className="text-slate-400">:</span>{" "}
            <span className="text-indigo-200">'Vercel'</span>
          </div>

          <span>07</span>
          <div>
            <span className="text-indigo-200">{"}"}</span>
            <span className="text-slate-400">;</span>
          </div>

          <span>08</span>
          <div className="text-slate-500"> </div>

          <span>09</span>
          <div>
            <span className="text-white">system</span>
            <span className="text-slate-400">.</span>
            <span className="text-violet-300">run</span>
            <span className="text-slate-400">();</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackendMobileBreakdown() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:hidden">
      {backendLayers.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.05 }}
            className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-white/70">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/84">
                  {item.label}
                </div>
                <div className="mt-1 text-sm leading-6 text-white/38">
                  {item.desc}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function BackendDesktopBreakdown() {
  return (
    <div className="hidden grid-cols-1 gap-4 xl:grid">
      {backendLayers.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.05 }}
            className="rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-white/70">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/84">
                  {item.label}
                </div>
                <div className="mt-1 text-sm leading-7 text-white/38">
                  {item.desc}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function BackendView() {
  return (
    <motion.div
      key="backend"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <div className="space-y-4">
          <BackendCodeWindow />
          <BackendMobileBreakdown />
        </div>

        <BackendDesktopBreakdown />
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const [mode, setMode] = useState<Mode>("frontend");

  return (
    <section className="m-4 space-y-4">
      <GradientTitle>Tech Stack</GradientTitle>

      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-black/20 p-4 sm:p-5 md:p-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.16]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_14%,rgba(255,255,255,0.04),transparent_18%),radial-gradient(circle_at_84%_82%,rgba(120,100,255,0.06),transparent_24%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-white/40">
            A schematic view of the surface and the system beneath it.
          </p>

          <div className="self-start lg:self-auto">
            <Toggle mode={mode} setMode={setMode} />
          </div>
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {mode === "frontend" ? <FrontendView /> : <BackendView />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}