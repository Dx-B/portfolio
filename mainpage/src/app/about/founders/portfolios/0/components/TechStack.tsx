import { ExpandableSection } from "./ExpandableSection";
import { GradientTitle } from "./GradientTitle";

const stack = {
  Frontend: ["React", "Next.js", "Tailwind"],
  Backend: ["Node.js", "Express", "Postgres"],
  AI: ["OpenAI API", "LangChain"],
};

export function TechStack() {
  return (
    <div className="space-y-4  m-4">

      <GradientTitle>Tech Stack</GradientTitle>

      {Object.entries(stack).map(([key, items]) => (
        <ExpandableSection key={key} title={key}>
          <div className="grid grid-cols-2 gap-2">
            {items.map((i) => (
              <div
                key={i}
                className="bg-black/30 rounded-lg p-2 text-sm text-white text-center"
              >
                {i}
              </div>
            ))}
          </div>
        </ExpandableSection>
      ))}

    </div>
  );
}
