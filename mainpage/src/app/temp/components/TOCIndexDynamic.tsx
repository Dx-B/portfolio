"use client";

import dynamic from "next/dynamic";

const TOCIndex = dynamic(
  () => import("@/app/temp/components/TOCIndex").then(m => ({ default: m.TOCIndex })),
  { ssr: false, loading: () => <div className="min-h-screen" /> }
);

export function TOCIndexDynamic() {
  return <TOCIndex />;
}
