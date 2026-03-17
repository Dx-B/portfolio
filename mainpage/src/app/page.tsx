import Header from "@/app/components/Header";
import Hero from "./components/Hero";
import BrandBar from "./components/BrandBar";

export default function Home() {
  return (
    <main>
      <Header/>

      <section className="relative min-h-screen overflow-hidden">
        <div
          className="
            absolute inset-0 -z-10 pointer-events-none
            bg-[linear-gradient(rgba(229,231,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(229,231,235,0.08)_1px,transparent_1px)]
            dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
            bg-size-[clamp(30px,4vw,70px)_clamp(30px,4vw,70px)]
            dark:bg-size-[clamp(40px,6vw,100px)_clamp(40px,6vw,120px)]

          "
        />
        <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
          <div
            className="
              absolute -left-20 -top-3
              h-80 w-80 md:h-112 md-w-md
              bg-violet-600/35
              blur-[120px]
            "
          />
          <div
            className="
              absolute -right-20 -bottom-12
              h-80 w-80 md-h-112 md-w-md
              bg-sky-500/25
              blur-[120px]
            "
          />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="flex-1" />

          <div className="flex justify-center px-6">
            <Hero/>
          </div>

          <div className="flex-3 flex flex-col items-center">
            <div className="flex-3" />
              <div className="space-y-8">
              <BrandBar/>
              <div className="flex flex-col items-center space-y-4 px-6">
                <button
                  className="
                    cursor-pointer
                    rounded-3xl
                    px-26 py-4
                    font-bold
                    outline-1
                    outline-indigo-500/60
                    shadow-[0_0_12px_rgba(131,58,246,0.6)]
                    transition
                    dark:font-normal
                    dark:outline-indigo-400
                    dark:bg-black/70
                    bg-white/60
                  "
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="flex-4" />
          </div>

          <footer className="absolute bottom-0 w-full p-4">
            <div className="flex">
              <p className="w-full text-xs text-start font-semibold">Dx, et. al 0.00.03a</p>
              <p className="w-full text-xs text-end font-semibold">EST. 2026</p>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}