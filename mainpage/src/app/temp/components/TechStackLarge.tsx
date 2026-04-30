"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BsBootstrap, BsBoxes, BsCodeSlash, BsDatabase, BsLightningCharge,
} from "react-icons/bs";

type Mode = "frontend" | "backend";

const frontendCards = [
  { label: "Next.js", desc: "Routing, app structure, and rendering" },
  { label: "Tailwind CSS", desc: "Layout, spacing, styling, and responsive design" },
  { label: "React", desc: "Composable UI and reusable interface logic" },
  { label: "Bootstrap Icons", desc: "Iconography and visual utility details" },
  { label: "Framer Motion", desc: "Transitions, motion, and interaction polish" },
];

const frontendCallouts = [
  { label: "Next.js", desc: "Routing, app structure, and rendering", className: "left-[2%] top-[10%]", lineClassName: "left-[18%] top-[20%] w-[10%]" },
  { label: "Tailwind CSS", desc: "Layout, spacing, styling, and responsive design", className: "right-[3%] top-[10%]", lineClassName: "right-[19%] top-[20%] w-[12%]" },
  { label: "React", desc: "Composable UI and reusable interface logic", className: "left-[6%] bottom-[18%]", lineClassName: "left-[19%] bottom-[29%] w-[10%]" },
  { label: "Bootstrap Icons", desc: "Iconography and visual utility details", className: "right-[4%] bottom-[21%]", lineClassName: "right-[20%] bottom-[31%] w-[11%]" },
  { label: "Framer Motion", desc: "Transitions, motion, and interaction polish", className: "left-1/2 bottom-[2%] -translate-x-1/2", lineClassName: "left-1/2 bottom-[14%] h-[10%] w-px -translate-x-1/2" },
];

const backendLayers = [
  { label: "REST APIs", desc: "Endpoints and route handlers for app actions and queries.", icon: BsCodeSlash },
  { label: "Server Logic", desc: "Validation, orchestration, and backend workflows.", icon: BsBoxes },
  { label: "Postgres", desc: "Persistent storage and structured application data.", icon: BsDatabase },
  { label: "OpenAI / AI", desc: "Model calls, assistants, and intelligent system features.", icon: BsLightningCharge },
];

function Toggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
      {(["frontend", "backend"] as Mode[]).map((m) => (
        <button key={m} onClick={() => setMode(m)}
          className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
            mode === m ? "bg-white/[0.08] text-white/85" : "text-white/35 hover:text-white/60"
          }`}>
          {m}
        </button>
      ))}
    </div>
  );
}

function InfoPill({ label, desc, className, lineClassName }: { label: string; desc: string; className: string; lineClassName: string }) {
  return (
    <>
      <div className={`pointer-events-none absolute ${lineClassName} bg-gradient-to-r from-white/0 via-white/20 to-white/0`} />
      <div className={`absolute z-20 w-[160px] rounded-xl border border-white/[0.08] bg-[#0d0d0d] p-3 ${className}`}>
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">Layer</div>
        <div className="mt-1 text-sm font-medium text-white/80">{label}</div>
        <div className="mt-1 text-xs leading-5 text-white/40">{desc}</div>
      </div>
    </>
  );
}

function FrontendMockSite() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-3 sm:p-4 md:p-5">
      <div className="rounded-xl border border-white/[0.06] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="h-2 w-20 rounded-full bg-gradient-to-r from-white/20 via-white/8 to-white/0" />
          <div className="flex gap-2">
            {backendLayers.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] text-white/45">
                  <Icon className="h-3.5 w-3.5" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-white/[0.06] p-4 sm:p-5">
            <div className="inline-flex items-center rounded-full border border-white/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/40">
              Interface
            </div>
            <h3 className="mt-4 max-w-[13ch] text-xl font-semibold leading-tight text-white/85 sm:text-2xl">
              Polished surfaces with system thinking underneath.
            </h3>
            <p className="mt-3 max-w-[48ch] text-sm leading-7 text-white/40">
              A fake product frame used to show what builds the front-end layer.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">Primary CTA</div>
              <div className="rounded-xl border border-white/[0.08] px-4 py-2 text-sm text-white/50">Secondary</div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-xl border border-white/[0.06] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-white/60">Metrics</span>
                <span className="rounded-full border border-white/[0.06] px-2 py-1 text-[10px] text-white/30">UI</span>
              </div>
              <div className="h-20 rounded-lg bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:18px_18px]" />
            </div>
            <div className="rounded-xl border border-white/[0.06] p-4">
              <div className="mb-3 flex items-center gap-2 text-white/55">
                <BsBootstrap className="h-4 w-4" />
                <span className="text-sm">Utility Layer</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-xl border border-white/[0.08]" />
                ))}
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
    <div className="relative hidden min-h-[680px] xl:block">
      {frontendCallouts.map((item) => <InfoPill key={item.label} {...item} />)}
      <div className="absolute left-1/2 top-1/2 z-10 w-[86%] max-w-[720px] -translate-x-1/2 -translate-y-1/2">
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
          <div key={item.label} className="rounded-xl border border-white/[0.08] p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">Layer</div>
            <div className="mt-1 text-sm font-medium text-white/80">{item.label}</div>
            <div className="mt-1 text-sm leading-6 text-white/40">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BackendCodeWindow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-white/10" />
          <div className="h-3 w-3 rounded-full bg-white/10" />
          <div className="h-3 w-3 rounded-full bg-white/10" />
        </div>
        <div className="flex items-center gap-2 text-sm text-white/30">
          <div className="h-2 w-2 rounded-full bg-white/25" />
          <span>backend.ts</span>
        </div>
      </div>

      <div className="px-4 py-5 font-mono text-[13px] leading-8 sm:px-6 sm:py-6 sm:text-sm">
        <div className="grid grid-cols-[28px_1fr] gap-x-4 text-white/25 sm:grid-cols-[30px_1fr]">
          <span>01</span><div><span className="text-white/50">const</span> <span className="text-white/80">system</span> <span className="text-white/40">=</span> <span className="text-white/60">{"{"}</span></div>
          <span>02</span><div><span className="text-white/65">api</span><span className="text-white/40">:</span> <span className="text-white/50">&apos;REST routes&apos;</span><span className="text-white/40">,</span></div>
          <span>03</span><div><span className="text-white/65">logic</span><span className="text-white/40">:</span> <span className="text-white/50">&apos;validation + orchestration&apos;</span><span className="text-white/40">,</span></div>
          <span>04</span><div><span className="text-white/65">data</span><span className="text-white/40">:</span> <span className="text-white/50">&apos;Postgres&apos;</span><span className="text-white/40">,</span></div>
          <span>05</span><div><span className="text-white/65">ai</span><span className="text-white/40">:</span> <span className="text-white/50">&apos;OpenAI workflows&apos;</span><span className="text-white/40">,</span></div>
          <span>06</span><div><span className="text-white/65">deploy</span><span className="text-white/40">:</span> <span className="text-white/50">&apos;Vercel&apos;</span></div>
          <span>07</span><div><span className="text-white/60">{"}"}</span><span className="text-white/40">;</span></div>
          <span>08</span><div> </div>
          <span>09</span><div><span className="text-white/70">system</span><span className="text-white/40">.</span><span className="text-white/55">run</span><span className="text-white/40">();</span></div>
        </div>
      </div>
    </div>
  );
}

function BackendCards({ hidden }: { hidden?: string }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${hidden ?? ""}`}>
      {backendLayers.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.05 }}
            className="rounded-xl border border-white/[0.08] p-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-white/55">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/80">{item.label}</div>
                <div className="mt-1 text-sm leading-6 text-white/40">{item.desc}</div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function TechStackLarge() {
  const [mode, setMode] = useState<Mode>("frontend");

  return (
    <motion.div
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 border-b border-white/[0.06] pb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
          <div className="self-start"><Toggle mode={mode} setMode={setMode} /></div>
        </div>

        <p className="mb-8 max-w-2xl text-sm leading-7 text-white/40">
          A schematic view of the surface and the system beneath it.
        </p>

        <AnimatePresence mode="wait">
          {mode === "frontend" ? (
            <motion.div key="frontend" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <FrontendDesktop />
              <FrontendMobile />
            </motion.div>
          ) : (
            <motion.div key="backend" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
                <div className="space-y-4">
                  <BackendCodeWindow />
                  <BackendCards hidden="xl:hidden" />
                </div>
                <BackendCards hidden="hidden xl:grid" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
