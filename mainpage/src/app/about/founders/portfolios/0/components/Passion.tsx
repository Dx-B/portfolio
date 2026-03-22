import Image from "next/image";

export default function Passion() {
  return (
    <div className="flex justify-center">
      <div className="h-[80vh] bg-white/25 dark:bg-black/25 m-[4vh] p-[2vh] rounded-xl space-y-3 flex flex-col">

        <h1 className="text-4xl font-bold text-shadow-[0_0_12px_rgba(255,255,255,0.3)] bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
          Your Dreams
        </h1>

        <h1 className="text-5xl font-bold text-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
          My Passion
        </h1>

        <p className="font-semibold text-shadow-[0_0_12px_rgba(255,255,255,0.3)] text-gray-400">
          I'm Billy Zhang, a professional full-stack web developer. <br />
          Using cutting edge frameworks and AI systems, I turn your ideas into your accomplishments.
        </p>

        <div className="flex-1" />

        <div className="grid grid-cols-4 gap-4 w-full">
          <button className="bg-gray-700/30 outline-1 outline-white/50 w-full aspect-square rounded-lg flex items-center justify-center">
            {/* GitHub */}
          </button>

          <button className="bg-gray-700/30 outline-1 outline-white/50 w-full aspect-square rounded-lg flex items-center justify-center">
            {/* LinkedIn */}
          </button>

          <button className="bg-gray-700/30 outline-1 outline-white/50 w-full aspect-square rounded-lg flex items-center justify-center">
            <Image src="/leetcode.svg" width="32" height="32" alt="leetcode" className="dark:invert"/>
          </button>

          <button className="bg-gray-700/30 outline-1 outline-white/50 w-full aspect-square rounded-lg flex items-center justify-center">
            {/* X */}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <button className="bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 p-2 rounded-lg text-white">
            Let's Chat
          </button>

          <button className="bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 p-2 rounded-lg text-white">
            Resume
          </button>
        </div>

      </div>
    </div>
  );
}
