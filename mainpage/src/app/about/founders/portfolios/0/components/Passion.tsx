import Image from "next/image";

export default function PassionSection() {
  return (
    <section className="flex justify-center px-4">
      <div className="relative flex min-h-[80vh] w-full max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl dark:bg-black/25 md:min-h-[82vh] md:p-7">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.14),transparent_24%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.12),transparent_24%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.14]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-gradient-to-r from-indigo-500/18 via-purple-500/14 to-pink-500/14 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-indigo-100/85 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_10px_30px_rgba(120,80,255,0.14)]">
                <span className="h-2 w-2 rounded-full bg-indigo-200 shadow-[0_0_10px_rgba(165,180,252,0.85)]" />
                Full-Stack Developer
              </div>

              <div className="mt-6 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-shadow-[0_0_12px_rgba(255,255,255,0.22)] md:text-5xl">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Your Dreams
                  </span>
                </h1>

                <h1 className="text-4xl font-bold tracking-tight text-white/92 text-shadow-[0_0_12px_rgba(255,255,255,0.16)] md:text-5xl">
                  My Passion
                </h1>
              </div>

              <p className="mt-6 max-w-[38rem] text-base leading-8 text-white/48">
                I’m Billy Zhang, a professional full-stack web developer.
                Using modern frameworks, thoughtful design, and AI systems,
                I turn ideas into polished digital experiences.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="grid grid-cols-4 gap-3 sm:max-w-[320px]">
                <a
                  href="#"
                  className="group flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="transition duration-300 group-hover:scale-110"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.20-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.20-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="group flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="transition duration-300 group-hover:scale-110"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 13.394V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="group flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
                  aria-label="LeetCode"
                >
                  <Image
                    src="/leetcode.svg"
                    width={28}
                    height={28}
                    alt="leetcode"
                    className="transition duration-300 group-hover:scale-110 dark:invert"
                  />
                </a>

                <a
                  href="#"
                  className="group flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
                  aria-label="X"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="transition duration-300 group-hover:scale-110"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </a>
              </div>

              <div className="grid gap-3 sm:min-w-[210px]">
                <button className="group rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_28px_rgba(120,80,255,0.2)]">
                  <span className="inline-flex items-center gap-2">
                    Let&apos;s Chat
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </button>

                <button className="rounded-xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium text-white/80 transition duration-300 hover:border-white/18 hover:bg-white/[0.04] hover:text-white">
                  Resume
                </button>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rounded-[28px] border border-white/[0.06] bg-white/[0.02]" />
            <div className="absolute inset-6 rounded-[24px] border border-white/[0.06] bg-black/20 p-5">
              <div className="flex items-center justify-between">
                <div className="h-2 w-20 rounded-full bg-gradient-to-r from-white/20 via-white/8 to-white/0" />
                <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/30">
                  Creative Systems
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/24">
                    Focus
                  </div>
                  <div className="mt-2 text-lg font-medium text-white/82">
                    Full-Stack Web Development
                  </div>
                  <div className="mt-2 text-sm leading-7 text-white/38">
                    Modern interfaces, production-ready systems, and thoughtful
                    interaction design.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/24">
                      Build
                    </div>
                    <div className="mt-2 text-sm text-white/76">
                      Frontend + Backend
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/24">
                      Layer
                    </div>
                    <div className="mt-2 text-sm text-white/76">
                      AI Integration
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-white/72">Live Signal</span>
                    <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] text-white/30">
                      Active
                    </span>
                  </div>
                  <div className="h-24 rounded-2xl bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:18px_18px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}