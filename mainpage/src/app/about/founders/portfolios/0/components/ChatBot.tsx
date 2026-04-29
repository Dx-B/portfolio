export default function ChatBot() {
  const quickPrompts = ["Work", "Skills", "Projects", "Service"];

  return (
    <div className="flex justify-center px-4 my-4">
      <div className="relative h-[95vh] w-full max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl dark:bg-black/25 md:p-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(99,102,241,0.14),transparent_24%),radial-gradient(circle_at_72%_82%,rgba(168,85,247,0.12),transparent_24%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.12]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-gradient-to-r from-indigo-500/18 via-purple-500/14 to-pink-500/14 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-indigo-100/85 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_10px_30px_rgba(120,80,255,0.14)]">
              <span className="h-2 w-2 rounded-full bg-indigo-200 shadow-[0_0_10px_rgba(165,180,252,0.85)]" />
              AI Chat
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white/92 text-shadow-[0_0_12px_rgba(255,255,255,0.18)] md:text-5xl">
              What&apos;s up?
            </h1>
          </div>

          <div className="relative flex-1 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-md dark:bg-black/20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(120,100,255,0.05),transparent_28%)]" />
            </div>

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4 md:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/25 via-purple-500/15 to-pink-500/10 shadow-[0_0_24px_rgba(120,80,255,0.12)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/84">
                      Billy Assistant
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/26">
                      Ask me anything
                    </div>
                  </div>
                </div>

                <div className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/30 sm:block">
                  Demo
                </div>
              </div>

              <div className="flex-1 px-4 py-5 md:px-5">
                <div className="flex h-full flex-col justify-between gap-5">
                  <div className="flex flex-1 items-center justify-center">
                    <p className="text-center text-sm font-medium text-white/34">
                      Ask me anything about Billy. I&apos;ll be happy to help.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {quickPrompts.map((item) => (
                        <button
                          key={item}
                          className="rounded-xl border border-white/[0.08] bg-black/40 px-3 py-1 text-sm text-white/70 transition duration-300 hover:border-white/[0.16] hover:bg-white/[0.05] hover:text-white"
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <div className="rounded-[20px] border border-white/[0.08] bg-black/40 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] backdrop-blur-md">
                      <div className="flex items-center gap-2 rounded-[16px] bg-white/[0.03] px-3 py-2.5">
                        <input
                          type="text"
                          placeholder="Ask me anything."
                          className="w-full bg-transparent text-sm text-white/84 placeholder:text-white/24 focus:outline-none"
                        />
                        
                        <button className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:shadow-[0_0_24px_rgba(120,80,255,0.18)]">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}