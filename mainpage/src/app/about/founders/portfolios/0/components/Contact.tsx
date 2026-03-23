import { GlassCard } from "./GlassCard";
import { GradientTitle } from "./GradientTitle";

export function Contact() {
  return (
    <div className="space-y-4  m-4">

      <GradientTitle>Contact</GradientTitle>

      <GlassCard className="p-4">
        <p className="text-gray-400 text-sm">
          Want to build something together?
        </p>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 p-2 rounded-lg">
            Hire Me
          </button>

          <button className="flex-1 bg-black/30 p-2 rounded-lg">
            Message
          </button>
        </div>
      </GlassCard>

    </div>
  );
}
