"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

// High-value sections at the top compass positions (N, NE, NW)
const SECTIONS = [
  { id: "toc-projects",  label: "Projects",   desc: "What I've built"    },  // 0 N
  { id: "toc-techstack", label: "Tech Stack", desc: "Tools of the trade" },  // 1 NE
  { id: "toc-about",     label: "About",      desc: "Who I am"           },  // 2 E
  { id: "toc-passion",   label: "Passion",    desc: "What drives me"     },  // 3 SE
  { id: "toc-process",   label: "Process",    desc: "How I work"         },  // 4 S
  { id: "toc-journey",   label: "Journey",    desc: "Where I've been"    },  // 5 SW
  { id: "toc-contact",   label: "Contact",    desc: "Let's talk"         },  // 6 W
  { id: "toc-chatbot",   label: "Ask Me",     desc: "AI-powered Q&A"     },  // 7 NW
];

function navTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Shared SVG glow filter ───────────────────────────────────────────────────

function GlowFilter({ id }: { id: string }) {
  return (
    <defs>
      {/* filterUnits="userSpaceOnUse" with absolute margins so the blur region
          never collapses to zero on degenerate bounding boxes (pure vertical /
          horizontal lines have zero width or height, breaking %-based filters) */}
      <filter id={id} filterUnits="userSpaceOnUse" x="-50" y="-50" width="1000" height="760">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

// ─── Layout A: Radial PCB Spider ──────────────────────────────────────────────

// viewBox 0 0 900 660, center (450, 330), circle r=80

const SPIDER_GRAD_COORDS: [number, number, number, number][] = [
  [450, 250, 450, 102],  // 0 N  — Projects hh=42: entry bottom at 60+42=102
  [501, 279, 699, 137],  // 1 NE — Tech Stack hw=74: entry left at 773-74=699
  [530, 330, 750, 330],  // 2 E
  [501, 381, 703, 523],  // 3 SE
  [450, 410, 450, 570],  // 4 S
  [399, 381, 197, 523],  // 5 SW
  [370, 330, 150, 330],  // 6 W
  [399, 279, 201, 137],  // 7 NW — Ask Me hw=74: entry right at 127+74=201
];

const SPIDER_NODES: [number, number][] = [
  [450,  60],  // 0 N  (extended upward; box bottom entry at y=90)
  [773, 137],  // 1 NE
  [820, 330],  // 2 E  (right vertex at 890, fits in viewBox)
  [773, 523],  // 3 SE
  [450, 600],  // 4 S  (extended downward; box top entry at y=570)
  [127, 523],  // 5 SW
  [ 80, 330],  // 6 W  (left vertex at 10, fits in viewBox)
  [127, 137],  // 7 NW
];

const SPIDER_TRACES = [
  "M 450 250 L 450 102",           // 0 N  (Projects hh=42)
  "M 501 279 L 501 137 L 699 137", // 1 NE (Tech Stack hw=74)
  "M 530 330 L 750 330",           // 2 E
  "M 501 381 L 501 523 L 703 523", // 3 SE
  "M 450 410 L 450 570",           // 4 S
  "M 399 381 L 399 523 L 197 523", // 5 SW
  "M 370 330 L 150 330",           // 6 W
  "M 399 279 L 399 137 L 201 137", // 7 NW (Ask Me hw=74)
];

const SPIDER_CORNERS: ([number, number] | null)[] = [
  null, [501, 137], null, [501, 523], null, [399, 523], null, [399, 137],
];

// N (Projects), NE (Tech Stack), NW (Ask Me) — rendered larger with gradient labels
const IMPORTANT = new Set([0, 1, 7]);

// Parallelogram (left/right) or trapezoid (N/S). Entry side = where the spider leg touches.
// Ring = the other 3 sides as one open path.
function getBoxPaths(cx: number, cy: number, side: "left" | "right" | "both", hw = 70, hh = 30) {
  const p = ([x, y]: [number, number]) => `${x},${y}`;

  let tl: [number, number], tr: [number, number], br: [number, number], bl: [number, number];

  if (side === "both") {
    // Trapezoid: wider far edge, narrower entry edge (shorter end toward the spider body)
    const hwFar = 86, hwNear = 58;
    if (cy < 330) {
      // N node — entry = bottom (shorter), far = top (wider)
      tl = [cx - hwFar,  cy - hh];
      tr = [cx + hwFar,  cy - hh];
      br = [cx + hwNear, cy + hh];
      bl = [cx - hwNear, cy + hh];
    } else {
      // S node — entry = top (shorter), far = bottom (wider)
      tl = [cx - hwNear, cy - hh];
      tr = [cx + hwNear, cy - hh];
      br = [cx + hwFar,  cy + hh];
      bl = [cx - hwFar,  cy + hh];
    }
  } else {
    const s = side === "right" ? 18 : -18;
    tl = [cx - hw + s, cy - hh];
    tr = [cx + hw + s, cy - hh];
    br = [cx + hw - s, cy + hh];
    bl = [cx - hw - s, cy + hh];
  }

  const points = `${p(tl)} ${p(tr)} ${p(br)} ${p(bl)}`;

  let entry: string, ring: string;
  if (side === "right") {
    entry = `M ${p(bl)} L ${p(tl)}`;
    ring  = `M ${p(tl)} L ${p(tr)} L ${p(br)} L ${p(bl)}`;
  } else if (side === "left") {
    entry = `M ${p(tr)} L ${p(br)}`;
    ring  = `M ${p(br)} L ${p(bl)} L ${p(tl)} L ${p(tr)}`;
  } else if (cy < 330) {
    entry = `M ${p(br)} L ${p(bl)}`;                          // N: bottom (shorter) edge
    ring  = `M ${p(bl)} L ${p(tl)} L ${p(tr)} L ${p(br)}`;
  } else {
    entry = `M ${p(tl)} L ${p(tr)}`;                          // S: top (shorter) edge
    ring  = `M ${p(tr)} L ${p(br)} L ${p(bl)} L ${p(tl)}`;
  }

  return { entry, ring, points };
}

// Clockwise from top, four quarter-arcs
const CIRCLE_PATH =
  "M 450,250 A 80,80 0 0,1 530,330 A 80,80 0 0,1 450,410 A 80,80 0 0,1 370,330 A 80,80 0 0,1 450,250";

function SpiderLayout() {
  const [hov, setHov] = useState<number | null>(null);
  // pulseVersion[i] increments each pulse (intro + idle) → key remount replays trace animation
  const [pulseVersion, setPulseVersion]   = useState<number[]>(Array(8).fill(0));
  // borderVersion[i] increments ~450ms after pulse → key remount replays box flash
  const [borderVersion, setBorderVersion] = useState<number[]>(Array(8).fill(0));
  const [introComplete, setIntroComplete] = useState(false);

  const containerRef    = useRef<HTMLDivElement>(null);
  const timersRef       = useRef<ReturnType<typeof setTimeout>[]>([]);
  const idleRef         = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleCounterRef  = useRef(0);
  const circleControls  = useAnimationControls();
  const isInView        = useInView(containerRef, { once: true, amount: 0.35 });

  // ── Intro sequence ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isInView) return;
    const add = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timersRef.current.push(t);
    };

    // Draw circle outline, then settle into a slow breathing glow
    add(() => circleControls.start({
      pathLength: 1, opacity: 0.85,
      transition: { pathLength: { duration: 1.1, ease: "easeInOut" }, opacity: { duration: 0.15 } },
    }), 250);
    add(() => circleControls.start({
      opacity: [0.75, 0.95, 0.75],
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
    }), 1450);

    // Stagger leg pulses + border glow
    SECTIONS.forEach((_, i) => {
      add(() => setPulseVersion(prev  => { const n = [...prev]; n[i]++;        return n; }), 1500 + i * 170);
      add(() => {
        setBorderVersion(prev => { const n = [...prev]; n[i]++; return n; });
      }, 1950 + i * 170);
    });

    // Enable idle scan + ambient trace glow
    add(() => setIntroComplete(true), 3900);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      circleControls.stop();
    };
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Idle scan: fire a pulse on each node in sequence every 4.5s ─────────────
  useEffect(() => {
    if (!introComplete) return;
    idleRef.current = setInterval(() => {
      const target = idleCounterRef.current % 8;
      idleCounterRef.current++;
      setPulseVersion(prev => { const n = [...prev]; n[target]++; return n; });
      const t = setTimeout(() => {
        setBorderVersion(prev => { const n = [...prev]; n[target]++; return n; });
      }, 600);
      timersRef.current.push(t);
    }, 4500);
    return () => { if (idleRef.current) clearInterval(idleRef.current); };
  }, [introComplete]);

  return (
    <div ref={containerRef} className="w-full">
      <style>{`
        @keyframes toc-breathe    { 0%,100%{opacity:0.13} 50%{opacity:0.32} }
        @keyframes toc-pulse-soft { 0%,100%{opacity:0.10} 50%{opacity:0.36} }
        @keyframes toc-glow-main  { 0%,100%{opacity:0.45} 50%{opacity:0.88} }
        @keyframes toc-glow-sub   { 0%,100%{opacity:0.28} 50%{opacity:0.58} }
      `}</style>
      <svg
        viewBox="0 0 900 660"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        style={{ overflow: "visible", maxHeight: "calc(100vh - 8rem)" }}
      >
        <GlowFilter id="spider-glow" />

        <defs>
          {/* Per-trace gradients — static indigo→purple→pink */}
          {SPIDER_GRAD_COORDS.map(([x1, y1, x2, y2], i) => (
            <linearGradient key={`grad${i}`} id={`sg${i}`}
              gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
              <stop offset="0%"   stopColor="#818cf8" />
              <stop offset="50%"  stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          ))}

          {/* Circle outline gradient — pink at top (toward N/NE/NW), indigo at bottom */}
          <linearGradient id="toc-circle-grad" gradientUnits="userSpaceOnUse"
            x1={450} y1={410} x2={450} y2={250}>
            <stop offset="0%"   stopColor="#818cf8" />
            <stop offset="50%"  stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* ── Base traces (always visible, dim) */}
        {SPIDER_TRACES.map((d, i) => (
          <path key={`bt${i}`} d={d} fill="none"
            stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} strokeLinecap="square" />
        ))}

        {/* ── Ambient breathing traces — CSS animation */}
        {SPIDER_TRACES.map((d, i) => (
          <path key={`ag${i}`} d={d} fill="none"
            stroke={`url(#sg${i})`} strokeWidth={1.5} strokeLinecap="square"
            style={introComplete
              ? { opacity: 0, animation: `toc-breathe ${3.2 + i * 0.22}s ease-in-out ${i * 0.18}s infinite` }
              : { opacity: 0 }}
          />
        ))}

        {/* ── Hover glow traces */}
        {SPIDER_TRACES.map((d, i) => (
          <motion.path key={`gt${i}`} d={d} fill="none"
            stroke={`url(#sg${i})`} strokeWidth={2} strokeLinecap="square"
            filter="url(#spider-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={hov === i ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={hov === i
              ? { pathLength: { duration: 0.45, ease: "easeOut" }, opacity: { duration: 0.08 } }
              : { opacity: { duration: 0.18, ease: "easeOut" }, pathLength: { duration: 0.01 } }
            }
          />
        ))}

        {/* ── Intro / idle pulse traces — keyed so remount replays from initial */}
        {SPIDER_TRACES.map((d, i) =>
          pulseVersion[i] > 0 ? (
            <motion.path key={`ip-${i}-v${pulseVersion[i]}`} d={d} fill="none"
              stroke={`url(#sg${i})`} strokeWidth={2.5} strokeLinecap="square"
              filter="url(#spider-glow)"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 0 }}
              transition={{
                pathLength: { duration: 0.55, ease: "easeOut" },
                opacity: { duration: 0.7, delay: 0.15 },
              }}
            />
          ) : null
        )}

        {/* ── Junction pads at L-bends */}
        {SPIDER_CORNERS.map((c, i) =>
          c ? (
            <rect key={`jc${i}`} x={c[0] - 3} y={c[1] - 3} width={6} height={6}
              fill={hov === i ? "#a855f7" : "rgba(255,255,255,0.15)"}
              style={{ transition: "fill 0.2s" }}
            />
          ) : null
        )}

        {/* ── Radial tick marks */}
        {SPIDER_NODES.map(([nx, ny], i) => {
          const angle = Math.atan2(ny - 330, nx - 450);
          return (
            <line key={`tk${i}`}
              x1={450 + 82 * Math.cos(angle)} y1={330 + 82 * Math.sin(angle)}
              x2={450 + 91 * Math.cos(angle)} y2={330 + 91 * Math.sin(angle)}
              stroke={hov === i ? "#818cf8" : "rgba(255,255,255,0.14)"}
              strokeWidth={2} style={{ transition: "stroke 0.2s" }}
            />
          );
        })}

        {/* ── Static base circle */}
        <circle cx={450} cy={330} r={80} fill="#080808" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <circle cx={450} cy={330} r={80} fill="none"
          stroke="rgba(129,140,248,0.12)" strokeWidth={0.5} strokeDasharray="4 8" />

        {/* ── Animated gradient circle outline: draws in, then breathes persistently */}
        <motion.path
          d={CIRCLE_PATH}
          fill="none"
          stroke="url(#toc-circle-grad)"
          strokeWidth={2.5}
          strokeLinecap="round"
          filter="url(#spider-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={circleControls}
        />

        {/* ── Central text */}
        <text x={450} y={315} textAnchor="middle"
          fill="rgba(255,255,255,0.2)" fontSize={9} letterSpacing={3} fontFamily="inherit">
          NAVIGATE
        </text>
        <text x={450} y={336} textAnchor="middle"
          fill="rgba(255,255,255,0.78)" fontSize={15} fontWeight="700" fontFamily="inherit">
          What&apos;s next?
        </text>
        {/* Pulsing hint — CSS animation */}
        <text x={450} y={354} textAnchor="middle"
          fill="rgba(255,255,255,0.18)" fontSize={9} fontFamily="inherit"
          pointerEvents="none"
          style={{ animation: "toc-pulse-soft 2.4s ease-in-out infinite" }}
        >
          select a section
        </text>

        {/* ── Section nodes */}
        {SECTIONS.map((sec, i) => {
          const [nx, ny] = SPIDER_NODES[i];
          const isHov = hov === i;
          const side   = nx < 400 ? "left" : nx > 500 ? "right" : "both";

          // Outward unit vector from center (450, 330) → used for hover translate
          const dx = nx - 450, dy = ny - 330;
          const len = Math.sqrt(dx * dx + dy * dy);
          const outX = dx / len, outY = dy / len;

          // Per-node box size: Projects largest, other top-3 medium, rest standard
          const boxHh = i === 0 ? 42 : IMPORTANT.has(i) ? 36 : 30;
          const boxHw = IMPORTANT.has(i) ? 74 : 70;

          let arrowChar: string, arrowX: number, arrowY: number, arrowAnchor: string;
          if (side === "right") {
            arrowChar = "›"; arrowX = nx + boxHw + 22; arrowY = ny; arrowAnchor = "start";
          } else if (side === "left") {
            arrowChar = "‹"; arrowX = nx - boxHw - 22; arrowY = ny; arrowAnchor = "end";
          } else if (ny < 330) {
            arrowChar = "↑"; arrowX = nx; arrowY = ny - boxHh - 8; arrowAnchor = "middle";
          } else {
            arrowChar = "↓"; arrowX = nx; arrowY = ny + boxHh + 8; arrowAnchor = "middle";
          }

          const { entry, ring, points } = getBoxPaths(nx, ny, side, boxHw, boxHh);

          return (
            <motion.g key={sec.id}
              style={{ cursor: "pointer", transformBox: "fill-box", transformOrigin: "center" }}
              animate={{ opacity: hov !== null && !isHov ? (IMPORTANT.has(i) ? 0.99 : 0.22) : 1 }}
              whileHover={{ scale: 1.05, x: outX * 3, y: outY * 3, opacity: 1 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { type: "spring", stiffness: 380, damping: 28 },
                x:     { type: "spring", stiffness: 380, damping: 28 },
                y:     { type: "spring", stiffness: 380, damping: 28 },
              }}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              onClick={() => navTo(sec.id)}
            >
              {/* Box background */}
              <polygon points={points}
                fill={IMPORTANT.has(i) ? "transparent" : "rgba(8,8,8,0.97)"}
              />
              {/* 3 non-entry sides */}
              <path d={ring} fill="none"
                stroke={IMPORTANT.has(i) ? `url(#sg${i})` : "rgba(129,140,248,0.22)"}
                strokeOpacity={IMPORTANT.has(i) ? 0.55 : 1}
                strokeWidth={1} strokeLinecap="square"
              />
              {/* Entry side */}
              <path d={entry} fill="none"
                stroke={IMPORTANT.has(i) ? `url(#sg${i})` : "rgba(129,140,248,0.65)"}
                strokeWidth={IMPORTANT.has(i) ? (isHov ? 6 : 2.2) : (isHov ? 2 : 1.5)}
                strokeOpacity={isHov ? 1 : 0.65}
                strokeLinecap="square"
                style={{ transition: "stroke-width 0.2s, stroke-opacity 0.2s" }}
              />
              {/* Persistent ambient glow on entry side — CSS animation */}
              {IMPORTANT.has(i) && (
                <path
                  d={entry}
                  fill="none"
                  stroke={`url(#sg${i})`}
                  strokeWidth={i === 0 ? 1 : 1.5}
                  strokeLinecap="square"
                  filter="url(#spider-glow)"
                  style={{ animation: `${i === 0 ? "toc-glow-main" : "toc-glow-sub"} ${i === 0 ? 2.2 : 2.8}s ease-in-out ${i === 7 ? 0.9 : 0}s infinite` }}
                />
              )}
              {/* Pulse flash — full-outline gradient that fades to 0 on arrival */}
              {borderVersion[i] > 0 && (
                <motion.polygon
                  key={`rh-${i}-v${borderVersion[i]}`}
                  points={points}
                  fill="none"
                  stroke={`url(#sg${i})`}
                  strokeWidth={1.5}
                  filter="url(#spider-glow)"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              )}

              {/* Label */}
              <text x={nx} y={ny - 5} textAnchor="middle"
                fill={isHov
                  ? "rgba(255,255,255,0.95)"
                  : IMPORTANT.has(i) ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.62)"
                }
                fontSize={IMPORTANT.has(i) ? 17 : 14}
                fontWeight={IMPORTANT.has(i) ? "700" : "600"}
                fontFamily="inherit"
                style={{ transition: "fill 0.2s" }}>
                {sec.label}
              </text>
              {/* Desc */}
              <text x={nx} y={IMPORTANT.has(i) ? ny + 15 : ny + 13} textAnchor="middle"
                fill={isHov
                  ? (IMPORTANT.has(i) ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.4)")
                  : (IMPORTANT.has(i) ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.28)")
                }
                fontSize={IMPORTANT.has(i) ? 12 : 11} fontFamily="inherit"
                style={{ transition: "fill 0.2s" }}>
                {sec.desc}
              </text>

              {/* Directional arrow — fades in on hover */}
              <motion.text
                x={arrowX} y={arrowY}
                textAnchor={arrowAnchor as "middle" | "start" | "end"}
                fill="rgba(129,140,248,0.85)"
                fontSize={13}
                fontFamily="inherit"
                pointerEvents="none"
                animate={{ opacity: isHov ? 1 : 0 }}
                transition={{ duration: 0.15 }}
              >
                {arrowChar}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}


// ─── Mobile nav (< lg) ───────────────────────────────────────────────────────

function MobileNav() {
  return (
    <div className="px-6 sm:px-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Navigate</h2>
        <p className="mt-2 text-sm text-white/35">Quick access to every section.</p>
        <motion.div
          className="mt-4 h-px bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {SECTIONS.map((sec, i) => {
          const imp = IMPORTANT.has(i);
          return (
            <motion.button
              key={sec.id}
              onClick={() => navTo(sec.id)}
              className={[
                "flex flex-col gap-1.5 rounded-lg p-4 text-left transition-colors duration-200",
                imp
                  ? "border border-indigo-500/35 bg-indigo-950/20 hover:border-indigo-400/55 hover:bg-indigo-950/35"
                  : "border border-white/8 bg-white/3 hover:border-white/14 hover:bg-white/5",
              ].join(" ")}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className={`text-sm font-semibold ${imp ? "text-white/92" : "text-white/65"}`}>
                {sec.label}
              </span>
              <span className="text-xs text-white/30">{sec.desc}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function TOCIndex() {
  return (
    <motion.div
      className="flex min-h-screen items-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Mobile / tablet: card grid */}
        <div className="py-16 sm:py-20 lg:hidden">
          <MobileNav />
        </div>

        {/* Desktop: spider SVG */}
        <div className="hidden lg:block px-8 xl:px-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <SpiderLayout />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
