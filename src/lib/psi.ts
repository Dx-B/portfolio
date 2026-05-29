import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

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

export async function getLiveCardData(): Promise<LiveCardData> {
  try {
    const data = await redis.get<LiveCardData>("site:card");
    return data ?? LIVE_FALLBACK;
  } catch {
    return LIVE_FALLBACK;
  }
}

export async function setLiveCardData(data: LiveCardData): Promise<void> {
  await redis.set("site:card", data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePSIResponse(json: any): LiveCardData["psi"] {
  const lhr    = json.lighthouseResult;
  const cats   = lhr.categories;
  const audits = lhr.audits;
  return {
    perf:          Math.round(cats.performance.score     * 100),
    a11y:          Math.round(cats.accessibility.score   * 100),
    bestPractices: Math.round(cats["best-practices"].score * 100),
    seo:           Math.round(cats.seo.score             * 100),
    lcp:  strip(audits["largest-contentful-paint"].displayValue),
    fcp:  strip(audits["first-contentful-paint"].displayValue),
    cls:  fmtCLS(audits["cumulative-layout-shift"].displayValue),
    tbt:  strip(audits["total-blocking-time"].displayValue),
  };
}

function strip(v: string): string {
  return v.replace(/\s+/g, "");
}

function fmtCLS(v: string): string {
  const n = parseFloat(v);
  return isNaN(n) ? v : n.toFixed(2);
}
