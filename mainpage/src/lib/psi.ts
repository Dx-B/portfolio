import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export type PSIMetrics = {
  perf: number;
  lcp: string;
  fcp: string;
  cls: string;
  tbt: string;
  measuredAt: string;
};

const FALLBACK: PSIMetrics = {
  perf: 97,
  lcp: "0.6s",
  fcp: "0.4s",
  cls: "0.00",
  tbt: "0ms",
  measuredAt: "",
};

export async function getPSIMetrics(): Promise<PSIMetrics> {
  try {
    const metrics = await redis.get<PSIMetrics>("psi:metrics");
    return metrics ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
}
