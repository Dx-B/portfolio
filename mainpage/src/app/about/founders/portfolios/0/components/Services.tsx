import { ExpandableSection } from "./ExpandableSection";
import { GradientTitle } from "./GradientTitle";

export function Services() {
  return (
    <div className="space-y-4  m-4">

      <GradientTitle>What I Do</GradientTitle>

      <ExpandableSection title="Web Development">
        Building fast, scalable full-stack applications with modern frameworks.
      </ExpandableSection>

      <ExpandableSection title="UI / UX Design">
        Designing clean, minimal, user-focused interfaces with strong UX flow.
      </ExpandableSection>

      <ExpandableSection title="AI Integration">
        Integrating LLMs and AI APIs into real-world applications.
      </ExpandableSection>

    </div>
  );
}
