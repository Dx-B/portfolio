export type LiveCardData = {
  psi: {
    perf: number;
    a11y: number;
    bestPractices: number;
    seo: number;
    lcp: string;
    fcp: string;
    cls: string;
    tbt: string;
  };
  github: {
    stars: number;
    additions: number;
    deletions: number;
    commitDate: string;
  };
  measuredAt: string;
};

export const LIVE_FALLBACK: LiveCardData = {
  psi: {
    perf: 97, a11y: 100, bestPractices: 96, seo: 100,
    lcp: "0.6s", fcp: "0.4s", cls: "0.00", tbt: "0ms",
  },
  github: { stars: 0, additions: 0, deletions: 0, commitDate: "" },
  measuredAt: "",
};
