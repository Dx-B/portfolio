import { ExpandableSection } from "./ExpandableSection";
import { GradientTitle } from "./GradientTitle";

export function Journey() {
  return (
    <div className="space-y-4  m-4">

      <GradientTitle>Journey</GradientTitle>

      <ExpandableSection title="First Code">
        Started learning programming and building small web pages.
      </ExpandableSection>

      <ExpandableSection title="First Projects">
        Built full-stack apps and experimented with UI systems.
      </ExpandableSection>

      <ExpandableSection title="Now">
        Focused on AI-powered applications and production-grade systems.
      </ExpandableSection>

    </div>
  );
}
