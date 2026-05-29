import { Redis } from "@upstash/redis";
import { type LiveCardData, LIVE_FALLBACK } from "./psi-types";

export type { LiveCardData };
export { LIVE_FALLBACK };

const redis = Redis.fromEnv();

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
