"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    category: "Frontend",
    items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
  },
  {
    category: "Middleware / Auth",
    items: ["Next.js API Routes", "NextAuth.js", "JWT / Sessions", "Zod Validation", "REST APIs"],
  },
  {
    category: "Backend",
    items: ["PostgreSQL", "Prisma ORM", "OpenAI API", "Claude API", "Node.js"],
  },
  {
    category: "Cloud / Tooling",
    items: ["Vercel", "GitHub Actions", "Git", "VS Code", "Docker (learning)"],
  },
];

type FlowState = "idle" | "sending" | "validating" | "querying" | "success" | "error";

type MockRow = { id: number; email: string; joined: string };

const SEEDED_ROWS: MockRow[] = [
  { id: 1, email: "alice@example.com", joined: "Jan 2025" },
  { id: 2, email: "bob@example.com",   joined: "Mar 2025" },
];

// ─── Skills Grid ─────────────────────────────────────────────────────────────

function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
      {SKILLS.map(({ category, items }, i) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/30">
            {category}
          </p>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/8 px-3 py-1 text-xs text-white/60"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tech pills ───────────────────────────────────────────────────────────────

function TechPills({ items }: { items: string[] }) {
  return (
    <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/6 pt-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/8 px-2.5 py-1 text-[10px] text-white/45"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

// ─── Frontend Column ──────────────────────────────────────────────────────────

function FrontendColumn({
  flowState,
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
}: {
  flowState: FlowState;
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const isActive  = flowState === "sending" || flowState === "validating" || flowState === "querying";
  const isError   = flowState === "error";
  const isSuccess = flowState === "success";

  const inputBase =
    "w-full rounded-lg border px-3 py-2 text-sm text-white/70 outline-none transition-colors duration-300 placeholder:text-white/25";

  function inputCls() {
    if (isError)  return `${inputBase} border-red-400/50 bg-red-400/5`;
    if (isActive) return `${inputBase} border-indigo-400/50 bg-indigo-400/5`;
    return `${inputBase} border-white/8 bg-white/3`;
  }

  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-white/8 bg-[#0a0a0a] p-5">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">Frontend</p>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div>
          <label className="mb-1.5 block text-[11px] text-white/35">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputCls()}
            disabled={flowState !== "idle"}
          />
          {isError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-[11px] text-red-400/70"
            >
              Invalid credentials. Please try again.
            </motion.p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] text-white/35">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={inputCls()}
            disabled={flowState !== "idle"}
          />
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-lg border border-green-400/20 bg-green-400/5 px-3 py-2.5"
          >
            <span className="text-green-400/80">✓</span>
            <span className="text-sm text-green-400/70">Welcome back!</span>
          </motion.div>
        ) : (
          <button
            type="submit"
            disabled={flowState !== "idle"}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isActive && (
              <svg className="h-3.5 w-3.5 animate-spin text-white/50" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {isActive ? "Signing in…" : "Sign In"}
          </button>
        )}
      </form>

      <TechPills items={["React", "Tailwind CSS", "Framer Motion", "TypeScript"]} />
    </div>
  );
}

// ─── Middleware Column ────────────────────────────────────────────────────────

const FOLDER_TREE = [
  { name: "app/api/auth/",     isActive: false },
  { name: "├ route.ts",        isActive: true  },
  { name: "├ middleware.ts",   isActive: false },
  { name: "└ [...nextauth]/",  isActive: false },
  { name: "    └ route.ts",    isActive: false },
];

function MiddlewareColumn({ flowState }: { flowState: FlowState }) {
  const isValidating =
    flowState === "validating" || flowState === "querying" || flowState === "success";

  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-white/8 bg-[#0a0a0a] p-5">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">Middleware</p>

      <div className="rounded-lg border border-white/6 bg-white/2 p-3">
        {FOLDER_TREE.map(({ name, isActive }) => (
          <div
            key={name}
            className={`rounded px-1 font-mono text-xs leading-7 transition-colors duration-300 ${
              isActive && isValidating ? "bg-indigo-400/8 text-white/80" : "text-white/35"
            }`}
          >
            {name}
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/20">Active Route</p>
        <div className="flex h-5 items-center">
          {isValidating ? (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/60" />
              <span className="font-mono text-[11px] text-indigo-400/70">POST /api/auth/signin</span>
            </motion.div>
          ) : (
            <span className="font-mono text-[11px] text-white/20">— no active route</span>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-white/6 bg-white/2 p-3 font-mono text-xs leading-6">
        <div>
          <span className="text-white/45">schema</span>
          <span className="text-white/25">.</span>
          <span className="text-white/55">parse</span>
          <span className="text-white/25">{"({ email, password })"}</span>
        </div>
        <div className="text-white/20">{"// ZodError | void"}</div>
      </div>

      <TechPills items={["Next.js API Routes", "NextAuth.js", "Zod", "JWT"]} />
    </div>
  );
}

// ─── Backend Column ───────────────────────────────────────────────────────────

function BackendColumn({
  flowState,
  dynamicRows,
}: {
  flowState: FlowState;
  dynamicRows: MockRow[];
}) {
  const isQuerying = flowState === "querying" || flowState === "success";
  const isSuccess  = flowState === "success";
  const isError    = flowState === "error";
  const allRows    = [...SEEDED_ROWS, ...dynamicRows];

  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-white/8 bg-[#0a0a0a] p-5">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">Backend</p>

      <div>
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/20">db.users</p>
        <div className="overflow-hidden rounded-lg border border-white/6">
          <table className="w-full table-fixed text-xs">
            <thead>
              <tr className="border-b border-white/6 bg-white/2">
                <th className="w-8 px-3 py-2 text-left font-medium text-white/25">id</th>
                <th className="px-3 py-2 text-left font-medium text-white/25">email</th>
                <th className="hidden w-20 px-3 py-2 text-left font-medium text-white/25 sm:table-cell">
                  joined
                </th>
              </tr>
            </thead>
            <tbody>
              {allRows.map((row, i) => {
                const isDynamic    = i >= SEEDED_ROWS.length;
                const isHighlighted = isQuerying && i === allRows.length - 1;
                return (
                  <motion.tr
                    key={`${row.id}-${row.email}`}
                    initial={isDynamic ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`border-b border-white/4 last:border-0 transition-colors duration-300 ${
                      isHighlighted ? "bg-indigo-400/5" : ""
                    }`}
                  >
                    <td className="px-3 py-2 text-white/30">{row.id}</td>
                    <td className="truncate px-3 py-2 text-white/55">{row.email}</td>
                    <td className="hidden px-3 py-2 text-white/30 sm:table-cell">{row.joined}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/20">Last Query</p>
        <div className="flex h-5 items-center">
          {isQuerying ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="truncate font-mono text-[11px] text-white/40"
            >
              SELECT * FROM users WHERE email = &apos;...&apos;
            </motion.p>
          ) : (
            <p className="font-mono text-[11px] text-white/20">— awaiting query</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/20">Response</p>
        <div className="flex h-5 items-center">
          {isSuccess ? (
            <motion.p
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-mono text-[11px] text-green-400/70"
            >
              {`200 OK  { "user": { "id": ${allRows.length} } }`}
            </motion.p>
          ) : isError ? (
            <motion.p
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-mono text-[11px] text-red-400/60"
            >
              401 Unauthorized
            </motion.p>
          ) : (
            <p className="font-mono text-[11px] text-white/20">— awaiting request</p>
          )}
        </div>
      </div>

      <TechPills items={["PostgreSQL", "Prisma ORM", "Vercel"]} />
    </div>
  );
}

// ─── Flow arrow ───────────────────────────────────────────────────────────────

function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="hidden shrink-0 items-center self-center lg:flex" style={{ width: "2rem" }}>
      <div className="relative w-full">
        <motion.div
          className="h-px w-full bg-linear-to-r from-indigo-400/40 to-purple-400/40"
          animate={{ scaleX: active ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-purple-400/50"
          />
        )}
      </div>
    </div>
  );
}

// ─── Portal Visualizer ────────────────────────────────────────────────────────

function PortalVisualizer() {
  const [flowState, setFlowState] = useState<FlowState>("idle");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [dynamicRows, setDynamicRows] = useState<MockRow[]>([]);

  const portalRef   = useRef<HTMLDivElement>(null);
  const inView      = useInView(portalRef, { once: true, amount: 0.3 });
  const autoRanRef  = useRef(false);
  const timersRef   = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function persistUser(targetEmail: string) {
    try {
      const raw = localStorage.getItem("mockPortalUsers");
      const existing: { email: string; timestamp: string }[] = raw ? JSON.parse(raw) : [];
      const updated = [...existing, { email: targetEmail, timestamp: new Date().toISOString() }].slice(-3);
      localStorage.setItem("mockPortalUsers", JSON.stringify(updated));
    } catch { /* ignore */ }
  }

  function runFlow(targetEmail: string) {
    clearTimers();
    setFlowState("sending");

    timersRef.current = [
      setTimeout(() => setFlowState("validating"), 900),
      setTimeout(() => setFlowState("querying"),   1800),
      setTimeout(() => {
        setFlowState("success");
        persistUser(targetEmail);
        setDynamicRows((prev) => {
          const next = [
            ...prev,
            {
              id: SEEDED_ROWS.length + prev.length + 1,
              email: targetEmail,
              joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
            },
          ].slice(-3);
          return next;
        });
      }, 2700),
      setTimeout(() => {
        setFlowState("idle");
        setEmail("");
        setPassword("");
      }, 5800),
    ];
  }

  function runError() {
    clearTimers();
    setFlowState("error");
    timersRef.current = [setTimeout(() => setFlowState("idle"), 3000)];
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (flowState !== "idle") return;
    if (!email || !email.includes("@")) { runError(); return; }
    runFlow(email);
  }

  function handleRunDemo() {
    if (flowState !== "idle") return;
    const demoEmail = "demo@example.com";
    setEmail(demoEmail);
    setPassword("demo1234");
    runFlow(demoEmail);
  }

  // Load persisted rows on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mockPortalUsers");
      if (!raw) return;
      const parsed: { email: string; timestamp: string }[] = JSON.parse(raw);
      setDynamicRows(
        parsed.slice(-3).map((entry, i) => ({
          id:     SEEDED_ROWS.length + i + 1,
          email:  entry.email,
          joined: new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        }))
      );
    } catch { /* ignore */ }
  }, []);

  // Auto-run once on scroll into view
  useEffect(() => {
    if (!inView || autoRanRef.current) return;
    autoRanRef.current = true;
    const t = setTimeout(() => {
      const demoEmail = "demo@example.com";
      setEmail(demoEmail);
      setPassword("demo1234");
      runFlow(demoEmail);
    }, 800);
    timersRef.current.push(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => () => clearTimers(), []);

  const toMiddlewareActive =
    flowState === "sending" || flowState === "validating" ||
    flowState === "querying" || flowState === "success";
  const toBackendActive =
    flowState === "validating" || flowState === "querying" || flowState === "success";

  return (
    <div ref={portalRef}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white/80">Full-Stack Data Flow</h3>
          <p className="mt-1 text-sm text-white/35">
            Submit the form to trace a request from UI → middleware → database.
          </p>
        </div>
        <button
          onClick={handleRunDemo}
          disabled={flowState !== "idle"}
          className="self-start rounded-full border border-white/10 px-4 py-2 text-xs text-white/55 transition hover:border-white/20 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Run Demo
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="min-w-0 flex-1">
          <FrontendColumn
            flowState={flowState}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handleSubmit}
          />
        </div>
        <FlowArrow active={toMiddlewareActive} />
        <div className="min-w-0 flex-1">
          <MiddlewareColumn flowState={flowState} />
        </div>
        <FlowArrow active={toBackendActive} />
        <div className="min-w-0 flex-1">
          <BackendColumn flowState={flowState} dynamicRows={dynamicRows} />
        </div>
      </div>
    </div>
  );
}

// ─── Component Showcase ───────────────────────────────────────────────────────

function ComponentCard({
  name,
  description,
  onReplay,
  pills,
  children,
}: {
  name: string;
  description: string;
  onReplay?: () => void;
  pills: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/8 bg-[#0a0a0a] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/70">{name}</p>
          <p className="mt-0.5 text-[11px] text-white/30">{description}</p>
        </div>
        {onReplay && (
          <button
            onClick={onReplay}
            className="rounded-lg border border-white/6 px-2 py-1.5 text-xs text-white/30 transition hover:border-white/12 hover:text-white/60"
            title="Replay"
          >
            ↻
          </button>
        )}
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-white/6 bg-white/[0.015] px-4 py-8">
        {children}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-white/8 px-2.5 py-1 text-[10px] text-white/45"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}

function GradientRuleCard() {
  const [rev, setRev] = useState(0);
  return (
    <ComponentCard
      name="Gradient Rule"
      description="Animated section header divider"
      onReplay={() => setRev((n) => n + 1)}
      pills={["Framer Motion", "Tailwind CSS v4"]}
    >
      <div className="w-full space-y-3">
        <p className="text-sm font-semibold text-white/70">Section Title</p>
        <motion.div
          key={rev}
          className="h-px bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </ComponentCard>
  );
}

type SwatchMode = "Timeline" | "Flow";
function ToggleSwatchCard() {
  const [mode, setMode] = useState<SwatchMode>("Timeline");
  return (
    <ComponentCard
      name="Segmented Toggle"
      description="Layout switcher with sliding selection"
      pills={["React", "Framer Motion · layoutId"]}
    >
      <div className="inline-flex rounded-full border border-white/8 bg-white/3 p-1">
        {(["Timeline", "Flow"] as SwatchMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="relative rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em]"
          >
            {mode === m && (
              <motion.div
                layoutId="swatch-toggle-bg"
                className="absolute inset-0 rounded-full bg-white/8"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <span
              className={`relative transition-colors duration-150 ${
                mode === m ? "text-white/85" : "text-white/35"
              }`}
            >
              {m}
            </span>
          </button>
        ))}
      </div>
    </ComponentCard>
  );
}

function StaggerCard() {
  const [rev, setRev] = useState(0);
  const items = [
    { step: "01", label: "Scope"  },
    { step: "02", label: "Design" },
    { step: "03", label: "Build"  },
  ];
  return (
    <ComponentCard
      name="Stagger Reveal"
      description="Sequential entry used throughout the page"
      onReplay={() => setRev((n) => n + 1)}
      pills={["Framer Motion", "React"]}
    >
      <div key={rev} className="w-full space-y-2">
        {items.map(({ step, label }, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.12 }}
            className="flex items-center gap-3 rounded-lg border border-white/6 px-3 py-2"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
              {step}
            </span>
            <span className="text-sm text-white/60">{label}</span>
          </motion.div>
        ))}
      </div>
    </ComponentCard>
  );
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    let current = 0;
    const step = 16;
    const increment = target / (1200 / step);
    const id = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(current));
    }, step);
    return () => clearInterval(id);
  }, [target]);
  return <>{count}{suffix}</>;
}

function CountUpCard() {
  const [rev, setRev] = useState(0);
  return (
    <ComponentCard
      name="Count-Up Stat"
      description="Animated metric used in project cards"
      onReplay={() => setRev((n) => n + 1)}
      pills={["React", "useEffect"]}
    >
      <div key={rev} className="text-center">
        <p className="text-3xl font-bold text-white/85">
          <CountUp target={200} suffix="+" />
        </p>
        <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-white/30">
          Concurrent Users
        </p>
      </div>
    </ComponentCard>
  );
}

function ComponentShowcase() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white/80">Components</h3>
        <p className="mt-1 text-sm text-white/35">
          Live swatches of UI patterns used across this page.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <GradientRuleCard />
        <ToggleSwatchCard />
        <StaggerCard />
        <CountUpCard />
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function TechStackLarge() {
  return (
    <motion.div
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 pb-6">
          <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
          <motion.div
            className="mt-4 h-px bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        <div className="mb-14">
          <SkillsGrid />
        </div>

        <div className="border-t border-white/6 pt-12">
          <PortalVisualizer />
        </div>

        <div className="mt-12 border-t border-white/6 pt-12">
          <ComponentShowcase />
        </div>
      </div>
    </motion.div>
  );
}
