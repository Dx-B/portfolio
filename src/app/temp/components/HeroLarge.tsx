"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { LiveCardData } from "@/lib/psi";
import { LIVE_FALLBACK } from "@/lib/psi";

const L = ({ d, children }: { d: number; children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18, delay: d }}>
    {children}
  </motion.div>
);

// ─── Static card data (non-live) ──────────────────────────────────────────────
const CARD = {
  url:       "billyzhang.dev/temp · desktop",
  branch:    "dev",
  buildTime: "7.2s",
  commit:    "b446c81",
  message:   "TOC LCP LL Fix 1",
  repoUrl:   "https://github.com/Dx-B/portfolio",
  repoName:  "Dx-B/portfolio",
  routes: [
    { s: "┌ ○", p: "/",         hi: false },
    { s: "├ ○", p: "/temp",     hi: true  },
    { s: "├ ƒ", p: "/api/chat", hi: false },
    { s: "└ ○", p: "/berta",    hi: false },
  ],
  extra: 3,
};

function relTime(dateStr: string): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  const d = Math.floor(diff / 86_400_000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  if (d === 1) return "yesterday";
  return `${d}d ago`;
}

// ─── Vercel section ────────────────────────────────────────────────────────────

function VercelSection({ measuredAt, region, git }: { measuredAt?: string; region?: string; git?: GitInfo }) {
  const branch  = git?.branch  ?? CARD.branch;
  const commit  = git?.commit  ?? CARD.commit;
  const message = git?.message ?? CARD.message;
  const meta = [
    "Next.js 16",
    region,
    measuredAt ? `Measured ${relTime(measuredAt)}` : null,
  ].filter(Boolean).join(" · ");

  return (
    <div className="bg-[#0d0d0d] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white/55 text-sm leading-none">▲</span>
          <span className="text-[11px] font-medium tracking-wide text-white/55">Vercel</span>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/8 px-2 py-0.5 text-[10px] text-emerald-400">
          <span className="text-[7px]">●</span> Ready
        </span>
      </div>

      <div className="space-y-3 text-[11px]">
        <L d={0}>
          <div>
            <span className="text-white/20">$ </span>
            <span className="text-white/38">next build</span>
          </div>
        </L>

        <div className="space-y-0.5">
          <L d={0.15}>
            <div className="mb-1.5 text-[9px] uppercase tracking-[0.14em] text-white/18">Route (app)</div>
          </L>
          {CARD.routes.map(({ s, p, hi }, i) => (
            <L key={p} d={0.25 + i * 0.12}>
              <div className={hi ? "text-indigo-400/75" : "text-white/28"}>
                <span className="text-white/16">{s} </span>{p}
              </div>
            </L>
          ))}
          <L d={0.75}>
            <div className="text-white/16 pl-4">+ {CARD.extra} more</div>
          </L>
        </div>

        <L d={0.85}>
          <div className="text-emerald-400/65">✓ Compiled in {CARD.buildTime} · Turbopack</div>
        </L>
      </div>

      <L d={1.0}>
        <div className="mt-3 h-px bg-white/6" />
        {meta && (
          <div className="mt-2.5 text-[9px] text-white/18">{meta}</div>
        )}
      </L>

      <L d={1.1}>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-white/28">
          <span>⎇</span>
          <span>{branch}</span>
          <span className="text-white/14">·</span>
          <span>{commit}</span>
          <span className="text-white/14">—</span>
          <span className="text-white/40 truncate">{message}</span>
        </div>
      </L>
    </div>
  );
}

// ─── GitHub section ────────────────────────────────────────────────────────────

const GhMark = ({ size = 13 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.20-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.20-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
  </svg>
);

function GitHubSection({ github, git, expanded }: { github: LiveCardData["github"]; git?: GitInfo; expanded: boolean }) {
  const branch  = git?.branch  ?? CARD.branch;
  const commit  = git?.commit  ?? CARD.commit;
  const message = git?.message ?? CARD.message;
  const date    = relTime(github.commitDate);

  return (
    <div className="bg-[#0d1117]">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2 text-[#c9d1d9]/70">
          <GhMark />
          <span className="text-[11px] font-medium tracking-wide">GitHub</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
          {github.stars > 0 && (
            <span className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
              </svg>
              {github.stars}
            </span>
          )}
          <span>{CARD.repoName}</span>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-5 pb-5 space-y-3">
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3 space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"/>
              </svg>
              <span className="text-[#388bfd]">{branch}</span>
              <span>·</span>
              <code className="text-[10px]">{commit}</code>
              {date && <><span>·</span><span>{date}</span></>}
            </div>

            <div className="text-[11px] text-[#c9d1d9]">{message}</div>

            <div className="flex items-center gap-3 text-[10px] pt-0.5">
              <span style={{ color: "#3fb950" }}>+{github.additions.toLocaleString()}</span>
              <span style={{ color: "#f85149" }}>−{github.deletions.toLocaleString()}</span>
            </div>
          </div>

          <a
            href={CARD.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-md border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[11px] py-1.5 transition-colors duration-150"
          >
            <GhMark />
            View Repository
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Lighthouse section ────────────────────────────────────────────────────────

function CategoryRing({ score, label }: { score: number; label: string }) {
  const r     = 17;
  const circ  = 2 * Math.PI * r;
  const arc   = (score / 100) * circ;
  const color = score >= 90 ? "#0cce6b" : score >= 50 ? "#ffa400" : "#ff4e42";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="42" height="42" viewBox="0 0 42 42">
        <circle cx="21" cy="21" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
        <circle cx="21" cy="21" r={r} fill="none" stroke={color} strokeWidth="3.5"
          strokeDasharray={`${arc} ${circ - arc}`} strokeLinecap="round"
          transform="rotate(-90 21 21)" />
        <text x="21" y="25" textAnchor="middle" fontSize="10" fontWeight="700"
          fill={color} fontFamily="monospace">{score}</text>
      </svg>
      <span className="text-[9px] uppercase tracking-widest text-[#9aa0a6]">{label}</span>
    </div>
  );
}

function LighthouseSection({ psi, measuredAt, expanded }: { psi: LiveCardData["psi"]; measuredAt?: string; expanded: boolean }) {
  const vitals: [string, string][] = [
    ["LCP", psi.lcp],
    ["FCP", psi.fcp],
    ["CLS", psi.cls],
    ["TBT", psi.tbt],
  ];

  return (
    <div className="bg-[#202124]">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <GoogleGIcon />
          <span className="text-[11px] font-medium tracking-wide text-[#e8eaed]">Lighthouse</span>
        </div>
        <span className="text-[10px] text-[#9aa0a6]">{CARD.url}</span>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-5 pb-5">
          <div className="grid grid-cols-4 gap-2 mb-4">
            <CategoryRing score={psi.perf}          label="Perf"  />
            <CategoryRing score={psi.a11y}          label="A11y"  />
            <CategoryRing score={psi.bestPractices} label="B.P."  />
            <CategoryRing score={psi.seo}           label="SEO"   />
          </div>

          <div className="h-px bg-white/8 mb-3" />

          <div className="space-y-1.5">
            {vitals.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-[10px] text-[#9aa0a6]">{k}</span>
                <span className="text-[10px] font-medium" style={{ color: "#0cce6b" }}>{v}</span>
              </div>
            ))}
          </div>

          {measuredAt && (
            <div className="mt-3 pt-3 border-t border-white/6 text-[9px] text-[#9aa0a6]">
              Reviewed {new Date(measuredAt).toLocaleString("en-US", {
                month: "short", day: "numeric", year: "numeric",
                hour: "numeric", minute: "2-digit", timeZoneName: "short",
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function GoogleGIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ─── Composed card ─────────────────────────────────────────────────────────────

function BuildCard({ liveData, region, git }: { liveData: LiveCardData; region?: string; git?: GitInfo }) {
  const [ghExpanded, setGhExpanded] = useState(false);
  const [lhExpanded, setLhExpanded] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGhExpanded(true), 1350);
    const t2 = setTimeout(() => setLhExpanded(true), 1750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 font-mono text-xs">
      <VercelSection measuredAt={liveData.measuredAt} region={region} git={git} />
      <div className="h-px bg-white/6" />
      <GitHubSection github={liveData.github} git={git} expanded={ghExpanded} />
      <div className="h-px bg-white/6" />
      <LighthouseSection psi={liveData.psi} measuredAt={liveData.measuredAt} expanded={lhExpanded} />
    </div>
  );
}

// ─── Hero layout ───────────────────────────────────────────────────────────────

type GitInfo = { branch: string; commit: string; message: string };

export default function HeroLarge({ liveData, region, git }: { liveData?: LiveCardData; region?: string; git?: GitInfo }) {
  const data = liveData ?? LIVE_FALLBACK;

  const scrollToContact = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen justify-center px-8 pb-24 md:px-16" style={{ paddingTop: "max(6rem, calc(50vh - 350px))" }}>

      <div className="w-full max-w-6xl" style={{ height: "clamp(600px, calc(100vh - 192px), 700px)" }}>
        <div className="h-full grid gap-12 xl:grid-cols-2 xl:grid-rows-1 xl:gap-20">

          {/* Left — identity + CTAs */}
          <div className="flex h-full flex-col justify-center">
            <span className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white/25">Hey there!</span>

            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl xl:text-7xl leading-[1.1]">
              I&apos;m Billy.<br />
            </h1>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl xl:text-5xl leading-[1.1]">
              I like building{" "}
              <span className="bg-linear-to-r from-[#818cf8] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                things.
              </span>
            </h1>

            <div className="mt-6 max-w-sm space-y-3">
              <p className="text-lg leading-relaxed text-white/70">
                I like making things pretty, but they gotta be{" "}
                <span className="bg-linear-to-r from-[#818cf8] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent font-semibold">
                  fast
                </span>{" "}
                too.
              </p>
              <p className="text-base leading-relaxed text-white/35">
                In fact, I&apos;ve put everything about this site here so you can see just how fast it is :)
              </p>
              <p className="text-base leading-relaxed text-white/35">
                Feel free to look around, and make yourself at home.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <a href="#contact" className="relative rounded-xl bg-linear-to-r from-[#818cf8] via-[#a855f7] to-[#ec4899] p-px">
                <span className="block rounded-[11px] bg-[#080808] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5">
                  Let&apos;s Chat →
                </span>
              </a>
              <a href="/resume.pdf" download className="text-sm text-white/40 transition-colors hover:text-white/70">
                Resume ↗
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

          {/* Right — BuildCard, flex-centered so it grows symmetrically from center */}
          <div className="hidden md:flex h-full flex-col justify-center">
            <BuildCard liveData={data} region={region} git={git} />
          </div>

        </div>
      </div>

      {/* Scroll chevron */}
      <style>{`
        @keyframes chev-pulse {
          0%, 100% { transform: translateX(-50%) translateY(0px); opacity: 0.55; }
          50%       { transform: translateX(-50%) translateY(8px); opacity: 1;    }
        }
      `}</style>
      <button
        onClick={scrollToContact}
        className="absolute bottom-6 md:bottom-10 left-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        style={{ animation: "chev-pulse 2.4s ease-in-out infinite" }}
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/28 transition-colors duration-200 group-hover:text-white/55">
          Explore
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="chev-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#818cf8" />
              <stop offset="50%"  stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path d="M6 9l6 6 6-6" stroke="url(#chev-grad)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
