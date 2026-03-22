export default function ChatBot() {
  return (
    <div className="flex justify-center">
      <div className="h-[80vh] w-full m-4 p-4 rounded-xl bg-white/20 dark:bg-black/10 flex flex-col">

        <h1 className="text-4xl font-bold mb-3 text-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
          What's up?
        </h1>

        <div className="flex-1 rounded-lg bg-white/10 outline outline-white/30 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center relative p-4">

          <p className="text-sm text-gray-400 font-medium">
            Ask me anything. I'll be happy to help.
          </p>

          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3">

            <div className="grid grid-cols-4 gap-2">
              <button className="px-2 py-1 rounded-lg text-sm bg-black/60 outline outline-white/30 hover:bg-black/70 transition">
                Work
              </button>
              <button className="px-2 py-1 rounded-lg text-sm bg-black/60 outline outline-white/30 hover:bg-black/70 transition">
                Skills
              </button>
              <button className="px-2 py-1 rounded-lg text-sm bg-black/60 outline outline-white/30 hover:bg-black/70 transition">
                Projects
              </button>
              <button className="px-2 py-1 rounded-lg text-sm bg-black/60 outline outline-white/30 hover:bg-black/70 transition">
                Service
              </button>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/50 outline outline-white/20 backdrop-blur-md">
              <input
                type="text"
                placeholder="Ask me anything about Billy."
                className="w-full bg-transparent text-white focus:outline-none text-sm"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
