"use client";

import Header from "@/app/components/Header";
import Carousel from "@/app/components/Carousel";

export default function Home() {
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

          {/* 👇 Carousel moved to component */}
          <Carousel />

          <div className="flex-10" />

          <footer className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
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

        <div className="flex justify-center">
          <div className="h-[80vh] bg-white/25 dark:bg-black/5 m-[4vh] p-[2vh] rounded-xl space-y-3">
            
            <div className="h-full flex-col flex space-y-3">
              <h1 className="text-5xl font-bold">What's up?</h1>
              <div className="bg-white/10 backdrop-blur-sm flex-1 m-[1vh] rounded-lg p-[2vh] flex flex-col justify-center relative items-center">
                <p className="font-semibold text-sm text-gray-400">
                Ask me anything. I'll be happy to help.
                </p>
                
                <div className="flex flex-col space-y-2 bottom-4 absolute">
                  <div className="grid grid-cols-4 space-x-2">
                    <button className="px-2 outline outline-white bg-black rounded-lg">
                      Hello!
                    </button>
                    <button className="px-2 outline outline-white bg-black rounded-lg">
                      Hello!
                    </button>
                    <button className="px-2 outline outline-white bg-black rounded-lg">
                      Hello!
                    </button>
                    <button className="px-2 outline outline-white bg-black rounded-lg">
                      Hello!
                    </button>
                  </div>

                  <div className="p-2 bg-black outline outline-white rounded-2xl">
                    <h1>Ask me anything about Billy</h1>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
